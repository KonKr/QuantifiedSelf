'use strict';

$(document).foundation();

let sessionData;
let curObj;
let options = {}, holdData = {}, dataLabel = [];
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

let myChart;

const chart = document.querySelector('#myChart');
const spinner = document.querySelector('#spinner');
const clearButton = document.querySelector('.clearButton');
const saveButton = document.querySelector('.saveButton');
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

  $('#dp1').fdatepicker({
    format: 'dd-mm-yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
    closeIcon: 'X',
    closeButton: true
  });

  $('#dp2').fdatepicker({
    format: 'dd-mm-yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
    closeButton: true
  });

  clearButton.addEventListener('click', () => {
    $('#dp1').val('');
    $('#dp2').val('');
  });
  saveButton.addEventListener('click', () => {
    getData();
  });
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
      if (i <= 1) {
        cfg.data.datasets[i].fill = false;
      } else {
        cfg.data.datasets[i].fill = true;
      }
      cfg.options.scales.xAxes[0].type = 'time';
      cfg.options.scales.xAxes[0].distribution = 'series';
      cfg.options.scales.yAxes[0].scaleLabel = {};
      cfg.options.scales.yAxes[0].scaleLabel.labelString = opt.labelString;
      cfg.options.scales.yAxes[0].scaleLabel.display = true;
      cfg.options.scales.yAxes[0].scaleLabel.stacked = false;
      cfg.options.scales.yAxes[0].ticks = {};
      cfg.options.scales.yAxes[0].ticks.min = opt.ticksMin;
      cfg.options.scales.yAxes[0].ticks.max = opt.ticksMax;
      if (i == 2) {
        cfg.data.datasets[i].showLine = false;
        cfg.options.tooltips = {};
        cfg.options.tooltips.mode = 'index';
        cfg.options.tooltips.footerFontStyle = 'normal';
        cfg.options.tooltips.callbacks = {};
        cfg.options.tooltips.callbacks.footer = function (tooltipItems, data) {
          return dataLabel[tooltipItems[2].index];
        };
      } else {
        cfg.data.datasets[i].showLine = true;
      }
    });
  });

  myChart = new Chart(chart, cfg);

  return opt;
}

function initChart(variableToGet, rowsToExpect) {
  options = {
    label: [
      'Upper Bound',
      'Lower Bound',
      dictionary[variableToGet] + ' with anomaly detected',
      dictionary[variableToGet],
    ],
    borderColor: [
      ['rgba(53,53,53,0.5)'],
      ['rgba(53,53,53,0.3)'],
      ['rgba(255,0,0,1)'],
      ['rgba(240,240,240,1)'],
    ],
    labelString: variableToGet,
    pointRadius: 5,
    dataLabels: holdData[variableToGet][rowsToExpect]['date'],
    data: [
      [
        holdData[variableToGet][rowsToExpect]['optionsData']['upperBound'],
        holdData[variableToGet][rowsToExpect]['optionsData']['lowerBound'],
        holdData[variableToGet][rowsToExpect]['optionsData']['wAnomaly'],
        holdData[variableToGet][rowsToExpect]['optionsData']['woAnomaly'],
      ]
    ]
  }

  let i = VSFun.getRandomNum(0, 3);
  options.backgroundColor = [['rgba(0, 0, 0, 0)'], ['rgba(0, 0, 0, 0)'], ['rgba(0, 0, 0, 0)']];
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
  holdData[variableToGet][rowsToExpect]['optionsData']['upperBound'] = [];
  holdData[variableToGet][rowsToExpect]['optionsData']['lowerBound'] = [];

  res.forEach(data => {
    // anomalyDetected: true
    // anomalyDetected_Neg: false
    // anomalyDetected_Pos: true
    // expectedValue: 2877.421963162911
    // lowerLimit: 2733.5508650047655
    // requestedVariable_Date: "10/22/2011 12:00:00 AM"
    // requestedVariable_Value: 3559
    // upperLimit: 3021.293061321057

    let date = Date.parse(data.requestedVariable_Date);
    holdData[variableToGet][rowsToExpect]['date'].push(date);

    holdData[variableToGet][rowsToExpect]['optionsData']['upperBound'].push(data.upperLimit);
    holdData[variableToGet][rowsToExpect]['optionsData']['lowerBound'].push(data.lowerLimit);

    holdData[variableToGet][rowsToExpect]['optionsData']['woAnomaly'].push(data.requestedVariable_Value);
    holdData[variableToGet][rowsToExpect]['optionsData']['wAnomaly'].push(data.anomalyDetected ? data.requestedVariable_Value : null);
    let trend;
    if (data.anomalyDetected_Neg) {
      trend = 'negative';
    } else if (data.anomalyDetected_Pos) {
      trend = 'positive';
    }
    dataLabel.push(data.anomalyDetected ? `Anomaly detected with ${trend} trend. Expected value was ${data.expectedValue}` : null);
  });
}

function getData(variableToGet = 'calories') {
  if (typeof myChart !== 'undefined') {
    myChart.destroy();
  }

  setLoader();
  
  let rowsToExpect = 12;
  let url = `http://quantified-self-api.azurewebsites.net/api/Data`;
  let dateSpan = false;
  if ($('#dp1').val() !== '' && $('#dp2').val() !== '') {
    let from = $('#dp1').val();
    let to = $('#dp2').val();

    dateSpan = true;
    url += `?variableToGet=${variableToGet}&dateToStart=${from}&dateToFinish=${to}`;
  } else {
    if (VSLocalStorage.find('Logs', 'rowsToExpect')) {
      rowsToExpect = VSLocalStorage.find('Logs', 'rowsToExpect');
      rowsToExpect = rowsToExpect.rowsToExpect;
    } else {
      VSLocalStorage.add('Logs', { 'rowsToExpect': rowsToExpect });
    }

    dateSpan = false;
    url += `?rowsToExpect=${rowsToExpect}&variableToGet=${variableToGet}`;
  }

  if ((typeof holdData[variableToGet] === 'undefined' || typeof holdData[variableToGet][rowsToExpect] === 'undefined') || dateSpan) {
    VSApi.fetchAPI({
      method: 'GET',
      url: url,
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
          M.toast({ html: res, displayLength: 5000 });
        });
      } else {
        res.json().then(res => {
          M.toast({ html: res, displayLength: 5000 });
        });
        // setTimeout(() => logOut(), 3000);
      }
    });
  } else {
    initChart(variableToGet, rowsToExpect);
    destroyLoader();
  }
}