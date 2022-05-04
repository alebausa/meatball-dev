class Game{
  constructor(ctx) {
    this.ctx = ctx;
    this.meatball = new Player(500, 400, 40, 40);
    this.intervalGame = undefined;
    this.intervalFall = undefined;
    this.droplets = [];
    this.points = 0;
  }

  _drawMeatball() {
    // Si pintamos círculos
    // this.ctx.beginPath()
    // this.ctx.fillStyle = "darkred";
    // this.ctx.arc(this.meatball.x, this.meatball.y, this.meatball.width, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.closePath()
    this.ctx.drawImage(meatball, this.meatball.x, this.meatball.y, this.meatball.width, this.meatball.height);
  }

  _drawDroplets() {
    this.droplets.forEach((elem) => {
      // Si pintamos círculos:
      // this.ctx.beginPath()
      // this.ctx.fillStyle = "black";
      // this.ctx.arc(elem.x, elem.y, elem.width, 0, 2 * Math.PI);
      // this.ctx.fill();
      // this.ctx.closePath()
      this.ctx.drawImage(elem.image, elem.x, elem.y, elem.width, elem.height);
    })
  }

  _generateDroplet() {
    const newDroplet = new Droplet(50, 50);
    newDroplet._asignRole();
    newDroplet._assignImage();
    this.droplets.push(newDroplet);
  }

  _assignControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.meatball.moveLeft();
          break;
        case 'ArrowRight':
          this.meatball.moveRight();
          break;
        default:
          break;
      }
    });
  }

  _checkCollisions() {
    this.droplets.forEach(droplet => {
      if (
        (
          this.meatball.x >= droplet.x && this.meatball.x <= droplet.x + droplet.width ||
          this.meatball.x + this.meatball.width >= droplet.x && this.meatball.x + this.meatball.width <= droplet.x + droplet.width ||
          droplet.x >= this.meatball.x && droplet.x <= this.meatball.x + this.meatball.width
        ) &&
        (
          this.meatball.y >= droplet.y && this.meatball.y <= droplet.y + droplet.height ||
          this.meatball.y + this.meatball.height >= droplet.y && this.meatball.y + this.meatball.height <= droplet.y + droplet.height ||
          droplet.y >= this.meatball.y && droplet.y <= this.meatball.y + this.meatball.height
        )
      ) {
        if (droplet.role === 'food') {
          this.meatball.width = this.meatball.width + 15;
          this.meatball.height = this.meatball.height + 15;
          this.points++;
        } else if (droplet.role === 'poison') {
          this.meatball.width = this.meatball.width - 10;
          this.meatball.height = this.meatball.height - 10;
          this.points--;
        }
        if (this.points < 0) {
          console.log('You lose!');
          this.gameOver()
        }
        let index = this.droplets.indexOf(droplet);
        this.droplets.splice(index, 1);
      }
    })
  }

  gameOver() {
    clearInterval(this.intervalFall);
    clearInterval(this.intervalGame);
    const losePage = document.getElementById('lose-page');
    losePage.style = "display: flex;"
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none;"
  }

  _writeScore() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = "20px Verdana";
    this.ctx.fillText(`Points: ${this.points}`, 870, 550);
  }

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _update() {
    this._clean();
    this._drawMeatball();
    this._drawDroplets();
    this._checkCollisions();
    this._writeScore();
    let counter = 0;
    this.intervalFall = setInterval(() => { 
      if (counter < this.droplets.length) {
        this.droplets[counter]._fallDown();
        counter++;
      }
    }, 2000);
    // window.requestAnimationFrame(this._update.bind(this)); // Same thing
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    this.intervalGame = setInterval(() => {
      this._generateDroplet();
    }, 1000);
    window.requestAnimationFrame(() => this._update());
  }

}