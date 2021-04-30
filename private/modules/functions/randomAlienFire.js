function randomFirePosition(value) {
  return Math.floor(Math.random() * value);
};

function listingAliensAlive() {
  const line1 = 0;
  const line2 = 1;

  the.activeAliensLine1 = [];
  the.activeAliensLine2 = [];
  inGame.aliensLines[line1].forEach(function(value, index) { if (value) { the.activeAliensLine1.push(index) }});
  inGame.aliensLines[line2].forEach(function(value, index) { if (value) { the.activeAliensLine2.push(index) }});
};

function lineToFire() {
  const line1orLine2 = 2;
  const line1 = 0;
  const none = 0;

  if (the.activeAliensLine1.length > none && the.activeAliensLine2.length > none) {
    (randomFirePosition(line1orLine2) == line1) ? input.aliensAvailableIn = "line1" : input.aliensAvailableIn = "line2";
  } else {
    (the.activeAliensLine1.length != none) ? input.aliensAvailableIn = "line1" : input.aliensAvailableIn = "line2";
  };
};

function positionAlienToFire(line) {
  const heightLine1 = the.scaleSize2 * 19;
  const heightLine2 = the.scaleSize2 * 11;
  const offset1stAlien = position.aliensAxisX + (the.scaleSize2 * 2);
  const offsetBetween2Alien = the.scaleSize2 * 10;
  let theLine;

  (line == 'line1') ? position.aliensLaserAxisY = heightLine1 : position.aliensLaserAxisY = heightLine2;
  (line == 'line1') ? theLine = the.activeAliensLine1 : theLine = the.activeAliensLine2;
  position.aliensLaserAxisX = offset1stAlien + (theLine[randomFirePosition(theLine.length)] * offsetBetween2Alien);
};

function randomAlienFire() {
  listingAliensAlive();
  lineToFire();
  positionAlienToFire(input.aliensAvailableIn);
  element.aliensLaser.style.setProperty("top", `${position.aliensLaserAxisY}px`);
  element.aliensLaser.style.setProperty("left", `${position.aliensLaserAxisX}px`);
};
