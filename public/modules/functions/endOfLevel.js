function endingAs(status) {
  let temp;

  element.centerTxt.innerHTML = status;
  if (status == "NEXT LEVEL") { user.level += 1 };
  if (status == "NEXT LEVEL") { temp = [user.score, user.level] };
  reset();
  if (status == "NEXT LEVEL") { temp.forEach(function(value, index) { (index == 0) ? user.score = value : user.level = value }) };
};

function resettingElements() {
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
}

function endOfLevel(status) {
  onPlayPause();
  endingAs(status);
  resettingElements();
  setTimeout(function () {
    element.centerTxt.classList.remove("endOfLevel", "centerText");
    if (status == "NEXT LEVEL") { onPlayPause() };
  }, 3000);
};
