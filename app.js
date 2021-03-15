var spaceAttack = document.getElementById("spaceAttack");
var levelText = document.getElementById("levelAtStart");
var inGameTxt = document.getElementById("inGameTxt");
var lives = document.getElementById("lives");
var level = document.getElementById("level");
var score = document.getElementById("score");
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
var aliensAvailability;
var activeAliensLine1;
var activeAliensLine2;

var input = {
  gameStatus                : 'inPause',
  rightKey                  : 'up',
  leftKey                   : 'up',
  shuttleLaserStatus        : 'none',
  shuttleLaserPhysicalStatus: 'start',
  aliensDirection           : 'right',
  aliensLaserStatus         : 'none',
  aliensLaserPhysicalStatus : 'start'
}

var position = {
  shuttleAxisX          : 0,
  shuttleLaserAxisX     : 0,
  shuttleLaserAxXOnTheGo: 0,
  shuttleLaserAxisY     : 0,
  aliensAxisX           : 0,
  aliensLaserAxisX      : 0,
  aliensLaserAxisY      : 0
};

var user = {
  lives     : 6,
  level     : 1,
  score     : 0,
};

var inGame = {
  shields: [[true, true, true],
            [true, true, true],
            [true, true, true]],
  aliensLines: [[true, true, true, true, true, true, true, true, true, true],
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
// Math.floor(Math.random() * 10);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activeAliensL1(value, index) {
  if (value) { activeAliensLine1.push(index) };
};
function activeAliensL2(value, index) {
  if (value) { activeAliensLine2.push(index) };
};
function randomAlienFire() {
  activeAliensLine1 = [];
  activeAliensLine2 = [];
  inGame.aliensLines[0].forEach(activeAliensL1);
  inGame.aliensLines[1].forEach(activeAliensL2);
  let randomIndexLine1 = Math.floor(Math.random() * activeAliensLine1.length);
  let randomIndexLine2 = Math.floor(Math.random() * activeAliensLine2.length);
  aliensAvailability = "none";
  if (activeAliensLine1.length == 0 && activeAliensLine2.length > 0) {
    aliensAvailability = "line2";
  } else if (activeAliensLine1.length > 0 && activeAliensLine2.length == 0) {
    aliensAvailability = "line1";
  } else if (activeAliensLine1.length > 0 && activeAliensLine2.length > 0) {
    (Math.floor(Math.random() * 2) == 0) ? aliensAvailability = "line1" : aliensAvailability = "line2";
  };
  if (aliensAvailability == "line2") {
    position.aliensLaserAxisX = position.aliensAxisX + 22 + (activeAliensLine2[randomIndexLine2] * 100);
    aliensLaser.style.setProperty("top", "140px");
    aliensLaser.style.setProperty("left", position.aliensLaserAxisX + "px");
  } else if (aliensAvailability == "line1") {
    position.aliensLaserAxisX = position.aliensAxisX + 22 + (activeAliensLine1[randomIndexLine1] * 100);
    aliensLaser.style.setProperty("top", "280px");
    aliensLaser.style.setProperty("left", position.aliensLaserAxisX + "px");
  };
};

function aliensFireOn() {
  randomAlienFire();
  if (aliensAvailability != "none") {
    aliensLaser.classList.add("aliensLaser");
    input.aliensLaserStatus = 'on';
  };
};

function aliensFireOff() {
  input.aliensLaserStatus = 'off';
  aliensLaser.classList.remove("aliensLaser");
  aliensLaser.style.setProperty("top", "1px");
  input.aliensLaserPhysicalStatus = 'start';
};

function shuttleFireOn() {
  position.shuttleLaserAxisX = position.shuttleAxisX + 22;
  shuttleLaser.style.setProperty("left", position.shuttleLaserAxisX + "px");
  shuttleLaser.classList.add("shuttleLaser");
  input.shuttleLaserStatus = 'on';
};

function shuttleFireOff() {
  input.shuttleLaserStatus = 'off';
  shuttleLaser.classList.remove("shuttleLaser");
  shuttleLaser.style.setProperty("top", "630px");
  input.shuttleLaserPhysicalStatus = 'start';
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hittingAShield(alienOrShuttle, indexShield, indexPosition) {
  if (alienOrShuttle == "alien") {aliensFireOff()};
  if (alienOrShuttle == "shuttle") {shuttleFireOff()};
  if (indexShield == 0) {shield_1[indexPosition].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  if (indexShield == 1) {shield_2[indexPosition].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  if (indexShield == 2) {shield_3[indexPosition].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  inGame.shields[indexShield][indexPosition] = false;
};

function hittingAShieldsBlock(alienOrShuttle, offset, indexShield, laserAxisX) {
  if ((laserAxisX > (offset + 35) && laserAxisX < (offset + 75)) && inGame.shields[indexShield][1]) {
    hittingAShield(alienOrShuttle, indexShield, 1);
  } else if ((laserAxisX > offset && laserAxisX < (offset + 45)) && inGame.shields[indexShield][0]) {
    hittingAShield(alienOrShuttle, indexShield, 0);
  } else if ((laserAxisX > (offset + 70) && laserAxisX < (offset + 120)) && inGame.shields[indexShield][2]) {
    hittingAShield(alienOrShuttle, indexShield, 2);
  } else {
    if (alienOrShuttle == "alien")   {input.aliensLaserPhysicalStatus= "afterShields"};
    if (alienOrShuttle == "shuttle") {input.shuttleLaserPhysicalStatus= "afterShields"};
  };
};

/////////////////////////

function aliensLaserOnShields() {
  if (position.aliensLaserAxisX > 1152 && position.aliensLaserAxisX < 1272) {
    hittingAShieldsBlock("alien", 1152, 2, position.aliensLaserAxisX);
  } else if (position.aliensLaserAxisX > 632 && position.aliensLaserAxisX < 752) {
    hittingAShieldsBlock("alien", 632, 1, position.aliensLaserAxisX);
  } else if (position.aliensLaserAxisX > 112 && position.aliensLaserAxisX < 232) {
    hittingAShieldsBlock("alien", 112, 0, position.aliensLaserAxisX);
  } else {
    input.aliensLaserPhysicalStatus = 'afterShields';
  };
};

function shuttleLaserOnShields() {
  if (position.shuttleLaserAxisX > 1152 && position.shuttleLaserAxisX < 1272) {
    hittingAShieldsBlock("shuttle", 1152, 2, position.shuttleLaserAxisX);
  } else if (position.shuttleLaserAxisX > 632 && position.shuttleLaserAxisX < 752) {
    hittingAShieldsBlock("shuttle", 632, 1, position.shuttleLaserAxisX);
  } else if (position.shuttleLaserAxisX > 112 && position.shuttleLaserAxisX < 232) {
    hittingAShieldsBlock("shuttle", 112, 0, position.shuttleLaserAxisX);
  } else {
    input.shuttleLaserPhysicalStatus = 'afterShields';
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function twoAliensAreBack(aliensLine, alienPosition) {
  if (!inGame.aliensLines[Math.abs(aliensLine - 1)][alienPosition]) {
    setTimeout(function() {
      aliensLines[aliensLine][alienPosition].classList.add("alienShip");
      aliensLines[Math.abs(aliensLine - 1)][alienPosition].classList.add("alienShip");
      setTimeout(function() {
        inGame.aliensLines[aliensLine][alienPosition] = true;
        inGame.aliensLines[Math.abs(aliensLine - 1)][alienPosition] = true;
      }, 1200);
    }, 1000);
  };
};

function hittingAnAlien(aliensLine, alienPosition) {
  inGame.aliensLines[aliensLine][alienPosition] = false;
  aliensLines[aliensLine][alienPosition].classList.remove("alienShip", "alienShip2", "alienShip3", "alienShip4");
  shuttleFireOff();
  user.score += 1;
  score.innerHTML = user.score;
  //twoAliensAreBack(aliensLine, alienPosition);
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
    (aliensLine == 0) ? input.shuttleLaserPhysicalStatus = 'after1stAliensLine' : input.shuttleLaserPhysicalStatus = 'after';
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startResume() {

  if (!inGame.isIt_) {
    shieldsEntry();
    levelText.classList.add("level");
    shuttle.classList.add("shuttle");
    inGameTxt.classList.add("inGameTxt");
    lives.innerHTML = user.lives;
    level.innerHTML = user.level;
    score.innerHTML = user.score;
    setTimeout(function() {
      aliensEntry();
    }, 3000);
    setTimeout(function() {
      input.aliensLaserStatus = 'off';
      input.shuttleLaserStatus = 'off';
    }, 5000);
    inGame.isIt_ = true;
  };

  ///////////////////////////////////////////////////////////////////////////////////////

  shuttleLogic = setInterval(function() {
    position.shuttleAxisX = parseInt(window.getComputedStyle(shuttle).getPropertyValue("left"));
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

    if (position.shuttleLaserAxisY < 600 && input.shuttleLaserPhysicalStatus == 'start') {
      shuttleLaserOnShields();
    };

    if (position.shuttleLaserAxisY < 280 && input.shuttleLaserPhysicalStatus == 'afterShields') {
      shuttleLaserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 0);
    };

    if (position.shuttleLaserAxisY < 140 && input.shuttleLaserPhysicalStatus == 'after1stAliensLine') {
      shuttleLaserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 1);
    };

    if (position.shuttleLaserAxisY <= 0) {
      shuttleFireOff();
    };
  }, 5);

  ///////////////////////////////////////////////////////////////////////////////////////

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

    if (position.aliensLaserAxisY > 560 && input.aliensLaserPhysicalStatus == 'start') {
      aliensLaserOnShields();
    };

    if (position.aliensLaserAxisY >= 660) {
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
