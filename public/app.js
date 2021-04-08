var body = document.querySelector("#body");
var menu = document.querySelector("#menu");
var title = document.querySelector("#title");
var startPause = document.querySelector("#startPause");
var touchStartPause = document.querySelector("#touchStartPause");
var touchQuit = document.querySelector("#touchQuit");
var touchFire = document.querySelector("#touchFire");
var touchMove = document.querySelector("#touchMove");
var spaceAttack = document.querySelector("#spaceAttack");
var shellGameTopTxt = document.querySelector("#shellGameTopTxt");
var shellShuttle = document.querySelector("#shellShuttle");
var topCover = document.querySelector("#topCover");
var bottomCover = document.querySelector("#bottomCover");

var centerTxt = document.querySelector("#centerText");
var gameTopTxt = document.querySelector("#gameTopTxt");
var lives = document.querySelector("#lives");
var level = document.querySelector("#level");
var score = document.querySelector("#score");
var shuttle = document.querySelector("#shuttle");
var shuttleLaser = document.querySelector("#shuttleLaser");
var aliens = document.querySelector("#aliens");
var aliensLaser = document.querySelector("#aliensLaser");

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
var lasersActivation;
var aliensLaserPrefireLogic;
var availabilityOfAliens;
var activeAliensLine1;
var activeAliensLine2;
var touchMoveX1;
var touchMoveX2;

var input;
var position;
var user;
var inGame;
var game;

function reset() {
  input = {
    gameStatus                : 'inPause',
    rightKey                  : 'up',
    leftKey                   : 'up',
    shuttleLaserStatus        : 'none',
    shuttleLaserPhysicalStatus: 'start',
    aliensAvailability        : '',
    aliensDirection           : 'right',
    aliensLaserStatus         : 'none',
    aliensLaserPhysicalStatus : 'start'
  }

  position = {
    shuttleAxisX          : 0,
    shuttleLaserAxisX     : 0,
    shuttleLaserAxisY     : 0,
    aliensAxisX           : 0,
    aliensLaserAxisX      : 0,
    aliensLaserAxisY      : 0
  };

  user = {
    lives     : 6,
    level     : 1,
    score     : 0,
  };

  inGame = {
    shields: [[true, true, true],
              [true, true, true],
              [true, true, true]],
    aliensLines: [[true, true, true, true, true, true, true, true, true, true],
                  [true, true, true, true, true, true, true, true, true, true]],
    monsterLives: 0,
    isIt_       : false
  };

  game = {
    counter : 0,
    aliensReentryByLevel : [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80],
    monsterLevel : [80, 160, 360]
  };
};

reset();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  input.aliensAvailability = "none";
  if (activeAliensLine1.length == 0 && activeAliensLine2.length > 0) {
    input.aliensAvailability = "line2";
  } else if (activeAliensLine1.length > 0 && activeAliensLine2.length == 0) {
    input.aliensAvailability = "line1";
  } else if (activeAliensLine1.length > 0 && activeAliensLine2.length > 0) {
    (Math.floor(Math.random() * 2) == 0) ? input.aliensAvailability = "line1" : input.aliensAvailability = "line2";
  };
  if (input.aliensAvailability == "line2") {
    position.aliensLaserAxisX = position.aliensAxisX + (scaleSize2 * 3) + (activeAliensLine2[randomIndexLine2] * (scaleSize2 * 10));
    aliensLaser.style.setProperty("top", (scaleSize2 * 11) + "px");
    aliensLaser.style.setProperty("left", (position.aliensLaserAxisX - scaleSize2) + "px");
  } else if (input.aliensAvailability == "line1") {
    position.aliensLaserAxisX = position.aliensAxisX + (scaleSize2 * 3) + (activeAliensLine1[randomIndexLine1] * (scaleSize2 * 10));
    aliensLaser.style.setProperty("top", (scaleSize2 * 19) + "px");
    aliensLaser.style.setProperty("left", (position.aliensLaserAxisX - scaleSize2) + "px");
  };
};

