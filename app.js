var spaceAttack = document.getElementById("spaceAttack");
var levelText = document.getElementById("levelAtStart");
var inGameTxt = document.getElementById("inGameTxt");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx");
var afterBurnLx = document.getElementById("afterBurnLx");
var shuttleLaser = document.getElementById("shuttleLaser");
var aliens = document.getElementById("aliens");
var aliensLaser = document.getElementById("aliensLaser");
var shield1P1 = document.getElementById("s1p1");
var shield1P2 = document.getElementById("s1p2");
var shield1P3 = document.getElementById("s1p3");
var shield2P1 = document.getElementById("s2p1");
var shield2P2 = document.getElementById("s2p2");
var shield2P3 = document.getElementById("s2p3");
var shield3P1 = document.getElementById("s3p1");
var shield3P2 = document.getElementById("s3p2");
var shield3P3 = document.getElementById("s3p3");
// var line1 = document.querySelectorAll("#line1 *");
// var line2 = document.querySelectorAll("#line2 *");
// line1[9].classList.add("pIndex");
// line2[0].classList.add("pIndex");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var shuttleLogic;
var aliensLogic;
var aliensLaserPrefireLogic;

var input = {
  gameStatus               : 'inPause',
  rightKey                 : 'up',
  leftKey                  : 'up',
  shuttleLaserStatus       : 'none',
  shuttleLaserFisicalStatus: 'start',
  aliensDirection          : 'right',
  aliensLaserStatus        : 'none',
  aliensLaserFisicalStatus : 'start'
}

var position = {
  shuttleAxisX     : 0,
  shuttleLaserAxisX: 0,
  shuttleLaserAxisY: 0,
  aliensAxisX      : 0,
  aliensLaserAxisX : 0,
  aliensLaserAxisY : 0
};

var user = {
  lives     : 6,
  level     : 1,
  score     : 0,
  shields_p1: 3,
  shields_p2: 3,
  shields_p3: 3
};

