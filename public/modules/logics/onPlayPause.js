function onPlayPause() {
  if (input.gameStatus == 'inPause') {
    startResume();
    input.gameStatus = 'inPlay';
    element.startPause.innerHTML = 'Pause';
  } else if (input.gameStatus == 'inPlay') {
    pause();
    input.gameStatus = 'inPause';
    element.startPause.innerHTML = 'Resume';
  };
};
