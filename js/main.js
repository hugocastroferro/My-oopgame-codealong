class Player {
  constructor() {
    // initialize properties
    this.height = 10;
    this.width = 30;
    this.positionX = 50 - this.width / 2; // Center the player
    this.positionY = 0;

    // dom manipulation to reflect initial values (size, position)
    this.playerElm = document.getElementById("player");
    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";

    this.playerElm.style.left = this.positionX + "vw";
    this.playerElm.style.bottom = this.positionY + "vh";
  }

  moveLeft() {
    if (this.positionX > 0) {
      // Prevent moving out of the screen
      this.positionX--;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX + this.width < 100) {
      // Prevent moving out of the screen
      this.positionX++;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }
}

class Obstacle {
  constructor() {
    this.height = 10;
    this.width = 30;
    this.positionX = Math.floor(Math.random() * (100 - this.width) + 1);
    this.positionY = 100;
    this.obstacleElm = null;

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element
    this.obstacleElm = document.createElement("div");

    // step2: add content or modify
    this.obstacleElm.classList.add("obstacle");
    this.obstacleElm.style.width = this.width + "vw";
    this.obstacleElm.style.height = this.height + "vh";
    this.obstacleElm.style.left = this.positionX + "vw";
    this.obstacleElm.style.bottom = this.positionY + "vh";

    // step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.obstacleElm);
  }

  // modifying position and updating UI
  moveDown() {
    this.positionY--;
    this.obstacleElm.style.bottom = this.positionY + "vh";

    // Remove the obstacle from DOM
    if (this.positionY < 0) {
      this.obstacleElm.remove();
    }
  }
}

const player = new Player();

const obstacleArr = []; // will store instances of the class Obstacle

//create obstacles
setInterval(() => {
  const newObstacle = new Obstacle();
  obstacleArr.push(newObstacle);
}, 3000);

//update obstacles
setInterval(() => {
  obstacleArr.forEach((obstacleInstance) => {
    //move obstacles
    obstacleInstance.moveDown();

    //detect collision
    if (
      player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
      player.positionX + player.width > obstacleInstance.positionX &&
      player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
      player.positionY + player.height > obstacleInstance.positionY
    ) {
      console.log("Collision detected!");
      //location.href = "./gameover.html"
    }
  });
}, 30);

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      console.log("pressed left");
      player.moveLeft(); // Call the moveLeft function
      break;
    case "ArrowRight":
      console.log("pressed right");
      player.moveRight(); // Call the moveRight function
      break;
  }
});
