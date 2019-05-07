const Population = require('./Population');
const Helper = require('../Helper');

module.exports = class GeneticAlgorithm {

    static run(items, settings, initPopulation = false) {
        let iteration = 1;
        const results = [];
        //1. tworzymy losowa populacje
        let population = initPopulation ?
            initPopulation :
            new Population(settings.populationSize, settings.chromosomeLength);
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
            let indyvidualsForReproduction = population.selectIndyvidualsForReproduction(settings);
            // Helper.print('kopia osobnikow do reprodukcji', indyvidualsForReproduction);
            if (population.populationSize != indyvidualsForReproduction.length) {
                debugger;
                console.log('blad!, wielkosc populacji rozna od ilosci osobnikow do reprodukcji!');
                console.log('population.populationSize:', population.populationSize);
                console.log('indyvidualsForReproduction.length:', indyvidualsForReproduction.length);
            }

            //5. reprodukcja osobników - zastosowanie operatorow genetycznych
            const newPopulation = Population.createNewPopulationFromIndyvidualsToReproduce(indyvidualsForReproduction, settings);
            // Helper.print('nowa populacja', newPopulation);
            // console.log('##############################');

            //6. mutacja osobnikow (robie ja na nowej populacji)
            newPopulation.mutate(settings.probability.mutation);

            //7. inwersja osobnikow (na nowej populacji)
            newPopulation.invert(settings.probability.inversion)

            newPopulation.insertEliteIndyvidualIfNecessary(settings, population, items);
            
            population = newPopulation;
            iteration++;
        }

        // Helper.print('Wyniki', results);
        return results;
    }

    static checkStopCondition(iteration, maxIterations) {
        return iteration > maxIterations;
    }

    static test(items, settingsTab) {
        const resultsTab = [];

        if (settingsTab.length > 0) {
            const initPopulation = settingsTab[0].sameInitialPopulation ?
                new Population(settingsTab[0].populationSize, settingsTab[0].chromosomeLength) : false;

            settingsTab.forEach((settings) => {
                resultsTab.push(GeneticAlgorithm.run(items, settings, initPopulation));
                if (initPopulation) {
                    initPopulation.value = 0;
                }
            });
        }

        return resultsTab;
    }
}
