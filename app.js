var body = document.getElementById("body");
var menu = document.getElementById("menu");
var title = document.getElementById("title");
var startPause = document.getElementById("startPause");
var spaceAttack = document.getElementById("spaceAttack");
var shellGameTopTxt = document.getElementById("shellGameTopTxt");
var shellShuttle = document.getElementById("shellShuttle");
var topCover = document.getElementById("topCover");
var bottomCover = document.getElementById("bottomCover");

var levelText = document.getElementById("levelAtStart");
var gameTopTxt = document.getElementById("gameTopTxt");
var lives = document.getElementById("lives");
var level = document.getElementById("level");
var score = document.getElementById("score");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx");
var afterBurnLx = document.getElementById("afterBurnLx");
var shuttleLaser = document.getElementById("shuttleLaser");
var aliens = document.getElementById("aliens");
var aliensLaser = document.getElementById("aliensLaser");
var gameOverElem = document.getElementById("gameOver");

var shields = document.querySelector("#shields");
var shieldsAll = document.querySelectorAll("#s1Part1, #s1Part2, #s1Part3, #s2Part1, #s2Part2, #s2Part3, #s3Part1, #s3Part2, #s3Part3");
var shield1 = document.querySelector("#shield1");
var shield2 = document.querySelector("#shield2");
var shield3 = document.querySelector("#shield3");
var shield_1 = document.querySelectorAll("#shield1 *");
var shield_2 = document.querySelectorAll("#shield2 *");
var shield_3 = document.querySelectorAll("#shield3 *");
var aliensLine1 = document.querySelector("#line1");
var aliensLine_2 = document.querySelectorAll("#line2 *");
var aliensLine_1 = document.querySelectorAll("#line1 *");
var aliensLines = [aliensLine_1, aliensLine_2];

var windowInWidth;
var windowInHeight;
var spaceAttackWidth;
var spaceAttackHeight;
var scaleSize1;
var scaleSize2;
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
  shuttleLaserAxXOnTheGo: 0,   /////// ???????????
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

var game = {
  counter : 0,
  level_1 : 0,
  level_2 : 5,
  level_3 : 10,
  level_4 : 15,
  level_5 : 80, // monster
  level_6 : 20,
  level_7 : 40,
  level_8 : 60,
  level_9 : 80,
  level_10: 120,
  level_11: 30,
  level_12: 60,
  level_13: 90,
  level_14: 120,
  level_15: 200
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
    position.aliensLaserAxisX = position.aliensAxisX + (scaleSize2 * 3) + (activeAliensLine2[randomIndexLine2] * (scaleSize2 * 10));
    aliensLaser.style.setProperty("top", (scaleSize2 * 11) + "px");
    aliensLaser.style.setProperty("left", (position.aliensLaserAxisX - scaleSize2) + "px");
  } else if (aliensAvailability == "line1") {
    position.aliensLaserAxisX = position.aliensAxisX + (scaleSize2 * 3) + (activeAliensLine1[randomIndexLine1] * (scaleSize2 * 10));
    aliensLaser.style.setProperty("top", (scaleSize2 * 19) + "px");
    aliensLaser.style.setProperty("left", (position.aliensLaserAxisX - scaleSize2) + "px");
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
  position.shuttleLaserAxisX = position.shuttleAxisX + (scaleSize2 * 3);
  shuttleLaser.style.setProperty("left", (position.shuttleAxisX + (scaleSize2 * 2)) + "px");
  shuttleLaser.classList.add("shuttleLaser");
  input.shuttleLaserStatus = 'on';
};

function shuttleFireOff() {
  input.shuttleLaserStatus = 'off';
  shuttleLaser.classList.remove("shuttleLaser");
  shuttleLaser.style.setProperty("top", (spaceAttackHeight - (scaleSize2 * 8)) + "px");
  input.shuttleLaserPhysicalStatus = 'start';
};

