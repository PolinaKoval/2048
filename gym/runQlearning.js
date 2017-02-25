const Game = require("./game");
const fs = require("fs");
const ss = require("simple-statistics");
const Agent = require("../agents/QlearningAgent");

const runGame = (game, agent) => {
    game.setup();
    let score = 0;
    let action = 1;
    let result = game.move(action);
    agent.lastState = [1, result.success ? 1 : 0];
    for(let i = 0; i < 10000; i++) {
        action = agent.act(result);
        result = game.move(action);
        score += result.reward;
        if (result.done) {
            break;
        }
    }
    return score;
}
function argMax(array) {
    return array.reduce((i, v, i2) => array[i] > v ? i : i2 , 0)
}

function getStrategy(episode_count, matrix) {
    const game = new Game(4);
    const agent = new Agent(matrix);
    let statistics = [];
    for (let i = 0; i < episode_count; i++) {
        let score = runGame(game, agent);
        statistics.push(score);
    }

    console.log(ss.mean(statistics), ss.mode(statistics))
    return {
        matrix: agent.qmatrix,
        mode: ss.mode(statistics),
        mean: ss.mean(statistics)
    }
}

let result = getStrategy(1000);
result = getStrategy(100, result.matrix);

result.matrix.forEach((action, i) =>
    result.matrix[i] = action.map(result => argMax(result))
    );
console.log(result.matrix);
fs.writeFileSync("./strategies/qlearning.json", JSON.stringify(result));
