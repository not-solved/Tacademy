function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.isSquare = {
    get: function() {
        return this.width == this.height;
    }
}

Rectangle.prototype.size = () => {
    return this.width * this.height;
}

module.exports = Rectangle;