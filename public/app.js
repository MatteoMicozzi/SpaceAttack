function add(selection) { return document.querySelector(`#${selection}`) };
function addAll(selection) { return document.querySelectorAll(selection) };
var element = {
  body: add("body"),
  menu: add("menu"),
  title: add("title"),
  startPause: add("startPause"),
  touchStartPause: add("touchStartPause"),
  touchQuit: add("touchQuit"),
  touchFire: add("touchFire"),
  touchMove: add("touchMove"),
  spaceAttack: add("spaceAttack"),
  shellGameTopTxt: add("shellGameTopTxt"),
  shellShuttle: add("shellShuttle"),
  topCover: add("topCover"),
  bottomCover: add("bottomCover"),
  centerTxt: add("centerText"),
  gameTopTxt: add("gameTopTxt"),
  lives: add("lives"),
  level: add("level"),
  score: add("score"),
  shuttle: add("shuttle"),
  shuttleLaser: add("shuttleLaser"),
  aliens: add("aliens"),
  aliensLaser: add("aliensLaser"),
  shields: add("shields"),
  shieldsAll: addAll("#s1Part1, #s1Part2, #s1Part3, #s2Part1, #s2Part2, #s2Part3, #s3Part1, #s3Part2, #s3Part3"),
  shield1: add("shield1"),
  shield2: add("shield2"),
  shield3: add("shield3"),
  shield_1: addAll("#shield1 *"),
  shield_2: addAll("#shield2 *"),
  shield_3: addAll("#shield3 *"),
  aliensLine1: add("line1"),
  aliensLine_2: addAll("#line2 *"),
  aliensLine_1: addAll("#line1 *"),
  aliensLines: [addAll("#line1 *"), addAll("#line2 *")]
};

var the = {
  windowInWidth: null,
  windowInHeight: null,
  spaceAttackWidth: null,
  spaceAttackHeight: null,
  scaleSize1: null,
  scaleSize2: null,
  shuttleLogic: null,
  aliensLogic: null,
  lasersActivation: null,
  aliensLaserPrefireLogic: null,
  availabilityOfAliens: null,
  activeAliensLine1: null,
  activeAliensLine2: null,
  touchMoveX1: null,
  touchMoveX2: null
}

var input;
var position;
var user;
var inGame;
var game;

function reset() {
  input = {
    gameStatus: 'inPause',
    rightKey: 'up',
    leftKey: 'up',
    shuttleLaserStatus: 'none',
    shuttleLaserPhysicalStatus: 'start',
    aliensAvailability: '',
    aliensDirection: 'right',
    aliensLaserStatus: 'none',
    aliensLaserPhysicalStatus: 'start'
  };

  position = {
    shuttleAxisX: 0,
    shuttleLaserAxisX: 0,
    shuttleLaserAxisY: 0,
    aliensAxisX: 0,
    aliensLaserAxisX: 0,
    aliensLaserAxisY: 0
  };

  user = {
    lives: 6,
    level: 1,
    score: 0,
  };

  inGame = {
    shields: [[true, true, true],
              [true, true, true],
              [true, true, true]],
    aliensLines: [[true, true, true, true, true, true, true, true, true, true],
                  [true, true, true, true, true, true, true, true, true, true]],
    monsterLives: 0,
    isIt_: false
  };

  game = {
    counter: 0,
    aliensReentryByLevel: [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80],
    monsterLevel: [80, 160, 360]
  };
};
reset();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activeAliensL1(value, index) {
  if (value) { the.activeAliensLine1.push(index) };
};
function activeAliensL2(value, index) {
  if (value) { the.activeAliensLine2.push(index) };
};
function randomAlienFire() {
  the.activeAliensLine1 = [];
  the.activeAliensLine2 = [];
  inGame.aliensLines[0].forEach(activeAliensL1);
  inGame.aliensLines[1].forEach(activeAliensL2);
  let randomIndexLine1 = Math.floor(Math.random() * the.activeAliensLine1.length);
  let randomIndexLine2 = Math.floor(Math.random() * the.activeAliensLine2.length);
  input.aliensAvailability = "none";
  if (the.activeAliensLine1.length == 0 && the.activeAliensLine2.length > 0) {
    input.aliensAvailability = "line2";
  } else if (the.activeAliensLine1.length > 0 && the.activeAliensLine2.length == 0) {
    input.aliensAvailability = "line1";
  } else if (the.activeAliensLine1.length > 0 && the.activeAliensLine2.length > 0) {
    (Math.floor(Math.random() * 2) == 0) ? input.aliensAvailability = "line1" : input.aliensAvailability = "line2";
  };
  if (input.aliensAvailability == "line2") {
    position.aliensLaserAxisX = position.aliensAxisX + (the.scaleSize2 * 3) + (the.activeAliensLine2[randomIndexLine2] * (the.scaleSize2 * 10));
    element.aliensLaser.style.setProperty("top", (the.scaleSize2 * 11) + "px");
    element.aliensLaser.style.setProperty("left", (position.aliensLaserAxisX - the.scaleSize2) + "px");
  } else if (input.aliensAvailability == "line1") {
    position.aliensLaserAxisX = position.aliensAxisX + (the.scaleSize2 * 3) + (the.activeAliensLine1[randomIndexLine1] * (the.scaleSize2 * 10));
    element.aliensLaser.style.setProperty("top", (the.scaleSize2 * 19) + "px");
    element.aliensLaser.style.setProperty("left", (position.aliensLaserAxisX - the.scaleSize2) + "px");
  };
};

