import * as distributions from 'essy-distribution';

const CuckooEgg = require('./CuckooEgg');
const Helper = require('../Helper');

module.exports = class CuckooPopulation {

    //create random population
    constructor(populationSize, chromosomeLength) {
        //jajo oznacza rozwiazanie np. '0110010'
        //moglbym to rozdzielic na kukulki, gniazda i jaja, ale w praktyce wszystko
        //sprowadza sie do jaja jako rozwiazania, wiec to wystarczy
        this.eggs = this.createRandomEggs(populationSize, chromosomeLength);
        this.populationSize = populationSize;
        this.chromosomeLength = chromosomeLength;
    }

    createRandomEggs(populationSize, chromosomeLength) {
        const eggs = [];

        for (let i = 0; i < populationSize; i++) {
            let number;
            do {
                number = Math.random();
            } while (number === 0)
            const egg = new CuckooEgg(number, chromosomeLength);
            eggs.push(egg);
        }

        return eggs;
    }

    rateEggs(items, knapsackSize) {
        this.eggs.forEach((egg) => {
            CuckooPopulation.rateEgg(egg, items, knapsackSize);
        });
    }

    static rateEgg(egg, items, knapsackSize) {
        egg.calculateValueAndWeight(items, knapsackSize);
        egg.calculateAdaptationValue(knapsackSize);
    }

    createRandomNewEggFromPopulationByLevyFlight(scale, chromosomeLength) {
        return CuckooPopulation.createRandomNewEggFromGroupByLevyFlight(this.eggs, scale, chromosomeLength);
    }
    
    static createRandomNewEggFromGroupByLevyFlight(eggsGroup, scale, chromosomeLength) {
        const index = Math.floor(Math.random() * eggsGroup.length);
        const egg = eggsGroup[index];
        return CuckooPopulation.createNewEggByLevyFlight(egg, scale, chromosomeLength);
    }
    
    static createNewEggByLevyFlight(egg, scale, chromosomeLength) {
        const levyDistribution = new distributions.Levy(egg.number, scale); //(location, scale)
        const newEggValue = levyDistribution.sample(1);
        return new CuckooEgg(newEggValue, chromosomeLength);
    }

    replaceRandomEggIfNecessaryByNewEgg(newEgg) {
        const index = Math.floor(Math.random() * this.eggs.length);
        const egg = this.eggs[index];
        if (newEgg.adaptationValue > egg.adaptationValue) {
            this.eggs[index] = newEgg;
        }
    }

    abandonWorstEggsAndGenerateNew(abandonmentProbability, scale, chromosomeLength) {
        this.sortEggsByAdaptationValue();
        const numberOfAbandonEggs = Math.round(abandonmentProbability * this.eggs.length);
        const abandonmentEggs = this.eggs.slice(this.eggs.length - numberOfAbandonEggs);
        const newEggs = [];
        for (let egg of abandonmentEggs) {
            const newEgg = CuckooPopulation.createNewEggByLevyFlight(egg, scale, chromosomeLength);
            newEggs.push(newEgg);
        }

        /*Helper.print('##########', {});
        Helper.print('abandonmentProbability', abandonmentProbability);
        Helper.print('scale', scale);
        Helper.print('this.eggs', this.eggs);
        Helper.print('numberOfAbandonEggs', numberOfAbandonEggs);
        Helper.print('##########', {});*/

        this.eggs.length = this.eggs.length - numberOfAbandonEggs;
        this.eggs = this.eggs.concat(newEggs);
    }

    sortEggsByAdaptationValue() {
        this.eggs.sort((firstEgg, secondEgg) => {
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
    isAnyNotOversizeEggInPopulation() {
        for (let egg of this.eggs) {
            if (!egg.oversize) {
                return true;
            }
        }

        return false;
    }

    static findBestEggFromGroup(eggsGroup, canBeOversize) {
        let bestEgg;

        if (canBeOversize) {
            bestEgg = eggsGroup[0];
            eggsGroup.forEach((egg) => {
                if (egg.adaptationValue > bestEgg.adaptationValue) {
                    bestEgg = egg;
                }
            });

            return bestEgg;
        } else if (!canBeOversize) {
            bestEgg = CuckooPopulation.findFirstNotOversizeEggFromGroup(eggsGroup);
            eggsGroup.forEach((egg) => {
                if ((egg.adaptationValue > bestEgg.adaptationValue) && (!egg.oversize)) {
                    bestEgg = egg;
                }
            });

            return bestEgg;
        }
    }

    static findFirstNotOversizeEggFromGroup(eggsGroup) {
        for (let egg of eggsGroup) {
            if (!egg.oversize) {
                return egg;
            }
        }
    }

    printSummaryInformation() {
        const bestEggOrZero = this.findBestEggFromPopulationOrZero();
        if (bestEggOrZero == 0) {
            Helper.print('Brak najlepszego osobnika (jaja), wszystkie sa oversize!', {});
        } else {
            Helper.print('Najlepszy osobnik (jajo)', bestEggOrZero);
            Helper.print('Najlepszy osobnik (jajo) adaptationValue', bestEggOrZero.adaptationValue);
        }
    }

    findBestEggFromPopulationOrZero() {
        const canBeOversize = false;
        return this.isAnyNotOversizeEggInPopulation() ? CuckooPopulation.findBestEggFromGroup(this.eggs, canBeOversize) : 0;
    }

    static copyPopulation(population) {
        const populationCopy = new CuckooPopulation(population.populationSize, population.chromosomeLength);
        const eggsCopy = [];

        population.eggs.forEach((egg) => {
            const eggCopy = new CuckooEgg(egg.number, population.chromosomeLength);
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
}
