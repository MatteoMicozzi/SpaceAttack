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
    endOfLevel("YOU LEFT");
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
