function aliensPrefireLogic() {
  the.aliensPrefireLogic = setInterval(function() {
    if (input.aliensLaserStatus == 'off') { aliensFireOn() };
  }, 1000);
};
