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

class Obstacle {
  constructor() {
    this.positionX = 50;
    this.positionY = 100;
    this.height = 10;
    this.width = 30;
    this.obstacleElm = null;

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element
    this.obstacleElm = document.createElement("div");

    // step2: add content or modify
    this.obstacleElm.classList.add("obstacle");
    this.obstacleElm.style.width = this.width;
    +"vw";
    this.obstacleElm.style.height = this.height;
    +"vh";
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
        // Collision detected!
        location.href = "./gameover.html"
      } 
    
  });
}, 30);



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
