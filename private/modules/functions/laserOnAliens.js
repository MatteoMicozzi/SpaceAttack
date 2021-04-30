function twoAliensAreBack(aliensLine, alienPosition) {
  const otherAliensLine = Math.abs(aliensLine - 1);
  const otherAlienIsDead = !inGame.aliensLines[otherAliensLine][alienPosition];
  const reentriesIsYetToComplete = game.counter < game.aliensReentryByLevel[user.level - 1];

  if (otherAlienIsDead && reentriesIsYetToComplete) {
    game.counter += 1;
    setTimeout(function() {
      element.aliensLines[aliensLine][alienPosition].classList.add("anim_alienShip");
      element.aliensLines[otherAliensLine][alienPosition].classList.add("anim_alienShip");

      setTimeout(function() {
        inGame.aliensLines[aliensLine][alienPosition] = true;
        inGame.aliensLines[otherAliensLine][alienPosition] = true;
      }, 1200);
    }, 1000);
  };
};

function hittingAnAlien(aliensLine, alienPosition) {
  inGame.aliensLines[aliensLine][alienPosition] = false;
  element.aliensLines[aliensLine][alienPosition].classList.remove("anim_alienShip", "anim_alienShip1", "anim_alienShip2", "anim_alienShip3", "anim_alienShip4");
  shuttleFireOff();
  user.score += 1;
  element.score.innerHTML = user.score;
  twoAliensAreBack(aliensLine, alienPosition);
};

function laserOnAliens(aliensElementOffset, shuttleLaserOffset, aliensLine) {
  const laserOnAliensElement = shuttleLaserOffset - aliensElementOffset;
  const alienPosition = Math.floor((laserOnAliensElement / the.scaleSize2) / 10);
  const laserPositionOnAlien = Math.floor((laserOnAliensElement / the.scaleSize2) % 10) * 10;
  const alienWidth = 60;

  if (alienPosition == 0 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 1 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 2 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 3 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 4 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 5 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 6 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 7 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 8 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else if (alienPosition == 9 && laserPositionOnAlien < alienWidth && inGame.aliensLines[aliensLine][alienPosition]) {
    hittingAnAlien(aliensLine, alienPosition);
  } else {
    (aliensLine == 0) ? input.shuttleLaserPhysicalStatus = 'after1stAliensLine' : input.shuttleLaserPhysicalStatus = 'after';
  };
};
