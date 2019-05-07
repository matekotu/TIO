const Helper = require('../Helper');

module.exports = class CuckooEgg {

    constructor(number, chromosomeLength) {
        this.number = number;
        this.representation = this.createEggRepresentation(number, chromosomeLength);
        this.oversize = false;
        this.value = null;
        this.weight = null;
        this.adaptationValue = null;
    }

    createEggRepresentation(number, chromosomeLength) {
        let convertToBinary;
        convertToBinary = true;
        let eggRepresentation = '';

        if (convertToBinary) {
            const stringBinaryNumber = number.toString(2);
            const dotPosition = stringBinaryNumber.indexOf('.');
            const stringBinaryNumberWithoutDot = stringBinaryNumber.slice(0, dotPosition) +
            stringBinaryNumber.slice(dotPosition + 1);
            eggRepresentation = stringBinaryNumberWithoutDot;
        } else {
            const stringNumber = number.toString();
            const dotPosition = stringNumber.indexOf('.');
            const stringNumberWithoutDot = stringNumber.slice(0, dotPosition) +
                stringNumber.slice(dotPosition + 1);
            for (let i = 0; i < stringNumberWithoutDot.length; i++) {
                eggRepresentation += stringNumberWithoutDot[i] < 5 ? 0 : 1;
            }
        }

        while (eggRepresentation.length < chromosomeLength) {
            eggRepresentation += eggRepresentation;
        }

        return eggRepresentation.slice(0, chromosomeLength);
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
}
