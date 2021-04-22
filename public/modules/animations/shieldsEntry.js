function shieldsActivation(element, index) {
  if (index == 0) {
    element = element.classList.add("shieldP1");
  } else if (index == 1) {
    element = element.classList.add("shieldP2");
  } else if (index == 2) {
    element = element.classList.add("shieldP3");
  };
};

function shieldsEntry() {
  element.shield_1.forEach(shieldsActivation);
  element.shield_2.forEach(shieldsActivation);
  element.shield_3.forEach(shieldsActivation);
};
