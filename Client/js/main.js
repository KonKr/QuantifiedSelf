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

'use strict';

$(document).foundation();

let sessionData;
let curObj;
let options = {}, holdData = {};
let dictionary = {
  "steps": "Steps",
  "distance": "Distance",
  "floors": "Floors",
  "elevation": "Elevation",
  "calories": "Calories",
  "minutesSedentary": "Minutes Sedentary",
  "minutesLightlyActive": "Minutes \"lightly\" actice",
  "minutesFairlyActive": "Minutes \"fairly\" actice",
  "minutesVeryActive": "Minutes \"very\" actice",
  "startTime": "Start time",
  "timeInBed": "Time in bed",
  "minutesAsleep": "Minutes asleep",
  "awakeningsCount": "Awakenings count",
  "minutesAwake": "Minutes awake",
  "minutesToFallAsleep": "Minutes to fall asleep",
  "minutesAfterWakeup": "Minutes after wakeup",
  "efficiency": "Efficiency",
  "weight": "Weight",
  "bmi": "BMI",
  "fat": "Fat"
};

class ChartObject {
  constructor() {
    let args = Array.from(arguments)[0];

    for (let o in args) {
      this[o] = args[o];
    }
  }
}

// const loader = document.querySelector('.loader');
const main = document.querySelector('#main');
const navLinks = document.querySelectorAll('.menu a');
// const fixedBtn = document.querySelector('#fxBtn').childNodes;
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

window.onload = () => {
  navLinks.forEach(nav => {
    nav.addEventListener('click', (e) => {
      if (e.target.classList.length === 1 && typeof dictionary[e.target.classList.value] !== 'undefined') {
        if (typeof holdData[e.target.classList] === 'undefined') {
          getData(e.target.classList);
        } else {

        }
      }
    });
  });

  document.querySelector('.logout').addEventListener('click', logOut);

  getData();
};

// logout
function logOut() {
  let user = VSLocalStorage.find('Logs', 'user');
  if (user !== false) {
    VSLocalStorage.remove('AuthToken', user.user);
    VSLocalStorage.clear('Logs');
    window.location = 'login.html';
  }
}

// random number
function randomNumber(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

// get random data
function randData(min, max, index) {
  let arr = [];
  for (let i=0; i<index; i++) {
    arr.push(randomNumber(min, max));
  }
  return arr;
}

// get days
function days(num) {
  let str = '';
  for (let i = 0; i < num; i++) {
    if (i < 10)
      str += String('0'+i);
    else
      str += String(i);
    i+1 < num ? str += ',' : str += '';
  }
  return str;
}

function lastNDays(num, dateFormat) {
  // return days(num).split(',').map((n) => {
  //   let d = new Date();
  //   d.setDate(d.getDate() - n);
  //   d.setHours(01,00,00);
  //   d = new Date(d).toISOString();
  //   return d;
    
  //   // return ((day, month, year) => { return [day<10 ? '0'+day : day, month<10 ? '0'+month : month, year].join('/'); })(d.getDate(), d.getMonth()+1, d.getFullYear());
  // });
}

function initChartObject(obj) {
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

function initChart(variableToGet, rowsToExpect) {
  options = {
    label: dictionary[variableToGet],
    borderColor: ['rgba(240,240,240,1)'],
    labelString: variableToGet,
    pointRadius: 5,
    dataLabels: holdData[variableToGet][rowsToExpect]['date'],
    data: holdData[variableToGet][rowsToExpect]['optionsData']
  }

  let i = randomNumber(1, 3);
  if (i % 3 === 0) {
    options.backgroundColor = ['rgba(255, 128, 0, 1)'];
  } else if (i % 3 === 1) {
    options.backgroundColor = ['rgba(0, 255, 128, 1)'];
  } else if (i % 3 === 2) {
    options.backgroundColor = ['rgba(128, 0, 255, 1)'];
  }

  curObj = new ChartObject(initChartObject(options));
}

function getData(variableToGet = 'calories', rowsToExpect = 20) {
  if (typeof holdData[variableToGet] === 'undefined' || typeof holdData[variableToGet][rowsToExpect] === 'undefined') {
    VSApi.fetchAPI({
      method: 'GET',
      // url: 'js/todd.json',
      url: `http://quantified-self-api.azurewebsites.net/api/Data?rowsToExpect=${rowsToExpect}&variableToGet=${variableToGet}`,
      authorization: `Bearer ${auth[0][auth['user']]}`
    }).then(res => {
      if (res.status === 401) {
        logOut();
      } else if (res.status === 200) {
        res.json().then(res => {
          holdData[variableToGet] = {};
          holdData[variableToGet][rowsToExpect] = {};
          holdData[variableToGet][rowsToExpect]['date'] = [];
          holdData[variableToGet][rowsToExpect]['optionsData'] = [];

          res.forEach(data => {
            holdData[variableToGet][rowsToExpect]['date'].push(Date.parse(data.requestedVariable_Date));
            holdData[variableToGet][rowsToExpect]['optionsData'].push(data.requestedVariable_Value);
          });
          
          initChart(variableToGet, rowsToExpect);
        });
      } else {
        res.json().then(res => {
          console.alert(res);
        });
      }
    });
  } else {
    initChart(variableToGet, rowsToExpect);
  }
}