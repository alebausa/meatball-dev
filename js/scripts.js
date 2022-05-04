window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const losePage = document.getElementById('lose-page');
  const startButton = document.getElementById('start');
  const startAgainButton = document.getElementById('start-again');
  let game;
  
  startButton.onclick = function () {
    startPage.style = "display: none";
    canvas.classList.remove('hidden');
    game = new Game(ctx);
    game.start();
  }

  startAgainButton.onClick = function () {
    losePage.style = "display: none";
    canvas.classList.remove('hidden');
    canvas.classList.add('shown');
    game = new Game(ctx);
    game.start();
  }
}
