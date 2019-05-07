const CuckooSearchAlgorithm = require('./cuckooSearchAlgorithm/CuckooSearchAlgorithm');
const GeneticAlgorithm = require('./geneticAlgorithm/GeneticAlgorithm');
const Helper = require('./Helper');

let immutableSettings;
let mutableSettingsTab = [];
let settings = {
    geneticAlgorithmSettingsTab: [],
    cuckooSearchAlgorithmSettingsTab: []
};
let items;

window.onload = () => {
    addEventListeners();
};

const addEventListeners = () => {
    addEventListenerToInputFileButton();
    addEventListenerToAddSettingsButtons();
    addEventListenerToAddRandomSettingsButton();
    addEventListenerToResetSettingsButton();
    addEventListenerToStartButton();
}

const addEventListenerToInputFileButton = () => {
    const inputElement = document.getElementsByName('file')[0];
    inputElement.addEventListener('change', loadInputFile);
}

const loadInputFile = () => {
    const inputElement = document.getElementsByName('file')[0];
    const loadedFile = inputElement.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
        try {
            items = JSON.parse(fileReader.result);
        } catch (error) {
            alert('loading file went wrong!');
            alert(error);
        }
    }
    fileReader.readAsText(loadedFile);
}

const addEventListenerToAddSettingsButtons = () => {
    document.getElementById('addGASettingsButton')
        .addEventListener('click', addGASettings);
    document.getElementById('addCSASettingsButton')
        .addEventListener('click', addCSASettings);
}

const addGASettings = () => {
    const selectionMethod = document.getElementsByName('selectionMethod')[0].value;
    const tournamentGroupSize = document.getElementsByName('tournamentGroupSize')[0].value;
    const crossingMethod = document.getElementsByName('crossingMethod')[0].value;
    const elitism = document.getElementsByName('elitism')[0].checked;
    const crossingProbability = document.getElementsByName('crossingProbability')[0].value;
    const mutationProbability = document.getElementsByName('mutationProbability')[0].value;
    const inversionProbability = document.getElementsByName('inversionProbability')[0].value;

    const settings = {
        algorithm: 'genetic',
        selectionMethod,
        tournamentGroupSize,
        crossingMethod,
        elitism,
        crossingProbability,
        mutationProbability,
        inversionProbability
    };

    if (checkGAMutableSettingsCorrectness(settings)) {
        mutableSettingsTab.push(settings);
        addSettingsToTable(settings);
    } else {
        alert('mutable settings are NOT correct')
    }
}

const addCSASettings = () => {
    const scale = document.getElementsByName('scale')[0].value;
    const abandonmentProbability = document.getElementsByName('abandonmentProbability')[0].value;

    const settings = {
        algorithm: 'cuckoo search',
        scale,
        abandonmentProbability,
    };

    if (checkCSAMutableSettingsCorrectness(settings)) {
        mutableSettingsTab.push(settings);
        addSettingsToTable(settings);
    } else {
        alert('mutable settings are NOT correct')
    }
}

const checkGAMutableSettingsCorrectness = (settings) => {
    if ((settings.selectionMethod === 'tournament')
        && (!Number.isInteger(parseInt(settings.tournamentGroupSize)) || !(settings.tournamentGroupSize > 0))) {
        return false;
    }

    return (
        (settings.crossingProbability != '') && (settings.crossingProbability >= 0) && (settings.crossingProbability <= 1)
        && ((settings.mutationProbability != '')) && (settings.mutationProbability >= 0) && (settings.mutationProbability <= 1)
        && ((settings.inversionProbability != '')) && (settings.inversionProbability >= 0) && (settings.inversionProbability <= 1)
    )
}

const checkCSAMutableSettingsCorrectness = (settings) => {
    return (
        (settings.scale != '') && (settings.scale > 0) &&
        (settings.abandonmentProbability != '') && (settings.abandonmentProbability >= 0) &&
        (settings.abandonmentProbability <= 1)
    );
}

//ugly, but working
const addSettingsToTable = (settings) => {
    if (settings.selectionMethod != 'tournament') {
        settings.tournamentGroupSize = '';
    }
    const table = document.getElementById('settingsTable');
    const tableBody = table.children[1];
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.innerHTML = `S${mutableSettingsTab.length}`;
    tr.appendChild(td);

    if (settings.algorithm === 'genetic') {
        for (let prop in settings) {
            const td = document.createElement('td');
            td.innerHTML = settings[prop];
            td.setAttribute('class', 'text-center');
            tr.appendChild(td);
        }
        const td1 = document.createElement('td');
        td1.setAttribute('class', 'text-center');
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.setAttribute('class', 'text-center');
        tr.appendChild(td2);
    } else if (settings.algorithm === 'cuckoo search') {
        const td1 = document.createElement('td');
        td1.innerHTML = settings.algorithm;
        td1.setAttribute('class', 'text-center');
        tr.appendChild(td1);

        for (let i = 0; i < 7; i++) {
            const td = document.createElement('td');
            if (i === 3) {
                td.innerHTML = 'true';
            }
            td.setAttribute('class', 'text-center');
            tr.appendChild(td);
        }

        const td2 = document.createElement('td');
        td2.innerHTML = settings.scale;
        td2.setAttribute('class', 'text-center');
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerHTML = settings.abandonmentProbability;
        td3.setAttribute('class', 'text-center');
        tr.appendChild(td3);
    }
    tableBody.appendChild(tr);
}

