function shuttleLogic() {
  the.shuttleLogic = setInterval(function() {
    position.shuttleAxisX = parseInt(window.getComputedStyle(element.shuttle).getPropertyValue("left"));
    position.shuttleLaserAxisY = parseInt(window.getComputedStyle(element.shuttleLaser).getPropertyValue("top"));

    const { scaleSize1 } = the;
    const { scaleSize2 } = the;
    const rightStep = position.shuttleAxisX + (scaleSize2 / 2);
    const leftStep = position.shuttleAxisX - (scaleSize2 / 2);
    const upStep = position.shuttleLaserAxisY - scaleSize2;
    const rightEdge = the.windowInWidth - (scaleSize1 * 4) - (scaleSize2 * 8);
    const leftEdge = scaleSize2 * 2;
    const shieldsHeight = the.spaceAttackHeight - (scaleSize2 * 10);
    const aliensLine1Height = scaleSize2 * 19;
    const aliensLine2Height = scaleSize2 * 11;
    const line1 = 0;
    const line2 = 1;
    const topEdge = 0;

    if (input.rightKey == 'down' && position.shuttleAxisX < rightEdge) {
      element.shuttle.style.setProperty("left", `${rightStep}px`);
    };
    if (input.leftKey == 'down' && position.shuttleAxisX > leftEdge) {
      element.shuttle.style.setProperty("left", `${leftStep}px`);
    };
    if (input.shuttleLaserStatus == 'on') {
      element.shuttleLaser.style.setProperty("top", `${upStep}px`);
    };
    if (position.shuttleLaserAxisY < shieldsHeight && input.shuttleLaserPhysicalStatus == 'start') {
      laserOnShields("shuttle", position.shuttleLaserAxisX);
    };
    if (position.shuttleLaserAxisY < aliensLine1Height && input.shuttleLaserPhysicalStatus == 'afterShields') {
      laserOnAliens(position.aliensAxisX, position.shuttleLaserAxisX, line1);
    };
    if (position.shuttleLaserAxisY < aliensLine2Height && input.shuttleLaserPhysicalStatus == 'after1stAliensLine') {
      laserOnAliens(position.aliensAxisX, position.shuttleLaserAxisX, line2);
    };
    if (position.shuttleLaserAxisY <= topEdge) {
      shuttleFireOff();
    };
  }, 5);
};
