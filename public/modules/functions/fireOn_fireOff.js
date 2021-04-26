function aliensFireOn() {
  randomAlienFire();
  element.aliensLaser.classList.add("anim_aliensLaser");
  input.aliensLaserStatus = 'on';
};

function aliensFireOff() {
  input.aliensLaserStatus = 'off';
  element.aliensLaser.classList.remove("anim_aliensLaser");
  element.aliensLaser.style.setProperty("top", "1px");
  input.aliensLaserPhysicalStatus = 'start';
};

function shuttleFireOn() {
  const laserGraphicOffset = position.shuttleAxisX + (the.scaleSize2 * 2);
  const laserPhisicalOffset = position.shuttleAxisX + (the.scaleSize2 * 3);

  position.shuttleLaserAxisX = laserPhisicalOffset;
  element.shuttleLaser.style.setProperty("left", `${laserGraphicOffset}px`);
  element.shuttleLaser.classList.add("anim_shuttleLaser");
  input.shuttleLaserStatus = 'on';
};

function shuttleFireOff() {
  const laserBackInShuttle = the.spaceAttackHeight - (the.scaleSize2 * 8);

  input.shuttleLaserStatus = 'off';
  element.shuttleLaser.classList.remove("anim_shuttleLaser");
  element.shuttleLaser.style.setProperty("top", `${laserBackInShuttle}px`);
  input.shuttleLaserPhysicalStatus = 'start';
};
