function availabilityOfAliens() {
  the.availabilityOfAliens = setInterval(function() {
    const line1AllDead = !inGame.aliensLines[0].includes(true);
    const line2AllDead = !inGame.aliensLines[1].includes(true);

    if (line1AllDead && line2AllDead) {
      endOfLevel("NEXT LEVEL");
    };
  }, 500);
};
