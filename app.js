var spaceAttack = document.getElementById("spaceAttack");
var shuttle = document.getElementById("shuttle");
var afterBurnRx = document.getElementById("afterBurnRx")
var afterBurnLx = document.getElementById("afterBurnLx")
var shuttlePosition;
var keyRight = 'up';
var keyLeft = 'up';

setInterval(function() {
  shuttlePosition = parseInt(window.getComputedStyle(shuttle).getPropertyValue("left"));
  if (keyRight == 'down' && shuttlePosition <= 1320) {
    shuttle.style.setProperty("left", (shuttlePosition + 4) + "px" );
  } else if (keyLeft == 'down' && shuttlePosition >= 20) {
    shuttle.style.setProperty("left", (shuttlePosition - 4) + "px" );
  }
},5);


document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39) {
    keyRight = 'down';
    afterBurnLx.classList.add("afterBurnLx");
  } else if (event.keyCode == 37) {
    keyLeft = 'down';
    afterBurnRx.classList.add("afterBurnRx");
  } else if (event.keyCode == 32) {
  }
})


document.addEventListener("keyup", function(event) {
  if (event.keyCode == 39) {
    keyRight = 'up';
    afterBurnLx.classList.remove("afterBurnLx");
  }
  if (event.keyCode == 37) {
    keyLeft = 'up';
    afterBurnRx.classList.remove("afterBurnRx");
  }
})
