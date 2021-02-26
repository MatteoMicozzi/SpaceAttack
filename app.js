var spaceAttack = document.getElementById("spaceAttack");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx");
var afterBurnLx = document.getElementById("afterBurnLx");
var shuttleLaser = document.getElementById("shuttleLaser");
var aliens = document.getElementById("aliens");
var shuttlePosition;
var shuttleLaserPositionX;
var shuttleLaserPositionY;
var aliensPositionX;
var aliensLaserPositionX;
var keyRight = 'up';
var keyLeft = 'up';
var keySpacebar = 'up';
var aliensDirection = 'right';

// var lives = parseInt(document.getElementById("lives").innerHTML)
// document.getElementById("lives").innerHTML =  lives + 1

setInterval(function() {
  shuttlePosition = parseInt(window.getComputedStyle(shuttle).getPropertyValue("left"));
  shuttleLaserPositionX = shuttlePosition + 21;
  shuttleLaserPositionY = parseInt(window.getComputedStyle(shuttleLaser).getPropertyValue("top"));
  aliensPositionX = parseInt(window.getComputedStyle(aliens).getPropertyValue("left"));

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