const addEventListenerToAddRandomSettingsButton = () => {
    document.getElementById('addGARandomSettingsButton')
        .addEventListener('click', addGARandomSettings);
    document.getElementById('addCSARandomSettingsButton')
        .addEventListener('click', addCSARandomSettings);
}

const addGARandomSettings = () => {
    const selectionMethods = ['roulette wheel', 'tournament', 'random'];
    const crossingMethods = ['one point', 'two point', 'evenly', 'arithmetic'];
    const selectionMethod = selectionMethods[Math.floor(Math.random() * selectionMethods.length)];
    const tournamentGroupSize = selectionMethod === 'tournament' ? Math.ceil(2 + Math.random() * 5) : 0;
    const crossingMethod = crossingMethods[Math.floor(Math.random() * crossingMethods.length)];
    const elitism = Math.random() > 0.5;
    const crossingProbability = Math.random().toString().slice(0, 4);
    const mutationProbability = Math.random().toString().slice(0, 4);
    const inversionProbability = Math.random().toString().slice(0, 4);

    const settings = {
        algorithm: 'genetic',
        selectionMethod,
        tournamentGroupSize,
        crossingMethod,
        elitism,
        crossingProbability,
        mutationProbability,
        inversionProbability
    };

    mutableSettingsTab.push(settings);
    addSettingsToTable(settings);
}

const addCSARandomSettings = () => {
    const scale = (3 * Math.random()).toString().slice(0, 4); //losuje z przedzialu <0, 3)
    const abandonmentProbability = Math.random().toString().slice(0, 4);

    const settings = {
        algorithm: 'cuckoo search',
        scale,
        abandonmentProbability
    };

    mutableSettingsTab.push(settings);
    addSettingsToTable(settings);
}

const addEventListenerToResetSettingsButton = () => {
    document.getElementById('resetSettingsButton')
        .addEventListener('click', clearSettingsListAndUpdateSettingsTable);
}

const clearSettingsListAndUpdateSettingsTable = () => {
    mutableSettingsTab.length = 0;

    const table = document.getElementById('settingsTable');
    const tableBody = table.children[1];
    tableBody.innerHTML = '';
}

const addEventListenerToStartButton = () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => {
        if (checkImmutableSettingsCorrectness()) {
            deleteChartAndCreateNewCanvas();
            createAlgorithmSettingsTab();
            // createTestSettings(); //do testow z kodu, pozniej do usuniecia
            if (
                settings.geneticAlgorithmSettingsTab.length > 0 ||
                settings.cuckooSearchAlgorithmSettingsTab.length > 0
            ) {
                runAlgorithms();
            } else {
                alert('ops, something was wrong, settings are empty');
            }
        }
    });
}

const checkImmutableSettingsCorrectness = () => {
    if (!checkLoadedFileCorrectness()) {
        alert('loaded file incorrect!')
        return false;
    }

    const knapsackSize = document.getElementsByName('knapsackSize')[0].value;
    const populationSize = document.getElementsByName('populationSize')[0].value;
    const maxIterations = document.getElementsByName('maxIterations')[0].value;
    const sameInitialPopulation = document.getElementsByName('sameInitialPopulation')[0].checked;

    if ((Number.isInteger(parseInt(knapsackSize)) && (knapsackSize > 0))
        && (Number.isInteger(parseInt(populationSize)) && (populationSize > 0) && (populationSize % 2 == 0))
        && (Number.isInteger(parseInt(maxIterations)) && (maxIterations > 0))) {
        const settings = {
            knapsackSize,
            populationSize,
            maxIterations,
            chromosomeLength: items.length,
            sameInitialPopulation
        };

        immutableSettings = settings;

        return true;
    }
    alert('immutable settings incorrect!')

    return false;
}

const checkLoadedFileCorrectness = () => {
    if (items && items.length > 0) {
        return items.every((item) => {
            return item.hasOwnProperty('value') && item.value >= 0 && Number.isInteger(item.value)
                && item.hasOwnProperty('weight') && item.weight >= 0 && Number.isInteger(item.weight)
        });
    }
}

