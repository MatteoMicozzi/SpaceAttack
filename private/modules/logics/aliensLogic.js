function aliensLogic() {
  the.aliensLogic = setInterval(function() {
    position.aliensAxisX = parseInt(window.getComputedStyle(element.aliens).getPropertyValue("left"));
    position.aliensLaserAxisY = parseInt(window.getComputedStyle(element.aliensLaser).getPropertyValue("top"));

    const { scaleSize1, scaleSize2 } = the;
    const rightEdge = the.windowInWidth - (scaleSize1 * 4) - (scaleSize2 * 98);
    const leftEdge = scaleSize2 * 2;
    const bottomEdge = the.spaceAttackHeight;
    const rightStep = position.aliensAxisX + 1;
    const leftStep = position.aliensAxisX - 1;
    const downStep = position.aliensLaserAxisY + (scaleSize2 / 1.5);
    const shieldsHeight = the.spaceAttackHeight - (scaleSize2 * 12);
    const shuttleHeight = the.spaceAttackHeight - (scaleSize2 * 6);

    if (input.aliensDirection == 'right' && position.aliensAxisX < rightEdge) {
      element.aliens.style.setProperty("left", `${rightStep}px`);
    } else {
      input.aliensDirection = 'left';
    };
    if (input.aliensDirection == 'left' && position.aliensAxisX > leftEdge) {
      element.aliens.style.setProperty("left", `${leftStep}px`);
    } else {
      input.aliensDirection = 'right';
    };
    if (input.aliensLaserStatus == 'on') {
      element.aliensLaser.style.setProperty("top", `${downStep}px`);
    };
    if (position.aliensLaserAxisY > shieldsHeight && input.aliensLaserPhysicalStatus == 'start') {
      laserOnShields("alien", position.aliensLaserAxisX);
    };
    if (position.aliensLaserAxisY > shuttleHeight && input.aliensLaserPhysicalStatus == 'afterShields') {
      laserOnShuttle(position.aliensLaserAxisX);
    };
    if (position.aliensLaserAxisY >= bottomEdge) {
      aliensFireOff();
    };
  }, 5);
};
