const CuckooPopulation = require('./CuckooPopulation');
const Helper = require('../Helper');

module.exports = class CuckooSearchAlgorithm {

    static run(items, settings, initPopulation = false) {
        let iteration = 1;
        const results = [];
        //1. tworzymy losowa populacje
        //musimy zrobic kopie, bo operujemy bezposrednio na osobnikach, w genetycznym nie trzeba bylo,
        //bo tam nie zmienialismy osobnikow, jedynie je ocenialismy, pozniejsze zmiany byly na kopiach
        let population = initPopulation ?
            CuckooPopulation.copyPopulation(initPopulation) :
            new CuckooPopulation(settings.populationSize, settings.chromosomeLength);
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
            const newEgg = population.createRandomNewEggFromPopulationByLevyFlight(
                settings.scale, settings.chromosomeLength
            );
            
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
            population.abandonWorstEggsAndGenerateNew(
                settings.probability.abandonment, settings.scale, settings.chromosomeLength
            );
            // Helper.print('populacja po porzuceniu starych jaj i stworzeniu nowych', population);

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
                new CuckooPopulation(settingsTab[0].populationSize, settingsTab[0].chromosomeLength) : false;

            settingsTab.forEach((settings) => {
                resultsTab.push(CuckooSearchAlgorithm.run(items, settings, initPopulation));
            });
        }

        return resultsTab;
    }
}
