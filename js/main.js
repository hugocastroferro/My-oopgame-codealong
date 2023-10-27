class Player {
  constructor() {
    // initialize properties
    this.height = 5;
    this.width = 7;
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
      this.positionX-= 2;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }

  moveRight() {
    if (this.positionX + this.width < 100) {
      // Prevent moving out of the screen
      this.positionX+= 2;
      this.playerElm.style.left = this.positionX + "vw";
    }
  }
}

class Obstacle {
  constructor() {
    this.height = 5;
    this.width = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width) + 1);
    this.positionY = 100;
    this.obstacleElm1 = null;
    this.obstacleElm2 = null;

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element
    this.obstacleElm1 = document.createElement("div");
    this.obstacleElm2 = document.createElement("div");

    // step2: add content or modify
     this.obstacleElm1.classList.add("obstacle");
    this.obstacleElm1.style.width = this.width + "vw";
    this.obstacleElm1.style.height = this.height + "vh";
    this.obstacleElm1.style.left = this.positionX + "vw";
    this.obstacleElm1.style.bottom = this.positionY + "vh";

    // step2: add content or modify for the second obstacle
    this.obstacleElm2.classList.add("obstacle");
    this.obstacleElm2.style.width = this.width + "vw";
    this.obstacleElm2.style.height = this.height + "vh";
    this.obstacleElm2.style.left = this.positionX + "vw";
    this.obstacleElm2.style.bottom = this.positionY + "vh";

     // step3: append to DOM both obstcles to parent
     const parentElm = document.getElementById("board");
     parentElm.appendChild(this.obstacleElm1);
     parentElm.appendChild(this.obstacleElm2);
   }

  // modifying position and updating UI for both obstacles
  moveDown() {
    this.positionY--;
    this.obstacleElm1.style.bottom = this.positionY + "vh";
    this.obstacleElm2.style.bottom = this.positionY + "vh";

    // Remove both obstacles from the DOM when either one goes out of view
    if (this.positionY < 0 - this.height) {
      this.obstacleElm1.remove();
      this.obstacleElm2.remove();

      // Remove both obstacles from the array
      obstacleArr.shift();
    }
  }
}

const player = new Player();

const obstacleArr = []; // will store instances of the class Obstacle

//create obstacles
setInterval(() => {
  const newObstacle = new Obstacle();
  obstacleArr.push(newObstacle);
}, 300);

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
}, 20);

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
