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
  endOfLevel("YOU LEFT");
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
