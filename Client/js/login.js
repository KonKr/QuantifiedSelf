const loader = document.querySelector('.loader');
const main = document.getElementsByTagName('main')[0];
const form = document.querySelector('form');
const email = document.querySelector('input[id="email"]');
const password = document.querySelector('input[id="password"]');
const submit = document.querySelector('input[type="submit"]');

window.onload = () => {
  loader.classList.add('fade');
  main.setAttribute('style', 'display: flex !important');
  window.setTimeout(() => loader.remove(), 1000);
  
  form.addEventListener('keyup', validateForm);
  form.addEventListener('submit', submitForm);
};

function validateForm(e) {
  if (email === null || VSFun.errorString(email.value, /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/) || password === null || password.value === '') {
    submit.classList.add('disabled');
  } else {
    submit.classList.remove('disabled');
  }
}

function submitForm(e) {
  e.preventDefault();
  
  if (email === null || VSFun.errorString(email.value, /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/) || password === null || password.value === '') {
    return 0;
  }
  
  VSApi.fetchAPI({
    method: 'POST',
    url: 'http://quantified-self-api.azurewebsites.net/api/Auth/Token',
    contentType: 'application/json',
    crossDomain: true,
    data: {
      'Email': email.value,
      'Password': password.value
      // 'Password': btoa('asdf:' + password.value + ':asdf')
    },
    getFullResponse: true
  }).then(res => {
    if (res.ok) {
      res.json().then(res => {
        VSLocalStorage.clear('AuthToken');
        VSLocalStorage.add('AuthToken', { [email.value]: res });
        VSLocalStorage.clear('Logs');
        VSLocalStorage.add('Logs', { 'user': email.value });
        window.location = 'index.html';
      });
    } else {
      res.json().then(res => {
        M.toast({ html: res });
      });
    }
  });
}