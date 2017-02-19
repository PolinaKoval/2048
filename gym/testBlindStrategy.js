const Game = require("./game");
const fileName = "./strategies/blindStrategies1.json";
const strategies = require(fileName);
const fs = require("fs");
const ss = require("simple-statistics");
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const runGame = (game, matrix) => {
    game.setup();
    let done = false;
    let score = 0;
    let reward = 0;
    let action = 1;
    let success = game.move(action).success;
    for(let i =0; i < 10000; i++) {
        action = matrix[action][success ? 1 : 0];
        ({success, done, reward} = game.move(action));
        score += reward;
         if (done) {
            break;
         }
    }
    return score;
}

const episodesCount = 1000;
let bestStrategyMean = 0, bestStrategyMode = 0;
for (let i = 0; i < strategies.length; i++) {
    const matrix = strategies[i].matrix;
    const game = new Game(4);
    const statistics = [];
    for(let j = 0; j < episodesCount; j++) {
        statistics[j] = runGame(game, matrix);
    }
    strategies[i].mode = ss.mode(statistics);
    strategies[i].mean = ss.mean(statistics);
    if (strategies[i].mode > bestStrategyMode) {
        bestStrategyMode = strategies[i].mode;
    }
    if (strategies[i].mean > bestStrategyMean) {
        bestStrategyMean = strategies[i].mean;
    }
    console.log(
        i,
        strategies[i].mode,
        strategies[i].mean,
        bestStrategyMode,
        bestStrategyMean
    );
    const json = JSON.stringify(strategies);
    fs.writeFileSync(fileName, json);
}

let strategies2 = [];
for(let i = 0; i< strategies.length;i++) {
    if (strategies[i].mode == bestStrategyMode || strategies[i].mean == bestStrategyMean) {
        strategies2.push(strategies[i]);
    }
}

const json = JSON.stringify(strategies2);
fs.writeFileSync("./strategies/blindStrategies2.json", json);

console.log(strategies2.length);
