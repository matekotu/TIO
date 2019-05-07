/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Helper() {
        _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [{
        key: 'print',
        value: function print() {
            var description = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (!object) {
                console.log(description);
                return;
            }

            var copy = JSON.parse(JSON.stringify(object));
            console.log(description + ':\n', copy);
        }
    }, {
        key: 'getAdaptationValueFromIndyvidualsMatrix',
        value: function getAdaptationValueFromIndyvidualsMatrix(indyvidualsMatrix) {
            var adaptationValuesMatrix = [];

            indyvidualsMatrix.forEach(function (indyvidualsTab) {
                var adaptationValues = [];
                indyvidualsTab.forEach(function (indyvidual) {
                    var adaptationValue = indyvidual == 0 ? 0 : indyvidual.adaptationValue;
                    adaptationValues.push(adaptationValue);
                });
                adaptationValuesMatrix.push(adaptationValues);
            });

            return adaptationValuesMatrix;
        }
    }, {
        key: 'findBestIndyvidualAndSettingFromMatrix',
        value: function findBestIndyvidualAndSettingFromMatrix(indyvidualsMatrix, settingsTab) {
            var bestIndyvidual = null;
            var row = null;

            indyvidualsMatrix.forEach(function (indyvidualsTab, index) {
                var bestTabIndyvidual = indyvidualsTab.find(function (indyvidual) {
                    return indyvidual != 0 && !indyvidual.oversize;
                });

                if (bestTabIndyvidual) {
                    indyvidualsTab.forEach(function (indyvidual) {
                        if (!indyvidual.oversize && indyvidual.adaptationValue > bestTabIndyvidual.adaptationValue) {
                            bestTabIndyvidual = indyvidual;
                            row = index;
                        }
                    });

                    if (!bestIndyvidual) {
                        bestIndyvidual = bestTabIndyvidual;
                    } else if (bestTabIndyvidual.adaptationValue > bestIndyvidual.adaptationValue) {
                        bestIndyvidual = bestTabIndyvidual;
                    }
                }
            });

            var result = {
                bestIndyvidual: bestIndyvidual,
                bestSetting: settingsTab[row]
            };

            return result;
        }
    }, {
        key: 'createChartSettings',
        value: function createChartSettings(maxXAxeValue, yValuesMatrix) {
            var labelsData = [];
            var datasetsData = [];
            var colors = ['#ff0000', '#00ff00', '#0000ff', '#3e95cd', '#8e5ea2'];

            for (var i = 0; i <= maxXAxeValue; i++) {
                labelsData.push(i);
            }

            yValuesMatrix.forEach(function (resultsNumber, index) {
                var datasets = {
                    data: [],
                    label: 'S' + (index + 1),
                    borderColor: index < colors.length ? colors[index] : Helper.generateHexColor(),
                    fill: false
                };

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = resultsNumber[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var result = _step.value;

                        datasets.data.push(result);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                datasetsData.push(datasets);
            });

            return {
                labelsData: labelsData,
                datasetsData: datasetsData
            };
        }
    }, {
        key: 'generateHexColor',
        value: function generateHexColor() {
            return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();;
        }
    }, {
        key: 'drawLineChart',
        value: function drawLineChart(ctx, chartSettings) {
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartSettings.labelsData,
                    datasets: chartSettings.datasetsData
                },
                options: {
                    title: {
                        display: true,
                        text: 'Wyniki'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                // min: 0,// todo, sparametryzowac
                                // max: 1300,
                                stepSize: 100
                            }
                        }]
                    }
                }
            });
        }
    }]);

    return Helper;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CuckooSearchAlgorithm = __webpack_require__(2);
var GeneticAlgorithm = __webpack_require__(8);
var Helper = __webpack_require__(0);

var immutableSettings = void 0;
var mutableSettingsTab = [];
var settings = {
    geneticAlgorithmSettingsTab: [],
    cuckooSearchAlgorithmSettingsTab: []
};
var items = void 0;

window.onload = function () {
    addEventListeners();
};

var addEventListeners = function addEventListeners() {
    addEventListenerToInputFileButton();
    addEventListenerToAddSettingsButtons();
    addEventListenerToAddRandomSettingsButton();
    addEventListenerToResetSettingsButton();
    addEventListenerToStartButton();
};

var addEventListenerToInputFileButton = function addEventListenerToInputFileButton() {
    var inputElement = document.getElementsByName('file')[0];
    inputElement.addEventListener('change', loadInputFile);
};

var loadInputFile = function loadInputFile() {
    var inputElement = document.getElementsByName('file')[0];
    var loadedFile = inputElement.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function () {
        try {
            items = JSON.parse(fileReader.result);
        } catch (error) {
            alert('loading file went wrong!');
            alert(error);
        }
    };
    fileReader.readAsText(loadedFile);
};

var addEventListenerToAddSettingsButtons = function addEventListenerToAddSettingsButtons() {
    document.getElementById('addGASettingsButton').addEventListener('click', addGASettings);
    document.getElementById('addCSASettingsButton').addEventListener('click', addCSASettings);
};

var addGASettings = function addGASettings() {
    var selectionMethod = document.getElementsByName('selectionMethod')[0].value;
    var tournamentGroupSize = document.getElementsByName('tournamentGroupSize')[0].value;
    var crossingMethod = document.getElementsByName('crossingMethod')[0].value;
    var elitism = document.getElementsByName('elitism')[0].checked;
    var crossingProbability = document.getElementsByName('crossingProbability')[0].value;
    var mutationProbability = document.getElementsByName('mutationProbability')[0].value;
    var inversionProbability = document.getElementsByName('inversionProbability')[0].value;

    var settings = {
        algorithm: 'genetic',
        selectionMethod: selectionMethod,
        tournamentGroupSize: tournamentGroupSize,
        crossingMethod: crossingMethod,
        elitism: elitism,
        crossingProbability: crossingProbability,
        mutationProbability: mutationProbability,
        inversionProbability: inversionProbability
    };

    if (checkGAMutableSettingsCorrectness(settings)) {
        mutableSettingsTab.push(settings);
        addSettingsToTable(settings);
    } else {
        alert('mutable settings are NOT correct');
    }
};

var addCSASettings = function addCSASettings() {
    var scale = document.getElementsByName('scale')[0].value;
    var abandonmentProbability = document.getElementsByName('abandonmentProbability')[0].value;

    var settings = {
        algorithm: 'cuckoo search',
        scale: scale,
        abandonmentProbability: abandonmentProbability
    };

    if (checkCSAMutableSettingsCorrectness(settings)) {
        mutableSettingsTab.push(settings);
        addSettingsToTable(settings);
    } else {
        alert('mutable settings are NOT correct');
    }
};

var checkGAMutableSettingsCorrectness = function checkGAMutableSettingsCorrectness(settings) {
    if (settings.selectionMethod === 'tournament' && (!Number.isInteger(parseInt(settings.tournamentGroupSize)) || !(settings.tournamentGroupSize > 0))) {
        return false;
    }

    return settings.crossingProbability != '' && settings.crossingProbability >= 0 && settings.crossingProbability <= 1 && settings.mutationProbability != '' && settings.mutationProbability >= 0 && settings.mutationProbability <= 1 && settings.inversionProbability != '' && settings.inversionProbability >= 0 && settings.inversionProbability <= 1;
};

var checkCSAMutableSettingsCorrectness = function checkCSAMutableSettingsCorrectness(settings) {
    return settings.scale != '' && settings.scale > 0 && settings.abandonmentProbability != '' && settings.abandonmentProbability >= 0 && settings.abandonmentProbability <= 1;
};

//ugly, but working
var addSettingsToTable = function addSettingsToTable(settings) {
    if (settings.selectionMethod != 'tournament') {
        settings.tournamentGroupSize = '';
    }
    var table = document.getElementById('settingsTable');
    var tableBody = table.children[1];
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = 'S' + mutableSettingsTab.length;
    tr.appendChild(td);

    if (settings.algorithm === 'genetic') {
        for (var prop in settings) {
            var _td = document.createElement('td');
            _td.innerHTML = settings[prop];
            _td.setAttribute('class', 'text-center');
            tr.appendChild(_td);
        }
        var td1 = document.createElement('td');
        td1.setAttribute('class', 'text-center');
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.setAttribute('class', 'text-center');
        tr.appendChild(td2);
    } else if (settings.algorithm === 'cuckoo search') {
        var _td2 = document.createElement('td');
        _td2.innerHTML = settings.algorithm;
        _td2.setAttribute('class', 'text-center');
        tr.appendChild(_td2);

        for (var i = 0; i < 7; i++) {
            var _td4 = document.createElement('td');
            if (i === 3) {
                _td4.innerHTML = 'true';
            }
            _td4.setAttribute('class', 'text-center');
            tr.appendChild(_td4);
        }

        var _td3 = document.createElement('td');
        _td3.innerHTML = settings.scale;
        _td3.setAttribute('class', 'text-center');
        tr.appendChild(_td3);

        var td3 = document.createElement('td');
        td3.innerHTML = settings.abandonmentProbability;
        td3.setAttribute('class', 'text-center');
        tr.appendChild(td3);
    }
    tableBody.appendChild(tr);
};

var addEventListenerToAddRandomSettingsButton = function addEventListenerToAddRandomSettingsButton() {
    document.getElementById('addGARandomSettingsButton').addEventListener('click', addGARandomSettings);
    document.getElementById('addCSARandomSettingsButton').addEventListener('click', addCSARandomSettings);
};

var addGARandomSettings = function addGARandomSettings() {
    var selectionMethods = ['roulette wheel', 'tournament', 'random'];
    var crossingMethods = ['one point', 'two point', 'evenly', 'arithmetic'];
    var selectionMethod = selectionMethods[Math.floor(Math.random() * selectionMethods.length)];
    var tournamentGroupSize = selectionMethod === 'tournament' ? Math.ceil(2 + Math.random() * 5) : 0;
    var crossingMethod = crossingMethods[Math.floor(Math.random() * crossingMethods.length)];
    var elitism = Math.random() > 0.5;
    var crossingProbability = Math.random().toString().slice(0, 4);
    var mutationProbability = Math.random().toString().slice(0, 4);
    var inversionProbability = Math.random().toString().slice(0, 4);

    var settings = {
        algorithm: 'genetic',
        selectionMethod: selectionMethod,
        tournamentGroupSize: tournamentGroupSize,
        crossingMethod: crossingMethod,
        elitism: elitism,
        crossingProbability: crossingProbability,
        mutationProbability: mutationProbability,
        inversionProbability: inversionProbability
    };

    mutableSettingsTab.push(settings);
    addSettingsToTable(settings);
};

var addCSARandomSettings = function addCSARandomSettings() {
    var scale = (3 * Math.random()).toString().slice(0, 4); //losuje z przedzialu <0, 3)
    var abandonmentProbability = Math.random().toString().slice(0, 4);

    var settings = {
        algorithm: 'cuckoo search',
        scale: scale,
        abandonmentProbability: abandonmentProbability
    };

    mutableSettingsTab.push(settings);
    addSettingsToTable(settings);
};

var addEventListenerToResetSettingsButton = function addEventListenerToResetSettingsButton() {
    document.getElementById('resetSettingsButton').addEventListener('click', clearSettingsListAndUpdateSettingsTable);
};

var clearSettingsListAndUpdateSettingsTable = function clearSettingsListAndUpdateSettingsTable() {
    mutableSettingsTab.length = 0;

    var table = document.getElementById('settingsTable');
    var tableBody = table.children[1];
    tableBody.innerHTML = '';
};

var addEventListenerToStartButton = function addEventListenerToStartButton() {
    var startButton = document.getElementById('startButton');
    startButton.addEventListener('click', function () {
        if (checkImmutableSettingsCorrectness()) {
            deleteChartAndCreateNewCanvas();
            createAlgorithmSettingsTab();
            // createTestSettings(); //do testow z kodu, pozniej do usuniecia
            if (settings.geneticAlgorithmSettingsTab.length > 0 || settings.cuckooSearchAlgorithmSettingsTab.length > 0) {
                runAlgorithms();
            } else {
                alert('ops, something was wrong, settings are empty');
            }
        }
    });
};

var checkImmutableSettingsCorrectness = function checkImmutableSettingsCorrectness() {
    if (!checkLoadedFileCorrectness()) {
        alert('loaded file incorrect!');
        return false;
    }

    var knapsackSize = document.getElementsByName('knapsackSize')[0].value;
    var populationSize = document.getElementsByName('populationSize')[0].value;
    var maxIterations = document.getElementsByName('maxIterations')[0].value;
    var sameInitialPopulation = document.getElementsByName('sameInitialPopulation')[0].checked;

    if (Number.isInteger(parseInt(knapsackSize)) && knapsackSize > 0 && Number.isInteger(parseInt(populationSize)) && populationSize > 0 && populationSize % 2 == 0 && Number.isInteger(parseInt(maxIterations)) && maxIterations > 0) {
        var _settings = {
            knapsackSize: knapsackSize,
            populationSize: populationSize,
            maxIterations: maxIterations,
            chromosomeLength: items.length,
            sameInitialPopulation: sameInitialPopulation
        };

        immutableSettings = _settings;

        return true;
    }
    alert('immutable settings incorrect!');

    return false;
};

var checkLoadedFileCorrectness = function checkLoadedFileCorrectness() {
    if (items && items.length > 0) {
        return items.every(function (item) {
            return item.hasOwnProperty('value') && item.value >= 0 && Number.isInteger(item.value) && item.hasOwnProperty('weight') && item.weight >= 0 && Number.isInteger(item.weight);
        });
    }
};

var deleteChartAndCreateNewCanvas = function deleteChartAndCreateNewCanvas() {
    var chartDiv = document.getElementById('chartDiv');
    var canvas = document.getElementById('myChart');
    var canvasId = canvas.getAttribute('id');
    var canvasWidth = canvas.getAttribute('width');
    var canvasHeight = canvas.getAttribute('height');
    canvas.remove();

    var newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', canvasId);
    newCanvas.setAttribute('width', canvasWidth);
    newCanvas.setAttribute('height', canvasHeight);
    chartDiv.appendChild(newCanvas);
};