const deleteChartAndCreateNewCanvas = () => {
    const chartDiv = document.getElementById('chartDiv');
    const canvas = document.getElementById('myChart');
    const canvasId = canvas.getAttribute('id');
    const canvasWidth = canvas.getAttribute('width');
    const canvasHeight = canvas.getAttribute('height');
    canvas.remove();

    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('id', canvasId);
    newCanvas.setAttribute('width', canvasWidth);
    newCanvas.setAttribute('height', canvasHeight);
    chartDiv.appendChild(newCanvas);
}

const createAlgorithmSettingsTab = () => {
    settings.geneticAlgorithmSettingsTab.length = 0;
    settings.cuckooSearchAlgorithmSettingsTab.length = 0;

    for (let mutableSettings of mutableSettingsTab) {
        if (mutableSettings.algorithm === 'genetic') {
            const GAsettings = createGASettings(immutableSettings, mutableSettings);
            settings.geneticAlgorithmSettingsTab.push(GAsettings);
        } else if (mutableSettings.algorithm === 'cuckoo search') {
            const CSAsettings = createCAASettings(immutableSettings, mutableSettings);
            settings.cuckooSearchAlgorithmSettingsTab.push(CSAsettings);
        }
    }
}

const createGASettings = (immutableSettings, mutableSettings) => {
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
}

const createCAASettings = (immutableSettings, mutableSettings) => {
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
}

// tymczasowo do testow
const createTestSettings = () => {
    const testScale = 1;
    const testSettings = [];

    for (let i = 1; i <= 10; i++) {
        const settings = {
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
        testSettings.push(settings);
    }

    settings.cuckooSearchAlgorithmSettingsTab = testSettings;
}

const runAlgorithms = () => {
    const showResultsInConsole = document.getElementsByName('showConsoleResultsCheckbox')[0].checked;
    const drawChart = document.getElementsByName('drawChartCheckbox')[0].checked;
    let allResultsNumbersMatrix = [];

    if (settings.geneticAlgorithmSettingsTab.length > 0) {
        const start = Date.now();
        const resultsIndyvidualsMatrix = GeneticAlgorithm.test(items, settings.geneticAlgorithmSettingsTab);
        const stop = Date.now();
        const resultsNumberMatrix = Helper.getAdaptationValueFromIndyvidualsMatrix(resultsIndyvidualsMatrix);
        const bestIndyvidualAndSettingFromMatrix = Helper.findBestIndyvidualAndSettingFromMatrix(
            resultsIndyvidualsMatrix, settings.geneticAlgorithmSettingsTab
        );
        if (showResultsInConsole) {
            Helper.print('Genetic Algorithm');
            Helper.print('czas [s]', ((stop - start) / 1000));
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
        const start = Date.now();
        const resultsIndyvidualsMatrix = CuckooSearchAlgorithm.test(items, settings.cuckooSearchAlgorithmSettingsTab);
        const stop = Date.now();
        const resultsNumberMatrix = Helper.getAdaptationValueFromIndyvidualsMatrix(resultsIndyvidualsMatrix);
        const bestIndyvidualAndSettingFromMatrix = Helper.findBestIndyvidualAndSettingFromMatrix(
            resultsIndyvidualsMatrix, settings.cuckooSearchAlgorithmSettingsTab
        );
        if (showResultsInConsole) {
            console.log('##################################################');
            Helper.print('Cuckoo Search Algorithm');
            Helper.print('czas [s]', ((stop - start) / 1000));
            Helper.print('settings:', settings.cuckooSearchAlgorithmSettingsTab);
            Helper.print('wyniki ostateczne (osobniki - jaja)', resultsIndyvidualsMatrix);
            Helper.print('wyniki ostateczne (wartości przystosowania osobnikow - jaj)', resultsNumberMatrix);
            Helper.print('najlepszy osobnik (jajo)', bestIndyvidualAndSettingFromMatrix.bestIndyvidual);
            if (bestIndyvidualAndSettingFromMatrix.bestIndyvidual) {
                Helper.print('wartosc przystosowania', bestIndyvidualAndSettingFromMatrix.bestIndyvidual.adaptationValue);
            }
            Helper.print('najlepsze parametry', bestIndyvidualAndSettingFromMatrix.bestSetting);
        }
        allResultsNumbersMatrix = allResultsNumbersMatrix.concat(resultsNumberMatrix);
    }

    if (drawChart) {
        const chartSettings = Helper.createChartSettings(immutableSettings.maxIterations, allResultsNumbersMatrix);
        const ctx = document.getElementById("myChart").getContext('2d');
        Helper.drawLineChart(ctx, chartSettings);
    }
}