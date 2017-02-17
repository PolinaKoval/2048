function Agent(matrix) {
    this.matrix = matrix;
}

Agent.prototype.act = (observation, reward, done) => {
    return getRandomInt(0, 4);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}