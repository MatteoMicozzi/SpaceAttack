var spaceAttack = document.getElementById("spaceAttack");
var levelText = document.getElementById("levelAtStart");
var inGameTxt = document.getElementById("inGameTxt");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx");
var afterBurnLx = document.getElementById("afterBurnLx");
var shuttleLaser = document.getElementById("shuttleLaser");
var aliens = document.getElementById("aliens");
var aliensLaser = document.getElementById("aliensLaser");
var shield_1 = document.querySelectorAll("#shield1 *");
var shield_2 = document.querySelectorAll("#shield2 *");
var shield_3 = document.querySelectorAll("#shield3 *");
var aliensLine_2 = document.querySelectorAll("#line2 *");
var aliensLine_1 = document.querySelectorAll("#line1 *");
var aliensLines = [aliensLine_1, aliensLine_2];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var shuttleLogic;
var aliensLogic;
var aliensLaserPrefireLogic;

var input = {
  gameStatus               : 'inPause',
  rightKey                 : 'up',
  leftKey                  : 'up',
  shuttleLaserStatus       : 'none',
  shuttleLaserFisicalStatus: 'start',
  aliensDirection          : 'right',
  aliensLaserStatus        : 'none',
  aliensLaserFisicalStatus : 'start'
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
};

var inGame = {
  shield1     : [true, true, true],
  shield2     : [true, true, true],
  shield3     : [true, true, true],
  aliensLines : [[true, true, true, true, true, true, true, true, true, true],
                 [true, true, true, true, true, true, true, true, true, true]],
  monsterLives: 0,
  isIt_       : false
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var lives = parseInt(document.getElementById("lives").innerHTML)
// document.getElementById("lives").innerHTML =  lives + 1

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var shield_1 = document.querySelectorAll("#shield1 *");
// var shield_2 = document.querySelectorAll("#shield2 *");
// var shield_3 = document.querySelectorAll("#shield3 *");
// var line_1 = document.querySelectorAll("#line1 *");
// var line_2 = document.querySelectorAll("#line2 *");
// line_1[9].classList.add("alienShip");
// line_2[0].classList.add("alienShip");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function aliensFireOn() {
  position.aliensLaserAxisX = position.aliensAxisX + 22 + (Math.floor(Math.random() * 10) * 100);
  aliensLaser.style.setProperty("left", position.aliensLaserAxisX + "px");
  aliensLaser.style.setProperty("top", ((Math.floor(Math.random() * 2) * 140) + 140) + "px");
  aliensLaser.classList.add("aliensLaser");
  input.aliensLaserStatus = 'on';
};

function aliensFireOff() {
  input.aliensLaserStatus = 'off';
  aliensLaser.classList.remove("aliensLaser");
  aliensLaser.style.setProperty("top", "1px");
  input.aliensLaserFisicalStatus = 'start';
};

function shuttleFireOn() {
  shuttleLaser.style.setProperty("left", position.shuttleLaserAxisX + "px");
  shuttleLaser.classList.add("shuttleLaser");
  input.shuttleLaserStatus = 'on';
};

function shuttleFireOff() {
  shuttleLaser.style.setProperty("top", "600px");
  shuttleLaser.classList.remove("shuttleLaser");
  input.shuttleLaserStatus = 'off';
  input.shuttleLaserFisicalStatus = 'start';
};

function hittingAnAlien(aliensLine, alienPosition) {
  shuttleFireOff();
  inGame.aliensLines[aliensLine][alienPosition] = false;
  aliensLines[aliensLine][alienPosition].classList.remove("alienShip", "alienShip2", "alienShip3", "alienShip4");
};

function shieldsActivation(element, index) {
  if (index == 0) {
    element = element.classList.add("shieldP1");
  } else if (index == 1) {
    element = element.classList.add("shieldP2");
  } else if (index == 2) {
    element = element.classList.add("shieldP3");
  };
};
function shieldsEntry() {
  shield_1.forEach(shieldsActivation);
  shield_2.forEach(shieldsActivation);
  shield_3.forEach(shieldsActivation);
};

function aliensPreIn(element, index) {
  if (index == 4) {
    element = element.classList.add("alienShip");
  } else if (index == 3 || index == 5 || index == 6) {
    element = element.classList.add("alienShip2");
  } else if (index == 1 || index == 2 || index == 7) {
    element = element.classList.add("alienShip3");
  } else if (index == 0 || index == 8 || index == 9) {
    element = element.classList.add("alienShip4");
  };
};
function aliensEntry() {
  aliensLine_1.forEach(aliensPreIn);
  aliensLine_2.forEach(aliensPreIn);
};

