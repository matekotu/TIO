module.exports = class Helper {
    static print(description = '', object = null) {
        if (!object) {
            console.log(description);
            return;
        }

        let copy = JSON.parse(JSON.stringify(object));
        console.log(description + ':\n', copy);
    }

    static getAdaptationValueFromIndyvidualsMatrix(indyvidualsMatrix) {
        const adaptationValuesMatrix = [];

        indyvidualsMatrix.forEach((indyvidualsTab) => {
            const adaptationValues = [];
            indyvidualsTab.forEach((indyvidual) => {
                const adaptationValue = indyvidual == 0 ? 0 : indyvidual.adaptationValue;
                adaptationValues.push(adaptationValue);
            });
            adaptationValuesMatrix.push(adaptationValues);
        });

        return adaptationValuesMatrix;
    }

    static findBestIndyvidualAndSettingFromMatrix(indyvidualsMatrix, settingsTab) {
        let bestIndyvidual = null;
        let row = null;

        indyvidualsMatrix.forEach((indyvidualsTab, index) => {
            let bestTabIndyvidual = indyvidualsTab.find((indyvidual) => {
                return (indyvidual != 0 && !indyvidual.oversize);
            });

            if (bestTabIndyvidual) {
                indyvidualsTab.forEach((indyvidual) => {
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

        const result = {
            bestIndyvidual,
            bestSetting: settingsTab[row]
        };

        return result;
    }

    static createChartSettings(maxXAxeValue, yValuesMatrix) {
        const labelsData = []
        const datasetsData = [];
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#3e95cd', '#8e5ea2'];

        for (let i = 0; i <= maxXAxeValue; i++) {
            labelsData.push(i);
        }

        yValuesMatrix.forEach((resultsNumber, index) => {
            let datasets = {
                data: [],
                label: `S${index + 1}`,
                borderColor: index < colors.length ? colors[index] : Helper.generateHexColor(),
                fill: false
            };

            for (let result of resultsNumber) {
                datasets.data.push(result);
            }

            datasetsData.push(datasets);
        });

        return {
            labelsData,
            datasetsData
        };
    }

    static generateHexColor() {
        return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();;
    }

    static drawLineChart(ctx, chartSettings) {
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
}
