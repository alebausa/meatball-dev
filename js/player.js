class Player{
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // Animation parameters
    this.image = walkSteps[0];
    this.stepCounter = 1;
  }

  moveRight() {
    this.x = this.x + 15;
    if (this.x > 1000) {
      this.x = 10-this.width;
    }
    // Animate sprite 
    this.image = walkSteps[this.stepCounter];
    this.stepCounter++;
    if (this.stepCounter == walkSteps.length) {
      this.image = walkSteps[0];
      this.stepCounter = 1;
    } 
  }

  moveLeft() {
    this.x = this.x - 15;
    if (this.x + this.width < 0) {
      this.x = 990;
    }
  }

  _increase() {
    this.width = this.width + 15;
    this.height = this.height + 15;
    this.y = this.y - 15;
  }

  _decrease() {
    this.width = this.width - 15;
    this.height = this.height - 15;
    this.y = this.y + 15;
  }
}