function aliensLaserOnShields() {
  if (position.aliensLaserAxisX > 1152 && position.aliensLaserAxisX < 1272) {
    if ((position.aliensLaserAxisX > 1187 && position.aliensLaserAxisX < 1227) && inGame.shield3[1]) {
      aliensFireOff();
      shield_3[1].classList.remove("shieldP2");
      inGame.shield3[1] = false;
    } else if ((position.aliensLaserAxisX > 1152 && position.aliensLaserAxisX < 1197) && inGame.shield3[0]) {
      aliensFireOff();
      shield_3[0].classList.remove("shieldP1");
      inGame.shield3[0] = false;
    } else if ((position.aliensLaserAxisX > 1222 && position.aliensLaserAxisX < 1272) && inGame.shield3[2]) {
      aliensFireOff();
      shield_3[2].classList.remove("shieldP3");
      inGame.shield3[2] = false;
    } else {
      input.aliensLaserFisicalStatus = 'afterShields';
    };
  } else if (position.aliensLaserAxisX > 632 && position.aliensLaserAxisX < 752) {
    if ((position.aliensLaserAxisX > 667 && position.aliensLaserAxisX < 707) && inGame.shield2[1]) {
      aliensFireOff();
      shield_2[1].classList.remove("shieldP2");
      inGame.shield2[1] = false;
    } else if ((position.aliensLaserAxisX > 632 && position.aliensLaserAxisX < 677) && inGame.shield2[0]) {
      aliensFireOff();
      shield_2[0].classList.remove("shieldP1");
      inGame.shield2[0] = false;
    } else if ((position.aliensLaserAxisX > 702 && position.aliensLaserAxisX < 752) && inGame.shield2[2]) {
      aliensFireOff();
      shield_2[2].classList.remove("shieldP3");
      inGame.shield2[2] = false;
    } else {
      input.aliensLaserFisicalStatus = 'afterShields';
    };
  } else if (position.aliensLaserAxisX > 112 && position.aliensLaserAxisX < 232) {
    if ((position.aliensLaserAxisX > 147 && position.aliensLaserAxisX < 187) && inGame.shield1[1]) {
      aliensFireOff();
      shield_1[1].classList.remove("shieldP2");
      inGame.shield1[1] = false;
    } else if ((position.aliensLaserAxisX > 112 && position.aliensLaserAxisX < 157) && inGame.shield1[0]) {
      aliensFireOff();
      shield_1[0].classList.remove("shieldP1");
      inGame.shield1[0] = false;
    } else if ((position.aliensLaserAxisX > 182 && position.aliensLaserAxisX < 232) && inGame.shield1[2]) {
      aliensFireOff();
      shield_1[2].classList.remove("shieldP3");
      inGame.shield1[2] = false;
    } else {
      input.aliensLaserFisicalStatus = 'afterShields';
    };
  } else {
    input.aliensLaserFisicalStatus = 'afterShields';
  };
};

function shuttleLaserOnShields() {
  if (position.shuttleLaserAxisX > 1152 && position.shuttleLaserAxisX < 1272) {
    if ((position.shuttleLaserAxisX > 1187 && position.shuttleLaserAxisX < 1227) && inGame.shield3[1]) {
      shuttleFireOff();
      shield_3[1].classList.remove("shieldP2");
      inGame.shield3[1] = false;
    } else if ((position.shuttleLaserAxisX > 1152 && position.shuttleLaserAxisX < 1197) && inGame.shield3[0]) {
      shuttleFireOff();
      shield_3[0].classList.remove("shieldP1");
      inGame.shield3[0] = false;
    } else if ((position.shuttleLaserAxisX > 1222 && position.shuttleLaserAxisX < 1272) && inGame.shield3[2]) {
      shuttleFireOff();
      shield_3[2].classList.remove("shieldP3");
      inGame.shield3[2] = false;
    } else {
      input.shuttleLaserFisicalStatus = 'afterShields';
    };
  } else if (position.shuttleLaserAxisX > 632 && position.shuttleLaserAxisX < 752) {
    if ((position.shuttleLaserAxisX > 667 && position.shuttleLaserAxisX < 707) && inGame.shield2[1]) {
      shuttleFireOff();
      shield_2[1].classList.remove("shieldP2");
      inGame.shield2[1] = false;
    } else if ((position.shuttleLaserAxisX > 632 && position.shuttleLaserAxisX < 677) && inGame.shield2[0]) {
      shuttleFireOff();
      shield_2[0].classList.remove("shieldP1");
      inGame.shield2[0] = false;
    } else if ((position.shuttleLaserAxisX > 702 && position.shuttleLaserAxisX < 752) && inGame.shield2[2]) {
      shuttleFireOff();
      shield_2[2].classList.remove("shieldP3");
      inGame.shield2[2] = false;
    } else {
      input.shuttleLaserFisicalStatus = 'afterShields';
    };
  } else if (position.shuttleLaserAxisX > 112 && position.shuttleLaserAxisX < 232) {
    if ((position.shuttleLaserAxisX > 147 && position.shuttleLaserAxisX < 187) && inGame.shield1[1]) {
      shuttleFireOff();
      shield_1[1].classList.remove("shieldP2");
      inGame.shield1[1] = false;
    } else if ((position.shuttleLaserAxisX > 112 && position.shuttleLaserAxisX < 157) && inGame.shield1[0]) {
      shuttleFireOff();
      shield_1[0].classList.remove("shieldP1");
      inGame.shield1[0] = false;
    } else if ((position.shuttleLaserAxisX > 182 && position.shuttleLaserAxisX < 232) && inGame.shield1[2]) {
      shuttleFireOff();
      shield_1[2].classList.remove("shieldP3");
      inGame.shield1[2] = false;
    } else {
      input.shuttleLaserFisicalStatus = 'afterShields';
    };
  } else {
    input.shuttleLaserFisicalStatus = 'afterShields';
  };
};

