// // fetch post data
// let user = {
//   Username: "Ben",
//   Password: "pass"
// }
// fetch('http://thleiatrikh.azurewebsites.net/api/GetUser', {
//   body: JSON.stringify(user),
//   headers: new Headers({
//     'Authorization': 'Basic ' + btoa(token),
//     'content-type': 'application/json'
//   }),
//   method: 'POST'
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// });
// VSApi.fetchAPI({
//   method: 'GET',
//   url: 'http://quantified-self-api.azurewebsites.net/api/Data',
//   authorization: `Bearer ${auth[0][auth['user']]}`
// }).then(res => {
//   if (res.ok) {
//     res.json().then(res => {
//       console.log(res);
//     });
//   } else {
//     res.json().then(res => {
//       M.toast({ html: res });
//     });
//   }
// });
let sessionData;
let curObj;
let options = {};

VSApi.fetchAPI({
  method: 'GET',
  url: 'js/todd.json'
}).then(res => {
  if (res.ok) {
    res.json().then(res => {
      sessionData = res;
      let optionsData = {};
      let date = [];

      sessionData.forEach(data => {
        Object.keys(data).forEach(key => {
          if (key !== 'date') {
            if (typeof optionsData[key] === 'undefined') {
              optionsData[key] = [];
            }
            optionsData[key].push(data[key])
          } else {
            date.push(data[key]);
          }
        });
      });

      Object.keys(sessionData[0]).forEach((key, i) => {
        if (key !== 'date') {
          options[key] = {
            label: key,
            borderColor: ['rgba(240,240,240,1)'],
            labelString: key,
            pointRadius: 5,
            dataLabels: date,
            data: optionsData[key]
          }
          if (i % 3 === 0) {
            options[key].backgroundColor = ['rgba(255, 128, 0, 1)'];
          } else if (i % 3 === 1) {
            options[key].backgroundColor = ['rgba(0, 255, 128, 1)'];
          } else if (i % 3 === 2) {
            options[key].backgroundColor = ['rgba(128, 0, 255, 1)'];
          }
        }
      });

      curObj = new ChartObject(initChart(options['steps']))
    });
  } else {
    res.json().then(res => {
      M.toast({ html: res });
    });
  }
});

class ChartObject {
  constructor() {
    let args = Array.from(arguments)[0];

    for (let o in args) {
      this[o] = args[o];
    }
  }
}

const loader = document.querySelector('.loader');
const main = document.getElementsByTagName('main')[0];
const navLinks = document.querySelectorAll('.naaaaaaaaaaav li a');
const fixedBtn = document.querySelector('#fxBtn').childNodes;
const dateFormat = 'DD MMMM';

let myChart;

const chart = document.querySelector('#myChart');
const cfg = {
  type: 'line',
  data: {
    // labels: labels,
    datasets: [{
      // label: 'Heart Rate',
      // data: data,
      pointRadius: 5,
      // backgroundColor: [
      //   'rgba(255, 128, 0, 1)'
      // ],
      borderWidth: 2,
      // borderColor: [
      //   'rgba(240,240,240,1)',
      //   // 'rgba(54, 162, 235, 1)',
      //   // 'rgba(255, 206, 86, 1)',
      //   // 'rgba(75, 192, 192, 1)',
      //   // 'rgba(153, 102, 255, 1)',
      //   // 'rgba(255, 159, 64, 1)'
      // ],
      lineTension: 0.17,
      layout: {
        padding: 5
      },
      spanGaps: true,
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        // ticks: {
        //   source: 'labels'
        // }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Heart Rate (bpm)',
          stacked: false
        },
        ticks: {
          min: 0,
          max: 100
        }
      }]
    },
    // legend: {
    //   reverse: true
    // }
  }
};


