function QlearningAgent(matrix) {
    if (matrix) {
        this.qmatrix = matrix;
    } else {
        this.changeMatrix = true;
        var actions = [0, 1, 2, 3];
        this.qmatrix = actions.map(
            action => [0, 1].map(result => actions.map(a => 4)));
    }
    this.lastAction = -1;
    this.lastState;
    this.DF = 0.2;
    this.LF = 0.2;
}

QlearningAgent.prototype.act = function ({observation, reward, done, success}) {
    success = Number(success);
    if (this.lastAction == -1) {
        this.lastAction = 1;
        return 1;
    }
    if (this.changeMatrix) {
        this.recalculate(reward, success);
    }
    this.lastState = [this.lastAction, success];
    var state = this.qmatrix[this.lastAction][success];
    this.lastAction = state.reduce((i, v, i2) => state[i] > v ? i : i2 , 0);
    return this.lastAction;
}

QlearningAgent.prototype.recalculate = function (reward, success) {
    var oldValue = this.qmatrix[this.lastState[0]][this.lastState[1]][this.lastAction];
    var maxValue = getMaxOfArray(this.qmatrix[this.lastAction][success]);
    var newValue = oldValue + this.LF * (reward + this.DF * maxValue - oldValue);
    this.qmatrix[this.lastState[0]][this.lastState[1]][this.lastAction] = newValue;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function RInt(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = QlearningAgent;