function shuttleLaserOnAliensLine(aliensElementOffset, shuttleLaserOffset, aliensLine) {
  var laserOnAliensElement = (shuttleLaserOffset + 8) - aliensElementOffset;
  var alienPosition = Math.floor(laserOnAliensElement / 100);
  var laserPositionOnAlien = laserOnAliensElement % 100;
  if (alienPosition == 0 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 1 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 2 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 3 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 4 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 5 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 6 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 7 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 8 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 9 && laserPositionOnAlien < 60 && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else {
    (aliensLine == 0) ? input.shuttleLaserFisicalStatus = 'after1stAliensLine' : input.shuttleLaserFisicalStatus = 'after';
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startResume() {

  if (!inGame.isIt_) {
    shieldsEntry();
    levelText.classList.add("level");
    shuttle.classList.add("shuttle");
    inGameTxt.classList.add("inGameTxt");
    setTimeout(function() {
      aliensEntry();
    }, 3000);
    setTimeout(function() {
      input.aliensLaserStatus = 'off';
      input.shuttleLaserStatus = 'off';
    }, 5000);
    inGame.isIt_ = true;
  };

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


    if (input.shuttleLaserStatus == 'on') {
      shuttleLaser.style.setProperty("top", (position.shuttleLaserAxisY - 10) + "px");
    };

    if (position.shuttleLaserAxisY < 600 && input.shuttleLaserFisicalStatus == 'start') {
      shuttleLaserOnShields();
    };

    if (position.shuttleLaserAxisY < 280 && input.shuttleLaserFisicalStatus == 'afterShields') {
      shuttleLaserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 0);
    };

    if (position.shuttleLaserAxisY < 140 && input.shuttleLaserFisicalStatus == 'after1stAliensLine') {
      shuttleLaserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 1);
    };

    if (position.shuttleLaserAxisY <= 0) {
      shuttleFireOff();
    };
  }, 5);

  /////////////////////////////////////////////////////////////////////////////////////

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

    if (input.aliensLaserStatus == 'on') {
      aliensLaser.style.setProperty("top", (position.aliensLaserAxisY + 7) + "px");
    };

    if (position.aliensLaserAxisY > 540 && input.aliensLaserFisicalStatus == 'start') {
      aliensLaserOnShields();
    };

    if (position.aliensLaserAxisY >= 640) {
      aliensFireOff();
    };
  }, 5);

  ///////////////////////////////////////////////////////////////////////////////////////

  aliensLaserPrefireLogic = setInterval(function() {
    if (input.aliensLaserStatus == 'off') {
      aliensFireOn();
    };
  }, 1000);

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pause() {
  clearInterval(shuttleLogic);
  clearInterval(aliensLogic);
  clearInterval(aliensLaserPrefireLogic);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39) {
    input.rightKey = 'down';
    afterBurnLx.classList.add("afterBurnLx");
  } else if (event.keyCode == 37) {
    input.leftKey = 'down';
    afterBurnRx.classList.add("afterBurnRx");
  } else if (event.keyCode == 32) {
    if (input.shuttleLaserStatus == 'off') {
      shuttleFireOn();
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
