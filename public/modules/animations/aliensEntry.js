function aliensPreIn(element, index) {
  if (index == 4) {
    element = element.classList.add("alienShip1");
  } else if (index == 3 || index == 5 || index == 6) {
    element = element.classList.add("alienShip2");
  } else if (index == 1 || index == 2 || index == 7) {
    element = element.classList.add("alienShip3");
  } else if (index == 0 || index == 8 || index == 9) {
    element = element.classList.add("alienShip4");
  };
};

function aliensEntry() {
  element.aliensLine_1.forEach(aliensPreIn);
  element.aliensLine_2.forEach(aliensPreIn);
};
