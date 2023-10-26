class Player {
  constructor() {
    // initialize properties
    this.positionX = 50;
    this.positionY = 0;
    this.height = 20;
    this.width = 30;

    // dom manipulation to reflect initial values (size, position)
    this.playerElm = document.getElementById("player");
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";

    this.playerElm.style.left = this.positionX + "vw";
    this.playerElm.style.bottom = this.positionY + "vh";
  }
  moveLeft() {
    this.positionX--;

    this.playerElm.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX++;

    this.playerElm.style.left = this.positionX + "vw";
  }
}

const player = new Player();

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      console.log("pressed left");
      player.moveLeft;
      break;
    case "ArrowRight":
      console.log("pressed right");
      player.moveRight;
      break;
  }
});