function aliensFireOn() {
  randomAlienFire();
  if (input.aliensAvailability != "none") {
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

function endOfLevel(endingAs) {
  pause();
  if (endingAs == "nextLevel") {
    centerTxt.innerHTML = "NEXT LEVEL";
    user.level += 1;
    let tempScore = user.score;
    let tempLevel = user.level;
    reset();
    user.score = tempScore;
    user.level = tempLevel;
  } else if (endingAs == "gameOver") {
    centerTxt.innerHTML = "GAME OVER";
    reset();
  } else if (endingAs == "quit") {
    centerTxt.innerHTML = "YOU LEFT"
    reset();
  };
  centerTxt.classList.add("endOfLevel");
  startPause.innerHTML = "Start";
  gameTopTxt.classList.remove("gameTopTxt");
  shuttle.classList.remove("shuttle");
  aliensLine_1.forEach(function(element) { element.classList.remove("alienShip", "alienShip1", "alienShip2", "alienShip3", "alienShip4") });
  aliensLine_2.forEach(function(element) { element.classList.remove("alienShip", "alienShip1", "alienShip2", "alienShip3", "alienShip4") });
  aliensLaser.classList.remove("aliensLaser");
  shuttleLaser.classList.remove("shuttleLaser");
  shield_1.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  shield_2.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  shield_3.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  setTimeout(function () {
    centerTxt.classList.remove("endOfLevel", "centerText");
    if (endingAs == "nextLevel") {
      onPlayPause();
    };
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
    element = element.classList.add("alienShip1");
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
    if (game.counter < game.aliensReentryByLevel[user.level - 1]) {
      game.counter += 1;
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
};

function hittingAnAlien(aliensLine, alienPosition) {
  inGame.aliensLines[aliensLine][alienPosition] = false;
  aliensLines[aliensLine][alienPosition].classList.remove("alienShip", "alienShip1", "alienShip2", "alienShip3", "alienShip4");
  shuttleFireOff();
  user.score += 1;
  score.innerHTML = user.score;
  twoAliensAreBack(aliensLine, alienPosition);
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
    endOfLevel("gameOver");
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startResume() {

  if (!inGame.isIt_) {
    shieldsEntry();
    centerTxt.classList.add("centerText");
    shuttle.classList.add("shuttle");
    gameTopTxt.classList.add("gameTopTxt");
    centerTxt.innerHTML = `LEVEL ${user.level}`;
    lives.innerHTML = user.lives;
    level.innerHTML = user.level;
    score.innerHTML = user.score;
    aliensEntry();
    lasersActivation();
    inGame.isIt_ = true;
  };

  function lasersActivation() {
    lasersActivation = setTimeout(function() {
      input.aliensLaserStatus = 'off';
      input.shuttleLaserStatus = 'off';
    }, 5000);
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

  availabilityOfAliens = setInterval(function() {
    if (!inGame.aliensLines[1].includes(true) && !inGame.aliensLines[0].includes(true)) {
      endOfLevel("nextLevel");
    };
  }, 500);

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pause() {
  clearInterval(shuttleLogic);
  clearInterval(aliensLogic);
  clearInterval(aliensLaserPrefireLogic);
  clearInterval(availabilityOfAliens);
  clearTimeout(lasersActivation);
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

startPause.addEventListener("click", onPlayPause);
touchStartPause.ontouchstart = function() {
  onPlayPause();
  return false;
};
touchFire.ontouchstart = function() {
  if (input.shuttleLaserStatus == 'off') {
    shuttleFireOn();
  };
  return false;
};
touchQuit.ontouchstart = function() {
  endOfLevel("quit");
  return false;
};
touchMove.ontouchstart = function(event) {
  (event.touches[0].clientX < (windowInWidth / 2)) ? touchMoveX1 = event.touches[0].clientX : touchMoveX1 = event.touches[1].clientX;
  return false;
};
touchMove.ontouchmove = function(event) {
  (event.touches[0].clientX < (windowInWidth / 2)) ? touchMoveX2 = event.touches[0].clientX : touchMoveX2 = event.touches[1].clientX;
  if (touchMoveX1 > touchMoveX2) {
    input.rightKey = 'up';
    input.leftKey = 'down';
  } else {
    input.rightKey = 'down';
    input.leftKey = 'up';
  };
  return false;
};
touchMove.ontouchend = function() {
  input.rightKey = 'up';
  input.leftKey = 'up';
  return false;
};

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
  touchFire.style.cssText = `top: ${spaceAttackHeight / 2}px; left: ${spaceAttackWidth / 2}px; width: ${spaceAttackWidth / 2}px; height: ${spaceAttackHeight / 2}px`;
  touchMove.style.cssText = `top: ${spaceAttackHeight / 2}px; left: 0px; width: ${spaceAttackWidth / 2}px; height: ${spaceAttackHeight / 2}px`;
  touchStartPause.style.cssText = `top: 0px; left: ${spaceAttackWidth / 2}px; width: ${spaceAttackWidth / 2}px; height: ${spaceAttackHeight / 2}px`;
  touchQuit.style.cssText = `top: 0px; left: 0px; width: ${spaceAttackWidth / 2}px; height: ${spaceAttackHeight / 2}px`;
  shellGameTopTxt.style.cssText = `top: ${scaleSize1 * 2}px`;
  centerTxt.style.cssText = `font-size: ${(scaleSize1 + 2) * 10}px`;
  bottomCover.style.cssText = `top: ${spaceAttackHeight + scaleSize1}px`;
  topCover.style.cssText = `top: -${100 + scaleSize1}px`;
  shuttle.style.cssText = `left: ${(spaceAttackWidth / 2) - (scaleSize2 * 3)}px; width: ${scaleSize2 * 6}px; height: ${scaleSize2 * 6}px`
  shellShuttle.style.cssText = `top: ${spaceAttackHeight - (scaleSize2 * 6)}px`;
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
  } else if (event.keyCode == 37) {
    input.leftKey = 'down';
  } else if (event.keyCode == 32) {
    if (input.shuttleLaserStatus == 'off') {
      shuttleFireOn();
    };
  } else if (event.keyCode == 80) {
    onPlayPause();
  } else if (event.keyCode == 81) {
    endOfLevel("quit");
  };
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 39) {
    input.rightKey = 'up';
  };
  if (event.keyCode == 37) {
    input.leftKey = 'up';
  };
});
