// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    const agent = new BlindAgent([[2,3],[2,0],[3,3],[0,2]]);
    const game = new GameManager(4, HTMLActuator);
    const episodeCount = 10;
    const array = new Array(episodeCount).fill(0);;
    array.reduce((promise) => promise.then(() => run(game, agent)),Promise.resolve());
});

function run (game, agent) {
    let score = 0;
    let done = false;
    let reward = 0;
    let observation = game.setup();
    let success = true;
    let stepCount = 0;
    const step = (callback) => {
        stepCount++;
        action = agent.act(observation, reward, done, success);
        let result = game.move(action)
        observation = result.observation;
        reward = result.reward;
        done = result.done;
        success = result.success;
        score += reward;
        if (done || stepCount > 100000) {
            console.log(score);
            callback();
        } else {
            let fn = () => window.requestAnimationFrame(step.bind(this, callback));
            setTimeout(fn, 100);
        }
    }
    return new Promise(resolve => {
        window.requestAnimationFrame(step.bind(this, resolve));
    });
}