function gameOver() {
  gameOverElem.classList.add("gameOver");
  startPause.innerHTML = "Start";
  gameTopTxt.classList.remove("gameTopTxt");
  shuttle.classList.remove("shuttle");
  aliensLine_1.forEach(function(element) { element.classList.remove("alienShip", "alienShip2", "alienShip3", "alienShip4") });
  aliensLine_2.forEach(function(element) { element.classList.remove("alienShip", "alienShip2", "alienShip3", "alienShip4") });
  aliensLaser.classList.remove("aliensLaser");
  shield_1.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  shield_2.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  shield_3.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  inGame.isIt_ = false;
  inGame.aliensLines = [[true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true]];
  inGame.shields = [[true, true, true], [true, true, true], [true, true, true]];
  input.aliensLaserStatus = "none";
  input.shuttleLaserStatus = "none";
  input.gameStatus = "inPause";
  pause();
  setTimeout(function () {
    gameOverElem.classList.remove("gameOver");
  }, 3000);
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

function hittingShieldsBlock(alienOrShuttle, offset, indexShield, laserAxisX) {
  if ((laserAxisX > (offset + (scaleSize2 * 4)) && laserAxisX < (offset + (scaleSize2 * 8))) && inGame.shields[indexShield][1]) {
    hittingAShield(alienOrShuttle, indexShield, 1);
  } else if ((laserAxisX > offset && laserAxisX < (offset + (scaleSize2 * 5))) && inGame.shields[indexShield][0]) {
    hittingAShield(alienOrShuttle, indexShield, 0);
  } else if ((laserAxisX > (offset + (scaleSize2 * 7)) && laserAxisX < (offset + (scaleSize2 * 12))) && inGame.shields[indexShield][2]) {
    hittingAShield(alienOrShuttle, indexShield, 2);
  } else {
    if (alienOrShuttle == "alien")   {input.aliensLaserPhysicalStatus= "afterShields"};
    if (alienOrShuttle == "shuttle") {input.shuttleLaserPhysicalStatus= "afterShields"};
  };
};

/////////////////////////

function laserOnShields(alienOrShuttle, laserPositionX) {
  if (laserPositionX > (spaceAttackWidth - (scaleSize2 * 24)) && laserPositionX < (spaceAttackWidth - (scaleSize2 * 12))) {
    hittingShieldsBlock(alienOrShuttle, (spaceAttackWidth - (scaleSize2 * 24)), 2, laserPositionX);
  } else if (laserPositionX > ((spaceAttackWidth / 2) - (scaleSize2 * 6)) && laserPositionX < ((spaceAttackWidth / 2) + (scaleSize2 * 6))) {
    hittingShieldsBlock(alienOrShuttle, ((spaceAttackWidth / 2) - (scaleSize2 * 6)), 1, laserPositionX);
  } else if (laserPositionX > (scaleSize2 * 12) && laserPositionX < (scaleSize2 * 24)) {
    hittingShieldsBlock(alienOrShuttle, (scaleSize2 * 12), 0, laserPositionX);
  } else {
    if (alienOrShuttle == "alien")   {input.aliensLaserPhysicalStatus= "afterShields"};
    if (alienOrShuttle == "shuttle") {input.shuttleLaserPhysicalStatus= "afterShields"};
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

function laserOnAliensLine(aliensElementOffset, shuttleLaserOffset, aliensLine) {
  var laserOnAliensElement = shuttleLaserOffset - aliensElementOffset;
  var alienPosition = Math.floor((laserOnAliensElement / scaleSize2) / 10);
  var laserPositionOnAlien = Math.floor((laserOnAliensElement / scaleSize2) % 10) * 10;
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

function laserOnShuttle(laserPositionX) {
  if (laserPositionX > position.shuttleAxisX && laserPositionX < (position.shuttleAxisX + (scaleSize2 * 6))) {
    aliensFireOff();
    user.lives -= 1;
    lives.innerHTML = user.lives;
  };
  if (user.lives == 0) {
    shuttle.classList.remove("shuttle");
    gameOver();
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startResume() {

  if (!inGame.isIt_) {
    shieldsEntry();
    levelText.classList.add("level");
    shuttle.classList.add("shuttle");
    gameTopTxt.classList.add("gameTopTxt");
    lives.innerHTML = user.lives = 6;
    level.innerHTML = user.level = 1;
    score.innerHTML = user.score = 0;
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

    if (input.rightKey == 'down' && position.shuttleAxisX < (windowInWidth - (scaleSize1 * 4) - (scaleSize2 * 8))) {
      shuttle.style.setProperty("left", (position.shuttleAxisX + (scaleSize2 / 2)) + "px");
    };
    if (input.leftKey == 'down' && position.shuttleAxisX >= (scaleSize2 * 2)) {
      shuttle.style.setProperty("left", (position.shuttleAxisX - (scaleSize2 / 2)) + "px");
    };

    if (input.shuttleLaserStatus == 'on') {
      shuttleLaser.style.setProperty("top", (position.shuttleLaserAxisY - scaleSize2) + "px");
    };

    if (position.shuttleLaserAxisY < (spaceAttackHeight - (scaleSize2 * 10)) && input.shuttleLaserPhysicalStatus == 'start') {
      laserOnShields("shuttle", position.shuttleLaserAxisX);
    };

    if (position.shuttleLaserAxisY < (scaleSize2 * 19) && input.shuttleLaserPhysicalStatus == 'afterShields') {
      laserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 0);
    };

    if (position.shuttleLaserAxisY < (scaleSize2 * 11) && input.shuttleLaserPhysicalStatus == 'after1stAliensLine') {
      laserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 1);
    };

    if (position.shuttleLaserAxisY <= 0) {
      shuttleFireOff();
    };
  }, 5);

  ///////////////////////////////////////////////////////////////////////////////////////

  aliensLogic = setInterval(function() {
    position.aliensAxisX = parseInt(window.getComputedStyle(aliens).getPropertyValue("left"));
    position.aliensLaserAxisY = parseInt(window.getComputedStyle(aliensLaser).getPropertyValue("top"));

    if (input.aliensDirection == 'right' && position.aliensAxisX <= (windowInWidth - (scaleSize1 * 4) - (scaleSize2 * 98))) {
      aliens.style.setProperty("left", (position.aliensAxisX + 1) + "px");
    } else {
      input.aliensDirection = 'left';
    };
    if (input.aliensDirection == 'left' && position.aliensAxisX >= (scaleSize2 * 2)) {
      aliens.style.setProperty("left", (position.aliensAxisX - 1) + "px");
    } else {
      input.aliensDirection = 'right';
    };

    if (input.aliensLaserStatus == 'on') {
      aliensLaser.style.setProperty("top", (position.aliensLaserAxisY + (scaleSize2 / 1.5)) + "px");
    };

    if (position.aliensLaserAxisY > (spaceAttackHeight - (scaleSize2 * 12)) && input.aliensLaserPhysicalStatus == 'start') {
      laserOnShields("alien", position.aliensLaserAxisX);
    };

    if (position.aliensLaserAxisY > (spaceAttackHeight - (scaleSize2 * 6)) && input.aliensLaserPhysicalStatus == 'afterShields') {
      laserOnShuttle(position.aliensLaserAxisX);
    };

    if (position.aliensLaserAxisY >= spaceAttackHeight) {
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
    startPause.innerHTML = 'Pause';
  } else if (input.gameStatus == 'inPlay') {
    pause();
    input.gameStatus = 'inPause';
    startPause.innerHTML = 'Resume';
  };
}

document.getElementById("startPause").addEventListener("click", function() {
  onPlayPause();
});

function windowResize() {
  windowInWidth = window.innerWidth;
  windowInHeight = window.innerHeight;
  scaleSize1 = (windowInWidth > windowInHeight) ? windowInHeight : windowInWidth;
  scaleSize1 = Math.floor(scaleSize1 / 100);
  scaleSize2 = (windowInWidth > (windowInHeight * 2)) ? windowInHeight : (windowInWidth / 2);
  scaleSize2 = Math.floor(scaleSize2 / 100) + 3;
  spaceAttackWidth = windowInWidth - (scaleSize1 * 4);
  spaceAttackHeight = windowInHeight - (scaleSize1 * 18);

  body.style.cssText = `font-size: ${scaleSize1 * 2}px`;
  title.style.cssText = `font-size: ${scaleSize1 * 7}px; top: ${scaleSize1}px`;
  startPause.style.cssText = `font-size: ${scaleSize1 * 3}px; top: ${scaleSize1 * 9}px`;
  menu.style.cssText = `top: ${scaleSize1}px; left: ${scaleSize1}px; width: ${spaceAttackWidth}px; height: ${scaleSize1 * 13}px; border: ${scaleSize1}px solid blue`;
  spaceAttack.style.cssText = `top: ${scaleSize1 * 15}px; left: ${scaleSize1}px; width: ${spaceAttackWidth}px; height: ${spaceAttackHeight}px; border: ${scaleSize1}px solid blue`;
  shellGameTopTxt.style.cssText = `top: ${scaleSize1 * 2}px`;
  levelText.style.cssText = `font-size: ${(scaleSize1 + 2) * 10}px`;
  gameOverElem.style.cssText = `font-size: ${(scaleSize1 + 2) * 10}px`;
  bottomCover.style.cssText = `top: ${spaceAttackHeight + scaleSize1}px`;
  topCover.style.cssText = `top: -${100 + scaleSize1}px`;
  shuttle.style.cssText = `left: ${(spaceAttackWidth / 2) - (scaleSize2 * 3)}px; width: ${scaleSize2 * 6}px; height: ${scaleSize2 * 6}px`
  shellShuttle.style.cssText = `top: ${spaceAttackHeight - (scaleSize2 * 6)}px`;
  afterBurnRx.style.cssText = `width: ${scaleSize2 * 6}px; height: ${scaleSize2 * 3}px; top: ${scaleSize2}px; left: ${scaleSize2 * 6}px`;
  afterBurnLx.style.cssText = `width: ${scaleSize2 * 6}px; height: ${scaleSize2 * 3}px; top: ${scaleSize2}px; left: -${scaleSize2 * 6}px`;
  shields.style.cssText = `top: ${spaceAttackHeight - (scaleSize2 * 12)}px`;
  shieldsAll.forEach(function(element) { element.style.cssText = `width: ${scaleSize2 * 12}px; height: ${scaleSize2 * 4}px` });
  shield1.style.cssText = `left: ${scaleSize2 * 12}px`;
  shield2.style.cssText = `left: ${(spaceAttackWidth / 2) - (scaleSize2 * 6)}px`;
  shield3.style.cssText = `left: ${spaceAttackWidth - (scaleSize2 * 24)}px`;
  aliens.style.cssText = `top: ${scaleSize2 * 3}px; left: ${scaleSize2 * 3}px; width: ${scaleSize2 * 96}px; height: ${scaleSize2 * 16}px`;
  aliensLine1.style.cssText = `top: ${scaleSize2 * 8}px`;
  aliensLine_1.forEach(function(element, position) { element.style.cssText = `left: ${scaleSize2 * (position * 10)}px; width: ${scaleSize2 * 6}px; height: ${scaleSize2 * 8}px` });
  aliensLine_2.forEach(function(element, position) { element.style.cssText = `left: ${scaleSize2 * (position * 10)}px; width: ${scaleSize2 * 6}px; height: ${scaleSize2 * 8}px` });
  shuttleLaser.style.cssText = `top: ${spaceAttackHeight - (scaleSize2 * 8)}px; width: ${scaleSize2 * 2}px; height: ${scaleSize2 * 4}px`;
  aliensLaser.style.cssText = `width: ${scaleSize2 * 2}px; height: ${scaleSize2 * 4}px`;
};
windowResize();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', windowResize);

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
  } else if (event.keyCode == 81) {
    gameOver();
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
