const Indyvidual = require('./Indyvidual');
const Helper = require('../Helper');

module.exports = class Population {

    //create random population
    constructor(populationSize, chromosomeLength) {
        this.indyviduals = this.createRandomIndyviduals(populationSize, chromosomeLength);
        this.populationSize = populationSize;
        this.value = 0;
    }

    createRandomIndyviduals(populationSize, chromosomeLength) {
        const indyviduals = [];

        for (let i = 0; i < populationSize; i++) {
            let number;
            do {
                number = Math.floor(Math.pow(2, chromosomeLength) * Math.random());
            } while (number === 0)
            const indyvidual = new Indyvidual(number, chromosomeLength);
            indyviduals.push(indyvidual);
        }

        return indyviduals;
    }

    rateIndyviduals(items, knapsackSize) {
        this.indyviduals.forEach((indyvidual) => {
            indyvidual.calculateValueAndWeight(items, knapsackSize);
            indyvidual.calculateAdaptationValue(knapsackSize);
            this.value += indyvidual.adaptationValue;
        });
    }

    selectIndyvidualsForReproduction(settings) {
        if (settings.selectionMethod === 'roulette wheel') {
            return this.doRouletteWheel();
        } else if (settings.selectionMethod === 'tournament') {
            return this.doTournament(settings.tournamentGroupSize);
        }
        else if (settings.selectionMethod === 'random') {
            return this.doRandomSelection();
        }
        else {
            debugger
            console.log('Ops, cos poszlo nie tak. Program nie obsluguje takiej metody selekcji');
        }
    }

    calculateIndyvidualsRange() {
        let nextLowRange = 0; //przedzial domkniety, dla high jest otwarty

        this.indyviduals.forEach((indyvidual) => {
            indyvidual.lowRange = nextLowRange;
            indyvidual.hightRange = indyvidual.lowRange + indyvidual.adaptationValue;
            nextLowRange = indyvidual.hightRange;
        });
    }

    doRouletteWheel() {
        this.calculateIndyvidualsRange();
        const indyvidualsForReproduction = [];

        for (let i = 0; i < this.populationSize; i++) {
            const number = this.value * Math.random();

            this.indyviduals.forEach((indyvidual) => {
                const reproductionCondition = (number >= indyvidual.lowRange) && (number < indyvidual.hightRange);
                if (reproductionCondition) {
                    const indyvidualCopy = Indyvidual.copy(indyvidual);
                    indyvidualsForReproduction.push(indyvidualCopy);
                }
            });
        }

        return indyvidualsForReproduction;
    }

    //jesli w populacji jest osobnik NOT oversize to losujemy grupe do czasu az bedzie w niej conajmniej jeden osobnik NOT oversize
    //szukamy w grupie osobnika best, ktory jest NOT oversize i ma najlepszy adaptationValue
    //jesli w populacji nie ma osobnika NOT oversize to losujemy grupe raz i wybieramy osobnika o najlepszym adaptationValue (bedzie oversize)
    //jesli dwa osobniki maja takie samo adaptationValue to bierzemy tego z mniejszym indexem tablicy (pierwsze wystapienie)
    doTournament(tournamentGroupSize) {
        const indyvidualsForReproduction = [];
        const groupSize = tournamentGroupSize > 0 ? tournamentGroupSize : 3;
        const isAnyNotOversizeIndyvidualInPopulation = this.isAnyNotOversizeIndyvidualInPopulation();

        for (let i = 0; i < this.populationSize; i++) {
            let indyvidualsGroup = [];
            let bestFromGroup, bestCopy, canBeOversize;
            if (isAnyNotOversizeIndyvidualInPopulation) {
                canBeOversize = false;
                do {
                    indyvidualsGroup.length = 0;
                    indyvidualsGroup = this.randomIndyvidualsGroup(groupSize);
                }
                while (!Population.isAnyNotOversizeIndyvidualInGroup(indyvidualsGroup));
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

    randomIndyvidualsGroup(number) {
        const indyvidualsGroup = [];

        for (let i = 0; i < number; i++) {
            const randomIndyvidual = this.randomIndyvidualFromPopulation();
            indyvidualsGroup.push(randomIndyvidual);
        }

        return indyvidualsGroup;
    }

    randomIndyvidualFromPopulation() {
        const index = Math.floor(this.populationSize * Math.random());
        return this.indyviduals[index];
    }

    doRandomSelection() {
        const indyvidualsForReproduction = [];

        for (let i = 0; i < this.populationSize; i++) {
            const index = Math.floor(this.populationSize * Math.random());
            const indyvidualCopy = Population.copyIndyvidual(this.indyviduals[index]);
            indyvidualsForReproduction.push(indyvidualCopy);
        }

        return indyvidualsForReproduction;
    }

    static copyIndyviduals(indyvidualsGroup) {
        const indyvidualsGroupCopy = [];
        indyvidualsGroup.forEach((indyvidual) => {
            const indyvidualCopy = Population.copyIndyvidual(indyvidual);
            indyvidualsGroupCopy.push(indyvidualCopy);
        });

        return indyvidualsGroupCopy;
    }

    static copyIndyvidual(indyvidual) {
        return Indyvidual.copy(indyvidual);
    }

    static createNewPopulationFromIndyvidualsToReproduce(indyvidualsForReproduction, settings) {
        const newPopulationSize = indyvidualsForReproduction.length;
        const chromosomeLength = indyvidualsForReproduction[0].representation.length;
        const newPopulation = new Population(newPopulationSize, chromosomeLength);
        const newIndyviduals = [];

        const indyvidualsPairs = Population.selectionIndyvidualsForReproductionInPairs(indyvidualsForReproduction);
        // Helper.print('pary osobnikow', indyvidualsPairs);

        indyvidualsPairs.forEach((indyvidualsPair) => {
            if (indyvidualsPair.length === 2) {
                const crossedIndyvidualsPair = Population.crossIndyvidualsPair(indyvidualsPair, settings);
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

    static selectionIndyvidualsForReproductionInPairs(indyvidualsForReproduction) {
        // do debuggowania
        if (indyvidualsForReproduction.length % 2 != 0) {
            debugger
            console.log('cos jest nie tak, nieparzysta lista osobnikow do reprodukcji');
            const length = indyvidualsForReproduction.length;
            indyvidualsForReproduction.length = length - 1;
        }
        //
        const indyvidualsPairs = [];
        let firstIndex;
        let secondIndex;

        const iterations = indyvidualsForReproduction.length / 2;
        for (let i = 0; i < iterations; i++) {
            firstIndex = Math.floor(indyvidualsForReproduction.length * Math.random());
            do {
                secondIndex = Math.floor(indyvidualsForReproduction.length * Math.random());
            } while (firstIndex === secondIndex);

            let deleteIndex = firstIndex < secondIndex ? firstIndex : secondIndex;
            indyvidualsPairs.push([indyvidualsForReproduction[firstIndex], indyvidualsForReproduction[secondIndex]]);

            indyvidualsForReproduction.splice(deleteIndex, indyvidualsForReproduction.length,
                ...indyvidualsForReproduction.splice(deleteIndex + 1, indyvidualsForReproduction.length));
            deleteIndex = firstIndex > secondIndex ? firstIndex : secondIndex;
            deleteIndex--;
            indyvidualsForReproduction.splice(deleteIndex, indyvidualsForReproduction.length,
                ...indyvidualsForReproduction.splice(deleteIndex + 1, indyvidualsForReproduction.length));
        }
        return indyvidualsPairs;
    }

    static crossIndyvidualsPair(indyvidualsPair, settings) {
        const crossingCondition = Math.random() < settings.probability.crossing;

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
    static doOnePointCrossing(indyvidualsPair) {
        const firstChromosome = indyvidualsPair[0].representation;
        const secondChromosome = indyvidualsPair[1].representation;
        const chromosomeLength = firstChromosome.length;
        //miejsce krzyzowania, np. locus=0 oznacza, że krzyżujemy PO zerowym bicie liczac od lewej
        const locus = Math.floor((chromosomeLength - 1) * Math.random());
        let firstNewChromosome = '';
        let secondNewChromosome = '';

        for (let i = 0; i <= locus; i++) {
            firstNewChromosome += firstChromosome[i];
        }
        for (let i = locus + 1; i < secondChromosome.length; i++) {
            firstNewChromosome += secondChromosome[i];
        }

        for (let i = 0; i <= locus; i++) {
            secondNewChromosome += secondChromosome[i];
        }
        for (let i = locus + 1; i < firstChromosome.length; i++) {
            secondNewChromosome += firstChromosome[i];
        }

        const firstNewIndividual = new Indyvidual(parseInt(firstNewChromosome, 2), chromosomeLength);
        const secondNewIndividual = new Indyvidual(parseInt(secondNewChromosome, 2), chromosomeLength);

        return [firstNewIndividual, secondNewIndividual];
    }

    static doTwoPointCrossing(indyvidualsPair) {
        const firstChromosome = indyvidualsPair[0].representation;
        const secondChromosome = indyvidualsPair[1].representation;
        const chromosomeLength = firstChromosome.length;
        //miejsce krzyzowania, np. locus=0 oznacza, że krzyżujemy PO zerowym bicie liczac od lewej
        let locus1 = Math.floor((chromosomeLength - 1) * Math.random());
        let locus2;
        do {
            locus2 = Math.floor((chromosomeLength - 1) * Math.random());
        } while (locus1 == locus2);
        if (locus1 > locus2) {
            let temp = locus1;
            locus1 = locus2;
            locus2 = temp;
        }
        let firstNewChromosome = '';
        let secondNewChromosome = '';

        for (let i = 0; i <= locus1; i++) {
            firstNewChromosome += firstChromosome[i];
        }
        for (let i = locus1 + 1; i <= locus2; i++) {
            firstNewChromosome += secondChromosome[i];
        }
        for (let i = locus2 + 1; i < secondChromosome.length; i++) {
            firstNewChromosome += firstChromosome[i];
        }

        for (let i = 0; i <= locus1; i++) {
            secondNewChromosome += secondChromosome[i];
        }
        for (let i = locus1 + 1; i <= locus2; i++) {
            secondNewChromosome += firstChromosome[i];
        }
        for (let i = locus2 + 1; i < firstChromosome.length; i++) {
            secondNewChromosome += secondChromosome[i];
        }

        const firstNewIndividual = new Indyvidual(parseInt(firstNewChromosome, 2), chromosomeLength);
        const secondNewIndividual = new Indyvidual(parseInt(secondNewChromosome, 2), chromosomeLength);

        return [firstNewIndividual, secondNewIndividual];
    }

    static doEvenlyCrossing(indyvidualsPair) {
        const firstChromosome = indyvidualsPair[0].representation;
        const secondChromosome = indyvidualsPair[1].representation;
        const chromosomeLength = firstChromosome.length;
        let firstNewChromosome = '';
        let secondNewChromosome = '';

        for (let i = 0; i < chromosomeLength; i++) {
            const number = Math.random();
            if (number < 0.5) {
                firstNewChromosome += firstChromosome[i];
                secondNewChromosome += secondChromosome[i];
            } else {
                firstNewChromosome += secondChromosome[i];
                secondNewChromosome += firstChromosome[i];
            }
        }

        const firstNewIndividual = new Indyvidual(parseInt(firstNewChromosome, 2), chromosomeLength);
        const secondNewIndividual = new Indyvidual(parseInt(secondNewChromosome, 2), chromosomeLength);

        return [firstNewIndividual, secondNewIndividual];
    }

    static doArithmeticCrossing(indyvidualsPair) {
        const firstChromosomeNumber = indyvidualsPair[0].number;
        const secondChromosomeNumber = indyvidualsPair[1].number;
        const chromosomeLength = indyvidualsPair[0].representation.length;
        const param = Math.random();
        let firstNewChromosomeNumber = Math.round(
            firstChromosomeNumber + param * (secondChromosomeNumber - firstChromosomeNumber
            ));
        let secondNewChromosomeNumber = Math.round(
            firstChromosomeNumber + secondChromosomeNumber - firstNewChromosomeNumber
        );

        const firstNewIndividual = new Indyvidual(firstNewChromosomeNumber, chromosomeLength);
        const secondNewIndividual = new Indyvidual(secondNewChromosomeNumber, chromosomeLength);

        return [firstNewIndividual, secondNewIndividual];
    }

    mutate(mutationProbability) {
        this.indyviduals.forEach((indyvidual) => {
            this.mutateIndividual(indyvidual, mutationProbability);
        });
    }

    mutateIndividual(indyvidual, mutationProbability) {
        const mutateCondition = Math.random() < mutationProbability;
        const chromosomeLength = indyvidual.representation.length;

        if (mutateCondition) {
            // Helper.print('osobnik przed mutacja', indyvidual);
            const position = Math.floor(chromosomeLength * Math.random());
            indyvidual.mutate(position);
            // Helper.print('osobnik PO mutacji', indyvidual);
        }
    }

    invert(inversionProbability) {
        this.indyviduals.forEach((indyvidual) => {
            this.invertIndividual(indyvidual, inversionProbability);
        });
    }

    invertIndividual(indyvidual, inversionProbability) {
        const inversionCondition = Math.random() < inversionProbability;

        if (inversionCondition) {
            // Helper.print('osobnik przed inwersja', indyvidual);
            const chromosomeLength = indyvidual.representation.length;
            let position1 = Math.floor((chromosomeLength - 1) * Math.random());
            let position2;
            do {
                position2 = Math.floor((chromosomeLength - 1) * Math.random());
            } while (position1 === position2);

            indyvidual.revert(position1, position2);
            // Helper.print('osobnik PO inwersji', indyvidual);
        }
    }

    insertEliteIndyvidualIfNecessary(settings, oldPopulation, items) {
        if (!settings.elitism) {
            return;
        }

        this.rateIndyviduals(items, settings.knapsackSize);
        const canBeOversize = !Population.isAnyNotOversizeIndyvidualInGroup(oldPopulation.indyviduals);
        const eliteIndyvidual = Population.findBestIndyvidualFromGroup(oldPopulation.indyviduals, canBeOversize);
        this.replaceWorstIndyvidualByIndyvidual(eliteIndyvidual);
        this.value = 0;
    }

    replaceWorstIndyvidualByIndyvidual(indyvidual) {
        const indyvidualCopy = Population.copyIndyvidual(indyvidual);
        const worstIndyvidualInfo = this.findWorstIndyvidualFromPopulationAndIndex();
        this.indyviduals[worstIndyvidualInfo.index] = indyvidualCopy;
    }
    //
    //
    //
    //
    // todo, refactor nizej
    isAnyNotOversizeIndyvidualInPopulation() {
        for (let indyvidual of this.indyviduals) {
            if (!indyvidual.oversize) {
                return true;
            }
        }

        return false;
    }
    
    static isAnyNotOversizeIndyvidualInGroup(indyvidualsGroup) {
        for (let indyvidual of indyvidualsGroup) {
            if (!indyvidual.oversize) {
                return true;
            }
        }

        return false;
    }

    static findBestIndyvidualFromGroup(indyvidualsGroup, canBeOversize) {
        let bestIndyvidual;

        if (canBeOversize) {
            bestIndyvidual = indyvidualsGroup[0];
            indyvidualsGroup.forEach((indyvidual) => {
                if (indyvidual.adaptationValue > bestIndyvidual.adaptationValue) {
                    bestIndyvidual = indyvidual;
                }
            });

            return bestIndyvidual;
        } else if (!canBeOversize) {
            bestIndyvidual = Population.findFirstNotOversizeIndyvidualFromGroup(indyvidualsGroup);
            indyvidualsGroup.forEach((indyvidual) => {
                if ((indyvidual.adaptationValue > bestIndyvidual.adaptationValue) && (!indyvidual.oversize)) {
                    bestIndyvidual = indyvidual;
                }
            });

            return bestIndyvidual;
        }
    }

    static findFirstNotOversizeIndyvidualFromGroup(indyvidualsGroup) {
        for (let indyvidual of indyvidualsGroup) {
            if (!indyvidual.oversize) {
                return indyvidual;
            }
        }
    }

    findWorstIndyvidualFromPopulationAndIndex() {
        let worstIndyvidual = this.indyviduals[0];
        let index = 0;

        this.indyviduals.forEach((indyvidual, i) => {
            if (indyvidual.adaptationValue < worstIndyvidual.adaptationValue) {
                worstIndyvidual = indyvidual;
                index = i;
            }
        });

        return {worstIndyvidual, index};
    }

    printSummaryInformation() {
        const bestIndyvidualOrZero = this.findBestIndyvidualFromPopulationOrZero();
        if (bestIndyvidualOrZero == 0) {
            Helper.print('Brak najlepszego osobnika, wszystkie sa oversize!', {});
        } else {
            Helper.print('Najlepszy osobnik', bestIndyvidualOrZero);
            Helper.print('Najlepszy osobnik adaptationValue', bestIndyvidualOrZero.adaptationValue);
        }
    }

    findBestIndyvidualFromPopulationOrZero() {
        const canBeOversize = false;
        return this.isAnyNotOversizeIndyvidualInPopulation() ? Population.findBestIndyvidualFromGroup(this.indyviduals, canBeOversize) : 0;
    }

    findBestIndyvidualAdaptationValueFromPopulationOrZero() {
        const canBeOversize = false;
        return this.isAnyNotOversizeIndyvidualInPopulation() ?
            Population.findBestIndyvidualFromGroup(this.indyviduals, canBeOversize).adaptationValue : 0;
    }
}
