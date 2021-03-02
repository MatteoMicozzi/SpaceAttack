var spaceAttack = document.getElementById("spaceAttack");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx");
var afterBurnLx = document.getElementById("afterBurnLx");
var shuttleLaser = document.getElementById("shuttleLaser");
var aliens = document.getElementById("aliens");
var aliensLaser = document.getElementById("aliensLaser");
var shuttleLogic;
var aliensLogic;

var input = {
  gameStatus       : 'inPause',
  rightKey         : 'up',
  leftKey          : 'up',
  spacebarKey      : 'up',
  aliensDirection  : 'right',
  aliensLaserStatus: 'waiting',
  aliensLaserTiming: 0
}

var position = {
  shuttleAxisX     : 0,
  shuttleLaserAxisX: 0,
  shuttleLaserAxisY: 0,
  aliensAxisX      : 0,
  aliensLaserAxisX : 0,
  aliensLaserAxisY : 0
};

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
};


// var lives = parseInt(document.getElementById("lives").innerHTML)
// document.getElementById("lives").innerHTML =  lives + 1
function startResume() {

  shuttleLogic = setInterval(function() {
    position.shuttleAxisX = parseInt(window.getComputedStyle(shuttle).getPropertyValue("left"));
    position.shuttleLaserAxisX = position.shuttleAxisX + 21;
    position.shuttleLaserAxisY = parseInt(window.getComputedStyle(shuttleLaser).getPropertyValue("top"));

    if (input.rightKey == 'down' && position.shuttleAxisX <= 1320) {
      shuttle.style.setProperty("left", (position.shuttleAxisX + 4) + "px");
    };
    if (input.leftKey == 'down' && position.shuttleAxisX >= 20) {
      shuttle.style.setProperty("left", (position.shuttleAxisX - 4) + "px");
    };

    if (input.spacebarKey == 'down' && position.shuttleLaserAxisY >= 0) {
      shuttleLaser.style.setProperty("top", (position.shuttleLaserAxisY - 10) + "px");
    } else {
      input.spacebarKey = 'up';
    };
    if (input.spacebarKey == 'up') {
      shuttleLaser.style.setProperty("top", "600px");
      shuttleLaser.classList.remove("shuttleLaser");
    };
  }, 5);

  aliensLogic = setInterval(function() {
    position.aliensAxisX = parseInt(window.getComputedStyle(aliens).getPropertyValue("left"));
    position.aliensLaserAxisY = parseInt(window.getComputedStyle(aliensLaser).getPropertyValue("top"));

    if (input.aliensDirection == 'right' && position.aliensAxisX <= 420) {
      aliens.style.setProperty("left", (position.aliensAxisX + 1) + "px");
    } else {
      input.aliensDirection = 'left';
    };
    if (input.aliensDirection == 'left' && position.aliensAxisX >= 20) {
      aliens.style.setProperty("left", (position.aliensAxisX - 1) + "px");
    } else {
      input.aliensDirection = 'right';
    };

    if (input.aliensLaserTiming <= 500) {
      input.aliensLaserTiming += 5;
    } else if (input.aliensLaserTiming > 500 && input.aliensLaserStatus == 'waiting') {
      input.aliensLaserStatus = 'firing';
      position.aliensLaserAxisX = position.aliensAxisX + 22 + (Math.floor(Math.random() * 10) * 100);
      aliensLaser.style.setProperty("left", position.aliensLaserAxisX + "px");
      aliensLaser.style.setProperty("top", ((Math.floor(Math.random() * 2) * 140) + 140) + "px");
      aliensLaser.classList.add("aliensLaser");
    } else if (input.aliensLaserStatus == 'firing' && position.aliensLaserAxisY <= 640) {
      aliensLaser.style.setProperty("top", (position.aliensLaserAxisY + 7) + "px");
    } else if (position.aliensLaserAxisY >= 640) {
      input.aliensLaserTiming = 0;
      input.aliensLaserStatus = 'waiting';
      aliensLaser.classList.remove("aliensLaser");
    };
  }, 5);

};

function pause() {
  clearInterval(shuttleLogic);
  clearInterval(aliensLogic);
}

function onPlayPause() {
  if (input.gameStatus == 'inPause') {
    startResume();
    input.gameStatus = 'inPlay';
    document.getElementById("startPause").innerHTML = 'Pause';
  } else if (input.gameStatus == 'inPlay') {
    pause();
    input.gameStatus = 'inPause';
    document.getElementById("startPause").innerHTML = 'Resume';
  };
}

document.getElementById("startPause").addEventListener("click", function() {
  onPlayPause();
});

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39) {
    input.rightKey = 'down';
    afterBurnLx.classList.add("afterBurnLx");
  } else if (event.keyCode == 37) {
    input.leftKey = 'down';
    afterBurnRx.classList.add("afterBurnRx");
  } else if (event.keyCode == 32) {
    if (input.spacebarKey == 'up') {
      input.spacebarKey = 'down';
      shuttleLaser.style.setProperty("left", position.shuttleLaserAxisX + "px");
      shuttleLaser.classList.add("shuttleLaser");
    };
  } else if (event.keyCode == 80) {
    onPlayPause();
  };
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 39) {
    input.rightKey = 'up';
    afterBurnLx.classList.remove("afterBurnLx");
  };
  if (event.keyCode == 37) {
    input.leftKey = 'up';
    afterBurnRx.classList.remove("afterBurnRx");
  };
});
