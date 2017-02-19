const fileName = "./strategies/blindStrategies0.json";
const fs = require("fs");
const prettyjson = require('prettyjson');

const strategies = [];

const fillCell = (strategy, i, j) => {
    if (i == 4) {
        let clone = strategy.map(arr => arr.slice(0));
        strategies.push({
            matrix:clone
        })
        return;
    }

    if (j == 0) strategy[i] = [];

    [0, 1, 2, 3].forEach(num => {
        if (j == 0 && i == num) return;
        strategy[i][j] = num;
        j == 1 ? fillCell(strategy, i + 1, 0) : fillCell(strategy, i, 1);
    });
}

fillCell([], 0, 0);
console.log(strategies.length);
const json = JSON.stringify(strategies);
fs.writeFileSync(fileName, json);

