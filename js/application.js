// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
    const agent = new Agent();
    const game = new GameManager(4, HTMLActuator, 0);
    const episodeCount = 10;
    const array = new Array(episodeCount).fill(0);;
    array.reduce((promise) => promise.then(() => run(game, agent)),Promise.resolve());
});

function run (game, agent) {
    let score = 0;
    let done = false;
    let reward = 0;
    let observation = game.setup();
    const step = (callback) => {
        action = agent.act(observation, reward, done);
        let result = game.move(action)
        observation = result.observation;
        reward = result.reward;
        done = result.done;
        score += reward;
        if (done) {
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