// loading screen on load
window.onload = () => {
  loader.classList.add('fade');
  main.setAttribute('style', 'display: flex !important');
  window.setTimeout(() => loader.remove(), 1000);

  // init vars
  // change tab/card
  navLinks.forEach(nav => {
    nav.addEventListener('click', (e) => {
      if (e.target.classList.contains('logout')) {
        let user = VSLocalStorage.find('Logs', 'user');
        if (user !== false) {
          VSLocalStorage.remove('AuthToken', user.user);
          VSLocalStorage.clear('Logs');
          window.location = 'login.html';
        }
        return 0;
      }

      if (e.target.classList !== null && typeof options[e.target.classList] !== 'undefined') {
        options[e.target.classList].label = e.target.textContent;
        options[e.target.classList].labelString = e.target.textContent;
        curObj = new ChartObject(initChart(options[e.target.classList]));
        console.log(options[e.target.classList]);

      }
    });
  });

  // console.log(lastNDays(total));

  // init chart

  fixedBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
      switch (e.target.id) {
        case 'flWeek':
          curObj.total = 7;
          curObj.pointRadius = 5;
          break;
        case 'flMonth':
          curObj.total = 30;
          curObj.pointRadius = 5;
          break;
        case 'flYear':
          curObj.total = 365;
          curObj.pointRadius = 1;
          break;
      }

      curObj = new ChartObject(initChart(curObj));
    });
  });

  M.AutoInit();

  // // header
  // let elems = document.querySelectorAll('.sidenav');
  // let options = { closeOnClick: false, draggable: true };
  // let instances = M.Sidenav.init(elems, options);

  // // toolbar
  // elems = document.querySelectorAll('.fixed-action-btn');
  // options = {
  //   direction: 'top',
  //   hoverEnabled: false
  // }
  // instances = M.FloatingActionButton.init(elems, options);

  // // dropdown
  // elems = document.querySelectorAll('.dropdown-trigger');
  // options = { 
  //   hover: false
  // };
  // instances = M.Dropdown.init(elems, options);

  collapsible = M.Collapsible.getInstance(document.querySelector('.collapsible'));
  collapsible.options.onOpenStart = (el) => {
    el.children[0].children[0].textContent = 'arrow_drop_down';
  }
  collapsible.options.onCloseStart = (el) => {
    el.children[0].children[0].textContent = 'arrow_right';
  }
};


// let elem = document.querySelector('dropdown-trigger');
// let instance = M.Dropdown.getInstance(elem);
// instance.open();




// random number
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// get random data
function randData(min, max, index) {
  let arr = [];
  for (let i = 0; i < index; i++) {
    arr.push(randomNumber(min, max));
  }
  return arr;
}

// get days
function days(num) {
  let str = '';
  for (let i = 0; i < num; i++) {
    if (i < 10)
      str += String('0' + i);
    else
      str += String(i);
    i + 1 < num ? str += ',' : str += '';
  }
  return str;
}

function lastNDays(num, dateFormat) {
  return days(num).split(',').map((n) => {
    let d = new Date();
    d.setDate(d.getDate() - n);
    d.setHours(01, 00, 00);
    d = new Date(d).toISOString();
    return d;

    // return ((day, month, year) => { return [day<10 ? '0'+day : day, month<10 ? '0'+month : month, year].join('/'); })(d.getDate(), d.getMonth()+1, d.getFullYear());
  });
}

function initChart(obj) {
  cfg.data.datasets[0].label = obj.label;
  cfg.data.datasets[0].backgroundColor = obj.backgroundColor;
  cfg.data.datasets[0].borderColor = obj.borderColor;
  cfg.options.scales.yAxes[0].scaleLabel.labelString = obj.labelString;
  cfg.options.scales.yAxes[0].ticks.min = obj.ticksMin;
  cfg.options.scales.yAxes[0].ticks.max = obj.ticksMax;
  cfg.data.datasets[0].pointRadius = obj.pointRadius;

  // cfg.data.labels = lastNDays(obj.total, dateFormat);
  // cfg.data.datasets[0].data = randData(obj.minNum, obj.maxNum, obj.total);
  cfg.data.labels = obj.dataLabels;
  cfg.data.datasets[0].data = obj.data;

  if (typeof myChart !== 'undefined') {
    myChart.destroy();
  }
  myChart = new Chart(chart, cfg);

  return obj;
}

