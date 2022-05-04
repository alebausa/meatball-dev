class Droplet{
  constructor(width, height) {
    this.x = Math.floor(Math.random() * (950 - 4) + 5);
    this.y = Math.floor(Math.random() * (-100 +60 + 1) -60);
    this.width = width;
    this.height = height;
    this.role = undefined;
    this.fallInterval = undefined;
    this.image = undefined;
  }

  _fallDown() {
    // console.log(`Droplet position: x = ${this.x} y = ${this.y}`);
    this.fallInterval = setInterval(() => {
      if (this.y > 650) {
      clearInterval(this.fallInterval);
      } else {
        this.y = this.y + 1;
      }
    }, 1000);
  }

  _asignRole() {
    if (Math.floor(Math.random() * 3) > 1) {
      this.role = 'poison';
    } else {
      this.role = 'food';
    }
  }

  _assignImage() {
    if (this.role === 'poison') {
        this.image = windows;
      } else {
       this.image = foodImages[Math.floor(Math.random() * foodImages.length)];
      }
  }

}