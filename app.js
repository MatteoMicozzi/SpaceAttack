var spaceAttack = document.getElementById("spaceAttack");
var shuttle = document.getElementById("shuttle")

setInterval(function() {
  let shuttlePosition = window.getComputedStyle(shuttle).getPropertyValue("left");
  shuttle.style.setProperty("left", shuttlePosition);
},20);

document.addEventListener("keydown", function(event) {
  console.log(event.keyCode)
  if (event.keyCode == 39) {
    shuttle.classList.add("turnRight");
  } else if (event.keyCode == 37) {
    shuttle.classList.add("turnLeft");
  } else if (event.keyCode == 32) {
  }
})


document.addEventListener("keyup", function(event) {
  if (event.keyCode == 37) {
    shuttle.classList.remove("turnLeft");
  }
  if (event.keyCode == 39) {
    shuttle.classList.remove("turnRight");
  }
})