var createAlgorithmSettingsTab = function createAlgorithmSettingsTab() {
    settings.geneticAlgorithmSettingsTab.length = 0;
    settings.cuckooSearchAlgorithmSettingsTab.length = 0;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = mutableSettingsTab[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mutableSettings = _step.value;

            if (mutableSettings.algorithm === 'genetic') {
                var GAsettings = createGASettings(immutableSettings, mutableSettings);
                settings.geneticAlgorithmSettingsTab.push(GAsettings);
            } else if (mutableSettings.algorithm === 'cuckoo search') {
                var CSAsettings = createCAASettings(immutableSettings, mutableSettings);
                settings.cuckooSearchAlgorithmSettingsTab.push(CSAsettings);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

var createGASettings = function createGASettings(immutableSettings, mutableSettings) {
    return {
        knapsackSize: parseInt(immutableSettings.knapsackSize),
        populationSize: parseInt(immutableSettings.populationSize),
        chromosomeLength: parseInt(immutableSettings.chromosomeLength),
        maxIterations: parseInt(immutableSettings.maxIterations),
        sameInitialPopulation: immutableSettings.sameInitialPopulation,
        selectionMethod: mutableSettings.selectionMethod,
        tournamentGroupSize: parseInt(mutableSettings.tournamentGroupSize),
        crossingMethod: mutableSettings.crossingMethod,
        elitism: mutableSettings.elitism,
        probability: {
            crossing: mutableSettings.crossingProbability,
            mutation: mutableSettings.mutationProbability,
            inversion: mutableSettings.inversionProbability
        }
    };
};

var createCAASettings = function createCAASettings(immutableSettings, mutableSettings) {
    return {
        knapsackSize: parseInt(immutableSettings.knapsackSize),
        populationSize: parseInt(immutableSettings.populationSize),
        chromosomeLength: parseInt(immutableSettings.chromosomeLength),
        maxIterations: parseInt(immutableSettings.maxIterations),
        sameInitialPopulation: immutableSettings.sameInitialPopulation,
        scale: mutableSettings.scale,
        probability: {
            abandonment: mutableSettings.abandonmentProbability
        }
    };
};

// tymczasowo do testow
var createTestSettings = function createTestSettings() {
    var testScale = 1;
    var testSettings = [];

    for (var i = 1; i <= 10; i++) {
        var _settings2 = {
            knapsackSize: parseInt(immutableSettings.knapsackSize),
            populationSize: parseInt(immutableSettings.populationSize),
            chromosomeLength: parseInt(immutableSettings.chromosomeLength),
            maxIterations: parseInt(immutableSettings.maxIterations),
            sameInitialPopulation: immutableSettings.sameInitialPopulation,
            scale: i / 100,
            probability: {
                abandonment: 0.25
            }
        };
        testSettings.push(_settings2);
    }

    settings.cuckooSearchAlgorithmSettingsTab = testSettings;
};

var runAlgorithms = function runAlgorithms() {
    var showResultsInConsole = document.getElementsByName('showConsoleResultsCheckbox')[0].checked;
    var drawChart = document.getElementsByName('drawChartCheckbox')[0].checked;
    var allResultsNumbersMatrix = [];

    if (settings.geneticAlgorithmSettingsTab.length > 0) {
        var start = Date.now();
        var resultsIndyvidualsMatrix = GeneticAlgorithm.test(items, settings.geneticAlgorithmSettingsTab);
        var stop = Date.now();
        var resultsNumberMatrix = Helper.getAdaptationValueFromIndyvidualsMatrix(resultsIndyvidualsMatrix);
        var bestIndyvidualAndSettingFromMatrix = Helper.findBestIndyvidualAndSettingFromMatrix(resultsIndyvidualsMatrix, settings.geneticAlgorithmSettingsTab);
        if (showResultsInConsole) {
            Helper.print('Genetic Algorithm');
            Helper.print('czas [s]', (stop - start) / 1000);
            Helper.print('settings:', settings.geneticAlgorithmSettingsTab);
            Helper.print('wyniki ostateczne (osobniki)', resultsIndyvidualsMatrix);
            Helper.print('wyniki ostateczne (wartości przystosowania osobnikow)', resultsNumberMatrix);
            Helper.print('najlepszy osobnik', bestIndyvidualAndSettingFromMatrix.bestIndyvidual);
            if (bestIndyvidualAndSettingFromMatrix.bestIndyvidual) {
                Helper.print('wartosc przystosowania', bestIndyvidualAndSettingFromMatrix.bestIndyvidual.adaptationValue);
            }
            Helper.print('najlepsze parametry', bestIndyvidualAndSettingFromMatrix.bestSetting);
        }
        allResultsNumbersMatrix = allResultsNumbersMatrix.concat(resultsNumberMatrix);
    }
    if (settings.cuckooSearchAlgorithmSettingsTab.length > 0) {
        var _start = Date.now();
        var _resultsIndyvidualsMatrix = CuckooSearchAlgorithm.test(items, settings.cuckooSearchAlgorithmSettingsTab);
        var _stop = Date.now();
        var _resultsNumberMatrix = Helper.getAdaptationValueFromIndyvidualsMatrix(_resultsIndyvidualsMatrix);
        var _bestIndyvidualAndSettingFromMatrix = Helper.findBestIndyvidualAndSettingFromMatrix(_resultsIndyvidualsMatrix, settings.cuckooSearchAlgorithmSettingsTab);
        if (showResultsInConsole) {
            console.log('##################################################');
            Helper.print('Cuckoo Search Algorithm');
            Helper.print('czas [s]', (_stop - _start) / 1000);
            Helper.print('settings:', settings.cuckooSearchAlgorithmSettingsTab);
            Helper.print('wyniki ostateczne (osobniki - jaja)', _resultsIndyvidualsMatrix);
            Helper.print('wyniki ostateczne (wartości przystosowania osobnikow - jaj)', _resultsNumberMatrix);
            Helper.print('najlepszy osobnik (jajo)', _bestIndyvidualAndSettingFromMatrix.bestIndyvidual);
            if (_bestIndyvidualAndSettingFromMatrix.bestIndyvidual) {
                Helper.print('wartosc przystosowania', _bestIndyvidualAndSettingFromMatrix.bestIndyvidual.adaptationValue);
            }
            Helper.print('najlepsze parametry', _bestIndyvidualAndSettingFromMatrix.bestSetting);
        }
        allResultsNumbersMatrix = allResultsNumbersMatrix.concat(_resultsNumberMatrix);
    }

    if (drawChart) {
        var chartSettings = Helper.createChartSettings(immutableSettings.maxIterations, allResultsNumbersMatrix);
        var ctx = document.getElementById("myChart").getContext('2d');
        Helper.drawLineChart(ctx, chartSettings);
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CuckooPopulation = __webpack_require__(3);
var Helper = __webpack_require__(0);

module.exports = function () {
    function CuckooSearchAlgorithm() {
        _classCallCheck(this, CuckooSearchAlgorithm);
    }

    _createClass(CuckooSearchAlgorithm, null, [{
        key: 'run',
        value: function run(items, settings) {
            var initPopulation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var iteration = 1;
            var results = [];
            //1. tworzymy losowa populacje
            //musimy zrobic kopie, bo operujemy bezposrednio na osobnikach, w genetycznym nie trzeba bylo,
            //bo tam nie zmienialismy osobnikow, jedynie je ocenialismy, pozniejsze zmiany byly na kopiach
            var population = initPopulation ? CuckooPopulation.copyPopulation(initPopulation) : new CuckooPopulation(settings.populationSize, settings.chromosomeLength);
            // Helper.print('populacja poczatkowa', population);

            while (true) {
                //2. oceniamy każdego osobnika (jajo)
                population.rateEggs(items, settings.knapsackSize);
                // Helper.print('osobniki (jaja) populacji ocenione', population);
                results.push(population.findBestEggFromPopulationOrZero());

                //3. sprawdzamy warunek zatrzymania
                if (CuckooSearchAlgorithm.checkStopCondition(iteration, settings.maxIterations)) {
                    // Helper.print('**********', {});
                    // Helper.print('warunek zatrzymania speniony', {});
                    // Helper.print('iteracje wykonane', iteration - 1);
                    // Helper.print('iteracja zastopowana', iteration);
                    // Helper.print('populacja końcowa', population);
                    // Helper.print('**********', {});
                    // population.printSummaryInformation();
                    break;
                }

                //4. tworzymy losowo (z calej populacji) nowe jajo przy uzyciu 'lotow Levy'iego'
                var newEgg = population.createRandomNewEggFromPopulationByLevyFlight(settings.scale, settings.chromosomeLength);

                //5. oceniamy nowe jajo
                CuckooPopulation.rateEgg(newEgg, items, settings.knapsackSize);
                // Helper.print('nowe jajo ocenione', newEgg);

                //6. zamieniamy ktores z obecnych jaj nowym jajem, jesli nowe jest lepsze
                population.replaceRandomEggIfNecessaryByNewEgg(newEgg, settings.chromosomeLength);
                // Helper.print('populacja po zamianie losowego osobnika przez nowe jajo (jesli spelniony warunek)', newEgg);

                //7. porzuc najgorsze gniazda (u mnie sie to sprowadza do porzucenia jaj)
                //ma to odzwierciedlac sytuacje, gdy ptak zorientuje sie, ze jajo zostalo
                //podrzucone do jego gniazda wowczas szuka nowego gniazda - gwarantuje elitaryzm (chybam ze prawdopodobienstwo jest bardzo duze)
                //nowe gniazda (jaja) szukamy wykorzystujac 'loty Levy'iego'
                population.abandonWorstEggsAndGenerateNew(settings.probability.abandonment, settings.scale, settings.chromosomeLength);
                // Helper.print('populacja po porzuceniu starych jaj i stworzeniu nowych', population);

                iteration++;
            }

            // Helper.print('Wyniki', results);
            return results;
        }
    }, {
        key: 'checkStopCondition',
        value: function checkStopCondition(iteration, maxIterations) {
            return iteration > maxIterations;
        }
    }, {
        key: 'test',
        value: function test(items, settingsTab) {
            var resultsTab = [];

            if (settingsTab.length > 0) {
                var initPopulation = settingsTab[0].sameInitialPopulation ? new CuckooPopulation(settingsTab[0].populationSize, settingsTab[0].chromosomeLength) : false;

                settingsTab.forEach(function (settings) {
                    resultsTab.push(CuckooSearchAlgorithm.run(items, settings, initPopulation));
                });
            }

            return resultsTab;
        }
    }]);

    return CuckooSearchAlgorithm;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _essyDistribution = __webpack_require__(4);

var distributions = _interopRequireWildcard(_essyDistribution);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CuckooEgg = __webpack_require__(7);
var Helper = __webpack_require__(0);

module.exports = function () {

    //create random population
    function CuckooPopulation(populationSize, chromosomeLength) {
        _classCallCheck(this, CuckooPopulation);

        //jajo oznacza rozwiazanie np. '0110010'
        //moglbym to rozdzielic na kukulki, gniazda i jaja, ale w praktyce wszystko
        //sprowadza sie do jaja jako rozwiazania, wiec to wystarczy
        this.eggs = this.createRandomEggs(populationSize, chromosomeLength);
        this.populationSize = populationSize;
        this.chromosomeLength = chromosomeLength;
    }

    _createClass(CuckooPopulation, [{
        key: 'createRandomEggs',
        value: function createRandomEggs(populationSize, chromosomeLength) {
            var eggs = [];

            for (var i = 0; i < populationSize; i++) {
                var number = void 0;
                do {
                    number = Math.random();
                } while (number === 0);
                var egg = new CuckooEgg(number, chromosomeLength);
                eggs.push(egg);
            }

            return eggs;
        }
    }, {
        key: 'rateEggs',
        value: function rateEggs(items, knapsackSize) {
            this.eggs.forEach(function (egg) {
                CuckooPopulation.rateEgg(egg, items, knapsackSize);
            });
        }
    }, {
        key: 'createRandomNewEggFromPopulationByLevyFlight',
        value: function createRandomNewEggFromPopulationByLevyFlight(scale, chromosomeLength) {
            return CuckooPopulation.createRandomNewEggFromGroupByLevyFlight(this.eggs, scale, chromosomeLength);
        }
    }, {
        key: 'replaceRandomEggIfNecessaryByNewEgg',
        value: function replaceRandomEggIfNecessaryByNewEgg(newEgg) {
            var index = Math.floor(Math.random() * this.eggs.length);
            var egg = this.eggs[index];
            if (newEgg.adaptationValue > egg.adaptationValue) {
                this.eggs[index] = newEgg;
            }
        }
    }, {
        key: 'abandonWorstEggsAndGenerateNew',
        value: function abandonWorstEggsAndGenerateNew(abandonmentProbability, scale, chromosomeLength) {
            this.sortEggsByAdaptationValue();
            var numberOfAbandonEggs = Math.round(abandonmentProbability * this.eggs.length);
            var abandonmentEggs = this.eggs.slice(this.eggs.length - numberOfAbandonEggs);
            var newEggs = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = abandonmentEggs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var egg = _step.value;

                    var newEgg = CuckooPopulation.createNewEggByLevyFlight(egg, scale, chromosomeLength);
                    newEggs.push(newEgg);
                }

                /*Helper.print('##########', {});
                Helper.print('abandonmentProbability', abandonmentProbability);
                Helper.print('scale', scale);
                Helper.print('this.eggs', this.eggs);
                Helper.print('numberOfAbandonEggs', numberOfAbandonEggs);
                Helper.print('##########', {});*/
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.eggs.length = this.eggs.length - numberOfAbandonEggs;
            this.eggs = this.eggs.concat(newEggs);
        }
    }, {
        key: 'sortEggsByAdaptationValue',
        value: function sortEggsByAdaptationValue() {
            this.eggs.sort(function (firstEgg, secondEgg) {
                if (firstEgg.adaptationValue > secondEgg.adaptationValue) {
                    return -1;
                } else if (firstEgg.adaptationValue < secondEgg.adaptationValue) {
                    return 1;
                }
                return 0;
            });
        }
        //
        //
        //
        //
        // todo, refactor nizej

    }, {
        key: 'isAnyNotOversizeEggInPopulation',
        value: function isAnyNotOversizeEggInPopulation() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.eggs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var egg = _step2.value;

                    if (!egg.oversize) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'printSummaryInformation',
        value: function printSummaryInformation() {
            var bestEggOrZero = this.findBestEggFromPopulationOrZero();
            if (bestEggOrZero == 0) {
                Helper.print('Brak najlepszego osobnika (jaja), wszystkie sa oversize!', {});
            } else {
                Helper.print('Najlepszy osobnik (jajo)', bestEggOrZero);
                Helper.print('Najlepszy osobnik (jajo) adaptationValue', bestEggOrZero.adaptationValue);
            }
        }
    }, {
        key: 'findBestEggFromPopulationOrZero',
        value: function findBestEggFromPopulationOrZero() {
            var canBeOversize = false;
            return this.isAnyNotOversizeEggInPopulation() ? CuckooPopulation.findBestEggFromGroup(this.eggs, canBeOversize) : 0;
        }
    }], [{
        key: 'rateEgg',
        value: function rateEgg(egg, items, knapsackSize) {
            egg.calculateValueAndWeight(items, knapsackSize);
            egg.calculateAdaptationValue(knapsackSize);
        }
    }, {
        key: 'createRandomNewEggFromGroupByLevyFlight',
        value: function createRandomNewEggFromGroupByLevyFlight(eggsGroup, scale, chromosomeLength) {
            var index = Math.floor(Math.random() * eggsGroup.length);
            var egg = eggsGroup[index];
            return CuckooPopulation.createNewEggByLevyFlight(egg, scale, chromosomeLength);
        }
    }, {
        key: 'createNewEggByLevyFlight',
        value: function createNewEggByLevyFlight(egg, scale, chromosomeLength) {
            var levyDistribution = new distributions.Levy(egg.number, scale); //(location, scale)
            var newEggValue = levyDistribution.sample(1);
            return new CuckooEgg(newEggValue, chromosomeLength);
        }
    }, {
        key: 'findBestEggFromGroup',
        value: function findBestEggFromGroup(eggsGroup, canBeOversize) {
            var bestEgg = void 0;

            if (canBeOversize) {
                bestEgg = eggsGroup[0];
                eggsGroup.forEach(function (egg) {
                    if (egg.adaptationValue > bestEgg.adaptationValue) {
                        bestEgg = egg;
                    }
                });

                return bestEgg;
            } else if (!canBeOversize) {
                bestEgg = CuckooPopulation.findFirstNotOversizeEggFromGroup(eggsGroup);
                eggsGroup.forEach(function (egg) {
                    if (egg.adaptationValue > bestEgg.adaptationValue && !egg.oversize) {
                        bestEgg = egg;
                    }
                });

                return bestEgg;
            }
        }
    }, {
        key: 'findFirstNotOversizeEggFromGroup',
        value: function findFirstNotOversizeEggFromGroup(eggsGroup) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = eggsGroup[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var egg = _step3.value;

                    if (!egg.oversize) {
                        return egg;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'copyPopulation',
        value: function copyPopulation(population) {
            var populationCopy = new CuckooPopulation(population.populationSize, population.chromosomeLength);
            var eggsCopy = [];

            population.eggs.forEach(function (egg) {
                var eggCopy = new CuckooEgg(egg.number, population.chromosomeLength);
                eggCopy.number = egg.number;
                eggCopy.representation = egg.representation;
                eggCopy.oversize = egg.oversize;
                eggCopy.value = egg.value;
                eggCopy.weight = egg.weight;
                eggCopy.adaptationValue = egg.adaptationValue;
                eggsCopy.push(eggCopy);
            });

            populationCopy.eggs = eggsCopy;
            return populationCopy;
        }
    }]);

    return CuckooPopulation;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MersenneTwister = __webpack_require__(11);

/**
 * Abstract superclass for distributions.
 * @class DistAbstract
 */

var DistAbstract = exports.DistAbstract = function () {
  function DistAbstract() {
    _classCallCheck(this, DistAbstract);
  }

  /**
   * Cumulative density function. Must be implemented by subclasses.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */

  /**
   * Returns distribution mean. Must be implemented by subclasses.
   * @method mean
   * @return {Number}
   */


  _createClass(DistAbstract, [{
    key: 'mean',
    value: function mean() {
      return undefined;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return undefined;
    }

    /**
     * Probability density function. Must be implemented by subclasses.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

    /**
     * Samples distribution.
     * @method sample
     * @param n {Number} [optional] Number of samples.
     * @param generator {Object} [optional] Random generator with random() method.
     * @return {Number|Number[]} Single number if single sample, else array of sample values.
     */

  }, {
    key: 'sample',
    value: function sample(n, generator) {

      n = n || 1;
      generator = generator || new MersenneTwister();

      if (n === 1) {
        return this.sampleValue(generator);
      } else {
        var result = [];
        for (var i = 0; i < n; i++) {
          result.push(this.sampleValue(generator));
        }
        return result;
      }
    }

    /**
     * Samples single value. Must be implemented by subclasses.
     * @method sampleValue
     * @param generator {Object} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      throw new Error('sampleValue() not implemented.');
    }
  }]);

  return DistAbstract;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParamError = function ParamError(index, param, message) {
  _classCallCheck(this, ParamError);

  this.index = index;
  this.param = param;
  this.message = message;
  this.name = 'ParamError';
};

exports.default = ParamError;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(5);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Uniform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Uniform distribution.
 * @class Uniform
 * @extends DistAbstract
 *
 ******************************************************************************/
var Uniform = exports.Uniform = function (_DistAbstract) {
  _inherits(Uniform, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param min {Number} Minimum value.
   * @param max {Number} Maximum value.
   * @throws {ParamError} If max <= min.
   */
  function Uniform(min, max) {
    _classCallCheck(this, Uniform);

    var _this = _possibleConstructorReturn(this, (Uniform.__proto__ || Object.getPrototypeOf(Uniform)).call(this));

    if (max <= min) {
      throw new _ParamError2.default(1, 'max', 'max parameter must be greater than min.');
    }
    _this.min = min;
    _this.max = max;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Uniform, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < this.min) {
        return 0;
      }
      if (x < this.max) {
        return (x - this.min) / (this.max - this.min);
      }
      return 1;
    }

    /**
     * Returns kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return -1.2;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return (this.min + this.max) / 2;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return (this.min + this.max) / 2;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return undefined;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x >= this.min && x <= this.max) {
        return 1 / (this.max - this.min);
      }
      return 0;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: this.min,
        minInclusive: true,
        max: this.max,
        maxInclusive: true
      };
    }

    /**
     * Samples distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random number in range [min, max].
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      return this.min + (this.max - this.min) * generator.random();
    }

    /**
     * Returns skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 0;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return 1 / 12 * Math.pow(this.max - this.min, 2);
    }
  }]);

  return Uniform;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Uniform.params = {
  min: {
    description: 'Real number less than max.',
    max: 'max',
    maxInclusive: false
  },
  max: {
    description: 'Real number greater than min.',
    min: 'min',
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Uniform.distName = 'Uniform';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Normal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/

/*******************************************************************************
 *
 * A normal distribution. Adapted from CERN Java implementation.
 * @class Normal
 * @extends DistAbstract
 *
 ******************************************************************************/
var Normal = exports.Normal = function (_DistAbstract) {
  _inherits(Normal, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param mean {Number} Mean parameter.
   * @param se {Number} Standard error parameter. >0.
   * @throws {ParamError} If se parameter is not greater than 0.
   */
  function Normal(mean, se) {
    _classCallCheck(this, Normal);

    var _this = _possibleConstructorReturn(this, (Normal.__proto__ || Object.getPrototypeOf(Normal)).call(this));

    if (se <= 0) {
      throw new _ParamError2.default(1, 'se', 'se parameter must be greater than 0.');
    }
    _this.m = mean;
    _this.se = se;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Normal, [{
    key: 'cdf',
    value: function cdf(x) {
      return 0.5 * (1 + (0, _essyStats.erf)((x - this.m) / (this.se * Math.sqrt(2))));
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 0;
    }

    /**
     * Returns mean distribution value.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.m;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.m;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.m;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      return 1 / Math.sqrt(2 * Math.pow(this.se, 2) * Math.PI) * Math.exp(-(Math.pow(x - this.m, 2) / (2 * Math.pow(this.se, 2))));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {};
    }

    /**
     * Returns sample from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var x = void 0,
          y = void 0,
          r = void 0,
          z = void 0;

      do {
        x = 2 * generator.random() - 1;
        y = 2 * generator.random() - 1;
        r = x * x + y * y;
      } while (r >= 1);

      z = Math.sqrt(-2 * Math.log(r) / r);
      return this.m + this.se * y * z;
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 0;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.se * this.se;
    }
  }]);

  return Normal;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Normal.params = {
  mean: {
    description: 'Real number.'
  },
  se: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Normal.distName = 'Normal';

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright � 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChiSquared = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Chi-squared distribution.
 * @class ChiSquared
 * @extends DistAbstract
 *
 ******************************************************************************/
var ChiSquared = exports.ChiSquared = function (_DistAbstract) {
  _inherits(ChiSquared, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param freedom {Number} Degrees of freedom.
   * @throws {ParamError} On invalid parameter value.
   */
  function ChiSquared(freedom) {
    _classCallCheck(this, ChiSquared);

    var _this = _possibleConstructorReturn(this, (ChiSquared.__proto__ || Object.getPrototypeOf(ChiSquared)).call(this));

    if (freedom < 0) {
      throw new _ParamError2.default(0, 'df', 'freedom parameter must be greater than or equal to 0.');
    }
    _this.df = freedom;

    // Caching for subsequent samples.
    _this.df_in = -1;
    _this.b = null;
    _this.vm = null;
    _this.vp = null;
    _this.vd = null;
    return _this;
  }

  /**
   * Cumulative distribution function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(ChiSquared, [{
    key: 'cdf',
    value: function cdf(x) {
      return 1 / (0, _essyStats.gamma)(this.df / 2) * (0, _essyStats.lowerIncGamma)(this.df / 2, x / 2);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 12 / this.df;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number}
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.df;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.df * Math.pow(1 - 2 / (9 * this.df), 3);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return Math.max(0, this.df - 2);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x === 0 && this.df === 1) x = 0.01;
      return 1 / (Math.pow(2, this.df / 2) * (0, _essyStats.gamma)(this.df / 2)) * Math.pow(x, this.df / 2 - 1) * Math.exp(-(x / 2));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: this.df !== 1
      };
    }

    /**
     * Samples random value from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var u, v, z, zz, r;

      if (this.df == 1.0) {
        for (;;) {
          u = generator.random();
          v = generator.random() * 0.857763884960707;
          z = v / u;
          if (z < 0) continue;
          zz = z * z;
          r = 2.5 - zz;
          if (z < 0.0) r = r + zz * z / (3.0 * z);
          if (u < r * 0.3894003915) return z * z;
          if (zz > 1.036961043 / u + 1.4) continue;
          if (2.0 * Math.log(u) < -zz * 0.5) return z * z;
        }
      } else {
        if (this.df != this.df_in) {
          this.b = Math.sqrt(this.df - 1.0);
          this.vm = -0.6065306597 * (1.0 - 0.25 / (this.b * this.b + 1.0));
          this.vm = -this.b > this.vm ? -this.b : this.vm;
          this.vp = 0.6065306597 * (0.7071067812 + this.b) / (0.5 + this.b);
          this.vd = this.vp - this.vm;
          this.df_in = this.df;
        }
        for (;;) {
          u = generator.random();
          v = generator.random() * this.vd + this.vm;
          z = v / u;
          if (z < -this.b) continue;
          zz = z * z;
          r = 2.5 - zz;
          if (z < 0.0) r = r + zz * z / (3.0 * (z + this.b));
          if (u < r * 0.3894003915) return (z + this.b) * (z + this.b);
          if (zz > 1.036961043 / u + 1.4) continue;
          if (2.0 * Math.log(u) < Math.log(1.0 + z / this.b) * this.b * this.b - zz * 0.5 - z * this.b) return (z + this.b) * (z + this.b);
        }
      }
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 2 * Math.sqrt(2) * Math.sqrt(1 / this.df);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return 2 * this.df;
    }
  }]);

  return ChiSquared;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


ChiSquared.params = {
  df: {
    description: 'Integer greater than 0.',
    min: 0,
    minInclusive: false,
    discrete: true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
ChiSquared.distName = 'Chi-squared';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gamma = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/

/**
 * Gamma distribution; <A HREF="http://wwwinfo.cern.ch/asdoc/shortwrupsdir/g106/top.html"> math definition</A>,
 * <A HREF="http://www.cern.ch/RD11/rkb/AN16pp/node96.html#SECTION000960000000000000000"> definition of gamma function</A>
 * and <A HREF="http://www.statsoft.com/textbook/glosf.html#Gamma Distribution"> animated definition</A>.
 * <p>
 * <tt>p(x) = k * x^(alpha-1) * e^(-x/beta)</tt> with <tt>k = 1/(g(alpha) * b^a))</tt> and <tt>g(a)</tt> being the gamma function.
 * <p>
 * Valid parameter ranges: <tt>alpha &gt; 0</tt>.
 * <p>
 * Note: For a Gamma distribution to have the mean <tt>mean</tt> and variance <tt>variance</tt>, set the parameters as follows:
 * <pre>
 * alpha = mean*mean / variance; lambda = 1 / (variance / mean);
 * </pre>
 * <p>
 * Instance methods operate on a user supplied uniform random number generator; they are unsynchronized.
 * <dt>
 * Static methods operate on a default uniform random number generator; they are synchronized.
 * <p>
 * <b>Implementation:</b>
 * <dt>
 * Method: Acceptance Rejection combined with Acceptance Complement.
 * <dt>
 * High performance implementation. This is a port of <A HREF="http://wwwinfo.cern.ch/asd/lhc++/clhep/manual/RefGuide/Random/RandGamma.html">RandGamma</A> used in <A HREF="http://wwwinfo.cern.ch/asd/lhc++/clhep">CLHEP 1.4.0</A> (C++).
 * CLHEP's implementation, in turn, is based on <tt>gds.c</tt> from the <A HREF="http://www.cis.tu-graz.ac.at/stat/stadl/random.html">C-RAND / WIN-RAND</A> library.
 * C-RAND's implementation, in turn, is based upon
 * <p>
 * J.H. Ahrens, U. Dieter (1974): Computer methods for sampling from gamma, beta, Poisson and binomial distributions,
 * Computing 12, 223-246.
 * <p>
 * and
 * <p>
 * J.H. Ahrens, U. Dieter (1982): Generating gamma variates by a modified rejection technique,
 * Communications of the ACM 25, 47-54.
 *
 * @author wolfgang.hoschek@cern.ch
 * @version 1.0, 09/24/99
 */

/*******************************************************************************
 *
 * Gamma distribution.
 * @class Gamma
 * @extends DistAbstract
 *
 ******************************************************************************/
var Gamma = exports.Gamma = function (_DistAbstract) {
  _inherits(Gamma, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param shape {Number} Shape parameter value. >0
   * @param scale {Number} Scale parameter value. >0
   * @throws {ParamError} On invalid parameter value.
   */
  function Gamma(shape, scale) {
    _classCallCheck(this, Gamma);

    var _this = _possibleConstructorReturn(this, (Gamma.__proto__ || Object.getPrototypeOf(Gamma)).call(this));

    if (shape <= 0) {
      throw new _ParamError2.default(0, 'shape', 'shape parameter must be greater than 0.');
    }
    if (scale <= 0) {
      throw new RangeError(1, 'scale', 'scale parameter must be greater than 0.');
    }
    _this.shape = shape;
    _this.scale = scale;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Gamma, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) return 0;
      return (0, _essyStats.lowerIncGamma)(this.shape, x * this.scale);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 6 / this.shape;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.shape * this.scale;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      if (this.shape < 1) {
        return undefined;
      }
      return (this.shape - 1) * this.scale;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 0) return 0;
      return 1 / ((0, _essyStats.gamma)(this.shape) * Math.pow(this.scale, this.shape)) * Math.pow(x, this.shape - 1) * Math.exp(-x / this.scale);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: false
      };
    }

    /**
     * Samples distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var a = this.shape;
      var lambda = this.scale;

      var aa = -1;
      var aaa = -1;
      var b = 0,
          c = 0,
          d = 0,
          e = void 0,
          r = void 0,
          s = 0,
          si = 0,
          ss = 0,
          q0 = 0,
          q1 = 0.0416666664,
          q2 = 0.0208333723,
          q3 = 0.0079849875,
          q4 = 0.0015746717,
          q5 = -0.0003349403,
          q6 = 0.0003340332,
          q7 = 0.0006053049,
          q8 = -0.0004701849,
          q9 = 0.0001710320,
          a1 = 0.333333333,
          a2 = -0.249999949,
          a3 = 0.199999867,
          a4 = -0.166677482,
          a5 = 0.142873973,
          a6 = -0.124385581,
          a7 = 0.110368310,
          a8 = -0.112750886,
          a9 = 0.104089866,
          e1 = 1.000000000,
          e2 = 0.499999994,
          e3 = 0.166666848,
          e4 = 0.041664508,
          e5 = 0.008345522,
          e6 = 0.001353826,
          e7 = 0.000247453;

      var gds = void 0,
          p = void 0,
          q = void 0,
          t = void 0,
          sign_u = void 0,
          u = void 0,
          v = void 0,
          w = void 0,
          x = void 0;
      var v1 = void 0,
          v2 = void 0,
          v12 = void 0;

      if (a < 1) {
        // CASE A: Acceptance rejection algorithm gs
        b = 1 + 0.36788794412 * a; // Step 1
        for (;;) {
          p = b * generator.random();
          if (p <= 1) {
            // Step 2. Case gds <= 1
            gds = Math.exp(Math.log(p) / a);
            if (Math.log(generator.random()) <= -gds) return gds / lambda;
          } else {
            // Step 3. Case gds > 1
            gds = -Math.log((b - p) / a);
            if (Math.log(generator.random()) <= (a - 1) * Math.log(gds)) return gds / lambda;
          }
        }
      } else {
        // CASE B: Acceptance complement algorithm gd (gaussian distribution, box muller transformation)
        if (a !== aa) {
          // Step 1. Preparations
          aa = a;
          ss = a - 0.5;
          s = Math.sqrt(ss);
          d = 5.656854249 - 12 * s;
        }
        // Step 2. Normal deviate
        do {
          v1 = 2 * generator.random() - 1;
          v2 = 2 * generator.random() - 1;
          v12 = v1 * v1 + v2 * v2;
        } while (v12 > 1);

        t = v1 * Math.sqrt(-2.0 * Math.log(v12) / v12);
        x = s + 0.5 * t;
        gds = x * x;
        if (t >= 0) return gds / lambda; // Immediate acceptance

        u = generator.random(); // Step 3. Uniform random number
        if (d * u <= t * t * t) return gds / lambda; // Squeeze acceptance

        if (a !== aaa) {
          // Step 4. Set-up for hat case
          aaa = a;
          r = 1 / a;
          q0 = ((((((((q9 * r + q8) * r + q7) * r + q6) * r + q5) * r + q4) * r + q3) * r + q2) * r + q1) * r;
          if (a > 3.686) {
            if (a > 13.022) {
              b = 1.77;
              si = 0.75;
              c = 0.1515 / s;
            } else {
              b = 1.654 + 0.0076 * ss;
              si = 1.68 / s + 0.275;
              c = 0.062 / s + 0.024;
            }
          } else {
            b = 0.463 + s - 0.178 * ss;
            si = 1.235;
            c = 0.195 / s - 0.079 + 0.016 * s;
          }
        }

        if (x > 0) {
          // Step 5. Calculation of q
          v = t / (s + s); // Step 6.
          if (Math.abs(v) > 0.25) {
            q = q0 - s * t + 0.25 * t * t + (ss + ss) * Math.log(1.0 + v);
          } else {
            q = q0 + 0.5 * t * t * ((((((((a9 * v + a8) * v + a7) * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v + a1) * v;
          } // Step 7. Quotient acceptance
          if (Math.log(1.0 - u) <= q) return gds / lambda;
        }

        for (;;) {
          // Step 8. Double exponential deviate t
          do {
            e = -Math.log(generator.random());
            u = generator.random();
            u = u + u - 1.0;
            sign_u = u > 0 ? 1.0 : -1.0;
            t = b + e * si * sign_u;
          } while (t <= -0.71874483771719); // Step 9. Rejection of t

          v = t / (s + s); // Step 10. New q(t)
          if (Math.abs(v) > 0.25) {
            q = q0 - s * t + 0.25 * t * t + (ss + ss) * Math.log(1.0 + v);
          } else {
            q = q0 + 0.5 * t * t * ((((((((a9 * v + a8) * v + a7) * v + a6) * v + a5) * v + a4) * v + a3) * v + a2) * v + a1) * v;
          }
          if (q <= 0) continue; // Step 11.
          if (q > 0.5) {
            w = Math.exp(q) - 1.0;
          } else {
            w = ((((((e7 * q + e6) * q + e5) * q + e4) * q + e3) * q + e2) * q + e1) * q;
          } // Step 12. Hat acceptance

          if (c * u * sign_u <= w * Math.exp(e - 0.5 * t * t)) {
            x = s + 0.5 * t;
            return x * x / lambda;
          }
        }
      }
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 2 / Math.sqrt(this.shape);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.shape * (this.scale * this.scale);
    }
  }]);

  return Gamma;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Gamma.params = {
  shape: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  },
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Gamma.distName = 'Gamma';

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logistic = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Logistic distribution.
 * @class Logistic
 * @extends DistAbstract
 *
 ******************************************************************************/
var Logistic = exports.Logistic = function (_DistAbstract) {
  _inherits(Logistic, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param mean {Number}
   * @param scale {Number} > 0.
   * @throws {ParamError} If scale is <= 0.
   */
  function Logistic(mean, scale) {
    _classCallCheck(this, Logistic);

    var _this = _possibleConstructorReturn(this, (Logistic.__proto__ || Object.getPrototypeOf(Logistic)).call(this));

    if (scale <= 0) {
      throw new _ParamError2.default(1, 'scale', 'scale parameter must be greater than 0.');
    }
    _this.m = mean;
    _this.scale = scale;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Logistic, [{
    key: 'cdf',
    value: function cdf(x) {
      return 1 / (1 + Math.exp(-((x - this.m) / this.scale)));
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 1.2;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.m;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.m;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.m;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      var e = Math.exp(-((x - this.m) / this.scale));
      return e / (this.scale * Math.pow(1 + e, 2));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {};
    }

    /**
     * Samples distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var x = generator.random();
      return this.m + this.scale * Math.log(x / (1 - x));
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 0;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.scale * this.scale * Math.PI * Math.PI / 3;
    }
  }]);

  return Logistic;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Logistic.params = {
  mean: {
    description: 'Real number.'
  },
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Logistic.distName = 'Logistic';

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Poisson = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * A Poisson distribution with parameter lambda.
 * @class Poisson
 * @extends DistAbstract
 *
 ******************************************************************************/
var Poisson = exports.Poisson = function (_DistAbstract) {
  _inherits(Poisson, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param lambda {Number} Greater than 0.
   * @throws {ParamError} On invalid lambda.
   */
  function Poisson(lambda) {
    _classCallCheck(this, Poisson);

    var _this = _possibleConstructorReturn(this, (Poisson.__proto__ || Object.getPrototypeOf(Poisson)).call(this));

    if (lambda <= 0) {
      throw new _ParamError2.default(0, 'lambda', 'lambda parameter must be greater than 0.');
    }
    _this.lambda = lambda;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Poisson, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) {
        return 0;
      }

      // 170 is the threshold for factorial(x).
      if (x > 170) {
        return 1;
      }

      var c = 0;
      x = Math.floor(x);
      for (var i = 0; i <= x; i++) {
        c += Math.exp(-this.lambda) * Math.pow(this.lambda, i) / (0, _essyStats.factorial)(i);
      }
      return c;
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 1 / this.lambda + 3;
    }

    /**
     * Returns mean.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.lambda;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return Math.floor(this.lambda + 1 / 3 - 0.02 / this.lambda);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return Math.floor(this.lambda);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      // 170 is the threshold for factorial(x).
      if (x < 0 || x > 170) {
        return 0;
      }
      return Math.pow(this.lambda, x) * Math.exp(-this.lambda) / (0, _essyStats.factorial)(x);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        discrete: true,
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Returns sample from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var L = Math.exp(-this.lambda);
      var k = 0;
      var p = 1;
      while (p > L) {
        k += 1;
        p *= generator.random();
      }
      return k - 1;
    }

    /**
     * Returns skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 1 / Math.sqrt(this.lambda);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.lambda;
    }
  }]);

  return Poisson;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Poisson.params = {
  lambda: {
    description: 'An integer greater than or equal to 0.',
    discrete: true,
    min: 0,
    minInclusive: true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Poisson.distName = 'Poisson';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Poisson.discrete = true;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Beta = __webpack_require__(10);

var _Binomial = __webpack_require__(12);

var _Cauchy = __webpack_require__(13);

var _ChiSquared = __webpack_require__(5);

var _Custom = __webpack_require__(14);

var _Erlang = __webpack_require__(15);

var _Exponential = __webpack_require__(16);

var _F = __webpack_require__(17);

var _Gamma = __webpack_require__(6);

var _Hypergeometric = __webpack_require__(18);

var _Laplace = __webpack_require__(19);

var _Levy = __webpack_require__(20);

var _Logarithmic = __webpack_require__(21);

var _Logistic = __webpack_require__(7);

var _LogLogistic = __webpack_require__(22);

var _LogNormal = __webpack_require__(23);

var _NegativeBinomial = __webpack_require__(24);

var _Normal = __webpack_require__(4);

var _Pareto = __webpack_require__(25);

var _Poisson = __webpack_require__(8);

var _Rayleigh = __webpack_require__(26);

var _StudentT = __webpack_require__(27);

var _Triangular = __webpack_require__(28);

var _Uniform = __webpack_require__(3);

var _Weibull = __webpack_require__(29);

var _ParamError = __webpack_require__(1);

exports.default = {
  Beta: _Beta.Beta,
  Binomial: _Binomial.Binomial,
  Cauchy: _Cauchy.Cauchy,
  ChiSquared: _ChiSquared.ChiSquared,
  Custom: _Custom.Custom,
  Erlang: _Erlang.Erlang,
  Exponential: _Exponential.Exponential,
  F: _F.F,
  Gamma: _Gamma.Gamma,
  Hypergeometric: _Hypergeometric.Hypergeometric,
  Laplace: _Laplace.Laplace,
  Levy: _Levy.Levy,
  Logarithmic: _Logarithmic.Logarithmic,
  Logistic: _Logistic.Logistic,
  LogLogistic: _LogLogistic.LogLogistic,
  LogNormal: _LogNormal.LogNormal,
  NegativeBinomial: _NegativeBinomial.NegativeBinomial,
  Normal: _Normal.Normal,
  Pareto: _Pareto.Pareto,
  Poisson: _Poisson.Poisson,
  Rayleigh: _Rayleigh.Rayleigh,
  StudentT: _StudentT.StudentT,
  Triangular: _Triangular.Triangular,
  Uniform: _Uniform.Uniform,
  Weibull: _Weibull.Weibull,

  ParamError: _ParamError.ParamError
};
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Beta = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// From jStat.
function randn() {
  var u = void 0,
      v = void 0,
      x = void 0,
      y = void 0,
      q = void 0;
  do {
    u = Math.random();
    v = 1.7156 * (Math.random() - 0.5);
    x = u - 0.449871;
    y = Math.abs(v) + 0.386595;
    q = x * x + y * (0.19600 * y - 0.25472 * x);
  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
  return v / u;
}

// From jStat.
function randg(shape, generator) {
  var oalph = shape;
  var a1, a2, u, v, x;

  if (shape < 1) {
    shape += 1;
  }
  a1 = shape - 1 / 3;
  a2 = 1 / Math.sqrt(9 * a1);
  do {
    do {
      x = randn();
      v = 1 + a2 * x;
    } while (v <= 0);
    v = v * v * v;
    u = generator.random();
  } while (u > 1 - 0.331 * Math.pow(x, 4) && Math.log(u) > 0.5 * x * x + a1 * (1 - v + Math.log(v)));

  // alpha > 1
  if (shape == oalph) {
    return a1 * v;
  }

  // alpha < 1
  do {
    u = generator.random();
  } while (u === 0);
  return Math.pow(u, 1 / oalph) * a1 * v;
}

/*******************************************************************************
 *
 * Beta distribution.
 * @class Beta
 * @extends DistAbstract
 *
 ******************************************************************************/

var Beta = exports.Beta = function (_DistAbstract) {
  _inherits(Beta, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param alpha {Number} Alpha parameter value. >0
   * @param beta {Number} Beta parameter value. >0
   * @throws {ParamError} If alpha or beta out of range.
   */
  function Beta(alpha, beta) {
    _classCallCheck(this, Beta);

    var _this = _possibleConstructorReturn(this, (Beta.__proto__ || Object.getPrototypeOf(Beta)).call(this));

    if (alpha <= 0) {
      throw new _ParamError2.default(0, 'alpha', 'alpha parameter must be greater than 0.');
    }
    if (beta <= 0) {
      throw new _ParamError2.default(1, 'beta', 'beta parameter must be greater than 0.');
    }
    _this.alpha = alpha;
    _this.beta = beta;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Beta, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0 || x > 1) return 0;
      return (0, _essyStats.regIncBeta)(this.alpha, this.beta, x);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      var a = this.alpha;
      var b = this.beta;
      var num = 3 * (a + b + 1) * (2 * Math.pow(a + b, 2) + a * b * (a + b - 6));
      var den = a * b * (a + b + 2) * (a + b + 3);
      return num / den - 3;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.alpha / (this.alpha + this.beta);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return (0, _essyStats.regInvIncBeta)(0.5, this.alpha, this.beta);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      if (this.alpha + this.beta === 2) {
        return undefined;
      }
      return (this.alpha - 1) / (this.alpha + this.beta - 2);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 0 || x > 1) return 0;
      var num = Math.pow(x, this.alpha - 1) * Math.pow(1 - x, this.beta - 1);
      var den = (0, _essyStats.gamma)(this.alpha) * (0, _essyStats.gamma)(this.beta) / (0, _essyStats.gamma)(this.alpha + this.beta);
      return num / den;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true,
        max: 1,
        maxInclusive: true
      };
    }

    /**
     * Samples distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var u = randg(this.alpha, generator);
      return u / (u + randg(this.beta, generator));
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var num = 2 * (this.beta - this.alpha) * Math.sqrt(this.alpha + this.beta + 1);
      var den = Math.sqrt(this.alpha) * Math.sqrt(this.beta) * (this.alpha + this.beta + 2);
      return num / den;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.alpha * this.beta / (Math.pow(this.alpha + this.beta, 2) * (this.alpha + this.beta + 1));
    }
  }]);

  return Beta;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Beta.params = {
  alpha: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  },
  beta: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Beta.distName = 'Beta';

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(6);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Binomial = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright  1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/

// Lookups for stirlingCorrection().
var STIRLINGS = [0.0, 8.106146679532726e-02, 4.134069595540929e-02, 2.767792568499834e-02, 2.079067210376509e-02, 1.664469118982119e-02, 1.387612882307075e-02, 1.189670994589177e-02, 1.041126526197209e-02, 9.255462182712733e-03, 8.330563433362871e-03, 7.573675487951841e-03, 6.942840107209530e-03, 6.408994188004207e-03, 5.951370112758848e-03, 5.554733551962801e-03, 5.207655919609640e-03, 4.901395948434738e-03, 4.629153749334029e-03, 4.385560249232324e-03, 4.166319691996922e-03, 3.967954218640860e-03, 3.787618068444430e-03, 3.622960224683090e-03, 3.472021382978770e-03, 3.333155636728090e-03, 3.204970228055040e-03, 3.086278682608780e-03, 2.976063983550410e-03, 2.873449362352470e-03, 2.777674929752690e-03];

/**
 * Returns the StirlingCorrection.
 * Correction term of the Stirling approximation for log(k!)
 * (series in 1/k, or table values for small k)
 * with int parameter k.
 *
 * log k! = (k + 1/2)log(k + 1) - (k + 1) + (1/2)log(2Pi) +
 *          stirlingCorrection(k + 1)
 *
 * log k! = (k + 1/2)log(k)     -  k      + (1/2)log(2Pi) +
 *          stirlingCorrection(k)
 *
 */
function stirlingCorrection(k) {
  var C1 = 8.33333333333333333e-02; //  +1/12
  var C3 = -2.77777777777777778e-03; //  -1/360
  var C5 = 7.93650793650793651e-04; //  +1/1260
  var C7 = -5.95238095238095238e-04; //  -1/1680

  var r = void 0,
      rr = void 0;

  if (k > 30) {
    r = 1 / k;
    rr = r * r;
    return r * (C1 + rr * (C3 + rr * (C5 + rr * C7)));
  } else {
    return STIRLINGS[k];
  }
}

/**
 * Performs n choose k.
 * @method choose
 * @param n {Number}
 * @param k {Number}
 * @return {Number}
 */
function choose(n, k) {

  if (k < 0) return 0;
  if (k === 0) return 1;
  if (k === 1) return n;

  // binomial(n,k) = (n * n-1 * ... * n-k+1 ) / ( 1 * 2 * ... * k )
  var a = n - k + 1,
      b = 1,
      bin = 1;
  for (var i = k; i-- > 0;) {
    bin *= a++ / b++;
  }
  return bin;
}

/*******************************************************************************
 *
 * Binomial distribution.
 * @class Binomial
 * @extends DistAbstract
 *
 ******************************************************************************/

var Binomial = exports.Binomial = function (_DistAbstract) {
  _inherits(Binomial, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param n {Number} Trials. Positive integer.
   * @param p {Number} Probability. [0, 1]
   * @throws {ParamError} If parameters are invalid.
   */
  function Binomial(n, p) {
    _classCallCheck(this, Binomial);

    var _this = _possibleConstructorReturn(this, (Binomial.__proto__ || Object.getPrototypeOf(Binomial)).call(this));

    if (n < 1 || Math.floor(n) !== n) {
      throw new _ParamError2.default(0, 'n', 'n parameter must be positive integer.');
    }
    if (p < 0 || p > 1) {
      throw new _ParamError2.default(1, 'p', 'p parameter must be between 0 and 1.');
    }
    _this.n = n;
    _this.p = p;
    return _this;
  }

  /**
   * Cumulative density function. Ignores digits to right of decimal.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Binomial, [{
    key: 'cdf',
    value: function cdf(x) {
      x = Math.floor(x);
      return this.n === x ? 1 : (0, _essyStats.regIncBeta)(this.n - x, 1 + x, 1 - this.p);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      var num = 1 - 6 * (1 - this.p) * this.p;
      var den = this.n * (1 - this.p) * this.p;
      return num / den;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.n * this.p;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return Math.floor(this.n * this.p);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return Math.floor(this.p * (this.n + 1));
    }

    /**
     * Probability density function. Ignores digits to right of decimal.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      x = Math.floor(x);
      return choose(this.n, x) * Math.pow(this.p, x) * Math.pow(1 - this.p, this.n - x);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true,
        max: this.n,
        maxInclusive: true,
        discrete: true
      };
    }

    /**
     * Samples value from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var C1_3 = 0.33333333333333333;
      var C5_8 = 0.62500000000000000;
      var C1_6 = 0.16666666666666667;
      var DMAX_KM = 20;

      var n = this.n;
      var p = this.p;

      var bh = void 0,
          i = void 0,
          K = void 0,
          Km = void 0,
          nK = void 0;
      var f = void 0,
          rm = void 0,
          U = void 0,
          V = void 0,
          X = void 0,
          T = void 0,
          E = void 0;
      var m = void 0,
          p0 = void 0,
          b = void 0,
          rc = void 0,
          ss = void 0,
          xm = void 0,
          xl = void 0,
          xr = void 0,
          c = void 0,
          ll = void 0,
          lr = void 0;
      var p1 = void 0,
          p2 = void 0,
          p3 = void 0,
          p4 = void 0;
      var pq = void 0,
          nm = void 0,
          ch = void 0;

      var par = Math.min(p, 1 - p);
      var q = 1 - par;
      var np = n * par;

      // Check for invalid input values
      if (np <= 0) return -1;

      rm = np + par;
      m = rm; // mode, integer
      if (np < 10) {
        p0 = Math.exp(n * Math.log(q)); // Chop-down
        bh = np + 10 * Math.sqrt(np * q);
        b = Math.min(n, bh);
      } else {
        rc = (n + 1.0) * (pq = par / q); // recurr. relat.
        ss = np * q; // variance
        i = 2.195 * Math.sqrt(ss) - 4.6 * q; // i = p1 - 0.5
        xm = m + 0.5;
        xl = m - i; // limit left
        xr = m + i + 1; // limit right
        f = (rm - xl) / (rm - xl * par);
        ll = f * (1.0 + 0.5 * f);
        f = (xr - rm) / (xr * q);
        lr = f * (1.0 + 0.5 * f);
        c = 0.134 + 20.5 / (15.3 + m); // parallelogram
        // height
        p1 = i + 0.5;
        p2 = p1 * (1.0 + c + c); // probabilities
        p3 = p2 + c / ll; // of regions 1-4
        p4 = p3 + c / lr;
      }

      if (np < 10) {
        //Inversion Chop-down
        var pk = void 0;

        K = 0;
        pk = p0;
        U = generator.random();
        while (U > pk) {
          ++K;
          if (K > b) {
            U = generator.random();
            K = 0;
            pk = p0;
          } else {
            U -= pk;
            pk = (n - K + 1) * par * pk / (K * q);
          }
        }

        return p > 0.5 ? n - K : K;
      }

      for (;;) {
        V = generator.random();
        if ((U = generator.random() * p4) <= p1) {
          // triangular region
          K = xm - U + p1 * V;
          return p > 0.5 ? n - K : K; // immediate accept
        }
        if (U <= p2) {
          // parallelogram
          X = xl + (U - p1) / c;
          if ((V = V * c + 1.0 - Math.abs(xm - X) / p1) >= 1.0) continue;
          K = X;
        } else if (U <= p3) {
          // left tail
          if ((X = xl + Math.log(V) / ll) < 0.0) continue;
          K = X;
          V *= (U - p2) * ll;
        } else {
          // right tail
          if ((K = xr - Math.log(V) / lr) > n) continue;
          V *= (U - p3) * lr;
        }

        // acceptance test :  two cases, depending on |K - m|
        if ((Km = Math.abs(K - m)) <= DMAX_KM || Km + Km + 2 >= ss) {

          // computation of p(K) via recurrence relationship from the mode
          f = 1; // f(m)
          if (m < K) {
            for (i = m; i < K;) {
              if ((f *= rc / ++i - pq) < V) break; // multiply  f
            }
          } else {
            for (i = K; i < m;) {
              if ((V *= rc / ++i - pq) > f) break; // multiply  V
            }
          }
          if (V <= f) break; // acceptance test
        } else {

          // lower and upper squeeze tests, based on lower bounds for log p(K)
          V = Math.log(V);
          T = -Km * Km / (ss + ss);
          E = Km / ss * ((Km * (Km * C1_3 + C5_8) + C1_6) / ss + 0.5);
          if (V <= T - E) break;
          if (V <= T + E) {
            nm = n - m + 1;
            ch = xm * Math.log((m + 1.0) / (pq * nm)) + stirlingCorrection(m + 1) + stirlingCorrection(nm);
            nK = n - K + 1;

            // computation of log f(K) via Stirling's formula
            // final acceptance-rejection test
            if (V <= ch + (n + 1.0) * Math.log(nm / nK) + (K + 0.5) * Math.log(nK * pq / (K + 1.0)) - stirlingCorrection(K + 1) - stirlingCorrection(nK)) break;
          }
        }
      }
      return p > 0.5 ? n - K : K;
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var num = 1 - 2 * this.p;
      var den = Math.sqrt(this.n * (1 - this.p) * this.p);
      return num / den;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.n * this.p * (1 - this.p);
    }
  }]);

  return Binomial;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Binomial.params = {
  n: {
    description: 'Integer greater than 0.',
    min: 0,
    minInclusive: false,
    discrete: true
  },
  p: {
    description: 'Real number in the range [0, 1].',
    min: 0,
    minInclusive: true,
    max: 1,
    maxInclusive: true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Binomial.distName = 'Binomial';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Binomial.discrete = true;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cauchy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Clauchy distribution.
 * @class Cauchy
 * @extends DistAbstract
 *
 ******************************************************************************/
var Cauchy = exports.Cauchy = function (_DistAbstract) {
  _inherits(Cauchy, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param location {Number} Real number.
   * @param scale {Number} > 0.
   * @throws {ParamError} On invalid scale.
   */
  function Cauchy(location, scale) {
    _classCallCheck(this, Cauchy);

    var _this = _possibleConstructorReturn(this, (Cauchy.__proto__ || Object.getPrototypeOf(Cauchy)).call(this));

    _this.location = location;
    if (scale <= 0) {
      throw new _ParamError2.default(1, 'scale', 'scale parameter must be greater than 0.');
    }
    _this.scale = scale;
    return _this;
  }

  /**
   * Cumulative distribution function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Cauchy, [{
    key: 'cdf',
    value: function cdf(x) {
      return 1 / Math.PI * Math.atan((x - this.location) / this.scale) + 0.5;
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {undefined}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return undefined;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {undefined}
     */

  }, {
    key: 'mean',
    value: function mean() {
      return undefined;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.location;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.location;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      return 1 / (Math.PI * this.scale * (1 + Math.pow((x - this.location) / this.scale, 2)));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {};
    }

    /**
     * Samples random value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      return this.location + this.scale * Math.tan(Math.PI * generator.random());
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {undefined}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return undefined;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {undefined}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return undefined;
    }
  }]);

  return Cauchy;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Cauchy.params = {
  location: {
    description: 'Real number.'
  },
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Cauchy.distName = 'Cauchy';

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Custom = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _Uniform = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Custom distribution.
 * @class Custom
 * @extends DistAbstract
 *
 ******************************************************************************/
var Custom = exports.Custom = function (_DistAbstract) {
  _inherits(Custom, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param values {Number[]} Values for distribution.
   */
  function Custom(values) {
    _classCallCheck(this, Custom);

    var _this = _possibleConstructorReturn(this, (Custom.__proto__ || Object.getPrototypeOf(Custom)).call(this));

    _this.values = values.sort(function (a, b) {
      return a - b;
    });
    return _this;
  }

  /**
   * Cumulative distribution function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Custom, [{
    key: 'cdf',
    value: function cdf(x) {

      var index = -1;
      var n = this.values.length;

      if (x < this.values[0]) {
        return 0;
      }

      var i = n - 1;
      while (i >= 0) {
        if (this.values[i] <= x) {
          index = i;
          break;
        }
        i--;
      }

      return (index + 1) / n;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number}
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.values.reduce(function (acc, cur) {
        return acc + cur;
      }) / this.values.length;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      var n = this.values.length;
      if (n % 2 === 0) {
        return (this.values[n / 2 - 1] + this.values[n / 2]) / 2;
      }
      return this.values[(n - 1) / 2];
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      return this.values.reduce(function (acc, cur) {
        return acc + (cur === x ? 1 : 0);
      }, 0) / this.values.length;
    }

    /**
     * Samples random value from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var u = new _Uniform.Uniform(0, this.values.length);
      var i = Math.floor(u.sample(1, generator));
      return this.values[i];
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      var mean = this.mean();
      return this.values.reduce(function (acc, cur) {
        return acc + Math.pow(cur - mean, 2);
      }, 0) / (this.values.length - 1);
    }
  }]);

  return Custom;
}(_util.DistAbstract);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Erlang = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Provides an Erlang distribution with shape k (natural number) and rate lambda
 * (positive number).
 * @class Erlang
 * @extends DistAbstract
 *
 ******************************************************************************/
var Erlang = exports.Erlang = function (_DistAbstract) {
  _inherits(Erlang, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param shape {Number} Shape k, a positive integer.
   * @param rate {Number} Rate lambda. >0
   * @throws {ParamError} On invalid parameter value.
   */
  function Erlang(shape, rate) {
    _classCallCheck(this, Erlang);

    var _this = _possibleConstructorReturn(this, (Erlang.__proto__ || Object.getPrototypeOf(Erlang)).call(this));

    if (shape < 1 || Math.floor(shape) !== shape) {
      throw new _ParamError2.default(0, 'shape', 'shape parameter must be positive integer.');
    }
    if (rate <= 0) {
      throw new _ParamError2.default(1, 'rate', 'rate parameter must be positive.');
    }
    _this.shape = shape;
    _this.rate = rate;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Erlang, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) {
        return 0;
      }
      var num = (0, _essyStats.lowerIncGamma)(this.shape, x * this.rate);
      var den = (0, _essyStats.factorial)(this.shape - 1);
      return num / den;
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 6 / this.shape;
    }

    /**
     * Returns mean value.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.shape / this.rate;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return 1 / this.rate * (this.shape - 1);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      var num = Math.pow(this.rate, this.shape) * Math.pow(x, this.shape - 1) * Math.exp(-x * this.rate);
      var den = (0, _essyStats.factorial)(this.shape - 1);
      return num / den;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Samples distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var prod = 1;
      for (var i = 0; i < this.shape; i++) {
        prod *= generator.random();
      }
      return -Math.log(prod) / this.rate;
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 2 / Math.sqrt(this.shape);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.shape / Math.pow(this.rate, 2);
    }
  }]);

  return Erlang;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Erlang.params = {
  shape: {
    description: 'Positive integer.',
    min: 0,
    minInclusive: false,
    discrete: true
  },
  rate: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Erlang.distName = 'Erlang';

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Exponential = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/

/*******************************************************************************
 *
 * Exponential distribution. Adapted from CERN Java implementation.
 * @class Exponential
 * @extends DistAbstract
 *
 ******************************************************************************/
var Exponential = exports.Exponential = function (_DistAbstract) {
  _inherits(Exponential, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param lambda {Number} Scale parameter value. >0
   * @throws {ParamError} On invalid parameter value.
   */
  function Exponential(lambda) {
    _classCallCheck(this, Exponential);

    var _this = _possibleConstructorReturn(this, (Exponential.__proto__ || Object.getPrototypeOf(Exponential)).call(this));

    if (lambda <= 0) {
      throw new _ParamError2.default(0, 'lambda', 'lambda parameter must be greater than 0.');
    }
    _this.lambda = lambda;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Exponential, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) return 0;
      return 1 - Math.exp(-x * this.lambda);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 6;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Mean of distribution.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return 1 / this.lambda;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return 1 / this.lambda * Math.log(2);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return 0;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 0) return 0;
      return this.lambda * Math.exp(-x * this.lambda);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Returns sample value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample from distribution.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      return -Math.log(generator.random()) / this.lambda;
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 2;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return Math.pow(this.lambda, -2);
    }
  }]);

  return Exponential;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Exponential.params = {
  lambda: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Exponential.distName = 'Exponential';

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.F = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ChiSquared = __webpack_require__(5);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * An F distribution.
 * @class F
 * @extends DistAbstract
 *
 ******************************************************************************/
var F = exports.F = function (_DistAbstract) {
  _inherits(F, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param df1 {Number} > 0
   * @param df2 {Number} > 0
   * @throws {ParamError} If parameters are out of range.
   */
  function F(df1, df2) {
    _classCallCheck(this, F);

    var _this = _possibleConstructorReturn(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this));

    if (df1 <= 0) {
      throw new _ParamError2.default(0, 'df1', 'df1 parameter must be greater than 0.');
    }
    if (df2 <= 0) {
      throw new _ParamError2.default(1, 'df2', 'df2 parameter must be greater than 0.');
    }
    _this.df1 = df1;
    _this.df2 = df2;
    return _this;
  }

  /**
   * Cumulative distribution function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(F, [{
    key: 'cdf',
    value: function cdf(x) {
      return (0, _essyStats.regIncBeta)(this.df1 / 2, this.df2 / 2, x * this.df1 / (x * this.df1 + this.df2));
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      if (this.df2 > 8) {
        var n = this.df1;
        var m = this.df2;
        var num = 12 * ((5 * m - 22) * n * (m + n - 2) + (m - 4) * Math.pow(m - 2, 2));
        var den = (m - 8) * (m - 6) * n * (m - n - 2);
        return num / den;
      }
      return undefined;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number}
     */

  }, {
    key: 'mean',
    value: function mean() {
      if (this.df2 <= 2) {
        return undefined;
      }
      return this.df2 / (this.df2 - 2);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return undefined;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.df1 * (this.df2 - 2) / (this.df2 * (this.df1 + 2));
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 0.01) x = 0.01;
      var num = Math.pow(x * this.df1, this.df1) * Math.pow(this.df2, this.df2),
          den = Math.pow(x * this.df1 + this.df2, this.df1 + this.df2);
      return Math.sqrt(num / den) / (x * (0, _essyStats.beta)(this.df1 / 2, this.df2 / 2));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Samples random value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var c1 = new _ChiSquared.ChiSquared(this.df1),
          c2 = new _ChiSquared.ChiSquared(this.df2);

      return c1.sample(1, generator) / this.df1 / (c2.sample(1, generator) / this.df2);
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var n = this.df1;
      var m = this.df2;

      if (m > 6) {
        var num = 2 * Math.sqrt(2) * Math.sqrt(m - 4) * (m + 2 * n - 2);
        var den = (m - 6) * Math.sqrt(n) * Math.sqrt(m + n - 2);
        return num / den;
      }
      return undefined;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      if (this.df2 <= 4) {
        return undefined;
      }
      return 2 * Math.pow(this.df2, 2) * (this.df1 + this.df2 - 2) / (this.df1 * Math.pow(this.df2 - 2, 2) * (this.df2 - 4));
    }
  }]);

  return F;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


F.params = {
  n: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  },
  m: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
F.distName = 'F';

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright � 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hypergeometric = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Validates integer.
 * @method checkInt
 * @param int {Number} Integer to check.
 * @param max {Number} [optional] Max allowed for integer.
 * @return {Boolean} True if valid.
 */
function checkInt(int, max) {
  if (int < 0) return false;
  if (Math.floor(int) !== int) return false;
  if (typeof max !== 'undefined') {
    if (int > max) return false;
  }
  return true;
}

/**
 * Performs n choose k.
 * @method choose
 * @param n {Number}
 * @param k {Number}
 * @return {Number}
 */
function choose(n, k) {

  if (k < 0) return 0;
  if (k === 0) return 1;
  if (k === 1) return n;

  // binomial(n,k) = (n * n-1 * ... * n-k+1 ) / ( 1 * 2 * ... * k )
  var a = n - k + 1,
      b = 1,
      bin = 1;
  for (var i = k; i-- > 0;) {
    bin *= a++ / b++;
  }
  return bin;
}

// From cern.jet.math.Arithmetic
var logFactorials = [0.00000000000000000, 0.00000000000000000, 0.69314718055994531, 1.79175946922805500, 3.17805383034794562, 4.78749174278204599, 6.57925121201010100, 8.52516136106541430, 10.60460290274525023, 12.80182748008146961, 15.10441257307551530, 17.50230784587388584, 19.98721449566188615, 22.55216385312342289, 25.19122118273868150, 27.89927138384089157, 30.67186010608067280, 33.50507345013688888, 36.39544520803305358, 39.33988418719949404, 42.33561646075348503, 45.38013889847690803, 48.47118135183522388, 51.60667556776437357, 54.78472939811231919, 58.00360522298051994, 61.26170176100200198, 64.55753862700633106, 67.88974313718153498, 71.25703896716800901];

// From cern.jet.math.Arithmetic
function logFactorial(k) {
  k = Math.floor(k);
  if (k >= 30) {
    var r, rr;
    var C0 = 9.18938533204672742e-01;
    var C1 = 8.33333333333333333e-02;
    var C3 = -2.77777777777777778e-03;
    var C5 = 7.93650793650793651e-04;
    var C7 = -5.95238095238095238e-04;

    r = 1.0 / k;
    rr = r * r;
    return (k + 0.5) * Math.log(k) - k + C0 + r * (C1 + rr * (C3 + rr * (C5 + rr * C7)));
  } else {
    return logFactorials[k];
  }
}

// From cern.jet.math.Arithmetic
function fc_lnpk(k, N_Mn, M, n) {
  return logFactorial(k) + logFactorial(M - k) + logFactorial(n - k) + logFactorial(N_Mn + k);
}

/*******************************************************************************
 *
 * A hypergeometric distribution.
 * @class Hypergeometric
 * @extends DistAbstract
 *
 ******************************************************************************/

var Hypergeometric = exports.Hypergeometric = function (_DistAbstract) {
  _inherits(Hypergeometric, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param N {Number} Integer >= 0.
   * @param M {Number} Integer >= 0 and <= N.
   * @param n {Number} Integer >= 0 and <= N.
   * @throws {ParamError} On invalid parameter value.
   */
  function Hypergeometric(N, M, n) {
    _classCallCheck(this, Hypergeometric);

    var _this = _possibleConstructorReturn(this, (Hypergeometric.__proto__ || Object.getPrototypeOf(Hypergeometric)).call(this));

    if (!checkInt(N)) {
      throw new _ParamError2.default(0, 'N', 'N parameter must be integer greater than or equal to 0.');
    }
    if (!checkInt(M, N)) {
      throw new _ParamError2.default(1, 'M', 'M parameter must be integer greater than or equal to 0 and less than or equal to N.');
    }
    if (!checkInt(n, N)) {
      throw new _ParamError2.default(2, 'n', 'n parameter must be integer greater than or equal to 0 and less than or equal to N.');
    }
    _this.N = N;
    _this.M = M;
    _this.n = n;

    // cached vars shared by hmdu(...) and hprs(...)
    _this.N_last = _this.M_last = _this.n_last = -1;
    _this.N_Mn = _this.m = null;

    // cached vars for hmdu(...)
    _this.mp = _this.b = _this.Mp = _this.np = _this.fm = null;

    // cached vars for hprs(...)
    _this.k2 = _this.k4 = _this.k1 = _this.k5 = null;
    _this.dl = _this.dr = _this.r1 = _this.r2 = _this.r4 = _this.r5 = _this.ll = _this.lr = _this.c_pm = null;
    _this.f1 = _this.f2 = _this.f4 = _this.f5 = _this.p1 = _this.p2 = _this.p3 = _this.p4 = _this.p5 = _this.p6 = null;
    return _this;
  }

  /**
   * Returns distribution kurtosis.
   * @method kurtosis
   * @return {Number}
   */


  _createClass(Hypergeometric, [{
    key: 'kurtosis',
    value: function kurtosis() {
      var n = this.N;
      var m = this.M;
      var N = this.n;
      var num1 = (N - 1) * Math.pow(N, 2);
      var num2 = 3 * m * (N - m) * (Math.pow(n, 2) * -N + (n - 2) * Math.pow(N, 2) + 6 * n * (N - n)) / Math.pow(N, 2);
      var num3 = 6 * n * (N - n) + N * (N + 1);
      var num = num1 * (num2 - num3);
      var den = m * n * (N - 3) * (N - 2) * (N - m) * (N - n);
      return num / den;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number}
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.n * (this.M / this.N);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      var a = (this.n + 1) * (this.M + 1);
      var b = this.N + 2;
      return Math.floor(a / b);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     * @throws {RangeError} If x is not an integer.
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {

      var min = Math.max(0, this.n + this.M - this.N),
          max = Math.min(this.n, this.M);

      if (x < min || x > max) return 0;

      if (Math.floor(x) !== x) {
        throw new RangeError('x must be an integer.');
      }

      return choose(this.M, x) * choose(this.N - this.M, this.n - x) / choose(this.N, this.n);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: Math.max(0, this.n + this.M - this.N),
        minInclusive: true,
        max: Math.min(this.n, this.M),
        maxInclusive: true,
        discrete: true
      };
    }

    /**
     * Samples random value. From cern.jet.random.HyperGeometric.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var Nhalf, n_le_Nhalf, M_le_Nhalf, K;

      Nhalf = this.N / 2;
      n_le_Nhalf = this.n <= Nhalf ? this.n : this.N - this.n;
      M_le_Nhalf = this.M <= Nhalf ? this.M : this.N - this.M;

      if (this.n * this.M / this.N < 10) {
        K = n_le_Nhalf <= M_le_Nhalf ? this.hmdu(this.N, M_le_Nhalf, n_le_Nhalf, generator) : this.hmdu(this.N, n_le_Nhalf, M_le_Nhalf, generator);
      } else {
        K = n_le_Nhalf <= M_le_Nhalf ? this.hprs(this.N, M_le_Nhalf, n_le_Nhalf, generator) : this.hprs(this.N, n_le_Nhalf, M_le_Nhalf, generator);
      }

      if (this.n <= Nhalf) {
        return this.M <= Nhalf ? K : this.n - K;
      } else {
        return this.M <= Nhalf ? this.M - K : this.n - this.N + this.M + K;
      }
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var n = this.N;
      var m = this.M;
      var N = this.n;
      var num = Math.sqrt(N - 1) * (N - 2 * m) * (N - 2 * n);
      var den = (N - 2) * Math.sqrt(m * n * (N - m) * (N - n));
      return num / den;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.n * (this.M / this.N) * ((this.N - this.M) / this.N) * ((this.N - this.n) / (this.N - 1));
    }

    /**
     * From cern.jet.random.HyperGeometric
     */

  }, {
    key: 'hmdu',
    value: function hmdu(N, M, n, generator) {

      var I, K, p, nu, c, d, U;

      if (N != this.N_last || M != this.M_last || n != this.n_last) {
        // set-up           */
        this.N_last = N;
        this.M_last = M;
        this.n_last = n;

        this.Mp = M + 1;
        this.np = n + 1;this.N_Mn = N - M - n;

        p = this.Mp / (N + 2.0);
        nu = this.np * p; /* mode, real       */
        if ((this.m = nu) == nu && p == 0.5) {
          /* mode, integer    */
          this.mp = this.m--;
        } else {
          this.mp = this.m + 1; /* mp = m + 1       */
        }

        /* mode probability, using the external function flogfak(k) = ln(k!)    */
        this.fm = Math.exp(logFactorial(N - M) - logFactorial(this.N_Mn + this.m) - logFactorial(n - this.m) + logFactorial(M) - logFactorial(M - this.m) - logFactorial(this.m) - logFactorial(N) + logFactorial(N - n) + logFactorial(n));

        /* safety bound  -  guarantees at least 17 significant decimal digits   */
        /*                  b = min(n, (long int)(nu + k*c')) */
        this.b = nu + 11.0 * Math.sqrt(nu * (1.0 - p) * (1.0 - n / N) + 1.0);
        if (this.b > n) this.b = n;
      }

      for (;;) {
        if ((U = generator.random() - this.fm) <= 0.0) return this.m;
        c = d = this.fm;

        /* down- and upward search from the mode                                */
        for (I = 1; I <= this.m; I++) {
          K = this.mp - I; /* downward search  */
          c *= K / (this.np - K) * ((this.N_Mn + K) / (this.Mp - K));
          if ((U -= c) <= 0.0) return K - 1;

          K = this.m + I; /* upward search    */
          d *= (this.np - K) / K * ((this.Mp - K) / (this.N_Mn + K));
          if ((U -= d) <= 0.0) return K;
        }

        /* upward search from K = 2m + 1 to K = b                               */
        for (K = this.mp + this.m; K <= this.b; K++) {
          d *= (this.np - K) / K * ((this.Mp - K) / (this.N_Mn + K));
          if ((U -= d) <= 0.0) return K;
        }
      }
    }
  }, {
    key: 'hprs',
    value: function hprs(N, M, n, generator) {

      var Dk, X, V, Mp, np, p, nu, U, Y, W;

      if (N != this.N_last || M != this.M_last || n != this.n_last) {
        /* set-up            */
        this.N_last = N;
        this.M_last = M;
        this.n_last = n;

        Mp = M + 1;
        np = n + 1;this.N_Mn = N - M - n;

        p = Mp / (N + 2.0);nu = np * p; // main parameters

        // approximate deviation of reflection points k2, k4 from nu - 1/2
        U = Math.sqrt(nu * (1.0 - p) * (1.0 - (n + 2.0) / (N + 3.0)) + 0.25);

        // mode m, reflection points k2 and k4, and points k1 and k5, which
        // delimit the centre region of h(x)
        // k2 = ceil (nu - 1/2 - U),    k1 = 2*k2 - (m - 1 + delta_ml)
        // k4 = floor(nu - 1/2 + U),    k5 = 2*k4 - (m + 1 - delta_mr)

        this.m = nu;
        this.k2 = Math.ceil(nu - 0.5 - U);if (this.k2 >= this.m) this.k2 = this.m - 1;
        this.k4 = nu - 0.5 + U;
        this.k1 = this.k2 + this.k2 - this.m + 1; // delta_ml = 0
        this.k5 = this.k4 + this.k4 - this.m; // delta_mr = 1

        // range width of the critical left and right centre region
        this.dl = this.k2 - this.k1;
        this.dr = this.k5 - this.k4;

        // recurrence constants r(k) = p(k)/p(k-1) at k = k1, k2, k4+1, k5+1
        this.r1 = (np / this.k1 - 1.0) * (Mp - this.k1) / (this.N_Mn + this.k1);
        this.r2 = (np / this.k2 - 1.0) * (Mp - this.k2) / (this.N_Mn + this.k2);
        this.r4 = (np / (this.k4 + 1) - 1.0) * (M - this.k4) / (this.N_Mn + this.k4 + 1);
        this.r5 = (np / (this.k5 + 1) - 1.0) * (M - this.k5) / (this.N_Mn + this.k5 + 1);

        // reciprocal values of the scale parameters of expon. tail envelopes
        this.ll = Math.log(this.r1); // expon. tail left  //
        this.lr = -Math.log(this.r5); // expon. tail right //

        // hypergeom. constant, necessary for computing function values f(k)

        this.c_pm = fc_lnpk(this.m, this.N_Mn, M, n);

        // function values f(k) = p(k)/p(m)  at  k = k2, k4, k1, k5
        this.f2 = Math.exp(this.c_pm - fc_lnpk(this.k2, this.N_Mn, M, n));
        this.f4 = Math.exp(this.c_pm - fc_lnpk(this.k4, this.N_Mn, M, n));
        this.f1 = Math.exp(this.c_pm - fc_lnpk(this.k1, this.N_Mn, M, n));
        this.f5 = Math.exp(this.c_pm - fc_lnpk(this.k5, this.N_Mn, M, n));

        // area of the two centre and the two exponential tail regions
        // area of the two immediate acceptance regions between k2, k4
        this.p1 = this.f2 * (this.dl + 1.0); // immed. left
        this.p2 = this.f2 * this.dl + this.p1; // centre left
        this.p3 = this.f4 * (this.dr + 1.0) + this.p2; // immed. right
        this.p4 = this.f4 * this.dr + this.p3; // centre right
        this.p5 = this.f1 / this.ll + this.p4; // expon. tail left
        this.p6 = this.f5 / this.lr + this.p5; // expon. tail right
      }

      for (;;) {
        // generate uniform number U -- U(0, p6)
        // case distinction corresponding to U
        if ((U = generator.random() * this.p6) < this.p2) {
          // centre left

          // immediate acceptance region R2 = [k2, m) *[0, f2),  X = k2, ... m -1
          if ((W = U - this.p1) < 0.0) return this.k2 + U / this.f2;
          // immediate acceptance region R1 = [k1, k2)*[0, f1),  X = k1, ... k2-1
          if ((Y = W / this.dl) < this.f1) return this.k1 + W / this.f1;

          // computation of candidate X < k2, and its counterpart V > k2
          // either squeeze-acceptance of X or acceptance-rejection of V
          Dk = this.dl * generator.random() + 1;
          if (Y <= this.f2 - Dk * (this.f2 - this.f2 / this.r2)) {
            // quick accept of
            return this.k2 - Dk; // X = k2 - Dk
          }
          if ((W = this.f2 + this.f2 - Y) < 1.0) {
            // quick reject of V
            V = this.k2 + Dk;
            if (W <= this.f2 + Dk * (1.0 - this.f2) / (this.dl + 1.0)) {
              // quick accept of
              return V; // V = k2 + Dk
            }
            if (Math.log(W) <= this.c_pm - fc_lnpk(V, this.N_Mn, M, n)) {
              return V; // final accept of V
            }
          }
          X = this.k2 - Dk;
        } else if (U < this.p4) {
          // centre right

          // immediate acceptance region R3 = [m, k4+1)*[0, f4), X = m, ... k4
          if ((W = U - this.p3) < 0.0) return this.k4 - (U - this.p2) / this.f4;
          // immediate acceptance region R4 = [k4+1, k5+1)*[0, f5)
          if ((Y = W / this.dr) < this.f5) return this.k5 - W / this.f5;

          // computation of candidate X > k4, and its counterpart V < k4
          // either squeeze-acceptance of X or acceptance-rejection of V
          Dk = this.dr * generator.random() + 1;
          if (Y <= this.f4 - Dk * (this.f4 - this.f4 * this.r4)) {
            // quick accept of
            return this.k4 + Dk; // X = k4 + Dk
          }
          if ((W = this.f4 + this.f4 - Y) < 1.0) {
            // quick reject of V
            V = this.k4 - Dk;
            if (W <= this.f4 + Dk * (1.0 - this.f4) / this.dr) {
              // quick accept of
              return V; // V = k4 - Dk
            }
            if (Math.log(W) <= this.c_pm - fc_lnpk(V, this.N_Mn, M, n)) {
              return V; // final accept of V
            }
          }
          X = this.k4 + Dk;
        } else {

          Y = generator.random();
          if (U < this.p5) {
            // expon. tail left
            Dk = 1.0 - Math.log(Y) / this.ll;
            if ((X = this.k1 - Dk) < 0) continue; // 0 <= X <= k1 - 1
            Y *= (U - this.p4) * this.ll; // Y -- U(0, h(x))
            if (Y <= this.f1 - Dk * (this.f1 - this.f1 / this.r1)) {
              return X; // quick accept of X
            }
          } else {
            // expon. tail right
            Dk = 1.0 - Math.log(Y) / this.lr;
            if ((X = this.k5 + Dk) > n) continue; // k5 + 1 <= X <= n
            Y *= (U - this.p5) * this.lr; // Y -- U(0, h(x))   /
            if (Y <= this.f5 - Dk * (this.f5 - this.f5 * this.r5)) {
              return X; // quick accept of X
            }
          }
        }

        // acceptance-rejection test of candidate X from the original area
        // test, whether  Y <= f(X),    with  Y = U*h(x)  and  U -- U(0, 1)
        // log f(X) = log( m! (M - m)! (n - m)! (N - M - n + m)! )
        //          - log( X! (M - X)! (n - X)! (N - M - n + X)! )
        // by using an external function for log k!

        if (Math.log(Y) <= this.c_pm - fc_lnpk(X, this.N_Mn, M, n)) return X;
      }
    }
  }]);

  return Hypergeometric;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Hypergeometric.params = {
  N: {
    description: 'Integer greater than or equal to 0.',
    discrete: true,
    min: 0,
    minInclusive: true
  },
  M: {
    description: 'Integer greater than or equal to 0 and less than or equal to N.',
    discrete: true,
    min: 0,
    minInclusive: true,
    max: 'N',
    maxInclusive: true
  },
  n: {
    description: 'Integer greater than or equal to 0 and less than or equal to N.',
    discrete: true,
    min: 0,
    minInclusive: true,
    max: 'N',
    maxInclusive: true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Hypergeometric.distName = 'Hypergeometric';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Hypergeometric.discrete = true;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Laplace = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Laplace distribution.
 * @class Laplace
 * @extends DistAbstract
 *
 ******************************************************************************/
var Laplace = exports.Laplace = function (_DistAbstract) {
  _inherits(Laplace, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param location {Number} Location mu, real number.
   * @param scale {Number} Scale s, greater than 0.
   * @throws {ParamError} On invalid parameter.
   */
  function Laplace(location, scale) {
    _classCallCheck(this, Laplace);

    var _this = _possibleConstructorReturn(this, (Laplace.__proto__ || Object.getPrototypeOf(Laplace)).call(this));

    if (scale <= 0) {
      throw new _ParamError2.default(1, 'scale', 'scale must be greater than 0.');
    }
    _this.location = location;
    _this.scale = scale;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Laplace, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < this.location) {
        return 0.5 * Math.exp(-(Math.abs(x - this.location) / this.scale));
      } else {
        return 1 - 0.5 * Math.exp(-(x - this.location) / this.scale);
      }
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return 6;
    }

    /**
     * Returns mean value.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.location;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.location;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.location;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      return 1 / (2 * this.scale) * Math.exp(-(Math.abs(x - this.location) / this.scale));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {};
    }

    /**
     * Generates sample.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var u = generator.random() - 0.5;
      var sgn = u === 0 ? 0 : u > 0 ? 1 : -1;
      return this.location - this.scale * sgn * Math.log(1 - 2 * Math.abs(u));
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return 0;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return 2 * this.scale * this.scale;
    }
  }]);

  return Laplace;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Laplace.params = {
  location: {
    description: 'Real number.'
  },
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Laplace.distName = 'Laplace';

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Levy = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _Normal = __webpack_require__(4);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Levy distribution.
 * @class Levy
 * @extends DistAbstract
 *
 ******************************************************************************/
var Levy = exports.Levy = function (_DistAbstract) {
  _inherits(Levy, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param location {Number}
   * @param scale {Number} Greater than 0.
   * @throws {ParamError}
   */
  function Levy(location, scale) {
    _classCallCheck(this, Levy);

    var _this = _possibleConstructorReturn(this, (Levy.__proto__ || Object.getPrototypeOf(Levy)).call(this));

    if (scale <= 0) {
      throw new _ParamError2.default(1, 'scale', 'scale must be greater than 0.');
    }
    _this.location = location;
    _this.scale = scale;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Levy, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < this.location) {
        return 0;
      }
      return 1 - (0, _essyStats.erf)(Math.sqrt(this.scale / (2 * (x - this.location))));
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return undefined;
    }

    /**
     * Returns mean value.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return Number.POSITIVE_INFINITY;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.location + this.scale / (2 * Math.pow(1 / (1 - (0, _essyStats.erf)(1 / 2)), 2));
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.location === 0 ? this.scale / 3 : undefined;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x <= this.location) {
        return 0;
      }
      var a = Math.sqrt(this.scale / (2 * Math.PI));
      var b = Math.exp(-(this.scale / (2 * (x - this.location))));
      var c = Math.pow(x - this.location, 1.5);
      return a * (b / c);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: this.location,
        minInclusive: true
      };
    }

    /**
     * Generates sample.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var u = generator.random();
      var n = new _Normal.Normal(0, 1);
      var x = 1 - u / 2;
      return this.location + this.scale / Math.pow(1 / n.cdf(x), 2);
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return undefined;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return Number.POSITIVE_INFINITY;
    }
  }]);

  return Levy;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Levy.params = {
  location: {
    description: 'Real number.'
  },
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Levy.distName = 'Levy';

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logarithmic = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/

/*******************************************************************************
 *
 * A logarithmic distribution. Adapted from CERN Java implementation.
 * @class Logarithmic
 * @extends DistAbstract
 *
 ******************************************************************************/
var Logarithmic = exports.Logarithmic = function (_DistAbstract) {
  _inherits(Logarithmic, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param prob {Number} Probability parameter value. [0, 1]
   * @throws {ParamError} On invalid parameter value.
   */
  function Logarithmic(prob) {
    _classCallCheck(this, Logarithmic);

    var _this = _possibleConstructorReturn(this, (Logarithmic.__proto__ || Object.getPrototypeOf(Logarithmic)).call(this));

    if (prob <= 0 || prob >= 1) {
      throw new _ParamError2.default(0, 'probability', 'probability parameter must be in range (0, 1).');
    }
    _this.prob = prob;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Logarithmic, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 1) {
        return 0;
      }
      return 1 + (0, _essyStats.incBeta)(x + 1, 0.0000000000000000001, this.prob) / Math.log(1 - this.prob);
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Mean value for distribution.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return -1 / Math.log(1 - this.prob) * (this.prob / (1 - this.prob));
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return 1;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 1) {
        return 0;
      }
      return -1 / Math.log(1 - this.prob) * (Math.pow(this.prob, x) / x);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 1,
        minInclusive: true,
        discrete: true
      };
    }

    /**
     * Returns sampled value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var a = this.prob;
      var t = -1,
          h = -1,
          u = void 0,
          v = void 0,
          p = void 0,
          q = void 0,
          k = void 0;

      if (a < 0.97) {
        t = -a / Math.log(1 - a);
      } else {
        h = Math.log(1 - a);
      }

      u = generator.random();
      if (a < 0.97) {
        k = 1;
        p = t;
        while (u > p) {
          u -= p;
          k++;
          p *= a * (k - 1) / k;
        }
        return k;
      }

      if (u > a) {
        return 1;
      }

      u = generator.random();
      v = u;
      q = 1 - Math.exp(v * h);
      if (u <= q * q) {
        k = 1 + Math.log(u) / Math.log(q);
        return k;
      }
      if (u > q) {
        return 1;
      }
      return 2;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return -this.prob * ((this.prob + Math.log(1 - this.prob)) / (Math.pow(1 - this.prob, 2) * Math.pow(Math.log(1 - this.prob), 2)));
    }
  }]);

  return Logarithmic;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Logarithmic.params = {
  probability: {
    description: 'Real number in range (0, 1).',
    min: 0,
    minInclusive: false,
    max: 1,
    maxInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Logarithmic.distName = 'Logarithmic';

/**
 * Indication that distribution is discrete.
 * @property discrete
 * @type Boolean
 * @static
 */
Logarithmic.discrete = true;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogLogistic = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _Logistic = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: Confirm sampling...

/*******************************************************************************
 *
 * Log Logisitic distribution.
 * @class LogLogistic
 * @extends DistAbstract
 *
 ******************************************************************************/
var LogLogistic = exports.LogLogistic = function (_DistAbstract) {
  _inherits(LogLogistic, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param scale {Number} Scale parameter value.
   * @param shape {Number} Shape parameter value.
   * @throws {ParamError} On invalid parameter.
   */
  function LogLogistic(scale, shape) {
    _classCallCheck(this, LogLogistic);

    var _this = _possibleConstructorReturn(this, (LogLogistic.__proto__ || Object.getPrototypeOf(LogLogistic)).call(this));

    if (scale <= 0) {
      throw new _ParamError2.default(0, 'scale', 'scale parameter must be greater than 0.');
    }
    if (shape <= 0) {
      throw new _ParamError2.default(1, 'shape', 'shape parameter must be greater than 0.');
    }
    _this.scale = scale;
    _this.shape = shape;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(LogLogistic, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) return 0;
      return 1 / (1 + Math.pow(x / this.scale, -this.shape));
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      if (this.shape < 1) throw new Error('LogLogistic shape parameter < 1: no mean defined.');
      return this.scale * Math.PI / this.shape / Math.sin(Math.PI / this.shape);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.scale;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.shape > 1 ? this.scale * Math.pow((this.shape - 1) / (this.shape + 1), 1 / this.shape) : 0;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 0) return 0;
      var num = this.shape / this.scale * Math.pow(x / this.scale, this.shape - 1);
      var den = Math.pow(1 + Math.pow(x / this.scale, this.shape), 2);
      return num / den;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Samples distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var l = new _Logistic.Logistic(Math.log(this.scale), 1 / this.shape);
      var s = l.sampleValue(generator);
      return Math.exp(s);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      if (this.shape <= 2) {
        return undefined;
      }
      var a = this.scale;
      var b = Math.PI / this.shape;
      return Math.pow(a, 2) * (2 * b / Math.sin(2 * b) - Math.pow(b, 2) / Math.pow(Math.sin(b), 2));
    }
  }]);

  return LogLogistic;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


LogLogistic.params = {
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  },
  shape: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
LogLogistic.distName = 'Log-logistic';

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogNormal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _Normal = __webpack_require__(4);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Log Normal distribution.
 * @class LogNormal
 * @extends DistAbstract
 *
 ******************************************************************************/
var LogNormal = exports.LogNormal = function (_DistAbstract) {
  _inherits(LogNormal, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param mean {Number} Log mean.
   * @param se {Number} Log se.
   * @throws {ParamError} If se is not greater than 0.
   */
  function LogNormal(mean, se) {
    _classCallCheck(this, LogNormal);

    var _this = _possibleConstructorReturn(this, (LogNormal.__proto__ || Object.getPrototypeOf(LogNormal)).call(this));

    if (se <= 0) {
      throw new _ParamError2.default(1, 'se', 'se parameter must be greater than 0.');
    }
    _this.m = mean;
    _this.se = se;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(LogNormal, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x <= 0) return 0;
      if (x < 0.01) x = 0.01;
      return 0.5 + 0.5 * (0, _essyStats.erf)((Math.log(x) - this.m) / (this.se * Math.sqrt(2)));
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      var m = this.m;
      var s = this.se;
      return 3 * Math.exp(2 * Math.pow(s, 2)) + 2 * Math.exp(3 * Math.pow(s, 2)) + Math.exp(4 * Math.pow(s, 2)) - 3;
    }

    /**
     * Returns mean of distribution.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return Math.exp(this.m + Math.pow(this.se, 2) / 2);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return Math.exp(this.m);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return Math.exp(this.m - Math.pow(this.se, 2));
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x <= 0) return 0;
      if (x < 0.01) x = 0.01;
      return 1 / (x * this.se * Math.sqrt(2 * Math.PI)) * Math.exp(-Math.pow(Math.log(x) - this.m, 2) / (2 * Math.pow(this.se, 2)));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: false
      };
    }

    /**
     * Samples value from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var n = new _Normal.Normal(0, 1);
      var s = n.sampleValue(generator);
      return Math.exp(this.m + s * this.se);
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return Math.sqrt(Math.exp(Math.pow(this.se, 2)) - 1) * (Math.exp(Math.pow(this.se, 2)) + 2);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return (Math.exp(this.se * this.se) - 1) * Math.exp(2 * this.m + this.se * this.se);
    }
  }]);

  return LogNormal;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


LogNormal.params = {
  mean: {
    description: 'Real number.'
  },
  se: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
LogNormal.distName = 'Log-normal';

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegativeBinomial = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _Gamma = __webpack_require__(6);

var _Poisson = __webpack_require__(8);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Log Normal distribution.
 * @class NegativeBinomial
 * @extends DistAbstract
 *
 ******************************************************************************/
var NegativeBinomial = exports.NegativeBinomial = function (_DistAbstract) {
  _inherits(NegativeBinomial, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param r {Number} Number of failures before stopping.
   * @param p {Number} Probability of success.
   * @throws {ParamError}
   */
  function NegativeBinomial(r, p) {
    _classCallCheck(this, NegativeBinomial);

    var _this = _possibleConstructorReturn(this, (NegativeBinomial.__proto__ || Object.getPrototypeOf(NegativeBinomial)).call(this));

    if (r !== Math.floor(r) || r < 1) {
      throw new _ParamError2.default(0, 'r', 'r parameter must be integer greater than 0.');
    }
    if (p <= 0 || p >= 1) {
      throw new _ParamError2.default(1, 'p', 'p parameter must be in the range (0, 1).');
    }
    _this.r = r;
    _this.p = p;
    _this.gamma = new _Gamma.Gamma(_this.r, _this.p / (1 - _this.p)); //1);
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(NegativeBinomial, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) {
        return 0;
      }
      return (0, _essyStats.regIncBeta)(this.r, x + 1, this.p);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return (Math.pow(this.p, 2) - 6 * this.p + 6) / (this.r * (1 - this.p));
    }

    /**
     * Returns mean of distribution.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.r * (1 - this.p) / this.p;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return undefined;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return 1 + Math.floor((this.r - 1) / this.p);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      return (0, _essyStats.binomial)(x + this.r - 1, this.r - 1) * Math.pow(1 - this.p, x) * Math.pow(this.p, this.r);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        discrete: true,
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Samples value from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var y = this.gamma.sampleValue(generator);
      var p = new _Poisson.Poisson(y);
      return p.sampleValue(generator);
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return (2 - this.p) / Math.sqrt(this.r * (1 - this.p));
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.r * (1 - this.p) / Math.pow(this.p, 2);
    }
  }]);

  return NegativeBinomial;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


NegativeBinomial.params = {
  r: {
    description: 'Integer greater than 0.',
    min: 0,
    minInclusive: false,
    discrete: true
  },
  p: {
    description: 'Real number in the range (0, 1)',
    min: 0,
    minInclusive: false,
    max: 1,
    maxInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
NegativeBinomial.distName = 'Negative Binomial';

/**
 * Set flag as discrete distribution.
 * @property discrete
 * @type Boolean
 * @static
 */
NegativeBinomial.discrete = true;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pareto = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _Uniform = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * Pareto distribution.
 * @class Pareto
 * @extends DistAbstract
 *
 ******************************************************************************/
var Pareto = exports.Pareto = function (_DistAbstract) {
  _inherits(Pareto, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param scale {Number} > 0.
   * @param shape {Number} > 0.
   * @throws {ParamError} On invalid parameter value.
   */
  function Pareto(scale, shape) {
    _classCallCheck(this, Pareto);

    var _this = _possibleConstructorReturn(this, (Pareto.__proto__ || Object.getPrototypeOf(Pareto)).call(this));

    if (scale <= 0) {
      throw new _ParamError2.default(0, 'scale', 'scale parameter must be greater than 0.');
    }
    if (shape <= 0) {
      throw new _ParamError2.default(1, 'shape', 'shape parameter must be greater than 0.');
    }
    _this.scale = scale;
    _this.shape = shape;
    return _this;
  }

  /**
   * Cumulative distribution function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Pareto, [{
    key: 'cdf',
    value: function cdf(x) {
      return x < this.scale ? 0 : 1 - Math.pow(this.scale / x, this.shape);
    }

    /**
     * Returns distribution kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {

      var a = this.shape;

      if (a > 4) {
        var num = 3 * (a - 2) * (3 * Math.pow(a, 2) + a + 2);
        var den = (a - 4) * (a - 3) * a;
        return num / den;
      }
      return undefined;
    }

    /**
     * Returns distribution mean.
     * @method mean
     * @return {Number}
     */

  }, {
    key: 'mean',
    value: function mean() {
      if (this.shape <= 1) {
        return Number.POSITIVE_INFINITY;
      }
      return this.shape * this.scale / (this.shape - 1);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.scale * Math.pow(2, 1 / this.shape);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.scale;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      return x < this.scale ? 0 : this.shape * Math.pow(this.scale, this.shape) / Math.pow(x, this.shape + 1);
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: this.scale,
        minInclusive: true
      };
    }

    /**
     * Samples random value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number}
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      var u = new _Uniform.Uniform(0, 1),
          s = u.sample(1, generator);
      while (s === 0) {
        s = u.sample(1, generator);
      }
      return this.scale / Math.pow(s, 1 / this.shape);
    }

    /**
     * Returns distribution skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var a = this.shape;
      if (a > 3) {
        var num = 2 * Math.sqrt((a - 2) / a) * (a + 1);
        return num / (a - 3);
      }
      return undefined;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      if (this.shape <= 2) {
        return Number.POSITIVE_INFINITY;
      }
      return this.shape * Math.pow(this.scale, 2) / (Math.pow(this.shape - 1, 2) * (this.shape - 2));
    }
  }]);

  return Pareto;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Pareto.params = {
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  },
  shape: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Pareto.distName = 'Pareto';

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rayleigh = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * A Rayleigh distribution.
 * @class Rayleigh
 * @extends DistAbstract
 *
 ******************************************************************************/
var Rayleigh = exports.Rayleigh = function (_DistAbstract) {
  _inherits(Rayleigh, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param scale {Number} Scale, > 0.
   * @throws {ParamError} If scale is out of range.
   */
  function Rayleigh(scale) {
    _classCallCheck(this, Rayleigh);

    var _this = _possibleConstructorReturn(this, (Rayleigh.__proto__ || Object.getPrototypeOf(Rayleigh)).call(this));

    if (scale <= 0) {
      throw new _ParamError2.default(0, 'scale', 'scale parameter must be greater than 0.');
    }
    _this.scale = scale;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Rayleigh, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < 0) return 0;
      return 1 - Math.exp(-Math.pow(x, 2) / (2 * Math.pow(this.scale, 2)));
    }

    /**
     * Returns kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return (32 - 3 * Math.pow(Math.PI, 2)) / Math.pow(4 - Math.PI, 2) - 3;
    }

    /**
     * Returns mean.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.scale * Math.sqrt(Math.PI / 2);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.scale * Math.sqrt(2 * Math.log(2));
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.scale;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < 0) return 0;
      return x / Math.pow(this.scale, 2) * Math.exp(-Math.pow(x, 2) / (2 * Math.pow(this.scale, 2)));
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Returns sample from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      return this.scale * Math.sqrt(-2 * Math.log(1 - generator.random()));
    }

    /**
     * Returns skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var num = (Math.PI - 3) * Math.sqrt(Math.PI / 2);
      var den = Math.pow(2 - Math.PI / 2, 3 / 2);
      return num / den;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return (4 - Math.PI) / 2 * this.scale * this.scale;
    }
  }]);

  return Rayleigh;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Rayleigh.params = {
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Rayleigh.distName = 'Rayleigh';

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StudentT = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Copyright � 1999 CERN - European Organization for Nuclear Research.
Permission to use, copy, modify, distribute and sell this software and its documentation for any purpose
is hereby granted without fee, provided that the above copyright notice appear in all copies and
that both that copyright notice and this permission notice appear in supporting documentation.
CERN makes no representations about the suitability of this software for any purpose.
It is provided "as is" without expressed or implied warranty.
*/
var StudentT = exports.StudentT = function (_DistAbstract) {
  _inherits(StudentT, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param freedom {Number} Degrees of freedom. >0
   * @throws {ParamError} On invalid freedom.
   */
  function StudentT(freedom) {
    _classCallCheck(this, StudentT);

    var _this = _possibleConstructorReturn(this, (StudentT.__proto__ || Object.getPrototypeOf(StudentT)).call(this));

    if (freedom <= 0) {
      throw new _ParamError2.default(0, 'df', 'freedom parameter must be greater than 0.');
    }
    _this.df = freedom;
    return _this;
  }

  /**
   * Cumulative distribution function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(StudentT, [{
    key: 'cdf',
    value: function cdf(x) {
      var c = 0.5 * (0, _essyStats.regIncBeta)(0.5 * this.df, 0.5, this.df / (this.df + x * x));
      if (x >= 0) {
        c = 1 - c;
      }
      return c;
    }

    /**
     * Returns kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      if (this.df > 4) {
        return 6 / (this.df - 4) + 3;
      }
      return undefined;
    }

    /**
     * Returns mean.
     * @method mean
     * @return {Number}
     */

  }, {
    key: 'mean',
    value: function mean() {
      if (this.df <= 1) {
        return NaN;
      }
      return 0;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return 0;
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return 0;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      var a = (0, _essyStats.gamma)((this.df + 1) / 2);
      var b = Math.sqrt(this.df * Math.PI) * (0, _essyStats.gamma)(this.df / 2);
      var c = Math.pow(1 + Math.pow(x, 2) / this.df, -((this.df + 1) / 2));
      return a / b * c;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   min {Number} [optional] Defined if min value.
     */

  }, {
    key: 'range',
    value: function range() {
      return {};
    }

    /**
     * Returns sampled value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var u, v, w;

      do {
        u = 2 * generator.random() - 1;
        v = 2 * generator.random() - 1;
      } while ((w = u * u + v * v) > 1);

      return u * Math.sqrt(this.df * (Math.exp(-2 / this.df * Math.log(w)) - 1) / w);
    }

    /**
     * Returns skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      return this.df > 3 ? 0 : undefined;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      if (this.df > 2) {
        return this.df / (this.df - 2);
      }
      if (this.df > 1) {
        return Number.POSITIVE_INFINITY;
      }
      return NaN;
    }
  }]);

  return StudentT;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


StudentT.params = {
  df: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
StudentT.distName = "Student's T";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triangular = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * A triangular distribution.
 * @class Triangular
 * @extends DistAbstract
 *
 ******************************************************************************/
var Triangular = exports.Triangular = function (_DistAbstract) {
  _inherits(Triangular, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param min {Number} Minimum value.
   * @param mode {Number} Mode value. >= min and <= max.
   * @param max {Number} Maximum value. > max.
   * @throws {ParamError} On invalid parameters.
   */
  function Triangular(min, mode, max) {
    _classCallCheck(this, Triangular);

    var _this = _possibleConstructorReturn(this, (Triangular.__proto__ || Object.getPrototypeOf(Triangular)).call(this));

    if (max <= min) {
      throw new _ParamError2.default(2, 'max', 'max parameter must be greater than min.');
    }
    if (mode < min) {
      throw new _ParamError2.default(1, 'mode', 'mode parameter must be greater than or equal to min.');
    }
    if (mode > max) {
      throw new _ParamError2.default(1, 'mode', 'mode parameter must be less than or equal to max.');
    }
    _this.min = min;
    _this.modeP = mode;
    _this.max = max;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Triangular, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x < this.min) {
        return 0;
      }
      if (x <= this.modeP) {
        return Math.pow(x - this.min, 2) / ((this.max - this.min) * (this.modeP - this.min));
      }
      if (x < this.max) {
        return 1 - Math.pow(this.max - x, 2) / ((this.max - this.min) * (this.max - this.modeP));
      }
      return 1;
    }

    /**
     * Returns kurtosis.
     * @method kurtosis
     * @return {Number}
     */

  }, {
    key: 'kurtosis',
    value: function kurtosis() {
      return -0.6;
    }

    /**
     * Returns mean.
     * @method mean
     * @return {Number} Distribution mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return (this.min + this.modeP + this.max) / 3;
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      if (this.modeP >= (this.min + this.max) / 2) {
        return this.min + Math.sqrt((this.max - this.min) * (this.modeP - this.min) / 2);
      } else {
        return this.max - Math.sqrt((this.max - this.min) * (this.max - this.modeP) / 2);
      }
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.modeP;
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x < this.min) {
        return 0;
      }
      if (x < this.modeP) {
        return 2 * (x - this.min) / ((this.max - this.min) * (this.modeP - this.min));
      }
      if (x === this.modeP) {
        return 2 / (this.max - this.min);
      }
      if (x <= this.max) {
        return 2 * (this.max - x) / ((this.max - this.min) * (this.max - this.modeP));
      }
      return 0;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: this.min,
        minInclusive: true,
        max: this.max,
        maxInclusive: true
      };
    }

    /**
     * Returns sampled value.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sampled value.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {

      var a = this.min;
      var b = this.max;
      var m = this.modeP;
      var t = (m - a) / (b - a);
      var r = generator.random();

      if (r <= t) {
        return a + Math.sqrt(r * (m - a) * (b - a));
      } else {
        return b - Math.sqrt((1 - r) * (b - m) * (b - a));
      }
    }

    /**
     * Returns skewness.
     * @method skewness
     * @return {Number}
     */

  }, {
    key: 'skewness',
    value: function skewness() {
      var a = this.min;
      var b = this.max;
      var c = this.modeP;
      var num = Math.sqrt(2) * (a + b - 2 * c) * (2 * a - b - c) * (a - 2 * b + c);
      var den = 5 * Math.pow(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2) - a * b - a * c - b * c, 3 / 2);
      return num / den;
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return (this.min * this.min + this.modeP * this.modeP + this.max * this.max - this.min * this.max - this.min * this.modeP - this.max * this.modeP) / 18;
    }
  }]);

  return Triangular;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Triangular.params = {
  min: {
    description: 'Real number less than or equal to mode.',
    max: 'mode',
    maxInclusive: true
  },
  mode: {
    description: 'Real number.',
    min: 'min',
    minInclusive: true,
    max: 'max',
    maxInclusive: true
  },
  max: {
    description: 'Real number greater than or equal to mode.',
    min: 'mode',
    minInclusive: true
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Triangular.distName = 'Triangular';

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weibull = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _ParamError = __webpack_require__(1);

var _ParamError2 = _interopRequireDefault(_ParamError);

var _essyStats = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*******************************************************************************
 *
 * A Weibull distribution.
 * @class Weibull
 * @extends DistAbstract
 *
 ******************************************************************************/
var Weibull = exports.Weibull = function (_DistAbstract) {
  _inherits(Weibull, _DistAbstract);

  /**
   * Constructor.
   * @method constructor
   * @param shape {Number} Shape parameter value. >0
   * @param scale {Number} Scale parameter value. >0
   * @throws {ParamError} On invalid parameter.
   */
  function Weibull(shape, scale) {
    _classCallCheck(this, Weibull);

    var _this = _possibleConstructorReturn(this, (Weibull.__proto__ || Object.getPrototypeOf(Weibull)).call(this));

    if (shape <= 0) {
      throw new _ParamError2.default(0, 'shape', 'shape parameter must be greater than 0.');
    }
    if (scale <= 0) {
      throw new _ParamError2.default(1, 'scale', 'scale parameter must be greater than 0.');
    }
    _this.alpha = shape;
    _this.beta = scale;
    return _this;
  }

  /**
   * Cumulative density function.
   * @method cdf
   * @param x {Number}
   * @return {Number}
   */


  _createClass(Weibull, [{
    key: 'cdf',
    value: function cdf(x) {
      if (x >= 0) {
        return 1 - Math.exp(-Math.pow(x / this.beta, this.alpha));
      }
      return 0;
    }

    /**
     * Returns mean for distribution.
     * @method mean
     * @return {Number} Mean value.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.beta * (0, _essyStats.gamma)(1 + 1 / this.alpha);
    }

    /**
     * Returns distribution median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.beta * Math.pow(Math.log(2), 1 / this.alpha);
    }

    /**
     * Returns distribution mode.
     * @method mode
     * @return {Number}
     */

  }, {
    key: 'mode',
    value: function mode() {
      return this.alpha <= 1 ? 0 : this.beta * Math.pow((this.alpha - 1) / this.alpha, 1 / this.alpha);
    }

    /**
     * Probability density function.
     * @method pdf
     * @param x {Number}
     * @return {Number}
     */

  }, {
    key: 'pdf',
    value: function pdf(x) {
      if (x >= 0) {
        return this.alpha / this.beta * Math.pow(x / this.beta, this.alpha - 1) * Math.exp(-Math.pow(x / this.beta, this.alpha));
      }
      return 0;
    }

    /**
     * Returns distribution range.
     * @method range
     * @return {Object} With properties:
     *   discrete {Boolean} [optional] True if only integers.
     *   max {Number} [optional] Defined if max value.
     *   maxInclusive {Boolean} [optional] True if max value is inclusive.
     *   min {Number} [optional] Defined if min value.
     *   minInclusive {Boolean} [optional] True if min value is inclusive.
     */

  }, {
    key: 'range',
    value: function range() {
      return {
        min: 0,
        minInclusive: true
      };
    }

    /**
     * Samples random value from distribution.
     * @method sampleValue
     * @param generator {RandomEngine} With random() method.
     * @return {Number} Random sample.
     */

  }, {
    key: 'sampleValue',
    value: function sampleValue(generator) {
      // Polar method.
      // See Simulation, Modelling & Analysis by Law & Kelton, pp259
      return Math.pow(this.beta * -Math.log(1 - generator.random()), 1 / this.alpha);
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number}
     */

  }, {
    key: 'variance',
    value: function variance() {
      return this.beta * this.beta * ((0, _essyStats.gamma)(1 + 2 / this.alpha) - Math.pow((0, _essyStats.gamma)(1 + 1 / this.alpha), 2));
    }
  }]);

  return Weibull;
}(_util.DistAbstract);

/**
 * Distribution parameters.
 * @property params
 * @type Object
 * @static
 */


Weibull.params = {
  shape: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  },
  scale: {
    description: 'Real number greater than 0.',
    min: 0,
    minInclusive: false
  }
};

/**
 * Distribution name.
 * @property distName
 * @type String
 * @static
 */
Weibull.distName = 'Weibull';

/***/ })
/******/ ])));

/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @source cern.jet.math.Polynomial
 * Evaluates the given polynomial of degree <tt>N</tt> at <tt>x</tt>, assuming coefficient of N is 1.0.
 * Otherwise same as <tt>polevl()</tt>.
 * <pre>
 *                     2          N
 * y  =  C  + C x + C x  +...+ C x
 *        0    1     2          N
 *
 * where C  = 1 and hence is omitted from the array.
 *        N
 *
 * Coefficients are stored in reverse order:
 *
 * coef[0] = C  , ..., coef[N-1] = C  .
 *            N-1                   0
 *
 * Calling arguments are otherwise the same as polevl().
 * </pre>
 * In the interest of speed, there are no checks for out of bounds arithmetic.
 *
 * @method p1evl
 * @param x argument to the polynomial.
 * @param coef the coefficients of the polynomial.
 * @param N the degree of the polynomial.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p1evl = p1evl;
exports.polevl = polevl;
function p1evl(x, coef, N) {

  var ans = x + coef[0];

  for (var i = 1; i < N; i++) {
    ans = ans * x + coef[i];
  }

  return ans;
}

/**
 * @source cern.jet.math.Polynomial 
 * Evaluates the given polynomial of degree <tt>N</tt> at <tt>x</tt>.
 * <pre>
 *                     2          N
 * y  =  C  + C x + C x  +...+ C x
 *        0    1     2          N
 *
 * Coefficients are stored in reverse order:
 *
 * coef[0] = C  , ..., coef[N] = C  .
 *            N                   0
 * </pre>
 * In the interest of speed, there are no checks for out of bounds arithmetic.
 *
 * @param x argument to the polynomial.
 * @param coef the coefficients of the polynomial.
 * @param N the degree of the polynomial.
 */
function polevl(x, coef, N) {
  var ans = coef[0];

  for (var i = 1; i <= N; i++) {
    ans = ans * x + coef[i];
  }

  return ans;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SampleStat = undefined;

var _Binomial = __webpack_require__(2);

Object.keys(_Binomial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Binomial[key];
    }
  });
});

var _Factorial = __webpack_require__(3);

Object.keys(_Factorial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Factorial[key];
    }
  });
});

var _Gamma = __webpack_require__(4);

Object.keys(_Gamma).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Gamma[key];
    }
  });
});

var _Polynomial = __webpack_require__(0);

Object.keys(_Polynomial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Polynomial[key];
    }
  });
});

var _SampleStat2 = __webpack_require__(5);

var _SampleStat3 = _interopRequireDefault(_SampleStat2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.SampleStat = _SampleStat3.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Calculates n choose k.
 * @source cern.jet.math.Arithmetic
 * @method binomial
 * @param n {Number}
 * @param k {Number}
 * @return {Number}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binomial = binomial;
function binomial(n, k) {
  if (k < 0) return 0;
  if (k === 0) return 1;
  if (k === 1) return n;

  var a = n - k + 1;
  var b = 1;
  var bin = 1;

  for (var i = k; i-- > 0;) {
    bin *= a++ / b++;
  }
  return bin;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// k! for k = 0, ..., 20

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.factorial = factorial;
var longFactorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000];

// k! for k = 21, ..., 170
var doubleFactorials = [5.109094217170944E19, 1.1240007277776077E21, 2.585201673888498E22, 6.204484017332394E23, 1.5511210043330984E25, 4.032914611266057E26, 1.0888869450418352E28, 3.048883446117138E29, 8.841761993739701E30, 2.652528598121911E32, 8.222838654177924E33, 2.6313083693369355E35, 8.68331761881189E36, 2.952327990396041E38, 1.0333147966386144E40, 3.719933267899013E41, 1.3763753091226346E43, 5.23022617466601E44, 2.0397882081197447E46, 8.15915283247898E47, 3.34525266131638E49, 1.4050061177528801E51, 6.041526306337384E52, 2.6582715747884495E54, 1.196222208654802E56, 5.502622159812089E57, 2.5862324151116827E59, 1.2413915592536068E61, 6.082818640342679E62, 3.0414093201713376E64, 1.5511187532873816E66, 8.06581751709439E67, 4.274883284060024E69, 2.308436973392413E71, 1.2696403353658264E73, 7.109985878048632E74, 4.052691950487723E76, 2.350561331282879E78, 1.386831185456898E80, 8.32098711274139E81, 5.075802138772246E83, 3.146997326038794E85, 1.9826083154044396E87, 1.2688693218588414E89, 8.247650592082472E90, 5.443449390774432E92, 3.6471110918188705E94, 2.48003554243683E96, 1.7112245242814127E98, 1.1978571669969892E100, 8.504785885678624E101, 6.123445837688612E103, 4.470115461512686E105, 3.307885441519387E107, 2.4809140811395404E109, 1.8854947016660506E111, 1.451830920282859E113, 1.1324281178206295E115, 8.94618213078298E116, 7.15694570462638E118, 5.797126020747369E120, 4.7536433370128435E122, 3.94552396972066E124, 3.314240134565354E126, 2.8171041143805494E128, 2.4227095383672744E130, 2.107757298379527E132, 1.854826422573984E134, 1.6507955160908465E136, 1.4857159644817605E138, 1.3520015276784033E140, 1.2438414054641305E142, 1.156772507081641E144, 1.0873661566567426E146, 1.0329978488239061E148, 9.916779348709491E149, 9.619275968248216E151, 9.426890448883248E153, 9.332621544394415E155, 9.332621544394418E157, 9.42594775983836E159, 9.614466715035125E161, 9.902900716486178E163, 1.0299016745145631E166, 1.0813967582402912E168, 1.1462805637347086E170, 1.2265202031961373E172, 1.324641819451829E174, 1.4438595832024942E176, 1.5882455415227423E178, 1.7629525510902457E180, 1.974506857221075E182, 2.2311927486598138E184, 2.543559733472186E186, 2.925093693493014E188, 3.393108684451899E190, 3.96993716080872E192, 4.6845258497542896E194, 5.574585761207606E196, 6.689502913449135E198, 8.094298525273444E200, 9.875044200833601E202, 1.2146304367025332E205, 1.506141741511141E207, 1.882677176888926E209, 2.3721732428800483E211, 3.0126600184576624E213, 3.856204823625808E215, 4.974504222477287E217, 6.466855489220473E219, 8.471580690878813E221, 1.1182486511960037E224, 1.4872707060906847E226, 1.99294274616152E228, 2.690472707318049E230, 3.6590428819525483E232, 5.0128887482749884E234, 6.917786472619482E236, 9.615723196941089E238, 1.3462012475717523E241, 1.8981437590761713E243, 2.6953641378881633E245, 3.8543707171800694E247, 5.550293832739308E249, 8.047926057471989E251, 1.1749972043909107E254, 1.72724589045464E256, 2.5563239178728637E258, 3.8089226376305687E260, 5.7133839564458575E262, 8.627209774233244E264, 1.3113358856834527E267, 2.0063439050956838E269, 3.0897696138473515E271, 4.789142901463393E273, 7.471062926282892E275, 1.1729568794264134E278, 1.8532718694937346E280, 2.946702272495036E282, 4.714723635992061E284, 7.590705053947223E286, 1.2296942187394494E289, 2.0044015765453032E291, 3.287218585534299E293, 5.423910666131583E295, 9.003691705778434E297, 1.5036165148649983E300, 2.5260757449731988E302, 4.2690680090047056E304, 7.257415615308004E306];

/**
 * Instantly returns the factorial <tt>k!</tt>.
 * @method factorial
 * @param k must hold <tt>k &gt;= 0</tt>.
 * @source cern.jet.math.Arithmetic.factorial
 */
function factorial(k) {

	if (k < 0) throw new RangeError('factorial() called with argument less than 0.');

	var length1 = longFactorials.length;
	if (k < length1) return longFactorials[k];

	var length2 = doubleFactorials.length;
	if (k < length1 + length2) return doubleFactorials[k - length1];else return Number.POSITIVE_INFINITY;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Polynomial = __webpack_require__(0);

var Polynomial = _interopRequireWildcard(_Polynomial);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var MACHEP = 1.11022302462515654042E-16;
var MAXLOG = 7.09782712893383996732E2;
var MINLOG = -7.451332191019412076235E2;
var MAXGAM = 171.624376956302725;
var SQTPI = 2.50662827463100050242E0;
var SQRTH = 7.07106781186547524401E-1;
var LOGPI = 1.14472988584940017414;

var big = 4.503599627370496e15;
var biginv = 2.22044604925031308085e-16;

/**
 * Returns beta function.
 * @source cern.jet.stat.Gamma
 * @method beta
 * @param a {Number} Alpha parameter.
 * @param b {Number} Beta parameter.
 */
function beta(a, b) {

	var y = void 0;

	y = a + b;
	y = gamma(y);
	if (y == 0.0) return 1.0;

	if (a > b) {
		y = gamma(a) / y;
		y *= gamma(b);
	} else {
		y = gamma(b) / y;
		y *= gamma(a);
	}

	return y;
}

/**
 * Returns the error function of the normal distribution; formerly named <tt>erf</tt>.
 * The integral is
 * <pre>
 *                           x
 *                            -
 *                 2         | |          2
 *   erf(x)  =  --------     |    exp( - t  ) dt.
 *              sqrt(pi)   | |
 *                          -
 *                           0
 * </pre>
 * <b>Implementation:</b>
 * For <tt>0 <= |x| < 1, erf(x) = x * P4(x**2)/Q5(x**2)</tt>; otherwise
 * <tt>erf(x) = 1 - erfc(x)</tt>.
 * <p>
 * Code adapted from the <A HREF="http://www.sci.usq.edu.au/staff/leighb/graph/Top.html">Java 2D Graph Package 2.4</A>,
 * which in turn is a port from the <A HREF="http://people.ne.mediaone.net/moshier/index.html#Cephes">Cephes 2.2</A> Math Library (C).
 *
 * @param a the argument to the function.
 */
function erf(x) {
	var y = void 0,
	    z = void 0;
	var T = [9.60497373987051638749E0, 9.00260197203842689217E1, 2.23200534594684319226E3, 7.00332514112805075473E3, 5.55923013010394962768E4];
	var U = [
	//1.00000000000000000000E0,
	3.35617141647503099647E1, 5.21357949780152679795E2, 4.59432382970980127987E3, 2.26290000613890934246E4, 4.92673942608635921086E4];

	if (Math.abs(x) > 1.0) return 1.0 - erfComplemented(x);
	z = x * x;
	y = x * Polynomial.polevl(z, T, 4) / Polynomial.p1evl(z, U, 5);
	return y;
}

/**
 * Returns the complementary Error function of the normal distribution; formerly named <tt>erfc</tt>.
 * <pre>
 *  1 - erf(x) =
 *
 *                           inf.
 *                             -
 *                  2         | |          2
 *   erfc(x)  =  --------     |    exp( - t  ) dt
 *               sqrt(pi)   | |
 *                           -
 *                            x
 * </pre>
 * <b>Implementation:</b>
 * For small x, <tt>erfc(x) = 1 - erf(x)</tt>; otherwise rational
 * approximations are computed.
 * <p>
 * Code adapted from the <A HREF="http://www.sci.usq.edu.au/staff/leighb/graph/Top.html">Java 2D Graph Package 2.4</A>,
 * which in turn is a port from the <A HREF="http://people.ne.mediaone.net/moshier/index.html#Cephes">Cephes 2.2</A> Math Library (C).
 *
 * @param a the argument to the function.
 */
function erfComplemented(a) {

	var x = void 0,
	    y = void 0,
	    z = void 0,
	    p = void 0,
	    q = void 0;

	var P = [2.46196981473530512524E-10, 5.64189564831068821977E-1, 7.46321056442269912687E0, 4.86371970985681366614E1, 1.96520832956077098242E2, 5.26445194995477358631E2, 9.34528527171957607540E2, 1.02755188689515710272E3, 5.57535335369399327526E2];
	var Q = [
	//1.0
	1.32281951154744992508E1, 8.67072140885989742329E1, 3.54937778887819891062E2, 9.75708501743205489753E2, 1.82390916687909736289E3, 2.24633760818710981792E3, 1.65666309194161350182E3, 5.57535340817727675546E2];

	var R = [5.64189583547755073984E-1, 1.27536670759978104416E0, 5.01905042251180477414E0, 6.16021097993053585195E0, 7.40974269950448939160E0, 2.97886665372100240670E0];
	var S = [
	//1.00000000000000000000E0,
	2.26052863220117276590E0, 9.39603524938001434673E0, 1.20489539808096656605E1, 1.70814450747565897222E1, 9.60896809063285878198E0, 3.36907645100081516050E0];

	if (a < 0.0) x = -a;else x = a;

	if (x < 1.0) return 1.0 - erf(a);

	z = -a * a;

	if (z < -MAXLOG) {
		if (a < 0) return 2.0;else return 0.0;
	}

	z = Math.exp(z);

	if (x < 8.0) {
		p = Polynomial.polevl(x, P, 8);
		q = Polynomial.p1evl(x, Q, 8);
	} else {
		p = Polynomial.polevl(x, R, 5);
		q = Polynomial.p1evl(x, S, 6);
	}

	y = z * p / q;

	if (a < 0) y = 2.0 - y;

	if (y == 0.0) {
		if (a < 0) return 2.0;else return 0.0;
	}

	return y;
}

/**
 * Returns the Gamma function of the argument.
 * @source cern.jet.stat.Gamma
 * @method gamma
 */
function gamma(x) {

	var P = [1.60119522476751861407E-4, 1.19135147006586384913E-3, 1.04213797561761569935E-2, 4.76367800457137231464E-2, 2.07448227648435975150E-1, 4.94214826801497100753E-1, 9.99999999999999996796E-1];
	var Q = [-2.31581873324120129819E-5, 5.39605580493303397842E-4, -4.45641913851797240494E-3, 1.18139785222060435552E-2, 3.58236398605498653373E-2, -2.34591795718243348568E-1, 7.14304917030273074085E-2, 1.00000000000000000320E0];

	var p = void 0,
	    z = void 0,
	    i = void 0;
	var q = Math.abs(x);

	if (q > 33.0) {
		if (x < 0.0) {
			p = Math.floor(q);
			if (p == q) throw new Error("gamma: overflow");
			i = Math.round(p);
			z = q - p;
			if (z > 0.5) {
				p += 1.0;
				z = q - p;
			}
			z = q * Math.sin(Math.PI * z);
			if (z == 0.0) throw new Error("gamma: overflow");
			z = Math.abs(z);
			z = Math.PI / (z * stirlingFormula(q));

			return -z;
		} else {
			return stirlingFormula(x);
		}
	}

	z = 1.0;
	while (x >= 3.0) {
		x -= 1.0;
		z *= x;
	}

	while (x < 0.0) {
		if (x == 0.0) {
			throw new Error("gamma: singular");
		} else if (x > -1.E-9) {
			return z / ((1.0 + 0.5772156649015329 * x) * x);
		}
		z /= x;
		x += 1.0;
	}

	while (x < 2.0) {
		if (x == 0.0) {
			throw new Error("gamma: singular");
		} else if (x < 1.e-9) {
			return z / ((1.0 + 0.5772156649015329 * x) * x);
		}
		z /= x;
		x += 1.0;
	}

	if (x == 2.0 || x == 3.0) return z;

	x -= 2.0;
	p = Polynomial.polevl(x, P, 6);
	q = Polynomial.polevl(x, Q, 7);

	return z * p / q;
}

/**
 * Incomplete beta function.
 * @method incBeta
 * @param a {Number} Alpha.
 * @param b {Number} Beta.
 * @param x {Number} End point.
 */
function incBeta(a, b, x) {
	return beta(a, b) * regIncBeta(a, b, x);
}

/**
 * Inverse incomplete beta function.
 * @method invIncBeta
 * @param p {Number} Probability.
 * @param alpha {Number}
 * @param beta {Number}
 */
function invIncBeta(p, alpha, beta) {

	var x = 0;
	var a = 0;
	var b = 1;
	var precision = Math.pow(10, -6);

	while (b - a > precision) {
		x = (a + b) / 2;
		if (incBeta(alpha, beta, x) > p) {
			b = x;
		} else {
			a = x;
		}
	}

	return x;
}

/**
 * Regularized inverse incomplete beta function.
 * @method regInvIncBeta
 * @param p {Number} Probability.
 * @param alpha {Number}
 * @param beta {Number}
 */
function regInvIncBeta(p, alpha, beta) {

	var x = 0;
	var a = 0;
	var b = 1;
	var precision = Math.pow(10, -6);

	while (b - a > precision) {
		x = (a + b) / 2;
		if (regIncBeta(alpha, beta, x) > p) {
			b = x;
		} else {
			a = x;
		}
	}

	return x;
}

/**
 * Returns the Incomplete Beta Function evaluated from zero to xx.
 * @source cern.jet.stat.Gamma
 * @method regIncBeta
 * @param aa the alpha parameter of the beta distribution.
 * @param bb the beta parameter of the beta distribution.
 * @param xx the integration end point.
 */
function regIncBeta(aa, bb, xx) {

	var a = void 0,
	    b = void 0,
	    t = void 0,
	    x = void 0,
	    xc = void 0,
	    w = void 0,
	    y = void 0,
	    flag = void 0;

	if (aa <= 0.0 || bb <= 0.0) throw new Error("ibeta: Domain error!");

	if (xx <= 0.0 || xx >= 1.0) {
		if (xx == 0.0) return 0.0;
		if (xx == 1.0) return 1.0;
		throw new Error("ibeta: Domain error!");
	}

	flag = false;
	if (bb * xx <= 1.0 && xx <= 0.95) {
		t = powerSeries(aa, bb, xx);
		return t;
	}

	w = 1.0 - xx;

	/* Reverse a and b if x is greater than the mean. */
	if (xx > aa / (aa + bb)) {
		flag = true;
		a = bb;
		b = aa;
		xc = xx;
		x = w;
	} else {
		a = aa;
		b = bb;
		xc = w;
		x = xx;
	}

	if (flag && b * x <= 1.0 && x <= 0.95) {
		t = powerSeries(a, b, x);
		if (t <= MACHEP) t = 1.0 - MACHEP;else t = 1.0 - t;
		return t;
	}

	/* Choose expansion for better convergence. */
	y = x * (a + b - 2.0) - (a - 1.0);
	if (y < 0.0) w = incompleteBetaFraction1(a, b, x);else w = incompleteBetaFraction2(a, b, x) / xc;

	/* Multiply w by the factor
   a      b   _             _     _
   x  (1-x)   | (a+b) / ( a | (a) | (b) ) .   */

	y = a * Math.log(x);
	t = b * Math.log(xc);
	if (a + b < MAXGAM && Math.abs(y) < MAXLOG && Math.abs(t) < MAXLOG) {
		t = Math.pow(xc, b);
		t *= Math.pow(x, a);
		t /= a;
		t *= w;
		t *= gamma(a + b) / (gamma(a) * gamma(b));
		if (flag) {
			if (t <= MACHEP) t = 1.0 - MACHEP;else t = 1.0 - t;
		}
		return t;
	}

	/* Resort to logarithms.  */
	y += t + logGamma(a + b) - logGamma(a) - logGamma(b);
	y += Math.log(w / a);
	if (y < MINLOG) t = 0.0;else t = Math.exp(y);

	if (flag) {
		if (t <= MACHEP) t = 1.0 - MACHEP;else t = 1.0 - t;
	}

	return t;
}

/**
 * @source cern.jet.stat.Gamma
 * Continued fraction expansion #1 for incomplete beta integral; formerly named <tt>incbcf</tt>.
 * @method incompleteBetaFraction1
 */
function incompleteBetaFraction1(a, b, x) {

	var xk = void 0,
	    pk = void 0,
	    pkm1 = void 0,
	    pkm2 = void 0,
	    qk = void 0,
	    qkm1 = void 0,
	    qkm2 = void 0;
	var k1 = void 0,
	    k2 = void 0,
	    k3 = void 0,
	    k4 = void 0,
	    k5 = void 0,
	    k6 = void 0,
	    k7 = void 0,
	    k8 = void 0;
	var r = void 0,
	    t = void 0,
	    ans = void 0,
	    thresh = void 0;
	var n = void 0;

	k1 = a;
	k2 = a + b;
	k3 = a;
	k4 = a + 1.0;
	k5 = 1.0;
	k6 = b - 1.0;
	k7 = k4;
	k8 = a + 2.0;

	pkm2 = 0.0;
	qkm2 = 1.0;
	pkm1 = 1.0;
	qkm1 = 1.0;
	ans = 1.0;
	r = 1.0;
	n = 0;
	thresh = 3.0 * MACHEP;
	do {
		xk = -(x * k1 * k2) / (k3 * k4);
		pk = pkm1 + pkm2 * xk;
		qk = qkm1 + qkm2 * xk;
		pkm2 = pkm1;
		pkm1 = pk;
		qkm2 = qkm1;
		qkm1 = qk;

		xk = x * k5 * k6 / (k7 * k8);
		pk = pkm1 + pkm2 * xk;
		qk = qkm1 + qkm2 * xk;
		pkm2 = pkm1;
		pkm1 = pk;
		qkm2 = qkm1;
		qkm1 = qk;

		if (qk != 0) r = pk / qk;
		if (r != 0) {
			t = Math.abs((ans - r) / r);
			ans = r;
		} else t = 1.0;

		if (t < thresh) return ans;

		k1 += 1.0;
		k2 += 1.0;
		k3 += 2.0;
		k4 += 2.0;
		k5 += 1.0;
		k6 -= 1.0;
		k7 += 2.0;
		k8 += 2.0;

		if (Math.abs(qk) + Math.abs(pk) > big) {
			pkm2 *= biginv;
			pkm1 *= biginv;
			qkm2 *= biginv;
			qkm1 *= biginv;
		}
		if (Math.abs(qk) < biginv || Math.abs(pk) < biginv) {
			pkm2 *= big;
			pkm1 *= big;
			qkm2 *= big;
			qkm1 *= big;
		}
	} while (++n < 300);

	return ans;
}

/**
 * @source cern.jet.stat.Gamma
 * Continued fraction expansion #2 for incomplete beta integral; formerly named <tt>incbd</tt>.
 * @method incompleteBetaFraction2
 */
function incompleteBetaFraction2(a, b, x) {

	var xk = void 0,
	    pk = void 0,
	    pkm1 = void 0,
	    pkm2 = void 0,
	    qk = void 0,
	    qkm1 = void 0,
	    qkm2 = void 0;
	var k1 = void 0,
	    k2 = void 0,
	    k3 = void 0,
	    k4 = void 0,
	    k5 = void 0,
	    k6 = void 0,
	    k7 = void 0,
	    k8 = void 0;
	var r = void 0,
	    t = void 0,
	    ans = void 0,
	    z = void 0,
	    thresh = void 0;
	var n = void 0;

	k1 = a;
	k2 = b - 1.0;
	k3 = a;
	k4 = a + 1.0;
	k5 = 1.0;
	k6 = a + b;
	k7 = a + 1.0;;
	k8 = a + 2.0;

	pkm2 = 0.0;
	qkm2 = 1.0;
	pkm1 = 1.0;
	qkm1 = 1.0;
	z = x / (1.0 - x);
	ans = 1.0;
	r = 1.0;
	n = 0;
	thresh = 3.0 * MACHEP;
	do {
		xk = -(z * k1 * k2) / (k3 * k4);
		pk = pkm1 + pkm2 * xk;
		qk = qkm1 + qkm2 * xk;
		pkm2 = pkm1;
		pkm1 = pk;
		qkm2 = qkm1;
		qkm1 = qk;

		xk = z * k5 * k6 / (k7 * k8);
		pk = pkm1 + pkm2 * xk;
		qk = qkm1 + qkm2 * xk;
		pkm2 = pkm1;
		pkm1 = pk;
		qkm2 = qkm1;
		qkm1 = qk;

		if (qk != 0) r = pk / qk;
		if (r != 0) {
			t = Math.abs((ans - r) / r);
			ans = r;
		} else t = 1.0;

		if (t < thresh) return ans;

		k1 += 1.0;
		k2 -= 1.0;
		k3 += 2.0;
		k4 += 2.0;
		k5 += 1.0;
		k6 += 1.0;
		k7 += 2.0;
		k8 += 2.0;

		if (Math.abs(qk) + Math.abs(pk) > big) {
			pkm2 *= biginv;
			pkm1 *= biginv;
			qkm2 *= biginv;
			qkm1 *= biginv;
		}
		if (Math.abs(qk) < biginv || Math.abs(pk) < biginv) {
			pkm2 *= big;
			pkm1 *= big;
			qkm2 *= big;
			qkm1 *= big;
		}
	} while (++n < 300);

	return ans;
}

/**
 * @source cern.jet.stat.Gamma
 * Returns the natural logarithm of the gamma function; formerly named <tt>lgamma</tt>.
 * @method logGamma
 */
function logGamma(x) {
	var p = void 0,
	    q = void 0,
	    w = void 0,
	    z = void 0;

	var A = [8.11614167470508450300E-4, -5.95061904284301438324E-4, 7.93650340457716943945E-4, -2.77777777730099687205E-3, 8.33333333333331927722E-2];
	var B = [-1.37825152569120859100E3, -3.88016315134637840924E4, -3.31612992738871184744E5, -1.16237097492762307383E6, -1.72173700820839662146E6, -8.53555664245765465627E5];
	var C = [
	/* 1.00000000000000000000E0, */
	-3.51815701436523470549E2, -1.70642106651881159223E4, -2.20528590553854454839E5, -1.13933444367982507207E6, -2.53252307177582951285E6, -2.01889141433532773231E6];

	if (x < -34.0) {
		q = -x;
		w = logGamma(q);
		p = Math.floor(q);
		if (p == q) throw new Error("lgam: Overflow");
		z = q - p;
		if (z > 0.5) {
			p += 1.0;
			z = p - q;
		}
		z = q * Math.sin(Math.PI * z);
		if (z == 0.0) throw new Error("lgamma: Overflow");
		z = LOGPI - Math.log(z) - w;
		return z;
	}

	if (x < 13.0) {
		z = 1.0;
		while (x >= 3.0) {
			x -= 1.0;
			z *= x;
		}
		while (x < 2.0) {
			if (x == 0.0) throw new Error("lgamma: Overflow");
			z /= x;
			x += 1.0;
		}
		if (z < 0.0) z = -z;
		if (x == 2.0) return Math.log(z);
		x -= 2.0;
		p = x * Polynomial.polevl(x, B, 5) / Polynomial.p1evl(x, C, 6);
		return Math.log(z) + p;
	}

	if (x > 2.556348e305) throw new Error("lgamma: Overflow");

	q = (x - 0.5) * Math.log(x) - x + 0.91893853320467274178;

	if (x > 1.0e8) return q;

	p = 1.0 / (x * x);
	if (x >= 1000.0) q += ((7.9365079365079365079365e-4 * p - 2.7777777777777777777778e-3) * p + 0.0833333333333333333333) / x;else q += Polynomial.polevl(p, A, 4) / x;

	return q;
}

/**
 * Returns the Incomplete Gamma function; formerly named <tt>igamma</tt>.
 * @source cern.jet.stat.Gamma
 * @method lowerIncGamma
 * @param a the parameter of the gamma distribution.
 * @param x the integration end point.
 */
function lowerIncGamma(a, x) {

	var ans = void 0,
	    ax = void 0,
	    c = void 0,
	    r = void 0;

	if (x <= 0 || a <= 0) return 0.0;

	if (x > 1.0 && x > a) return 1.0 - upperIncGamma(a, x);

	/* Compute  x**a * exp(-x) / gamma(a)  */
	ax = a * Math.log(x) - x - logGamma(a);
	if (ax < -MAXLOG) return 0.0;

	ax = Math.exp(ax);

	/* power series */
	r = a;
	c = 1.0;
	ans = 1.0;

	do {
		r += 1.0;
		c *= x / r;
		ans += c;
	} while (c / ans > MACHEP);

	return ans * ax / a;
}

/**
 * Returns the Complemented Incomplete Gamma function; formerly named <tt>igamc</tt>.
 * @source cern.jet.stat.Gamma
 * @method upperIncGamma
 * @param a the parameter of the gamma distribution.
 * @param x the integration start point.
 */
function upperIncGamma(a, x) {

	var ans = void 0,
	    ax = void 0,
	    c = void 0,
	    yc = void 0,
	    r = void 0,
	    t = void 0,
	    y = void 0,
	    z = void 0;
	var pk = void 0,
	    pkm1 = void 0,
	    pkm2 = void 0,
	    qk = void 0,
	    qkm1 = void 0,
	    qkm2 = void 0;

	if (x <= 0 || a <= 0) return 1.0;

	if (x < 1.0 || x < a) return 1.0 - lowerIncGamma(a, x);

	ax = a * Math.log(x) - x - logGamma(a);
	if (ax < -MAXLOG) return 0.0;

	ax = Math.exp(ax);

	/* continued fraction */
	y = 1.0 - a;
	z = x + y + 1.0;
	c = 0.0;
	pkm2 = 1.0;
	qkm2 = x;
	pkm1 = x + 1.0;
	qkm1 = z * x;
	ans = pkm1 / qkm1;

	do {
		c += 1.0;
		y += 1.0;
		z += 2.0;
		yc = y * c;
		pk = pkm1 * z - pkm2 * yc;
		qk = qkm1 * z - qkm2 * yc;
		if (qk != 0) {
			r = pk / qk;
			t = Math.abs((ans - r) / r);
			ans = r;
		} else t = 1.0;

		pkm2 = pkm1;
		pkm1 = pk;
		qkm2 = qkm1;
		qkm1 = qk;
		if (Math.abs(pk) > big) {
			pkm2 *= biginv;
			pkm1 *= biginv;
			qkm2 *= biginv;
			qkm1 *= biginv;
		}
	} while (t > MACHEP);

	return ans * ax;
}

/**
 * @source cern.jet.stat.Gamma
 * Power series for incomplete beta integral; formerly named <tt>pseries</tt>.
 * Use when b*x is small and x not too close to 1.
 * @method powerSeries
 */
function powerSeries(a, b, x) {
	var s = void 0,
	    t = void 0,
	    u = void 0,
	    v = void 0,
	    n = void 0,
	    t1 = void 0,
	    z = void 0,
	    ai = void 0;

	ai = 1.0 / a;
	u = (1.0 - b) * x;
	v = u / (a + 1.0);
	t1 = v;
	t = u;
	n = 2.0;
	s = 0.0;
	z = MACHEP * ai;
	while (Math.abs(v) > z) {
		u = (n - b) * x / n;
		t *= u;
		v = t / (a + n);
		s += v;
		n += 1.0;
	}
	s += t1;
	s += ai;

	u = a * Math.log(x);
	if (a + b < MAXGAM && Math.abs(u) < MAXLOG) {
		t = gamma(a + b) / (gamma(a) * gamma(b));
		s = s * t * Math.pow(x, a);
	} else {
		t = logGamma(a + b) - logGamma(a) - logGamma(b) + u + Math.log(s);
		if (t < MINLOG) s = 0.0;else s = Math.exp(t);
	}
	return s;
}

/**
 * @source cern.jet.stat.Gamma
 * Returns the Gamma function computed by Stirling's formula; formerly named <tt>stirf</tt>.
 * The polynomial STIR is valid for 33 <= x <= 172.
 * @method stirlingFormula
 */
function stirlingFormula(x) {
	var STIR = [7.87311395793093628397E-4, -2.29549961613378126380E-4, -2.68132617805781232825E-3, 3.47222221605458667310E-3, 8.33333333333482257126E-2];
	var MAXSTIR = 143.01608;

	var w = 1.0 / x;
	var y = Math.exp(x);

	w = 1.0 + w * Polynomial.polevl(w, STIR, 4);

	if (x > MAXSTIR) {
		/* Avoid overflow in Math.pow() */
		var v = Math.pow(x, 0.5 * x - 0.25);
		y = v * (v / y);
	} else {
		y = Math.pow(x, x - 0.5) / y;
	}
	y = SQTPI * y * w;
	return y;
}

exports.default = {
	beta: beta,
	erf: erf,
	gamma: gamma,
	incBeta: incBeta,
	invIncBeta: invIncBeta,
	logGamma: logGamma,
	lowerIncGamma: lowerIncGamma,
	powerSeries: powerSeries,
	regIncBeta: regIncBeta,
	regInvIncBeta: regInvIncBeta,
	stirlingFormula: stirlingFormula,
	upperIncGamma: upperIncGamma
};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*******************************************************************************
 *
 * Calculates sample statistics from data set.
 * @class SampleStat
 *
 ******************************************************************************/
var SampleStat = function () {

  /**
   * Constructor.
   * @method constructor
   * @param values {Number[]} Sample values.
   * @throws {RangeError} If no values.
   */
  function SampleStat(values) {
    _classCallCheck(this, SampleStat);

    if (!values || values.length < 1) {
      throw new RangeError('values must include at least one element.');
    }
    this.values = values.sort(function (a, b) {
      return a - b;
    });
    this.n = values.length;
  }

  /**
   * Returns kurtosis.
   * @method kurtosis
   * @return {Number}
   */


  _createClass(SampleStat, [{
    key: 'kurtosis',
    value: function kurtosis() {

      var mean = this.mean();
      var n = this.n;
      var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
      var b = this.values.reduce(function (acc, cur) {
        return acc + Math.pow(cur - mean, 4);
      }, 0) / Math.pow(this.variance(), 2);
      var c = 3 * (Math.pow(n - 1, 2) / ((n - 2) * (n - 3)));

      return a * b - c;
    }

    /**
     * Returns maximum value.
     * @method max
     * @return {Number}
     */

  }, {
    key: 'max',
    value: function max() {
      return this.values[this.n - 1];
    }

    /**
     * Returns mean.
     * @method mean
     * @return {Number} Sample mean.
     */

  }, {
    key: 'mean',
    value: function mean() {
      return this.values.reduce(function (acc, cur) {
        return acc + cur;
      }, 0) / this.n;
    }

    /**
     * Returns median.
     * @method median
     * @return {Number}
     */

  }, {
    key: 'median',
    value: function median() {
      return this.n % 2 === 0 ? (this.values[this.n / 2 - 1] + this.values[this.n / 2]) / 2 : this.values[(this.n - 1) / 2];
    }

    /**
     * Returns minimum sampled value.
     * @method min
     * @return {Number}
     */

  }, {
    key: 'min',
    value: function min() {
      return this.values[0];
    }

    /**
     * Calculates percentile.
     * @method percentile
     * @param x {Number}
     */

  }, {
    key: 'percentile',
    value: function percentile(x) {

      var index = this.values.indexOf(x);

      // Exact match.
      if (index > -1) {
        return index / (this.n - 1);
      }

      // Greater than all values.
      if (x > this.values[this.n - 1]) {
        return 1;
      }

      for (var i = this.n - 1; i >= 0; i--) {
        if (this.values[i] < x) {
          return i / (this.n - 1) + (x - this.values[i]) / (this.values[i + 1] - this.values[i]) / (this.n - 1);
        }
      }
      return 0;
    }

    /**
     * Calculates quantile.
     * @method quantile
     * @param p {Number} Percentile.
     * @return {Number}
     */

  }, {
    key: 'quantile',
    value: function quantile(p) {

      if (p < 0 || p > 1) {
        throw new RangeError('percentile must be in range [0, 1].');
      }
      if (this.n === 1) {
        return this.values[0];
      }

      var incr = 1 / (this.n - 1),
          index = p / incr,
          lower = Math.floor(index);

      // Return exact match or interpolate.
      return lower === index ? this.values[index] : this.values[lower] + (index - lower) * (this.values[lower + 1] - this.values[lower]);
    }

    /**
     * Returns sample range (max - min).
     * @method range
     * @return {Number}
     */

  }, {
    key: 'range',
    value: function range() {
      return this.values[this.n - 1] - this.values[0];
    }

    /**
     * Returns skew.
     * @method skew
     * @return {Number}
     */

  }, {
    key: 'skew',
    value: function skew() {
      var mean = this.mean();
      var sd = this.stdDev();
      return this.n / ((this.n - 1) * (this.n - 2)) * this.values.reduce(function (acc, cur) {
        return acc + Math.pow((cur - mean) / sd, 3);
      }, 0);
    }

    /**
     * Returns standard deviation.
     * @method stdDev
     * @return {Number}
     */

  }, {
    key: 'stdDev',
    value: function stdDev() {
      return Math.sqrt(this.variance());
    }

    /**
     * Returns variance.
     * @method variance
     * @return {Number} Sample variance.
     */

  }, {
    key: 'variance',
    value: function variance() {
      var mean = this.mean();
      return this.values.reduce(function (acc, cur) {
        return acc + Math.pow(cur - mean, 2);
      }, 0) / (this.n - 1);
    }
  }]);

  return SampleStat;
}();

exports.default = SampleStat;
module.exports = exports['default'];

/***/ })
/******/ ])));

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
  https://github.com/banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_seed(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
	if (seed == undefined) {
		seed = new Date().getTime();
	}

	/* Period parameters */
	this.N = 624;
	this.M = 397;
	this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	this.mt = new Array(this.N); /* the array for the state vector */
	this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

	if (seed.constructor == Array) {
		this.init_by_array(seed, seed.length);
	}
	else {
		this.init_seed(seed);
	}
}

/* initializes mt[N] with a seed */
/* origin name init_genrand */
MersenneTwister.prototype.init_seed = function(s) {
	this.mt[0] = s >>> 0;
	for (this.mti=1; this.mti<this.N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
		+ this.mti;
		/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
		/* In the previous versions, MSBs of the seed affect   */
		/* only MSBs of the array mt[].                        */
		/* 2002/01/09 modified by Makoto Matsumoto             */
		this.mt[this.mti] >>>= 0;
		/* for >32 bit machines */
	}
}

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
	var i, j, k;
	this.init_seed(19650218);
	i=1; j=0;
	k = (this.N>key_length ? this.N : key_length);
	for (; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
		+ init_key[j] + j; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++; j++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
		if (j>=key_length) j=0;
	}
	for (k=this.N-1; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
		- i; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
	}

	this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
}

/* generates a random number on [0,0xffffffff]-interval */
/* origin name genrand_int32 */
MersenneTwister.prototype.random_int = function() {
	var y;
	var mag01 = new Array(0x0, this.MATRIX_A);
	/* mag01[x] = x * MATRIX_A  for x=0,1 */

	if (this.mti >= this.N) { /* generate N words at one time */
		var kk;

		if (this.mti == this.N+1)  /* if init_seed() has not been called, */
			this.init_seed(5489);  /* a default initial seed is used */

		for (kk=0;kk<this.N-this.M;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (;kk<this.N-1;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
		this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	/* Tempering */
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
}

/* generates a random number on [0,0x7fffffff]-interval */
/* origin name genrand_int31 */
MersenneTwister.prototype.random_int31 = function() {
	return (this.random_int()>>>1);
}

/* generates a random number on [0,1]-real-interval */
/* origin name genrand_real1 */
MersenneTwister.prototype.random_incl = function() {
	return this.random_int()*(1.0/4294967295.0);
	/* divided by 2^32-1 */
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
	return this.random_int()*(1.0/4294967296.0);
	/* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
/* origin name genrand_real3 */
MersenneTwister.prototype.random_excl = function() {
	return (this.random_int() + 0.5)*(1.0/4294967296.0);
	/* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
/* origin name genrand_res53 */
MersenneTwister.prototype.random_long = function() {
	var a=this.random_int()>>>5, b=this.random_int()>>>6;
	return(a*67108864.0+b)*(1.0/9007199254740992.0);
}

/* These real versions are due to Isaku Wada, 2002/01/09 added */

module.exports = MersenneTwister;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = __webpack_require__(0);

module.exports = function () {
    function CuckooEgg(number, chromosomeLength) {
        _classCallCheck(this, CuckooEgg);

        this.number = number;
        this.representation = this.createEggRepresentation(number, chromosomeLength);
        this.oversize = false;
        this.value = null;
        this.weight = null;
        this.adaptationValue = null;
    }

    _createClass(CuckooEgg, [{
        key: 'createEggRepresentation',
        value: function createEggRepresentation(number, chromosomeLength) {
            var convertToBinary = void 0;
            convertToBinary = true;
            var eggRepresentation = '';

            if (convertToBinary) {
                var stringBinaryNumber = number.toString(2);
                var dotPosition = stringBinaryNumber.indexOf('.');
                var stringBinaryNumberWithoutDot = stringBinaryNumber.slice(0, dotPosition) + stringBinaryNumber.slice(dotPosition + 1);
                eggRepresentation = stringBinaryNumberWithoutDot;
            } else {
                var stringNumber = number.toString();
                var _dotPosition = stringNumber.indexOf('.');
                var stringNumberWithoutDot = stringNumber.slice(0, _dotPosition) + stringNumber.slice(_dotPosition + 1);
                for (var i = 0; i < stringNumberWithoutDot.length; i++) {
                    eggRepresentation += stringNumberWithoutDot[i] < 5 ? 0 : 1;
                }
            }

            while (eggRepresentation.length < chromosomeLength) {
                eggRepresentation += eggRepresentation;
            }

            return eggRepresentation.slice(0, chromosomeLength);
        }
    }, {
        key: 'calculateValueAndWeight',
        value: function calculateValueAndWeight(items, knapsackSize) {
            var value = 0;
            var weight = 0;

            for (var i = 0; i < this.representation.length; i++) {
                if (this.representation[i] === '1') {
                    value += items[i].value;
                    weight += items[i].weight;
                }
            }

            this.value = value;
            this.weight = weight;
        }
    }, {
        key: 'calculateAdaptationValue',
        value: function calculateAdaptationValue(knapsackSize) {
            var oversize = this.weight > knapsackSize;
            this.oversize = oversize;
            var sizeDifference = this.weight - knapsackSize;
            // const penaltyValue = Math.round(0.01 * this.value);
            var penaltyValue = Math.round(1 / sizeDifference * this.value);
            this.adaptationValue = oversize ? penaltyValue : this.value;
        }
    }]);

    return CuckooEgg;
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Population = __webpack_require__(9);
var Helper = __webpack_require__(0);

module.exports = function () {
    function GeneticAlgorithm() {
        _classCallCheck(this, GeneticAlgorithm);
    }

    _createClass(GeneticAlgorithm, null, [{
        key: 'run',
        value: function run(items, settings) {
            var initPopulation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var iteration = 1;
            var results = [];
            //1. tworzymy losowa populacje
            var population = initPopulation ? initPopulation : new Population(settings.populationSize, settings.chromosomeLength);
            // Helper.print('populacja poczatkowa', population);

            while (true) {
                //2. oceniamy każdego osobnika
                population.rateIndyviduals(items, settings.knapsackSize);
                // Helper.print('osobniki populacji ocenione', population);
                results.push(population.findBestIndyvidualFromPopulationOrZero());

                //3. sprawdzamy warunek zatrzymania
                if (GeneticAlgorithm.checkStopCondition(iteration, settings.maxIterations)) {
                    // Helper.print('**********', {});
                    // Helper.print('warunek zatrzymania speniony', {});
                    // Helper.print('iteracje wykonane', iteration - 1);
                    // Helper.print('iteracja zastopowana', iteration);
                    // Helper.print('populacja końcowa', population);
                    // Helper.print('**********', {});
                    // population.printSummaryInformation();
                    break;
                }

                //4. wybieramy osobniki do reprodukcji - selekcja (zwraca kopie osobnikow)
                var indyvidualsForReproduction = population.selectIndyvidualsForReproduction(settings);
                // Helper.print('kopia osobnikow do reprodukcji', indyvidualsForReproduction);
                if (population.populationSize != indyvidualsForReproduction.length) {
                    debugger;
                    console.log('blad!, wielkosc populacji rozna od ilosci osobnikow do reprodukcji!');
                    console.log('population.populationSize:', population.populationSize);
                    console.log('indyvidualsForReproduction.length:', indyvidualsForReproduction.length);
                }

                //5. reprodukcja osobników - zastosowanie operatorow genetycznych
                var newPopulation = Population.createNewPopulationFromIndyvidualsToReproduce(indyvidualsForReproduction, settings);
                // Helper.print('nowa populacja', newPopulation);
                // console.log('##############################');

                //6. mutacja osobnikow (robie ja na nowej populacji)
                newPopulation.mutate(settings.probability.mutation);

                //7. inwersja osobnikow (na nowej populacji)
                newPopulation.invert(settings.probability.inversion);

                newPopulation.insertEliteIndyvidualIfNecessary(settings, population, items);

                population = newPopulation;
                iteration++;
            }

            // Helper.print('Wyniki', results);
            return results;
        }
    }, {
        key: 'checkStopCondition',
        value: function checkStopCondition(iteration, maxIterations) {
            return iteration > maxIterations;
        }
    }, {
        key: 'test',
        value: function test(items, settingsTab) {
            var resultsTab = [];

            if (settingsTab.length > 0) {
                var initPopulation = settingsTab[0].sameInitialPopulation ? new Population(settingsTab[0].populationSize, settingsTab[0].chromosomeLength) : false;

                settingsTab.forEach(function (settings) {
                    resultsTab.push(GeneticAlgorithm.run(items, settings, initPopulation));
                    if (initPopulation) {
                        initPopulation.value = 0;
                    }
                });
            }

            return resultsTab;
        }
    }]);

    return GeneticAlgorithm;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Indyvidual = __webpack_require__(10);
var Helper = __webpack_require__(0);

module.exports = function () {

    //create random population
    function Population(populationSize, chromosomeLength) {
        _classCallCheck(this, Population);

        this.indyviduals = this.createRandomIndyviduals(populationSize, chromosomeLength);
        this.populationSize = populationSize;
        this.value = 0;
    }

    _createClass(Population, [{
        key: 'createRandomIndyviduals',
        value: function createRandomIndyviduals(populationSize, chromosomeLength) {
            var indyviduals = [];

            for (var i = 0; i < populationSize; i++) {
                var number = void 0;
                do {
                    number = Math.floor(Math.pow(2, chromosomeLength) * Math.random());
                } while (number === 0);
                var indyvidual = new Indyvidual(number, chromosomeLength);
                indyviduals.push(indyvidual);
            }

            return indyviduals;
        }
    }, {
        key: 'rateIndyviduals',
        value: function rateIndyviduals(items, knapsackSize) {
            var _this = this;

            this.indyviduals.forEach(function (indyvidual) {
                indyvidual.calculateValueAndWeight(items, knapsackSize);
                indyvidual.calculateAdaptationValue(knapsackSize);
                _this.value += indyvidual.adaptationValue;
            });
        }
    }, {
        key: 'selectIndyvidualsForReproduction',
        value: function selectIndyvidualsForReproduction(settings) {
            if (settings.selectionMethod === 'roulette wheel') {
                return this.doRouletteWheel();
            } else if (settings.selectionMethod === 'tournament') {
                return this.doTournament(settings.tournamentGroupSize);
            } else if (settings.selectionMethod === 'random') {
                return this.doRandomSelection();
            } else {
                debugger;
                console.log('Ops, cos poszlo nie tak. Program nie obsluguje takiej metody selekcji');
            }
        }
    }, {
        key: 'calculateIndyvidualsRange',
        value: function calculateIndyvidualsRange() {
            var nextLowRange = 0; //przedzial domkniety, dla high jest otwarty

            this.indyviduals.forEach(function (indyvidual) {
                indyvidual.lowRange = nextLowRange;
                indyvidual.hightRange = indyvidual.lowRange + indyvidual.adaptationValue;
                nextLowRange = indyvidual.hightRange;
            });
        }
    }, {
        key: 'doRouletteWheel',
        value: function doRouletteWheel() {
            var _this2 = this;

            this.calculateIndyvidualsRange();
            var indyvidualsForReproduction = [];

            var _loop = function _loop(i) {
                var number = _this2.value * Math.random();

                _this2.indyviduals.forEach(function (indyvidual) {
                    var reproductionCondition = number >= indyvidual.lowRange && number < indyvidual.hightRange;
                    if (reproductionCondition) {
                        var indyvidualCopy = Indyvidual.copy(indyvidual);
                        indyvidualsForReproduction.push(indyvidualCopy);
                    }
                });
            };

            for (var i = 0; i < this.populationSize; i++) {
                _loop(i);
            }

            return indyvidualsForReproduction;
        }

        //jesli w populacji jest osobnik NOT oversize to losujemy grupe do czasu az bedzie w niej conajmniej jeden osobnik NOT oversize
        //szukamy w grupie osobnika best, ktory jest NOT oversize i ma najlepszy adaptationValue
        //jesli w populacji nie ma osobnika NOT oversize to losujemy grupe raz i wybieramy osobnika o najlepszym adaptationValue (bedzie oversize)
        //jesli dwa osobniki maja takie samo adaptationValue to bierzemy tego z mniejszym indexem tablicy (pierwsze wystapienie)

    }, {
        key: 'doTournament',
        value: function doTournament(tournamentGroupSize) {
            var indyvidualsForReproduction = [];
            var groupSize = tournamentGroupSize > 0 ? tournamentGroupSize : 3;
            var isAnyNotOversizeIndyvidualInPopulation = this.isAnyNotOversizeIndyvidualInPopulation();

            for (var i = 0; i < this.populationSize; i++) {
                var indyvidualsGroup = [];
                var bestFromGroup = void 0,
                    bestCopy = void 0,
                    canBeOversize = void 0;
                if (isAnyNotOversizeIndyvidualInPopulation) {
                    canBeOversize = false;
                    do {
                        indyvidualsGroup.length = 0;
                        indyvidualsGroup = this.randomIndyvidualsGroup(groupSize);
                    } while (!Population.isAnyNotOversizeIndyvidualInGroup(indyvidualsGroup));
                } else {
                    canBeOversize = true;
                    indyvidualsGroup = this.randomIndyvidualsGroup(groupSize);
                }
                bestFromGroup = Population.findBestIndyvidualFromGroup(indyvidualsGroup, canBeOversize);
                bestCopy = Population.copyIndyvidual(bestFromGroup);
                indyvidualsForReproduction.push(bestCopy);
            }

            return indyvidualsForReproduction;
        }
    }, {
        key: 'randomIndyvidualsGroup',
        value: function randomIndyvidualsGroup(number) {
            var indyvidualsGroup = [];

            for (var i = 0; i < number; i++) {
                var randomIndyvidual = this.randomIndyvidualFromPopulation();
                indyvidualsGroup.push(randomIndyvidual);
            }

            return indyvidualsGroup;
        }
    }, {
        key: 'randomIndyvidualFromPopulation',
        value: function randomIndyvidualFromPopulation() {
            var index = Math.floor(this.populationSize * Math.random());
            return this.indyviduals[index];
        }
    }, {
        key: 'doRandomSelection',
        value: function doRandomSelection() {
            var indyvidualsForReproduction = [];

            for (var i = 0; i < this.populationSize; i++) {
                var index = Math.floor(this.populationSize * Math.random());
                var indyvidualCopy = Population.copyIndyvidual(this.indyviduals[index]);
                indyvidualsForReproduction.push(indyvidualCopy);
            }

            return indyvidualsForReproduction;
        }
    }, {
        key: 'mutate',
        value: function mutate(mutationProbability) {
            var _this3 = this;

            this.indyviduals.forEach(function (indyvidual) {
                _this3.mutateIndividual(indyvidual, mutationProbability);
            });
        }
    }, {
        key: 'mutateIndividual',
        value: function mutateIndividual(indyvidual, mutationProbability) {
            var mutateCondition = Math.random() < mutationProbability;
            var chromosomeLength = indyvidual.representation.length;

            if (mutateCondition) {
                // Helper.print('osobnik przed mutacja', indyvidual);
                var position = Math.floor(chromosomeLength * Math.random());
                indyvidual.mutate(position);
                // Helper.print('osobnik PO mutacji', indyvidual);
            }
        }
    }, {
        key: 'invert',
        value: function invert(inversionProbability) {
            var _this4 = this;

            this.indyviduals.forEach(function (indyvidual) {
                _this4.invertIndividual(indyvidual, inversionProbability);
            });
        }
    }, {
        key: 'invertIndividual',
        value: function invertIndividual(indyvidual, inversionProbability) {
            var inversionCondition = Math.random() < inversionProbability;

            if (inversionCondition) {
                // Helper.print('osobnik przed inwersja', indyvidual);
                var chromosomeLength = indyvidual.representation.length;
                var position1 = Math.floor((chromosomeLength - 1) * Math.random());
                var position2 = void 0;
                do {
                    position2 = Math.floor((chromosomeLength - 1) * Math.random());
                } while (position1 === position2);

                indyvidual.revert(position1, position2);
                // Helper.print('osobnik PO inwersji', indyvidual);
            }
        }
    }, {
        key: 'insertEliteIndyvidualIfNecessary',
        value: function insertEliteIndyvidualIfNecessary(settings, oldPopulation, items) {
            if (!settings.elitism) {
                return;
            }

            this.rateIndyviduals(items, settings.knapsackSize);
            var canBeOversize = !Population.isAnyNotOversizeIndyvidualInGroup(oldPopulation.indyviduals);
            var eliteIndyvidual = Population.findBestIndyvidualFromGroup(oldPopulation.indyviduals, canBeOversize);
            this.replaceWorstIndyvidualByIndyvidual(eliteIndyvidual);
            this.value = 0;
        }
    }, {
        key: 'replaceWorstIndyvidualByIndyvidual',
        value: function replaceWorstIndyvidualByIndyvidual(indyvidual) {
            var indyvidualCopy = Population.copyIndyvidual(indyvidual);
            var worstIndyvidualInfo = this.findWorstIndyvidualFromPopulationAndIndex();
            this.indyviduals[worstIndyvidualInfo.index] = indyvidualCopy;
        }
        //
        //
        //
        //
        // todo, refactor nizej

    }, {
        key: 'isAnyNotOversizeIndyvidualInPopulation',
        value: function isAnyNotOversizeIndyvidualInPopulation() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.indyviduals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var indyvidual = _step.value;

                    if (!indyvidual.oversize) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'findWorstIndyvidualFromPopulationAndIndex',
        value: function findWorstIndyvidualFromPopulationAndIndex() {
            var worstIndyvidual = this.indyviduals[0];
            var index = 0;

            this.indyviduals.forEach(function (indyvidual, i) {
                if (indyvidual.adaptationValue < worstIndyvidual.adaptationValue) {
                    worstIndyvidual = indyvidual;
                    index = i;
                }
            });

            return { worstIndyvidual: worstIndyvidual, index: index };
        }
    }, {
        key: 'printSummaryInformation',
        value: function printSummaryInformation() {
            var bestIndyvidualOrZero = this.findBestIndyvidualFromPopulationOrZero();
            if (bestIndyvidualOrZero == 0) {
                Helper.print('Brak najlepszego osobnika, wszystkie sa oversize!', {});
            } else {
                Helper.print('Najlepszy osobnik', bestIndyvidualOrZero);
                Helper.print('Najlepszy osobnik adaptationValue', bestIndyvidualOrZero.adaptationValue);
            }
        }
    }, {
        key: 'findBestIndyvidualFromPopulationOrZero',
        value: function findBestIndyvidualFromPopulationOrZero() {
            var canBeOversize = false;
            return this.isAnyNotOversizeIndyvidualInPopulation() ? Population.findBestIndyvidualFromGroup(this.indyviduals, canBeOversize) : 0;
        }
    }, {
        key: 'findBestIndyvidualAdaptationValueFromPopulationOrZero',
        value: function findBestIndyvidualAdaptationValueFromPopulationOrZero() {
            var canBeOversize = false;
            return this.isAnyNotOversizeIndyvidualInPopulation() ? Population.findBestIndyvidualFromGroup(this.indyviduals, canBeOversize).adaptationValue : 0;
        }
    }], [{
        key: 'copyIndyviduals',
        value: function copyIndyviduals(indyvidualsGroup) {
            var indyvidualsGroupCopy = [];
            indyvidualsGroup.forEach(function (indyvidual) {
                var indyvidualCopy = Population.copyIndyvidual(indyvidual);
                indyvidualsGroupCopy.push(indyvidualCopy);
            });

            return indyvidualsGroupCopy;
        }
    }, {
        key: 'copyIndyvidual',
        value: function copyIndyvidual(indyvidual) {
            return Indyvidual.copy(indyvidual);
        }
    }, {
        key: 'createNewPopulationFromIndyvidualsToReproduce',
        value: function createNewPopulationFromIndyvidualsToReproduce(indyvidualsForReproduction, settings) {
            var newPopulationSize = indyvidualsForReproduction.length;
            var chromosomeLength = indyvidualsForReproduction[0].representation.length;
            var newPopulation = new Population(newPopulationSize, chromosomeLength);
            var newIndyviduals = [];

            var indyvidualsPairs = Population.selectionIndyvidualsForReproductionInPairs(indyvidualsForReproduction);
            // Helper.print('pary osobnikow', indyvidualsPairs);

            indyvidualsPairs.forEach(function (indyvidualsPair) {
                if (indyvidualsPair.length === 2) {
                    var crossedIndyvidualsPair = Population.crossIndyvidualsPair(indyvidualsPair, settings);
                    newIndyviduals.push(crossedIndyvidualsPair[0]);
                    newIndyviduals.push(crossedIndyvidualsPair[1]);
                } else {
                    debugger;
                    console.log('indyvidualsPair:', indyvidualsPair);
                    console.log('cos nie tak, indyvidualsPair ma dlugosc nieparzysta!');
                }
            });

            newPopulation.indyviduals = newIndyviduals;

            return newPopulation;
        }
    }, {
        key: 'selectionIndyvidualsForReproductionInPairs',
        value: function selectionIndyvidualsForReproductionInPairs(indyvidualsForReproduction) {
            // do debuggowania
            if (indyvidualsForReproduction.length % 2 != 0) {
                debugger;
                console.log('cos jest nie tak, nieparzysta lista osobnikow do reprodukcji');
                var length = indyvidualsForReproduction.length;
                indyvidualsForReproduction.length = length - 1;
            }
            //
            var indyvidualsPairs = [];
            var firstIndex = void 0;
            var secondIndex = void 0;

            var iterations = indyvidualsForReproduction.length / 2;
            for (var i = 0; i < iterations; i++) {
                firstIndex = Math.floor(indyvidualsForReproduction.length * Math.random());
                do {
                    secondIndex = Math.floor(indyvidualsForReproduction.length * Math.random());
                } while (firstIndex === secondIndex);

                var deleteIndex = firstIndex < secondIndex ? firstIndex : secondIndex;
                indyvidualsPairs.push([indyvidualsForReproduction[firstIndex], indyvidualsForReproduction[secondIndex]]);

                indyvidualsForReproduction.splice.apply(indyvidualsForReproduction, [deleteIndex, indyvidualsForReproduction.length].concat(_toConsumableArray(indyvidualsForReproduction.splice(deleteIndex + 1, indyvidualsForReproduction.length))));
                deleteIndex = firstIndex > secondIndex ? firstIndex : secondIndex;
                deleteIndex--;
                indyvidualsForReproduction.splice.apply(indyvidualsForReproduction, [deleteIndex, indyvidualsForReproduction.length].concat(_toConsumableArray(indyvidualsForReproduction.splice(deleteIndex + 1, indyvidualsForReproduction.length))));
            }
            return indyvidualsPairs;
        }
    }, {
        key: 'crossIndyvidualsPair',
        value: function crossIndyvidualsPair(indyvidualsPair, settings) {
            var crossingCondition = Math.random() < settings.probability.crossing;

            if (crossingCondition) {
                if (settings.crossingMethod === 'one point') {
                    return Population.doOnePointCrossing(indyvidualsPair);
                } else if (settings.crossingMethod === 'two point') {
                    return Population.doTwoPointCrossing(indyvidualsPair);
                } else if (settings.crossingMethod === 'evenly') {
                    return Population.doEvenlyCrossing(indyvidualsPair);
                } else if (settings.crossingMethod === 'arithmetic') {
                    return Population.doArithmeticCrossing(indyvidualsPair);
                } else {
                    debugger;
                    Helper.print('Niewlasciwa metoda krzyzowania!', {});
                }
            }

            return indyvidualsPair;
        }

        // todo, refactor one i two

    }, {
        key: 'doOnePointCrossing',
        value: function doOnePointCrossing(indyvidualsPair) {
            var firstChromosome = indyvidualsPair[0].representation;
            var secondChromosome = indyvidualsPair[1].representation;
            var chromosomeLength = firstChromosome.length;
            //miejsce krzyzowania, np. locus=0 oznacza, że krzyżujemy PO zerowym bicie liczac od lewej
            var locus = Math.floor((chromosomeLength - 1) * Math.random());
            var firstNewChromosome = '';
            var secondNewChromosome = '';

            for (var i = 0; i <= locus; i++) {
                firstNewChromosome += firstChromosome[i];
            }
            for (var _i = locus + 1; _i < secondChromosome.length; _i++) {
                firstNewChromosome += secondChromosome[_i];
            }

            for (var _i2 = 0; _i2 <= locus; _i2++) {
                secondNewChromosome += secondChromosome[_i2];
            }
            for (var _i3 = locus + 1; _i3 < firstChromosome.length; _i3++) {
                secondNewChromosome += firstChromosome[_i3];
            }

            var firstNewIndividual = new Indyvidual(parseInt(firstNewChromosome, 2), chromosomeLength);
            var secondNewIndividual = new Indyvidual(parseInt(secondNewChromosome, 2), chromosomeLength);

            return [firstNewIndividual, secondNewIndividual];
        }
    }, {
        key: 'doTwoPointCrossing',
        value: function doTwoPointCrossing(indyvidualsPair) {
            var firstChromosome = indyvidualsPair[0].representation;
            var secondChromosome = indyvidualsPair[1].representation;
            var chromosomeLength = firstChromosome.length;
            //miejsce krzyzowania, np. locus=0 oznacza, że krzyżujemy PO zerowym bicie liczac od lewej
            var locus1 = Math.floor((chromosomeLength - 1) * Math.random());
            var locus2 = void 0;
            do {
                locus2 = Math.floor((chromosomeLength - 1) * Math.random());
            } while (locus1 == locus2);
            if (locus1 > locus2) {
                var temp = locus1;
                locus1 = locus2;
                locus2 = temp;
            }
            var firstNewChromosome = '';
            var secondNewChromosome = '';

            for (var i = 0; i <= locus1; i++) {
                firstNewChromosome += firstChromosome[i];
            }
            for (var _i4 = locus1 + 1; _i4 <= locus2; _i4++) {
                firstNewChromosome += secondChromosome[_i4];
            }
            for (var _i5 = locus2 + 1; _i5 < secondChromosome.length; _i5++) {
                firstNewChromosome += firstChromosome[_i5];
            }

            for (var _i6 = 0; _i6 <= locus1; _i6++) {
                secondNewChromosome += secondChromosome[_i6];
            }
            for (var _i7 = locus1 + 1; _i7 <= locus2; _i7++) {
                secondNewChromosome += firstChromosome[_i7];
            }
            for (var _i8 = locus2 + 1; _i8 < firstChromosome.length; _i8++) {
                secondNewChromosome += secondChromosome[_i8];
            }

            var firstNewIndividual = new Indyvidual(parseInt(firstNewChromosome, 2), chromosomeLength);
            var secondNewIndividual = new Indyvidual(parseInt(secondNewChromosome, 2), chromosomeLength);

            return [firstNewIndividual, secondNewIndividual];
        }
    }, {
        key: 'doEvenlyCrossing',
        value: function doEvenlyCrossing(indyvidualsPair) {
            var firstChromosome = indyvidualsPair[0].representation;
            var secondChromosome = indyvidualsPair[1].representation;
            var chromosomeLength = firstChromosome.length;
            var firstNewChromosome = '';
            var secondNewChromosome = '';

            for (var i = 0; i < chromosomeLength; i++) {
                var _number = Math.random();
                if (_number < 0.5) {
                    firstNewChromosome += firstChromosome[i];
                    secondNewChromosome += secondChromosome[i];
                } else {
                    firstNewChromosome += secondChromosome[i];
                    secondNewChromosome += firstChromosome[i];
                }
            }

            var firstNewIndividual = new Indyvidual(parseInt(firstNewChromosome, 2), chromosomeLength);
            var secondNewIndividual = new Indyvidual(parseInt(secondNewChromosome, 2), chromosomeLength);

            return [firstNewIndividual, secondNewIndividual];
        }
    }, {
        key: 'doArithmeticCrossing',
        value: function doArithmeticCrossing(indyvidualsPair) {
            var firstChromosomeNumber = indyvidualsPair[0].number;
            var secondChromosomeNumber = indyvidualsPair[1].number;
            var chromosomeLength = indyvidualsPair[0].representation.length;
            var param = Math.random();
            var firstNewChromosomeNumber = Math.round(firstChromosomeNumber + param * (secondChromosomeNumber - firstChromosomeNumber));
            var secondNewChromosomeNumber = Math.round(firstChromosomeNumber + secondChromosomeNumber - firstNewChromosomeNumber);

            var firstNewIndividual = new Indyvidual(firstNewChromosomeNumber, chromosomeLength);
            var secondNewIndividual = new Indyvidual(secondNewChromosomeNumber, chromosomeLength);

            return [firstNewIndividual, secondNewIndividual];
        }
    }, {
        key: 'isAnyNotOversizeIndyvidualInGroup',
        value: function isAnyNotOversizeIndyvidualInGroup(indyvidualsGroup) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = indyvidualsGroup[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var indyvidual = _step2.value;

                    if (!indyvidual.oversize) {
                        return true;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return false;
        }
    }, {
        key: 'findBestIndyvidualFromGroup',
        value: function findBestIndyvidualFromGroup(indyvidualsGroup, canBeOversize) {
            var bestIndyvidual = void 0;

            if (canBeOversize) {
                bestIndyvidual = indyvidualsGroup[0];
                indyvidualsGroup.forEach(function (indyvidual) {
                    if (indyvidual.adaptationValue > bestIndyvidual.adaptationValue) {
                        bestIndyvidual = indyvidual;
                    }
                });

                return bestIndyvidual;
            } else if (!canBeOversize) {
                bestIndyvidual = Population.findFirstNotOversizeIndyvidualFromGroup(indyvidualsGroup);
                indyvidualsGroup.forEach(function (indyvidual) {
                    if (indyvidual.adaptationValue > bestIndyvidual.adaptationValue && !indyvidual.oversize) {
                        bestIndyvidual = indyvidual;
                    }
                });

                return bestIndyvidual;
            }
        }
    }, {
        key: 'findFirstNotOversizeIndyvidualFromGroup',
        value: function findFirstNotOversizeIndyvidualFromGroup(indyvidualsGroup) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = indyvidualsGroup[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var indyvidual = _step3.value;

                    if (!indyvidual.oversize) {
                        return indyvidual;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }]);

    return Population;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = __webpack_require__(0);

module.exports = function () {
    function Indyvidual(number, chromosomeLength) {
        _classCallCheck(this, Indyvidual);

        this.number = number;
        this.representation = this.createRepresentation(number, chromosomeLength);
        this.lowRange = 0;
        this.hightRange = 0;
        this.oversize = false;
        this.value = 0;
        this.weight = 0;
        this.adaptationValue = 0;
    }

    _createClass(Indyvidual, [{
        key: 'createRepresentation',
        value: function createRepresentation(number, chromosomeLength) {
            var stringBinaryNumber = number.toString(2);
            return this.addZerosFromLeft(stringBinaryNumber, chromosomeLength);
        }
    }, {
        key: 'addZerosFromLeft',
        value: function addZerosFromLeft(stringBinaryNumber, stringDestinationLength) {
            var newStringNumber = stringBinaryNumber;
            var numberOfZerosToAdd = stringDestinationLength - stringBinaryNumber.length;

            for (var i = 0; i < numberOfZerosToAdd; i++) {
                newStringNumber = '0' + newStringNumber;
            }

            return newStringNumber;
        }
    }, {
        key: 'calculateValueAndWeight',
        value: function calculateValueAndWeight(items, knapsackSize) {
            var value = 0;
            var weight = 0;

            for (var i = 0; i < this.representation.length; i++) {
                if (this.representation[i] === '1') {
                    value += items[i].value;
                    weight += items[i].weight;
                }
            }

            this.value = value;
            this.weight = weight;
        }
    }, {
        key: 'calculateAdaptationValue',
        value: function calculateAdaptationValue(knapsackSize) {
            var oversize = this.weight > knapsackSize;
            this.oversize = oversize;
            var sizeDifference = this.weight - knapsackSize;
            // const penaltyValue = Math.round(0.01 * this.value);
            var penaltyValue = Math.round(1 / sizeDifference * this.value);
            this.adaptationValue = oversize ? penaltyValue : this.value;
        }
    }, {
        key: 'mutate',
        value: function mutate(genePosition) {
            var reverseGene = this.representation[genePosition] == 0 ? 1 : 0;
            var beforePart = this.representation.substring(0, genePosition);
            var afterPart = this.representation.substring(genePosition + 1);
            this.representation = beforePart + reverseGene + afterPart;
            var decimal = parseInt(this.representation, 2);
            this.number = decimal;
        }
    }, {
        key: 'revert',
        value: function revert(position1, position2) {
            var chromosomeLength = this.representation.length;
            var newChromosome = '';

            if (position1 > position2) {
                var temp = position1;
                position1 = position2;
                position2 = temp;
            }

            for (var i = 0; i <= position1; i++) {
                newChromosome += this.representation[i];
            }
            for (var _i = position2; _i > position1; _i--) {
                newChromosome += this.representation[_i];
            }
            for (var _i2 = position2 + 1; _i2 < chromosomeLength; _i2++) {
                newChromosome += this.representation[_i2];
            }

            this.representation = newChromosome;
            var decimal = parseInt(this.representation, 2);
            this.number = decimal;
        }
    }], [{
        key: 'copy',
        value: function copy(indyvidual) {
            var number = indyvidual.number;
            var chromosomeLength = indyvidual.representation.length;
            var copy = new Indyvidual(number, chromosomeLength);
            copy.lowRange = indyvidual.lowRange;
            copy.hightRange = indyvidual.hightRange;
            copy.oversize = indyvidual.oversize;
            copy.value = indyvidual.value;
            copy.weight = indyvidual.weight;
            copy.adaptationValue = indyvidual.adaptationValue;

            return copy;
        }
    }]);

    return Indyvidual;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map