class Player{
  constructor(x, y, width, height, floorBackgroundY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // Animation parameters
    this.image = walkSteps[0];
    this.stepCounter = 1;
    // Jumping with gravity parameters 
    this.drag = 0.99;
    this.gravity = 0.3;
    this.speed = -11;
    this.onTheGround = true;
    this.jumpInterval = undefined;
    this.floorBackgroundY = floorBackgroundY;
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

  jump() {                            // This function is called on Game when user presses Space
    if (this.onTheGround) {           // Check if character is on the ground (so that I can't jump from the air)
        this.onTheGround = false;     // Not on the ground anymore because I'm jumping
        this.jumpInterval = setInterval(() => {
          this.speed += this.gravity; // Modify the speed according to my gravity and drag forces
          this.speed *= this.drag;    // then add the speed to the Y axis
          this.y += this.speed;       // This will go up and, in a few iterations, start going down on its own, and it won't stop going down
          this._checkIfOnFloor();     // So I have to check if I'm back on the floor
        }, 40);
      }
    }

  _checkIfOnFloor() {
    if (this.y > this.floorBackgroundY - this.height) { // If my character has reached the floor, reset parameters for next jump
      clearInterval(this.jumpInterval);
      this.jumpInterval = undefined;
      this.y = this.floorBackgroundY - this.height;     // The floor and Y parameters are different in each game ⚠️ mine change because my character increases when he collects a droplet
      this.drag = 0.99;
      this.gravity = 0.3;
      this.speed = -11;
      this.onTheGround = true;
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