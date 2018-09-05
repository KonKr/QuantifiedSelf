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

const main = document.querySelector('#main');
const nav = document.querySelector('#offCanvas');
const dateFormat = 'DD MMMM';

let myChart;

const chart = document.querySelector('#myChart');
const spinner = document.querySelector('#spinner');
let refreshInterval = '';

window.onload = () => {
  nav.addEventListener('click', (e) => {
    if (e.target.classList.length === 1 &&
      (e.target.classList.value === 'graph' || e.target.classList.value === 'setupTime') &&
      (e.target.hasAttribute('data-name') || e.target.hasAttribute('data-id'))) {
      if (e.target.classList.value === 'graph' && e.target.hasAttribute('data-name')) {
        if (typeof dictionary[e.target.getAttribute('data-name')] !== 'undefined') {
          getData(e.target.getAttribute('data-name'));
        }
      } else if (e.target.classList.value === 'setupTime' && e.target.hasAttribute('data-id')) {
        VSLocalStorage.edit('Logs', 'rowsToExpect', parseInt(e.target.getAttribute('data-id')));
        getData();
      }
    }
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

function destroyLoader() {
  clearInterval(refreshInterval);
  spinner.style.display = 'none';
}
function setLoader() {
  spinner.style.display = 'block';
  if (!VSFun.errorNum(refreshInterval, 0, 9999999)) {
    destroyLoader();
  }
  refreshInterval = setInterval(() => MotionUI.animateIn(spinner, 'spinIn'), 850);
}

function initChartObject(opt) {
  let cfg = {
    type: 'line',
    data: {
      labels: opt.dataLabels
    }
  };
  
  cfg.data.datasets = [];
  cfg.options = {};
  cfg.options.scales = {};
  cfg.options.scales.xAxes = [];
  cfg.options.scales.yAxes = [];
  cfg.options.scales.xAxes.push({});
  cfg.options.scales.yAxes.push({});

  opt.data.forEach(d => {
    d.forEach((obj, i) => {
      cfg.data.datasets.push({});
      cfg.data.datasets[i].label = opt.label[i];
      cfg.data.datasets[i].backgroundColor = opt.backgroundColor[i];
      cfg.data.datasets[i].borderColor = opt.borderColor[i];
      cfg.data.datasets[i].pointRadius = opt.pointRadius;
      cfg.data.datasets[i].borderWidth = 2;
      cfg.data.datasets[i].lineTension = 0.17;
      cfg.data.datasets[i].spanGaps = false;
      cfg.data.datasets[i].layout = {};
      cfg.data.datasets[i].layout.padding = 5;
      cfg.data.datasets[i].data = obj;
      cfg.options.scales.xAxes[0].type = 'time';
      cfg.options.scales.xAxes[0].distribution = 'series';
      cfg.options.scales.yAxes[0].scaleLabel = {};
      cfg.options.scales.yAxes[0].scaleLabel.labelString = opt.labelString;
      cfg.options.scales.yAxes[0].scaleLabel.display = true;
      cfg.options.scales.yAxes[0].scaleLabel.stacked = false;
      cfg.options.scales.yAxes[0].ticks = {};
      cfg.options.scales.yAxes[0].ticks.min = opt.ticksMin;
      cfg.options.scales.yAxes[0].ticks.max = opt.ticksMax;
      if (i) {
        cfg.data.datasets[i].showLine = true;
      } else {
        cfg.data.datasets[i].showLine = false;
      }
    });
  });

  myChart = new Chart(chart, cfg);

  return opt;
}

function initChart(variableToGet, rowsToExpect) {
  options = {
    label: [
      dictionary[variableToGet] + ' with anomaly detected',
      dictionary[variableToGet],
    ],
    borderColor: [
      ['rgba(255,0,0,1)'],
      ['rgba(240,240,240,1)'],
    ],
    labelString: variableToGet,
    pointRadius: 5,
    dataLabels: holdData[variableToGet][rowsToExpect]['date'],
    data: [
      [
        holdData[variableToGet][rowsToExpect]['optionsData']['wAnomaly'],
        holdData[variableToGet][rowsToExpect]['optionsData']['woAnomaly'],
      ]
    ]
  }

  let i = VSFun.getRandomNum(0, 3);
  options.backgroundColor = [];
  options.backgroundColor.push(['rgba(0, 0, 0, 0)']);
  if (i % 3 === 0) {
    options.backgroundColor.push(['rgba(0, 128, 255, 1)']);
  } else if (i % 3 === 1) {
    options.backgroundColor.push(['rgba(0, 255, 128, 1)']);
  } else if (i % 3 === 2) {
    options.backgroundColor.push(['rgba(128, 0, 255, 1)']);
  }

  curObj = new ChartObject(initChartObject(options));
}

function initHoldData(res, variableToGet, rowsToExpect) {
  holdData[variableToGet] = {};
  holdData[variableToGet][rowsToExpect] = {};
  holdData[variableToGet][rowsToExpect]['date'] = [];
  holdData[variableToGet][rowsToExpect]['optionsData'] = [];
  holdData[variableToGet][rowsToExpect]['optionsData']['wAnomaly'] = [];
  holdData[variableToGet][rowsToExpect]['optionsData']['woAnomaly'] = [];

  res.forEach(data => {
    holdData[variableToGet][rowsToExpect]['date'].push(Date.parse(data.requestedVariable_Date));
    if (data.anomalyDetected) {
      holdData[variableToGet][rowsToExpect]['optionsData']['wAnomaly'].push(data.requestedVariable_Value);
      holdData[variableToGet][rowsToExpect]['optionsData']['woAnomaly'].push(data.requestedVariable_Value);
    } else {
      holdData[variableToGet][rowsToExpect]['optionsData']['woAnomaly'].push(data.requestedVariable_Value);
      holdData[variableToGet][rowsToExpect]['optionsData']['wAnomaly'].push(null);
    }
  });
}

function getData(variableToGet = 'calories') {
  if (typeof myChart !== 'undefined') {
    myChart.destroy();
  }

  setLoader();
  
  let rowsToExpect = 20;
  if (VSLocalStorage.find('Logs', 'rowsToExpect')) {
    rowsToExpect = VSLocalStorage.find('Logs', 'rowsToExpect');
    rowsToExpect = rowsToExpect.rowsToExpect;
  } else {
    VSLocalStorage.add('Logs', { 'rowsToExpect': rowsToExpect });
  }

  if (typeof holdData[variableToGet] === 'undefined' || typeof holdData[variableToGet][rowsToExpect] === 'undefined') {
    VSApi.fetchAPI({
      method: 'GET',
      url: `http://quantified-self-api.azurewebsites.net/api/Data?rowsToExpect=${rowsToExpect}&variableToGet=${variableToGet}`,
      authorization: `Bearer ${auth[0][auth['user']]}`
    }).then(res => {
      if (res.status === 401) {
        logOut();
      } else if (res.status === 200) {
        res.json().then(res => {
          initHoldData(res, variableToGet, rowsToExpect);
          initChart(variableToGet, rowsToExpect);
          destroyLoader();
        }).catch(res => {
          console.log(res);
          
        });
      } else {
        res.json().then(res => {
          console.warning(res);
        });
      }
    });
  } else {
    initChart(variableToGet, rowsToExpect);
    destroyLoader();
  }
}