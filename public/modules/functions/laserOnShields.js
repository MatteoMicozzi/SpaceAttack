function removeAShield(indexShieldsBlock, indexShield) {
  if (indexShieldsBlock == 0) {element.shield_1[indexShield].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  if (indexShieldsBlock == 1) {element.shield_2[indexShield].classList.remove("shieldP1", "shieldP2", "shieldP3")};
  if (indexShieldsBlock == 2) {element.shield_3[indexShield].classList.remove("shieldP1", "shieldP2", "shieldP3")};
};

function hittingAShield(alienOrShuttle, indexShieldsBlock, indexShield) {
  (alienOrShuttle == "alien") ? aliensFireOff() : shuttleFireOff();
  removeAShield(indexShieldsBlock, indexShield);
  inGame.shields[indexShieldsBlock][indexShield] = false;
};

function hittingShieldsBlock(alienOrShuttle, offset, indexShieldsBlock, laserAxisX) {
  const centerShieldLeftSide = offset + (the.scaleSize2 * 4);
  const centerShieldRightSide = offset + (the.scaleSize2 * 8);
  const leftShieldLeftSide = offset;
  const leftShieldRightSide = offset + (the.scaleSize2 * 5);
  const rightShieldLeftSide = offset + (the.scaleSize2 * 7);
  const rightShieldRightSide = offset + (the.scaleSize2 * 12);

  if ((laserAxisX > centerShieldLeftSide && laserAxisX < centerShieldRightSide) && inGame.shields[indexShieldsBlock][1]) {
    hittingAShield(alienOrShuttle, indexShieldsBlock, 1);
  } else if ((laserAxisX > leftShieldLeftSide && laserAxisX < leftShieldRightSide) && inGame.shields[indexShieldsBlock][0]) {
    hittingAShield(alienOrShuttle, indexShieldsBlock, 0);
  } else if ((laserAxisX > rightShieldLeftSide && laserAxisX < rightShieldRightSide) && inGame.shields[indexShieldsBlock][2]) {
    hittingAShield(alienOrShuttle, indexShieldsBlock, 2);
  } else {
    (alienOrShuttle == "alien") ? input.aliensLaserPhysicalStatus = "afterShields" : input.shuttleLaserPhysicalStatus = "afterShields";
  };
};

function laserOnShields(alienOrShuttle, laserPositionX) {
  const rightBlockLeftSide = the.spaceAttackWidth - (the.scaleSize2 * 24);
  const rightBlockRightSide = the.spaceAttackWidth - (the.scaleSize2 * 12);
  const centerBlockLeftSide = (the.spaceAttackWidth / 2) - (the.scaleSize2 * 6);
  const centerBlockRightSide = (the.spaceAttackWidth / 2) + (the.scaleSize2 * 6);
  const leftBlockLeftSide = the.scaleSize2 * 12;
  const leftBlockRightSide = the.scaleSize2 * 24;

  if (laserPositionX > rightBlockLeftSide && laserPositionX < rightBlockRightSide) {
    hittingShieldsBlock(alienOrShuttle, rightBlockLeftSide, 2, laserPositionX);
  } else if (laserPositionX > centerBlockLeftSide && laserPositionX < centerBlockRightSide) {
    hittingShieldsBlock(alienOrShuttle, centerBlockLeftSide, 1, laserPositionX);
  } else if (laserPositionX > leftBlockLeftSide && laserPositionX < leftBlockRightSide) {
    hittingShieldsBlock(alienOrShuttle, leftBlockLeftSide, 0, laserPositionX);
  } else {
    (alienOrShuttle == "alien") ? input.aliensLaserPhysicalStatus = "afterShields" : input.shuttleLaserPhysicalStatus = "afterShields";
  };
};
