function controlsViewVisibility() {
  if (!inGame.isNot) { element.infoControls.classList.remove("controlsViewTransparency") };
};

function removingControlsView() {
  element.infoControls.classList.add("controlsViewTransparency");
};

function onPlayPause() {
  if (input.gameStatus == 'inPause') {
    startResume();
    input.gameStatus = 'inPlay';
    element.startPause.innerHTML = 'Pause';
    removingControlsView();
  } else if (input.gameStatus == 'inPlay') {
    pause();
    input.gameStatus = 'inPause';
    element.startPause.innerHTML = 'Resume';
    controlsViewVisibility()
  };
};
