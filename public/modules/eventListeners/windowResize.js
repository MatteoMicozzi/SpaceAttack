function windowResize() {
  the.windowInWidth = window.innerWidth;
  the.windowInHeight = window.innerHeight;
  the.scaleSize1 = (the.windowInWidth > the.windowInHeight) ? the.windowInHeight : the.windowInWidth;
  the.scaleSize1 = Math.floor(the.scaleSize1 / 100);
  the.scaleSize2 = (the.windowInWidth > (the.windowInHeight * 2)) ? the.windowInHeight : (the.windowInWidth / 2);
  the.scaleSize2 = Math.floor(the.scaleSize2 / 100) + 3;
  the.spaceAttackWidth = the.windowInWidth - (the.scaleSize1 * 4);
  the.spaceAttackHeight = the.windowInHeight - (the.scaleSize1 * 18);

  element.body.style.cssText = `font-size: ${the.scaleSize1 * 2}px`;
  element.title.style.cssText = `font-size: ${the.scaleSize1 * 7}px; top: ${the.scaleSize1}px`;
  element.startPause.style.cssText = `font-size: ${the.scaleSize1 * 3}px; top: ${the.scaleSize1 * 9}px`;
  element.menu.style.cssText = `top: ${the.scaleSize1}px; left: ${the.scaleSize1}px; width: ${the.spaceAttackWidth}px; height: ${the.scaleSize1 * 13}px; border: ${the.scaleSize1}px solid blue`;
  element.spaceAttack.style.cssText = `top: ${the.scaleSize1 * 15}px; left: ${the.scaleSize1}px; width: ${the.spaceAttackWidth}px; height: ${the.spaceAttackHeight}px; border: ${the.scaleSize1}px solid blue`;
  element.touchFire.style.cssText = `top: ${the.spaceAttackHeight / 2}px; left: ${the.spaceAttackWidth / 2}px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.touchMove.style.cssText = `top: ${the.spaceAttackHeight / 2}px; left: 0px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.touchStartPause.style.cssText = `top: 0px; left: ${the.spaceAttackWidth / 2}px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.touchQuit.style.cssText = `top: 0px; left: 0px; width: ${the.spaceAttackWidth / 2}px; height: ${the.spaceAttackHeight / 2}px`;
  element.shellGameTopTxt.style.cssText = `top: ${the.scaleSize1 * 2}px`;
  element.centerTxt.style.cssText = `font-size: ${(the.scaleSize1 + 2) * 10}px`;
  element.bottomCover.style.cssText = `top: ${the.spaceAttackHeight + the.scaleSize1}px`;
  element.topCover.style.cssText = `top: -${100 + the.scaleSize1}px`;
  element.shuttle.style.cssText = `left: ${(the.spaceAttackWidth / 2) - (the.scaleSize2 * 3)}px; width: ${the.scaleSize2 * 6}px; height: ${the.scaleSize2 * 6}px`
  element.shellShuttle.style.cssText = `top: ${the.spaceAttackHeight - (the.scaleSize2 * 6)}px`;
  element.shields.style.cssText = `top: ${the.spaceAttackHeight - (the.scaleSize2 * 12)}px`;
  element.shieldsAll.forEach(function(element) { element.style.cssText = `width: ${the.scaleSize2 * 12}px; height: ${the.scaleSize2 * 4}px` });
  element.shield1.style.cssText = `left: ${the.scaleSize2 * 12}px`;
  element.shield2.style.cssText = `left: ${(the.spaceAttackWidth / 2) - (the.scaleSize2 * 6)}px`;
  element.shield3.style.cssText = `left: ${the.spaceAttackWidth - (the.scaleSize2 * 24)}px`;
  element.aliens.style.cssText = `top: ${the.scaleSize2 * 3}px; left: ${the.scaleSize2 * 3}px; width: ${the.scaleSize2 * 96}px; height: ${the.scaleSize2 * 16}px`;
  element.aliensLine1.style.cssText = `top: ${the.scaleSize2 * 8}px`;
  element.aliensLine_1.forEach(function(element, position) { element.style.cssText = `left: ${the.scaleSize2 * (position * 10)}px; width: ${the.scaleSize2 * 6}px; height: ${the.scaleSize2 * 8}px` });
  element.aliensLine_2.forEach(function(element, position) { element.style.cssText = `left: ${the.scaleSize2 * (position * 10)}px; width: ${the.scaleSize2 * 6}px; height: ${the.scaleSize2 * 8}px` });
  element.shuttleLaser.style.cssText = `top: ${the.spaceAttackHeight - (the.scaleSize2 * 8)}px; width: ${the.scaleSize2 * 2}px; height: ${the.scaleSize2 * 4}px`;
  element.aliensLaser.style.cssText = `width: ${the.scaleSize2 * 2}px; height: ${the.scaleSize2 * 4}px`;
};
