const Helper = require('../Helper');

module.exports = class Indyvidual {

    constructor(number, chromosomeLength) {
        this.number = number;
        this.representation = this.createRepresentation(number, chromosomeLength);
        this.lowRange = 0;
        this.hightRange = 0;
        this.oversize = false;
        this.value = 0;
        this.weight = 0;
        this.adaptationValue = 0;
    }
    
    createRepresentation(number, chromosomeLength) {
        const stringBinaryNumber = number.toString(2);
        return this.addZerosFromLeft(stringBinaryNumber, chromosomeLength);
    }

    addZerosFromLeft(stringBinaryNumber, stringDestinationLength) {
        let newStringNumber = stringBinaryNumber;
        const numberOfZerosToAdd = stringDestinationLength - stringBinaryNumber.length;

        for (let i = 0; i < numberOfZerosToAdd; i++) {
            newStringNumber = '0' + newStringNumber;
        }

        return newStringNumber;
    }

    calculateValueAndWeight(items, knapsackSize) {
        let value = 0;
        let weight = 0;

        for (let i = 0; i < this.representation.length; i++) {
            if (this.representation[i] === '1') {
                value += items[i].value;
                weight += items[i].weight;
            }
        }

        this.value = value;
        this.weight = weight;
    }

    calculateAdaptationValue(knapsackSize) {
        const oversize = this.weight > knapsackSize;
        this.oversize = oversize;
        const sizeDifference = this.weight - knapsackSize;
        // const penaltyValue = Math.round(0.01 * this.value);
        const penaltyValue = Math.round((1 / sizeDifference) * this.value);
        this.adaptationValue = oversize ? penaltyValue : this.value;
    }

    static copy(indyvidual) {
        const number = indyvidual.number;
        const chromosomeLength = indyvidual.representation.length;
        const copy = new Indyvidual(number, chromosomeLength);
        copy.lowRange = indyvidual.lowRange;
        copy.hightRange = indyvidual.hightRange;
        copy.oversize = indyvidual.oversize;
        copy.value = indyvidual.value;
        copy.weight = indyvidual.weight;
        copy.adaptationValue = indyvidual.adaptationValue;

        return copy;
    }

    mutate(genePosition) {
        const reverseGene = this.representation[genePosition] == 0 ? 1 : 0;
        const beforePart = this.representation.substring(0, genePosition);
        const afterPart = this.representation.substring(genePosition + 1);
        this.representation = beforePart + reverseGene + afterPart;
        const decimal = parseInt(this.representation, 2);
        this.number = decimal;
    }

    revert(position1, position2) {
        const chromosomeLength = this.representation.length;
        let newChromosome = '';

        if (position1 > position2) {
            let temp = position1;
            position1 = position2;
            position2 = temp;
        }

        for (let i = 0; i <= position1; i++) {
            newChromosome += this.representation[i];
        }
        for (let i = position2; i > position1; i--) {
            newChromosome += this.representation[i];
        }
        for (let i = position2 + 1; i < chromosomeLength; i++) {
            newChromosome += this.representation[i];
        }

        this.representation = newChromosome;
        const decimal = parseInt(this.representation, 2);
        this.number = decimal;
    }

}
