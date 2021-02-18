var spaceAttack = document.getElementById("spaceAttack");
var shuttle = document.getElementById("shuttle")

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39) {
    shuttle.classList.add("turnRight");
  } else if (event.keyCode == 37) {
    shuttle.classList.add("turnLeft");
  } else if (event.keyCode == 32) {
  }
})

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 39) {
    shuttle.classList.add("rightClose");
  } else if (event.keyCode == 37) {
    shuttle.classList.add("leftClose");
  }
})
