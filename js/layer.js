class Layer {
  constructor(y, height, speed) {
    this.width = 1791;
    this.x = 0;
    this.x2 = this.width;
    this.y = y;
    this.height = height;
    this.speed = speed; 
  }

  _update() {

    // THIS PART ALWAYS APPLIES
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);


    // CODE IN CASE YOU IT'S ALWAYS TO THE RIGHT perpetual movement
    // if (this.x <= -this.width) {
    //   this.x = this.width + this.x2 - this.speed;
    // }
    // if (this.x2 <= -this.width) {
    //   this.x2 = this.width + this.x - this.speed;
    // }

    // CODE IF IT'S DEPENDANT ON THE PLAYER'S MOVEMENT
    // Moving right
    if( this.speed > 0 ){
      if( this.x + this.width - 1000 - this.speed < 0 ){
        this.x2 = this.width + this.x;
      }
      if( this.x2 + this.width - 1000 - this.speed < 0 ){
        this.x = this.width + this.x2;
      }
    // Moving left
    } else { // Negative speed
      if( this.x > -this.width + 1000 ){
        this.x2 = this.x - this.width ;
      }
      if( this.x2 > -this.width + 1000 ){
        this.x = this.x2 - this.width;
      }
    }
  }
}