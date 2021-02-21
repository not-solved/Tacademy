function Calculator() {
    this.add = (i, j) => {
        return i + j;
    }

    this.minus = (i, j) => {
        return i - j;
    }
}

module.exports = Calculator;