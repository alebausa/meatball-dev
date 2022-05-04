class Player{
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  moveRight() {
    this.x = this.x + 25;
    if (this.x > 1000) {
      this.x = 10-this.width;
    }
  }

  moveLeft() {
    this.x = this.x - 25;
    if (this.x + this.width < 0) {
      this.x = 990;
    }
  }
}