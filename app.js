var spaceAttack = document.getElementById("spaceAttack");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx");
var afterBurnLx = document.getElementById("afterBurnLx");
var shuttleLaser = document.getElementById("shuttleLaser");
var aliens = document.getElementById("aliens");
var aliensLaser = document.getElementById("aliensLaser");
var shuttlePosition;
var shuttleLaserPositionX;
var shuttleLaserPositionY;
var aliensPositionX;
var aliensLaserPositionX;
var aliensLaserPositionY;
var keyRight = 'up';
var keyLeft = 'up';
var keySpacebar = 'up';
var aliensDirection = 'right';
var aliensLaserStatus = 'waiting';
var aliensLaserTiming = 0;

var user = {
  lives     : 6,
  level     : 1,
  score     : 0,
  shields_p1: 3,
  shields_p2: 3,
  shields_p3: 3
};

var inGame = {
  aliensLine2 : {p1:true, p2:true, p3:true, p4:true, p5:true, p6:true, p7:true, p8:true, p9:true, p10:true},
  aliensLine1 : {p1:true, p2:true, p3:true, p4:true, p5:true, p6:true, p7:true, p8:true, p9:true, p10:true},
  monsterLives: 0
}


// var lives = parseInt(document.getElementById("lives").innerHTML)
// document.getElementById("lives").innerHTML =  lives + 1

setInterval(function() {
  shuttlePosition = parseInt(window.getComputedStyle(shuttle).getPropertyValue("left"));
  shuttleLaserPositionX = shuttlePosition + 21;
  shuttleLaserPositionY = parseInt(window.getComputedStyle(shuttleLaser).getPropertyValue("top"));
  aliensPositionX = parseInt(window.getComputedStyle(aliens).getPropertyValue("left"));
  aliensLaserPositionX = aliensPositionX + 22;
  aliensLaserPositionY = parseInt(window.getComputedStyle(aliensLaser).getPropertyValue("top"));


  if (keyRight == 'down' && shuttlePosition <= 1320) {
    shuttle.style.setProperty("left", (shuttlePosition + 4) + "px");
  };
  if (keyLeft == 'down' && shuttlePosition >= 20) {
    shuttle.style.setProperty("left", (shuttlePosition - 4) + "px");
  };


  if (keySpacebar == 'down' && shuttleLaserPositionY >= 0) {
    shuttleLaser.style.setProperty("top", (shuttleLaserPositionY - 10) + "px");
  } else {
    keySpacebar = 'up';
  };
  if (keySpacebar == 'up') {
    shuttleLaser.style.setProperty("top", "600px");
    shuttleLaser.classList.remove("shuttleLaser");
  };


  if (aliensDirection == 'right' && aliensPositionX <= 420) {
    aliens.style.setProperty("left", (aliensPositionX + 1) + "px");
  } else {
    aliensDirection = 'left';
  };
  if (aliensDirection == 'left' && aliensPositionX >= 20) {
    aliens.style.setProperty("left", (aliensPositionX - 1) + "px");
  } else {
    aliensDirection = 'right';
  };

  if (aliensLaserTiming <= 1000) {
    aliensLaserTiming += 5;
  } else if (aliensLaserTiming > 1000 && aliensLaserStatus == 'waiting') {
    aliensLaserStatus = 'firing';
    aliensLaser.style.setProperty("left", (aliensLaserPositionX + (Math.floor(Math.random() * 10) * 100)) + "px");
    aliensLaser.style.setProperty("top", ((Math.floor(Math.random() * 2) * 140) + 140) + "px");
    aliensLaser.classList.add("aliensLaser");
  } else if (aliensLaserStatus == 'firing' && aliensLaserPositionY < 640) {
    aliensLaser.style.setProperty("top", (aliensLaserPositionY + 7) + "px");
  } else if (aliensLaserPositionY >= 640) {
    aliensLaserTiming = 0;
    aliensLaserStatus = 'waiting';
    aliensLaser.classList.remove("aliensLaser");
  }

},5);

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39) {
    keyRight = 'down';
    afterBurnLx.classList.add("afterBurnLx");
  } else if (event.keyCode == 37) {
    keyLeft = 'down';
    afterBurnRx.classList.add("afterBurnRx");
  } else if (event.keyCode == 32) {
    if (keySpacebar == 'up') {
      keySpacebar = 'down';
      shuttleLaser.style.setProperty("left", shuttleLaserPositionX + "px");
      shuttleLaser.classList.add("shuttleLaser");
    };
  };
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 39) {
    keyRight = 'up';
    afterBurnLx.classList.remove("afterBurnLx");
  };
  if (event.keyCode == 37) {
    keyLeft = 'up';
    afterBurnRx.classList.remove("afterBurnRx");
  };
});
