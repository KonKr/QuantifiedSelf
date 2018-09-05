/**
 * VS JS Library
 * VSFun: general functions
 * VSFunUI: interacting with dom
 * VSLocalStorage: interacting w/ LS
 * VSApi: api functions
 * 
 * @version 18.09.5
 * @author Vassilis Stamoulos
 * @license MIT
 */

/*
Table Of Context

VSFun.getRandomNum(min, max): return num
      generateRegExNum(min, max): return regex
      errorNum(num, min, max, isInt = false, regex = false): return true/false
      errorString(str, regex = false): return true/false
      errorObject(obj): return true/false
      getAge(dateString): return age(years)
      ucWithoutAccents(str, enc = "utf-8"): return upercase str but without accent
      uuid(): generates a unique id
      fillObject(a, b): finds object a in object b
      findAncestor(el, cls): searches for the nearest ancestor with class = 'cls'

VSFunUI.addToLi(object, delElement = false, materialize = false): document append
          --> requires class: VSList
        addToTable(object, delElement = false): document append
          --> requires class: VSTable
        showError(message, materialize = false): document append OR materialize toast
        delete(target): document remove
          --> requires class: VSDelete
        clear(selector): clear specific element's inner nodes
        clearInput(form): input clear
          --> requires class: VSInput
        filterText(txt, selectorElement): filters dom with input txt specific selectors textNode
          --> requires class: VSFilterWrapper (wrapper element),
                              VSFilter (the elements that toggle show/hide)

VSLocalStorage.get(item): return LS item
               find(lsItem, key): finds key in a specific LS Item else returns false
               add(lsItem, item): set LS item
               edit(lsItem, key, value): finds key, then edits the value
               remove(lsItem, key, val): remove LS item
               clear(lsItem): clears entire LS item
               display(funcName, lsItem): for a function name document append items

VSApi.error(request, status = '', print = ''): logs, document append
      xhr({method:GET/POST/PUT/DELETE, url, data, contentHeader, success(), error()}): api handler with XMLHttpResponse
      async fetchAPI({method:GET/POST/PUT/DELETE, url, data, contentType}): async fetch API w/ await promises

*/
class VSFun {
  static getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static generateRegExNum(min, max) {
    let lenMin = parseInt(String(min).length);
    let lenMax = parseInt(String(max).length);

    let rex;
    if (lenMin === lenMax) {
      rex = '^([1-9]';
      for (let i = 1; i < lenMax; i++) {
        rex += '[0-9]';
      }
    } else {
      rex = '^([0-9]';
      for (let i = lenMin; i < lenMax; i++) {
        rex += '|[1-9]';
        for (let j = 0; j < i; j++) {
          rex += '[0-9]';
        }
      }
    }

    return new RegExp(rex + ')$');
  }

  static errorNum(num, min, max, isInt = false, regex = false) {
    if (regex === false) {
      regex = this.generateRegExNum(min, max);
    }

    // if not num
    return (isNaN(parseInt(num)) || !regex.test(parseInt(num)) || parseInt(num) < min || parseInt(num) > max || num % 1 !== 0);
  }

