var input;
var position;
var user;
var inGame;
var game;

function reset() {
  input = {
    gameStatus: 'inPause',
    rightKey: 'up',
    leftKey: 'up',
    shuttleLaserStatus: 'none',
    shuttleLaserPhysicalStatus: 'start',
    aliensAvailability: '',
    aliensDirection: 'right',
    aliensLaserStatus: 'none',
    aliensLaserPhysicalStatus: 'start'
  };

  position = {
    shuttleAxisX: 0,
    shuttleLaserAxisX: 0,
    shuttleLaserAxisY: 0,
    aliensAxisX: 0,
    aliensLaserAxisX: 0,
    aliensLaserAxisY: 0
  };

  user = {
    lives: 6,
    level: 1,
    score: 0,
  };

  inGame = {
    shields: [[true, true, true],
              [true, true, true],
              [true, true, true]],
    aliensLines: [[true, true, true, true, true, true, true, true, true, true],
                  [true, true, true, true, true, true, true, true, true, true]],
    monsterLives: 0,
    isIt_: false
  };

  game = {
    counter: 0,
    aliensReentryByLevel: [0, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80],
    monsterLevel: [80, 160, 360]
  };
};
