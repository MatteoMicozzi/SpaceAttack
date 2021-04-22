function pause() {
  clearInterval(the.shuttleLogic);
  clearInterval(the.aliensLogic);
  clearInterval(the.aliensPrefireLogic);
  clearInterval(the.availabilityOfAliens);
  clearTimeout(the.lasersActivation);
}
