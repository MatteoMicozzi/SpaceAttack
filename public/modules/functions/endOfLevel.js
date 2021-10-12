function endingAs(status) {
  let temp;

  element.centerTxt.innerHTML = status;
  if (status == "NEXT LEVEL") { user.level += 1 };
  if (status == "NEXT LEVEL") { temp = [user.score, user.level] };
  reset();
  if (status == "NEXT LEVEL") { temp.forEach(function(value, index) { (index == 0) ? user.score = value : user.level = value }) };
};

function resettingElements() {
  element.centerTxt.classList.add("anim_endOfLevel");
  element.startPause.innerHTML = "Start";
  element.gameTopTxt.classList.remove("anim_gameTopTxt");
  element.shuttle.classList.remove("anim_shuttle");
  element.shuttle.style.setProperty("left", ((the.spaceAttackWidth / 2) - (the.scaleSize2 * 3)) + "px");
  element.aliensLine_1.forEach(function(element) { element.classList.remove("anim_alienShip", "anim_alienShip1", "anim_alienShip2", "anim_alienShip3", "anim_alienShip4") });
  element.aliensLine_2.forEach(function(element) { element.classList.remove("anim_alienShip", "anim_alienShip1", "anim_alienShip2", "anim_alienShip3", "anim_alienShip4") });
  element.aliensLaser.classList.remove("anim_aliensLaser");
  element.shuttleLaser.classList.remove("anim_shuttleLaser");
  element.shield_1.forEach(function(element) { element.classList.remove("anim_shieldP1", "anim_shieldP2", "anim_shieldP3") });
  element.shield_2.forEach(function(element) { element.classList.remove("anim_shieldP1", "anim_shieldP2", "anim_shieldP3") });
  element.shield_3.forEach(function(element) { element.classList.remove("anim_shieldP1", "anim_shieldP2", "anim_shieldP3") });
}

function endOfLevel(status) {
  if (!inGame.isNot) {
    inGame.isNot = true;
    onPlayPause();
    resettingElements();
    endingAs(status);
    setTimeout(function () {
      element.centerTxt.classList.remove("anim_endOfLevel", "anim_centerText");
      if (status == "NEXT LEVEL") { onPlayPause() };
    }, 3000);
  };
};
