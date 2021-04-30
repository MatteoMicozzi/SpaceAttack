function laserOnShuttle(laserPositionX) {
  const shuttleLeftSide = position.shuttleAxisX;
  const shuttleRightSide = position.shuttleAxisX + (the.scaleSize2 * 6);

  if (laserPositionX > shuttleLeftSide && laserPositionX < shuttleRightSide) {
    aliensFireOff();
    user.lives -= 1;
    element.lives.innerHTML = user.lives;
  };
  if (user.lives == 0) {
    endOfLevel("GAME OVER");
  };
};