var inGame = {
  shield1     : {p1:true, p2:true, p3:true},
  shield2     : {p1:true, p2:true, p3:true},
  shield3     : {p1:true, p2:true, p3:true},
  aliensLine2 : {p1:true, p2:true, p3:true, p4:true, p5:true, p6:true, p7:true, p8:true, p9:true, p10:true},
  aliensLine1 : {p1:true, p2:true, p3:true, p4:true, p5:true, p6:true, p7:true, p8:true, p9:true, p10:true},
  monsterLives: 0,
  isIt_       : false
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var lives = parseInt(document.getElementById("lives").innerHTML)
// document.getElementById("lives").innerHTML =  lives + 1

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function aliensFireOn() {
  position.aliensLaserAxisX = position.aliensAxisX + 22 + (Math.floor(Math.random() * 10) * 100);
  aliensLaser.style.setProperty("left", position.aliensLaserAxisX + "px");
  aliensLaser.style.setProperty("top", ((Math.floor(Math.random() * 2) * 140) + 140) + "px");
  aliensLaser.classList.add("aliensLaser");
  input.aliensLaserStatus = 'on';
};

function aliensFireOff() {
  input.aliensLaserStatus = 'off';
  aliensLaser.classList.remove("aliensLaser");
  aliensLaser.style.setProperty("top", "1px");
  input.aliensLaserFisicalStatus = 'start';
};

function shuttleFireOn() {
  if (input.shuttleLaserStatus == 'off') {
    shuttleLaser.style.setProperty("left", position.shuttleLaserAxisX + "px");
    shuttleLaser.classList.add("shuttleLaser");
    input.shuttleLaserStatus = 'on';
  };
};

function shuttleFireOff() {
  shuttleLaser.style.setProperty("top", "600px");
  shuttleLaser.classList.remove("shuttleLaser");
  input.shuttleLaserStatus = 'off';
  input.shuttleLaserFisicalStatus = 'start';
};

function shieldsActivation() {
  if (inGame.shield1.p1) { shield1P1.classList.add("shieldP1") };
  if (inGame.shield1.p2) { shield1P2.classList.add("shieldP2") };
  if (inGame.shield1.p3) { shield1P3.classList.add("shieldP3") };
  if (inGame.shield2.p1) { shield2P1.classList.add("shieldP1") };
  if (inGame.shield2.p2) { shield2P2.classList.add("shieldP2") };
  if (inGame.shield2.p3) { shield2P3.classList.add("shieldP3") };
  if (inGame.shield3.p1) { shield3P1.classList.add("shieldP1") };
  if (inGame.shield3.p2) { shield3P2.classList.add("shieldP2") };
  if (inGame.shield3.p3) { shield3P3.classList.add("shieldP3") };
};

function aliensLaserOnShields() {
  if (position.aliensLaserAxisX > 1152 && position.aliensLaserAxisX < 1272) {
    if ((position.aliensLaserAxisX > 1187 && position.aliensLaserAxisX < 1227) && inGame.shield3.p2) {
      aliensFireOff();
      shield3P2.classList.remove("shieldP2");
      inGame.shield3.p2 = false;
    } else if ((position.aliensLaserAxisX > 1152 && position.aliensLaserAxisX < 1197) && inGame.shield3.p1) {
      aliensFireOff();
      shield3P1.classList.remove("shieldP1");
      inGame.shield3.p1 = false;
    } else if ((position.aliensLaserAxisX > 1222 && position.aliensLaserAxisX < 1272) && inGame.shield3.p3) {
      aliensFireOff();
      shield3P3.classList.remove("shieldP3");
      inGame.shield3.p3 = false;
    };
  } else if (position.aliensLaserAxisX > 632 && position.aliensLaserAxisX < 752) {
    if ((position.aliensLaserAxisX > 667 && position.aliensLaserAxisX < 707) && inGame.shield2.p2) {
      aliensFireOff();
      shield2P2.classList.remove("shieldP2");
      inGame.shield2.p2 = false;
    } else if ((position.aliensLaserAxisX > 632 && position.aliensLaserAxisX < 677) && inGame.shield2.p1) {
      aliensFireOff();
      shield2P1.classList.remove("shieldP1");
      inGame.shield2.p1 = false;
    } else if ((position.aliensLaserAxisX > 702 && position.aliensLaserAxisX < 752) && inGame.shield2.p3) {
      aliensFireOff();
      shield2P3.classList.remove("shieldP3");
      inGame.shield2.p3 = false;
    };
  } else if (position.aliensLaserAxisX > 112 && position.aliensLaserAxisX < 232) {
    if ((position.aliensLaserAxisX > 147 && position.aliensLaserAxisX < 187) && inGame.shield1.p2) {
      aliensFireOff();
      shield1P2.classList.remove("shieldP2");
      inGame.shield1.p2 = false;
    } else if ((position.aliensLaserAxisX > 112 && position.aliensLaserAxisX < 157) && inGame.shield1.p1) {
      aliensFireOff();
      shield1P1.classList.remove("shieldP1");
      inGame.shield1.p1 = false;
    } else if ((position.aliensLaserAxisX > 182 && position.aliensLaserAxisX < 232) && inGame.shield1.p3) {
      aliensFireOff();
      shield1P3.classList.remove("shieldP3");
      inGame.shield1.p3 = false;
    };
  } else {
    input.aliensLaserFisicalStatus = 'afterShields';
  };
};

function shuttleLaserOnShields() {
  if (position.shuttleLaserAxisX > 1152 && position.shuttleLaserAxisX < 1272) {
    if ((position.shuttleLaserAxisX > 1187 && position.shuttleLaserAxisX < 1227) && inGame.shield3.p2) {
      shuttleFireOff();
      shield3P2.classList.remove("shieldP2");
      inGame.shield3.p2 = false;
    } else if ((position.shuttleLaserAxisX > 1152 && position.shuttleLaserAxisX < 1197) && inGame.shield3.p1) {
      shuttleFireOff();
      shield3P1.classList.remove("shieldP1");
      inGame.shield3.p1 = false;
    } else if ((position.shuttleLaserAxisX > 1222 && position.shuttleLaserAxisX < 1272) && inGame.shield3.p3) {
      shuttleFireOff();
      shield3P3.classList.remove("shieldP3");
      inGame.shield3.p3 = false;
    };
  } else if (position.shuttleLaserAxisX > 632 && position.shuttleLaserAxisX < 752) {
    if ((position.shuttleLaserAxisX > 667 && position.shuttleLaserAxisX < 707) && inGame.shield2.p2) {
      shuttleFireOff();
      shield2P2.classList.remove("shieldP2");
      inGame.shield2.p2 = false;
    } else if ((position.shuttleLaserAxisX > 632 && position.shuttleLaserAxisX < 677) && inGame.shield2.p1) {
      shuttleFireOff();
      shield2P1.classList.remove("shieldP1");
      inGame.shield2.p1 = false;
    } else if ((position.shuttleLaserAxisX > 702 && position.shuttleLaserAxisX < 752) && inGame.shield2.p3) {
      shuttleFireOff();
      shield2P3.classList.remove("shieldP3");
      inGame.shield2.p3 = false;
    };
  } else if (position.shuttleLaserAxisX > 112 && position.shuttleLaserAxisX < 232) {
    if ((position.shuttleLaserAxisX > 147 && position.shuttleLaserAxisX < 187) && inGame.shield1.p2) {
      shuttleFireOff();
      shield1P2.classList.remove("shieldP2");
      inGame.shield1.p2 = false;
    } else if ((position.shuttleLaserAxisX > 112 && position.shuttleLaserAxisX < 157) && inGame.shield1.p1) {
      shuttleFireOff();
      shield1P1.classList.remove("shieldP1");
      inGame.shield1.p1 = false;
    } else if ((position.shuttleLaserAxisX > 182 && position.shuttleLaserAxisX < 232) && inGame.shield1.p3) {
      shuttleFireOff();
      shield1P3.classList.remove("shieldP3");
      inGame.shield1.p3 = false;
    };
  } else {
    input.shuttleLaserFisicalStatus = 'afterShields';
  };
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startResume() {

  if (inGame.isIt_) {
    shieldsActivation();
  } else {
    shieldsActivation();
    levelText.classList.add("level");
    shuttle.classList.add("shuttle");
    inGameTxt.classList.add("inGameTxt");
    setTimeout(function() {
      input.aliensLaserStatus = 'off';
      input.shuttleLaserStatus = 'off';
    }, 7000);
    inGame.isIt_ = true;
  };

  shuttleLogic = setInterval(function() {
    position.shuttleAxisX = parseInt(window.getComputedStyle(shuttle).getPropertyValue("left"));
    position.shuttleLaserAxisX = position.shuttleAxisX + 21;
    position.shuttleLaserAxisY = parseInt(window.getComputedStyle(shuttleLaser).getPropertyValue("top"));

    if (input.rightKey == 'down' && position.shuttleAxisX <= 1320) {
      shuttle.style.setProperty("left", (position.shuttleAxisX + 4) + "px");
    };
    if (input.leftKey == 'down' && position.shuttleAxisX >= 20) {
      shuttle.style.setProperty("left", (position.shuttleAxisX - 4) + "px");
    };


    if (input.shuttleLaserStatus == 'on') {
      shuttleLaser.style.setProperty("top", (position.shuttleLaserAxisY - 10) + "px");
    };

    if (position.shuttleLaserAxisY < 600 && input.shuttleLaserFisicalStatus == 'start') {
      shuttleLaserOnShields();
    };

    if (position.shuttleLaserAxisY <= 0) {
      shuttleFireOff();
    };
  }, 5);

  /////////////////////////////////////////////////////////////////////////////////////

  aliensLogic = setInterval(function() {
    position.aliensAxisX = parseInt(window.getComputedStyle(aliens).getPropertyValue("left"));
    position.aliensLaserAxisY = parseInt(window.getComputedStyle(aliensLaser).getPropertyValue("top"));

    if (input.aliensDirection == 'right' && position.aliensAxisX <= 420) {
      aliens.style.setProperty("left", (position.aliensAxisX + 1) + "px");
    } else {
      input.aliensDirection = 'left';
    };
    if (input.aliensDirection == 'left' && position.aliensAxisX >= 20) {
      aliens.style.setProperty("left", (position.aliensAxisX - 1) + "px");
    } else {
      input.aliensDirection = 'right';
    };

    if (input.aliensLaserStatus == 'on') {
      aliensLaser.style.setProperty("top", (position.aliensLaserAxisY + 7) + "px");
    };

    if (position.aliensLaserAxisY > 540 && input.aliensLaserFisicalStatus == 'start') {
      aliensLaserOnShields();
    };

    if (position.aliensLaserAxisY >= 640) {
      aliensFireOff();
    };
  }, 5);

  ///////////////////////////////////////////////////////////////////////////////////////

  aliensLaserPrefireLogic = setInterval(function() {
    if (input.aliensLaserStatus == 'off') {
      aliensFireOn();
    };
  }, 1000);

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function pause() {
  clearInterval(shuttleLogic);
  clearInterval(aliensLogic);
  clearInterval(aliensLaserPrefireLogic);
}

function onPlayPause() {
  if (input.gameStatus == 'inPause') {
    startResume();
    input.gameStatus = 'inPlay';
    document.getElementById("startPause").innerHTML = 'Pause';
  } else if (input.gameStatus == 'inPlay') {
    pause();
    input.gameStatus = 'inPause';
    document.getElementById("startPause").innerHTML = 'Resume';
  };
}

document.getElementById("startPause").addEventListener("click", function() {
  onPlayPause();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39) {
    input.rightKey = 'down';
    afterBurnLx.classList.add("afterBurnLx");
  } else if (event.keyCode == 37) {
    input.leftKey = 'down';
    afterBurnRx.classList.add("afterBurnRx");
  } else if (event.keyCode == 32) {
    shuttleFireOn();
  } else if (event.keyCode == 80) {
    onPlayPause();
  };
});

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 39) {
    input.rightKey = 'up';
    afterBurnLx.classList.remove("afterBurnLx");
  };
  if (event.keyCode == 37) {
    input.leftKey = 'up';
    afterBurnRx.classList.remove("afterBurnRx");
  };
});
