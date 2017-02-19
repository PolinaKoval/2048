function BlindAgent(matrix) {
    this.matrix = matrix;
    this.lastAction = -1;
}

BlindAgent.prototype.act = function (observation, reward, done, success) {
    if (this.lastAction == -1) {
        this.lastAction = 1;
        return 1;
    }
    this.lastAction = this.matrix[this.lastAction][success ? 1 : 0];
    return this.lastAction;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}