  static errorString(str, regex = false) {
    if (regex === false) {
      regex = /^([0-9A-Za-z \"\'\\\/-:;._,])+$/;
    }

    // if not str, or empty str
    return (!regex.test(str) || str === '' || typeof str === 'undefined');
  }

  static errorObject(obj) {
    // if not obj, or empty obj
    return (typeof obj === 'undefined' || typeof obj === 'null' || Object.keys(obj).length === 0);
  }

  static getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  static ucWithoutAccents(str, enc = "utf-8") {
    if (str === null || typeof str === 'undefined') return 0;

    str = str.toUpperCase();
    let lettersToReplace = {
      'Ά': 'Α', 'Έ': 'Ε', 'Ί': 'Ι', 'Ή': 'Η', 'Ύ': 'Υ',
      'Ό': 'Ο', 'Ώ': 'Ω', 'A': 'A', 'A': 'A', 'A': 'A', 'A': 'A',
      'Y': 'Y', 'ΐ': 'Ϊ'
    }

    for (let char of str) {
      if (typeof lettersToReplace[char] !== 'undefined') str = str.replace(char, lettersToReplace[char]);
    }

    return str;
  }

  static uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  static fillObject(a, b) {
    for (let i in b) {
      a[i] = b[i];
    }
  }

  static findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
}

class VSFunUI {
  static addToLi(object, delElement = false, materialize = false) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.innerHTML = object;

    if (delElement !== false) {
      let str = `<a class="VSDelete secondary-content">${delElement}</a>`;
      li.appendChild(str);
    }

    document.querySelector('.VSList').appendChild(li);
  }

  static addToTable(object, delElement = false) {
    const row = document.createElement('tr');
    let str = '';
    if (delElement !== false) str += `<td><a class="VSDelete">${delElement}</a></td>`;
    Object.keys(object).forEach(key => {
      str += `<td>${object[key]}</td>`;
    });

    row.innerHTML = str;
    document.querySelector('.VSTable tbody').appendChild(row);
  }

  static showError(message, materialize = false) {
    if (VSFun.errorString(message, /[^~`@#$]*/)) message = 'pls fill all inputz right!';

    if (materialize !== false) {
      if (document.querySelector('#toast-container') === null)
        M.toast({ html: message, classes: 'rounded', displayLength: 750 });
    }
  }

  static delete(target) {
    if (target.classList.contains('VSDelete')) target.parentElement.parentElement.remove();
  }

  static clear(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.remove();
    });
  }

  static clearInput(form) {
    Array.from(form.elements).forEach(input => {
      if (input.classList.contains('VSInput')) input.value = '';
    });
  }

  static filterText(txt, selectorElement) {
    document.querySelectorAll(`.VSFilterWrapper ${selectorElement}`).forEach((filter) => {
      const item = filter.firstChild.textContent;
      if (item.toLowerCase().indexOf(txt.toLowerCase()) !== -1) {
        VSFun.findAncestor(filter, 'VSFilter').style.display = 'block';
      } else {
        VSFun.findAncestor(filter, 'VSFilter').style.display = 'none';
      }
    });
  }
}

class VSLocalStorage {
  static get(item) {
    if (localStorage.getItem(item) === null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem(item));
    }
  }
  static find(lsItem, key) {
    let found = false;
    const lsItems = this.get(lsItem);
    lsItems.forEach(item => {
      if (item[key]) {
        found = item;
      }
    });
    return found;
  }
  static add(lsItem, item) {
    const lsItems = this.get(lsItem);
    lsItems.push(item);
    localStorage.setItem(lsItem, JSON.stringify(lsItems));
  }
  static edit(lsItem, key, value) {
    const item = this.find(lsItem, key);
    if (item) {
      this.remove(lsItem, key);
      this.add(lsItem, {[key]: value})
    }
  }
  static remove(lsItem, key) {
    const lsItems = this.get(lsItem);
    lsItems.forEach((item, index) => {
      if (item[key]) {
        lsItems.splice(index, 1);
      }
    });
    localStorage.setItem(lsItem, JSON.stringify(lsItems));
  }
  static clear(lsItem) {
    let lsItems = [];
    localStorage.setItem(lsItem, JSON.stringify(lsItems));
  }
  static display(funcName, lsItem) {
    const lsItems = this.get(lsItem);
    let options = Array.from(arguments);
    options.shift();
    options.shift();

    lsItems.forEach((item) => {
      eval('VSFunUI.' + funcName).call(this, item, options);
    });
  }
}

class VSApi {
  static error(request) {
    switch (request) {
      case 200: return "Everything is OK.";
      case 400: return "Server understood the request, but request content was invalid.";
      case 401: return "Unauthorized access.";
      case 403: return "Forbidden resource can't be accessed.";
      case 404: return "Page not found";
      case 500: return "Internal server error.";
      case 503: return "Service unavailable.";
      default: return `${request}: ${request.statusText}`;
    }

    // switch (status) {
    //   case 'parsererror': console.log("Parsing JSON Request failed."); break;
    //   case 'timeout': console.log("Request Time out."); break;
    //   case 'abort': console.log("Request was aborted by the server"); break;
    // }
  }

  static xhr() {
    let args = Array.from(arguments)[0];

    const xhr = new XMLHttpRequest();
    xhr.open(args.method, args.url, true);

    xhr.onload = (e) => {
      let response = e.target;

      if (response.status !== 200) {
        args.error(this.error(response.status));
      } else {
        args.success(JSON.parse(response.response));
      }
    };

    if (typeof args.data !== 'undefined' && args.data !== '' && args.method !== 'GET') {
      if (typeof args.contentHeader !== 'undefined' && args.contentHeader !== '') {
        xhr.setRequestHeader('Content-Type', args.contentHeader);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.send(JSON.stringify(args.data));
    } else {
      xhr.send();
    }
  }

  static async fetchAPI() {
    let args = Array.from(arguments);
    args = args[0];

    let fetchData = {
      method: args.method
    };

    let getFullResponse = false;
    if (typeof args.getFullResponse !== 'undefined' && typeof args.getFullResponse === 'boolean') {
      getFullResponse = args.getFullResponse;
    }

    fetchData.headers = {};

    if (typeof args.crossDomain !== 'undefined' && typeof args.crossDomain === 'boolean' && args.crossDomain === true) {
      // fetchData.headers['Access-Control-Allow-Origin'] = '*';
      // fetchData.mode = 'no-cors';
    }

    if (!VSFun.errorString(args.contentType, /^([0-9A-Za-z\/\+.])+$/)) {
      fetchData.headers['Content-Type'] = args.contentType;
    }
    if (!VSFun.errorString(args.authorization, /\w+/)) {
      fetchData.headers['Authorization'] = args.authorization;
    }
    
    if (!VSFun.errorObject(args.data) && (args.method === 'POST' || args.method === 'PUT' || args.method === 'DELETE' || args.method === 'UPDATE')) {
      if (typeof fetchData.headers['Content-Type'] !== 'undefined') {
        fetchData.body = JSON.stringify(args.data);
      } else {
        fetchData.body = args.data;
      }
    } else if (VSFun.errorObject(args.data) && (args.method === 'POST' || args.method === 'PUT')) {
      fetchData.body = '';
    }
    
    if (!VSFun.errorString(args.method) && !VSFun.errorString(args.url, /^([0-9A-Za-z\\\/\+.:_\-=&?])+$/)) {
      if (!VSFun.errorObject(fetchData.headers) && typeof fetchData.headers['Content-Type'] !== 'undefined' && !getFullResponse) {
        switch (fetchData.headers['Content-Type']) {
          case 'application/text':
            return await (await fetch(args.url, fetchData)).text();
          case 'application/json':
            return await (await fetch(args.url, fetchData)).json();
          case 'application/vnd.github.v3+json':
            return await (await fetch(args.url, fetchData)).json();
        }
      } else {
        return await (await fetch(args.url, fetchData));
      }
    }
  }
}