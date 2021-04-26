function lasersActivation() {
  setTimeout(function() {
    input.aliensLaserStatus = 'off';
    input.shuttleLaserStatus = 'off';
  }, 5000);
};

function startingUp() {
  if (inGame.isNot) {
    shieldsEntry();
    aliensEntry();
    lasersActivation();
    element.lives.innerHTML = user.lives;
    element.score.innerHTML = user.score;
    element.level.innerHTML = user.level;
    element.centerTxt.innerHTML = `LEVEL ${user.level}`;
    element.centerTxt.classList.add("anim_centerText");
    element.shuttle.classList.add("anim_shuttle");
    element.gameTopTxt.classList.add("anim_gameTopTxt");
    inGame.isNot = false;
  };
};