function aliensFireOn() {
  randomAlienFire();
  if (input.aliensAvailability != "none") {
    element.aliensLaser.classList.add("aliensLaser");
    input.aliensLaserStatus = 'on';
  };
};

function aliensFireOff() {
  input.aliensLaserStatus = 'off';
  element.aliensLaser.classList.remove("aliensLaser");
  element.aliensLaser.style.setProperty("top", "1px");
  input.aliensLaserPhysicalStatus = 'start';
};

function shuttleFireOn() {
  position.shuttleLaserAxisX = position.shuttleAxisX + (the.scaleSize2 * 3);
  element.shuttleLaser.style.setProperty("left", (position.shuttleAxisX + (the.scaleSize2 * 2)) + "px");
  element.shuttleLaser.classList.add("shuttleLaser");
  input.shuttleLaserStatus = 'on';
};

function shuttleFireOff() {
  input.shuttleLaserStatus = 'off';
  element.shuttleLaser.classList.remove("shuttleLaser");
  element.shuttleLaser.style.setProperty("top", (the.spaceAttackHeight - (the.scaleSize2 * 8)) + "px");
  input.shuttleLaserPhysicalStatus = 'start';
};

function endOfLevel(endingAs) {
  pause();
  if (endingAs == "nextLevel") {
    element.centerTxt.innerHTML = "NEXT LEVEL";
    user.level += 1;
    let tempScore = user.score;
    let tempLevel = user.level;
    reset();
    user.score = tempScore;
    user.level = tempLevel;
  } else if (endingAs == "gameOver") {
    element.centerTxt.innerHTML = "GAME OVER";
    reset();
  } else if (endingAs == "quit") {
    element.centerTxt.innerHTML = "YOU LEFT"
    reset();
  };
  element.centerTxt.classList.add("endOfLevel");
  element.startPause.innerHTML = "Start";
  element.gameTopTxt.classList.remove("gameTopTxt");
  element.shuttle.classList.remove("shuttle");
  element.shuttle.style.setProperty("left", ((the.spaceAttackWidth / 2) - (the.scaleSize2 * 3)) + "px");
  element.aliensLine_1.forEach(function(element) { element.classList.remove("alienShip", "alienShip1", "alienShip2", "alienShip3", "alienShip4") });
  element.aliensLine_2.forEach(function(element) { element.classList.remove("alienShip", "alienShip1", "alienShip2", "alienShip3", "alienShip4") });
  element.aliensLaser.classList.remove("aliensLaser");
  element.shuttleLaser.classList.remove("shuttleLaser");
  element.shield_1.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  element.shield_2.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  element.shield_3.forEach(function(element) { element.classList.remove("shieldP1", "shieldP2", "shieldP3") });
  setTimeout(function () {
    element.centerTxt.classList.remove("endOfLevel", "centerText");
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
  element.shield_1.forEach(shieldsActivation);
  element.shield_2.forEach(shieldsActivation);
  element.shield_3.forEach(shieldsActivation);
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
  element.aliensLine_1.forEach(aliensPreIn);
  element.aliensLine_2.forEach(aliensPreIn);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hittingAShield(alienOrShuttle, indexShield, indexPosition) {
  if (alienOrShuttle == "alien") {aliensFireOff()};
  if (alienOrShuttle == "shuttle") {shuttleFireOff()};
  if (indexShield == 0) {element.shield_1[indexPosition].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  if (indexShield == 1) {element.shield_2[indexPosition].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  if (indexShield == 2) {element.shield_3[indexPosition].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  inGame.shields[indexShield][indexPosition] = false;
};

function hittingShieldsBlock(alienOrShuttle, offset, indexShield, laserAxisX) {
  if ((laserAxisX > (offset + (the.scaleSize2 * 4)) && laserAxisX < (offset + (the.scaleSize2 * 8))) && inGame.shields[indexShield][1]) {
    hittingAShield(alienOrShuttle, indexShield, 1);
  } else if ((laserAxisX > offset && laserAxisX < (offset + (the.scaleSize2 * 5))) && inGame.shields[indexShield][0]) {
    hittingAShield(alienOrShuttle, indexShield, 0);
  } else if ((laserAxisX > (offset + (the.scaleSize2 * 7)) && laserAxisX < (offset + (the.scaleSize2 * 12))) && inGame.shields[indexShield][2]) {
    hittingAShield(alienOrShuttle, indexShield, 2);
  } else {
    if (alienOrShuttle == "alien")   {input.aliensLaserPhysicalStatus= "afterShields"};
    if (alienOrShuttle == "shuttle") {input.shuttleLaserPhysicalStatus= "afterShields"};
  };
};

/////////////////////////

function laserOnShields(alienOrShuttle, laserPositionX) {
  if (laserPositionX > (the.spaceAttackWidth - (the.scaleSize2 * 24)) && laserPositionX < (the.spaceAttackWidth - (the.scaleSize2 * 12))) {
    hittingShieldsBlock(alienOrShuttle, (the.spaceAttackWidth - (the.scaleSize2 * 24)), 2, laserPositionX);
  } else if (laserPositionX > ((the.spaceAttackWidth / 2) - (the.scaleSize2 * 6)) && laserPositionX < ((the.spaceAttackWidth / 2) + (the.scaleSize2 * 6))) {
    hittingShieldsBlock(alienOrShuttle, ((the.spaceAttackWidth / 2) - (the.scaleSize2 * 6)), 1, laserPositionX);
  } else if (laserPositionX > (the.scaleSize2 * 12) && laserPositionX < (the.scaleSize2 * 24)) {
    hittingShieldsBlock(alienOrShuttle, (the.scaleSize2 * 12), 0, laserPositionX);
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
        element.aliensLines[aliensLine][alienPosition].classList.add("alienShip");
        element.aliensLines[Math.abs(aliensLine - 1)][alienPosition].classList.add("alienShip");
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
  element.aliensLines[aliensLine][alienPosition].classList.remove("alienShip", "alienShip1", "alienShip2", "alienShip3", "alienShip4");
  shuttleFireOff();
  user.score += 1;
  element.score.innerHTML = user.score;
  twoAliensAreBack(aliensLine, alienPosition);
};

function laserOnAliensLine(aliensElementOffset, shuttleLaserOffset, aliensLine) {
  var laserOnAliensElement = shuttleLaserOffset - aliensElementOffset;
  var alienPosition = Math.floor((laserOnAliensElement / the.scaleSize2) / 10);
  var laserPositionOnAlien = Math.floor((laserOnAliensElement / the.scaleSize2) % 10) * 10;
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
  if (laserPositionX > position.shuttleAxisX && laserPositionX < (position.shuttleAxisX + (the.scaleSize2 * 6))) {
    aliensFireOff();
    user.lives -= 1;
    element.lives.innerHTML = user.lives;
  };
  if (user.lives == 0) {
    endOfLevel("gameOver");
  };
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startResume() {

  if (!inGame.isIt_) {
    shieldsEntry();
    element.centerTxt.classList.add("centerText");
    element.shuttle.classList.add("shuttle");
    element.gameTopTxt.classList.add("gameTopTxt");
    element.centerTxt.innerHTML = `LEVEL ${user.level}`;
    element.lives.innerHTML = user.lives;
    element.level.innerHTML = user.level;
    element.score.innerHTML = user.score;
    aliensEntry();
    lasersActivation();
    inGame.isIt_ = true;
  };

  function lasersActivation() {
    the.lasersActivation = setTimeout(function() {
      input.aliensLaserStatus = 'off';
      input.shuttleLaserStatus = 'off';
    }, 5000);
  };
  ///////////////////////////////////////////////////////////////////////////////////////

  the.shuttleLogic = setInterval(function() {
    position.shuttleAxisX = parseInt(window.getComputedStyle(element.shuttle).getPropertyValue("left"));
    position.shuttleLaserAxisY = parseInt(window.getComputedStyle(element.shuttleLaser).getPropertyValue("top"));

    if (input.rightKey == 'down' && position.shuttleAxisX < (the.windowInWidth - (the.scaleSize1 * 4) - (the.scaleSize2 * 8))) {
      element.shuttle.style.setProperty("left", (position.shuttleAxisX + (the.scaleSize2 / 2)) + "px");
    };
    if (input.leftKey == 'down' && position.shuttleAxisX >= (the.scaleSize2 * 2)) {
      element.shuttle.style.setProperty("left", (position.shuttleAxisX - (the.scaleSize2 / 2)) + "px");
    };

    if (input.shuttleLaserStatus == 'on') {
      element.shuttleLaser.style.setProperty("top", (position.shuttleLaserAxisY - the.scaleSize2) + "px");
    };

    if (position.shuttleLaserAxisY < (the.spaceAttackHeight - (the.scaleSize2 * 10)) && input.shuttleLaserPhysicalStatus == 'start') {
      laserOnShields("shuttle", position.shuttleLaserAxisX);
    };

    if (position.shuttleLaserAxisY < (the.scaleSize2 * 19) && input.shuttleLaserPhysicalStatus == 'afterShields') {
      laserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 0);
    };

    if (position.shuttleLaserAxisY < (the.scaleSize2 * 11) && input.shuttleLaserPhysicalStatus == 'after1stAliensLine') {
      laserOnAliensLine(position.aliensAxisX, position.shuttleLaserAxisX, 1);
    };

    if (position.shuttleLaserAxisY <= 0) {
      shuttleFireOff();
    };
  }, 5);

  ///////////////////////////////////////////////////////////////////////////////////////

  the.aliensLogic = setInterval(function() {
    position.aliensAxisX = parseInt(window.getComputedStyle(element.aliens).getPropertyValue("left"));
    position.aliensLaserAxisY = parseInt(window.getComputedStyle(element.aliensLaser).getPropertyValue("top"));

    if (input.aliensDirection == 'right' && position.aliensAxisX <= (the.windowInWidth - (the.scaleSize1 * 4) - (the.scaleSize2 * 98))) {
      element.aliens.style.setProperty("left", (position.aliensAxisX + 1) + "px");
    } else {
      input.aliensDirection = 'left';
    };
    if (input.aliensDirection == 'left' && position.aliensAxisX >= (the.scaleSize2 * 2)) {
      element.aliens.style.setProperty("left", (position.aliensAxisX - 1) + "px");
    } else {
      input.aliensDirection = 'right';
    };

    if (input.aliensLaserStatus == 'on') {
      element.aliensLaser.style.setProperty("top", (position.aliensLaserAxisY + (the.scaleSize2 / 1.5)) + "px");
    };

    if (position.aliensLaserAxisY > (the.spaceAttackHeight - (the.scaleSize2 * 12)) && input.aliensLaserPhysicalStatus == 'start') {
      laserOnShields("alien", position.aliensLaserAxisX);
    };

    if (position.aliensLaserAxisY > (the.spaceAttackHeight - (the.scaleSize2 * 6)) && input.aliensLaserPhysicalStatus == 'afterShields') {
      laserOnShuttle(position.aliensLaserAxisX);
    };

    if (position.aliensLaserAxisY >= the.spaceAttackHeight) {
      aliensFireOff();
    };
  }, 5);

  ///////////////////////////////////////////////////////////////////////////////////////

  the.aliensLaserPrefireLogic = setInterval(function() {
    if (input.aliensLaserStatus == 'off') {
      aliensFireOn();
    };
  }, 1000);

  the.availabilityOfAliens = setInterval(function() {
    if (!inGame.aliensLines[1].includes(true) && !inGame.aliensLines[0].includes(true)) {
      endOfLevel("nextLevel");
    };
  }, 500);

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pause() {
  clearInterval(the.shuttleLogic);
  clearInterval(the.aliensLogic);
  clearInterval(the.aliensLaserPrefireLogic);
  clearInterval(the.availabilityOfAliens);
  clearTimeout(the.lasersActivation);
}

function onPlayPause() {
  if (input.gameStatus == 'inPause') {
    startResume();
    input.gameStatus = 'inPlay';
    element.startPause.innerHTML = 'Pause';
  } else if (input.gameStatus == 'inPlay') {
    pause();
    input.gameStatus = 'inPause';
    element.startPause.innerHTML = 'Resume';
  };
}

element.startPause.addEventListener("click", onPlayPause);
element.touchStartPause.ontouchstart = function() {
  onPlayPause();
  return false;
};
element.touchFire.ontouchstart = function() {
  if (input.shuttleLaserStatus == 'off') {
    shuttleFireOn();
  };
  return false;
};
element.touchQuit.ontouchstart = function() {
  endOfLevel("quit");
  return false;
};
element.touchMove.ontouchstart = function(event) {
  (event.touches[0].clientX < (the.windowInWidth / 2)) ? the.touchMoveX1 = event.touches[0].clientX : the.touchMoveX1 = event.touches[1].clientX;
  return false;
};
element.touchMove.ontouchmove = function(event) {
  (event.touches[0].clientX < (the.windowInWidth / 2)) ? the.touchMoveX2 = event.touches[0].clientX : the.touchMoveX2 = event.touches[1].clientX;
  if (the.touchMoveX1 > the.touchMoveX2) {
    input.rightKey = 'up';
    input.leftKey = 'down';
  } else {
    input.rightKey = 'down';
    input.leftKey = 'up';
  };
  return false;
};
element.touchMove.ontouchend = function() {
  input.rightKey = 'up';
  input.leftKey = 'up';
  return false;
};

function windowResize() {
  the.windowInWidth = window.innerWidth;
  the.windowInHeight = window.innerHeight;
  the.scaleSize1 = (the.windowInWidth > the.windowInHeight) ? the.windowInHeight : the.windowInWidth;
  the.scaleSize1 = Math.floor(the.scaleSize1 / 100);
  the.scaleSize2 = (the.windowInWidth > (the.windowInHeight * 2)) ? the.windowInHeight : (the.windowInWidth / 2);
  the.scaleSize2 = Math.floor(the.scaleSize2 / 100) + 3;
  the.spaceAttackWidth = the.windowInWidth - (the.scaleSize1 * 4);
  the.spaceAttackHeight = the.windowInHeight - (the.scaleSize1 * 18);

  element.body.style.cssText = `font-size: ${the.scaleSize1 * 2}px`;
  element.title.style.cssText = `font-size: ${the.scaleSize1 * 7}px; top: ${the.scaleSize1}px`;
  element.startPause.style.cssText = `font-size: ${the.scaleSize1 * 3}px; top: ${the.scaleSize1 * 9}px`;
  element.menu.style.cssText = `top: ${the.scaleSize1}px; left: ${the.scaleSize1}px; width: ${the.spaceAttackWidth}px; height: ${the.scaleSize1 * 13}px; border: ${the.scaleSize1}px solid blue`;
  element.spaceAttack.style.cssText = `top: ${the.scaleSize1 * 15}px; left: ${the.scaleSize1}px; width: ${the.spaceAttackWidth}px; height: ${the.spaceAttackHeight}px; border: ${the.scaleSize1}px solid blue`;
  element.touchFire.style.cssText = `top: ${the.spaceAttackHeight / 2}px; left: ${the.spaceAttackWidth / 2}px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.touchMove.style.cssText = `top: ${the.spaceAttackHeight / 2}px; left: 0px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.touchStartPause.style.cssText = `top: 0px; left: ${the.spaceAttackWidth / 2}px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.touchQuit.style.cssText = `top: 0px; left: 0px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.shellGameTopTxt.style.cssText = `top: ${the.scaleSize1 * 2}px`;
  element.centerTxt.style.cssText = `font-size: ${(the.scaleSize1 + 2) * 10}px`;
  element.bottomCover.style.cssText = `top: ${the.spaceAttackHeight + the.scaleSize1}px`;
  element.topCover.style.cssText = `top: -${100 + the.scaleSize1}px`;
  element.shuttle.style.cssText = `left: ${(the.spaceAttackWidth / 2) - (the.scaleSize2 * 3)}px; width: ${the.scaleSize2 * 6}px; height: ${the.scaleSize2 * 6}px`
  element.shellShuttle.style.cssText = `top: ${the.spaceAttackHeight - (the.scaleSize2 * 6)}px`;
  element.shields.style.cssText = `top: ${the.spaceAttackHeight - (the.scaleSize2 * 12)}px`;
  element.shieldsAll.forEach(function(element) { element.style.cssText = `width: ${the.scaleSize2 * 12}px; height: ${the.scaleSize2 * 4}px` });
  element.shield1.style.cssText = `left: ${the.scaleSize2 * 12}px`;
  element.shield2.style.cssText = `left: ${(the.spaceAttackWidth / 2) - (the.scaleSize2 * 6)}px`;
  element.shield3.style.cssText = `left: ${the.spaceAttackWidth - (the.scaleSize2 * 24)}px`;
  element.aliens.style.cssText = `top: ${the.scaleSize2 * 3}px; left: ${the.scaleSize2 * 3}px; width: ${the.scaleSize2 * 96}px; height: ${the.scaleSize2 * 16}px`;
  element.aliensLine1.style.cssText = `top: ${the.scaleSize2 * 8}px`;
  element.aliensLine_1.forEach(function(element, position) { element.style.cssText = `left: ${the.scaleSize2 * (position * 10)}px; width: ${the.scaleSize2 * 6}px; height: ${the.scaleSize2 * 8}px` });
  element.aliensLine_2.forEach(function(element, position) { element.style.cssText = `left: ${the.scaleSize2 * (position * 10)}px; width: ${the.scaleSize2 * 6}px; height: ${the.scaleSize2 * 8}px` });
  element.shuttleLaser.style.cssText = `top: ${the.spaceAttackHeight - (the.scaleSize2 * 8)}px; width: ${the.scaleSize2 * 2}px; height: ${the.scaleSize2 * 4}px`;
  element.aliensLaser.style.cssText = `width: ${the.scaleSize2 * 2}px; height: ${the.scaleSize2 * 4}px`;
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
