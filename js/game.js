class Game{
  constructor(ctx, cwidth, cheight) {
    this.ctx = ctx;
    this.canvasWidth = cwidth;
    this.canvasHeight = cheight;
    this.intervalGame = undefined;
    this.intervalFall = undefined;
    this.droplets = [];
    this.points = 0;
    // Sounds
    this.collisionSound = new sound('./sounds/grow.wav');
    // Parallax layer 1 (floor)
    this.bgLayer1 = new Layer(497, 103, 5);
    // Parallax layer 2 (background with mountains)
    this.bgLayer2 = new Layer(0, 504, 1);
    // Explosion
    this.explosionInterval = undefined;
    this.explosion = undefined;
    // Character
    this.meatball = new Player(500, 400, 100, 100, this.bgLayer1.y);
  }

  _drawMeatball() {
    // Si pintamos rectángulos
    // this.ctx.fillStyle = "darkred";
    // this.ctx.fillRect(this.meatball.x, this.meatball.y, this.meatball.width, this.meatball.height);
    this.ctx.drawImage(this.meatball.image, 187, 28, 461, 426, this.meatball.x, this.meatball.y, this.meatball.width, this.meatball.height);
    
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

  _drawExplosion() {
    if (this.explosion) {
      this.ctx.drawImage(this.explosion, this.meatball.x + (this.meatball.width / 2)-100, this.meatball.y-130, 200, 200);
    }
  }

  _drawBackground() {
    this.ctx.drawImage(backgroundLayer1, this.bgLayer1.x, this.bgLayer1.y, this.bgLayer1.width, this.bgLayer1.height);
    this.ctx.drawImage(backgroundLayer1, this.bgLayer1.x2, this.bgLayer1.y, this.bgLayer1.width, this.bgLayer1.height);
    this.ctx.drawImage(backgroundLayer2, this.bgLayer2.x, this.bgLayer2.y, this.bgLayer2.width, this.bgLayer2.height);
    this.ctx.drawImage(backgroundLayer2, this.bgLayer2.x2, this.bgLayer2.y, this.bgLayer2.width, this.bgLayer2.height);
  }


  _generateDroplet() {
    // Genero
    const newDroplet = new Droplet(50, 50);
    // Aplico efectos if necessary
    newDroplet._asignRole();
    newDroplet._assignImage();
    // Añado al array del constructor
    this.droplets.push(newDroplet);
  }

  _assignControls() {
    // Controles del teclado
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowLeft':
          this.meatball.moveLeft();
          // if( this.bgLayer1.speed > 0 ){
          //   this.bgLayer1.speed *= -1;
          //   this.bgLayer2.speed *= -1;
          // }
          // this._animateBackground();
          break;
        case 'ArrowRight':
          this.meatball.moveRight();
          // if( this.bgLayer1.speed < 0 ){
          //   this.bgLayer1.speed *= -1;
          //   this.bgLayer2.speed *= -1;
          // }
          // this._animateBackground();
          break;
        case 'Space':
          this.meatball.jump();
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
          // Compruebo si mi meatball está dentro de la X + width del droplet
          this.meatball.x >= droplet.x && this.meatball.x <= droplet.x + droplet.width ||
          this.meatball.x + this.meatball.width >= droplet.x && this.meatball.x + this.meatball.width <= droplet.x + droplet.width ||
          // Incluso si mi meatball es más grande que el droplet
          droplet.x >= this.meatball.x && droplet.x <= this.meatball.x + this.meatball.width
        ) &&
        (
          // Lo mismo con el eje Y
          this.meatball.y >= droplet.y && this.meatball.y <= droplet.y + droplet.height ||
          this.meatball.y + this.meatball.height >= droplet.y && this.meatball.y + this.meatball.height <= droplet.y + droplet.height ||
          droplet.y >= this.meatball.y && droplet.y <= this.meatball.y + this.meatball.height
        )
      ) {
        // Aplico efectos después de colisión
        if (droplet.role === 'food') {
          this.collisionSound.play();
          this._applyExplosion();
          this.meatball._increase();
          this.points++;
        } else if (droplet.role === 'poison') {
          this.collisionSound.play();
          this.meatball._decrease();
          this._applyExplosion();
          this.points--;
        }
        if (this.points < 0) {
          console.log('You lose!');
          this.gameOver();
        }
        // Elimino elementos de mi array cuando ya han colisionado
        let index = this.droplets.indexOf(droplet);
        this.droplets.splice(index, 1);
      }
    })
  }

  gameOver() {
    // Qué tiene que ocurrir cuando pierde
    clearInterval(this.intervalFall);
    clearInterval(this.intervalGame);
    const losePage = document.getElementById('lose-page');
    losePage.style = "display: flex";
    const canvas = document.getElementById('canvas');
    canvas.style = "display: none;"
  }

  _writeScore() {
    // Función que pinta la puntuación en el canvas
    this.ctx.fillStyle = 'white';
    this.ctx.font = "20px Verdana";
    this.ctx.fillText(`Points: ${this.points}`, 870, 550);
  }

  _clean() {
    this.ctx.clearRect(0, 0, 1000, 600);
  }

  _animateBackground() {
    this.bgLayer1._update();
    this.bgLayer2._update();
  }

  _applyExplosion() {
    let counter = 0;
    // Cambio la explosión de pintado rápido cada 0,04 segundos
    this.explosionInterval = setInterval(() => {
      if (counter < explosions.length) {
        this.explosion = explosions[counter];
        counter++;
      }
      // Si ya he acabado el array de steps, paro y reinicio para la siguiente explosión
      if (counter == explosions.length) {
        this.explosion = undefined;
        clearInterval(this.explosionInterval);
        counter = 0;
      }
    }, 40);
  }

  _update() {
    this._clean();
    this._drawBackground();
    this._animateBackground();
    this._drawMeatball();
    this._drawDroplets();
    this._drawExplosion();
    this._checkCollisions();
    this._writeScore();
    // Start the fall of the enemies
    let counter = 0;
    this.intervalFall = setInterval(() => { 
      if (counter < this.droplets.length) {
        this.droplets[counter]._fallDown();
        counter++;
      }
    }, 2000);
    // window.requestAnimationFrame(this._update.bind(this)); // Es lo mismo que ponerlo con arrow function
    window.requestAnimationFrame(() => this._update());
  }

  start() {
    this._assignControls();
    // Start the enemy generation
    this.intervalGame = setInterval(() => {
      this._generateDroplet();
    }, 1000);
    this._update();
  }
}