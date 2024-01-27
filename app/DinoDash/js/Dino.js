var domLoaded;
window.addEventListener("DOMContentLoaded", domLoaded);

const obj = document.querySelector("div.Dinosaur");
const grass = document.querySelector("div#Foreground");
const rock1 = document.getElementById('rock1')


const curGame = {
  "startTime": new Date()
}

function gamerun() {
  $("body").click(this.$dino.jump.bind(this.$dino)) // Dr. Kent Jones
}

(function ($) {
  // Initial speed and position of background
  var position = 0;
  var speed = 10;

  // Use jQuery to get the background element
  var $background1 = $("#Foreground");

  // IFFY function to figure out best animation function and store it
  var requestAnimFrame = (function () {
    if (window.requestAnimationFrame) return window.requestAnimationFrame;
    else return function (callback, element) {
      window.setTimeout(callback, element);
    };
  })();

  // Callback function to move the background 
  function draw() {
    // request another animation frame
    requestAnimFrame(draw);
    // reset position to 0 once the image has scrolled far enough
    if (position < -$background1  .width()) {
      position = 0;
    }
    // Set actual background position 
    $('#Foreground').css('background-position', position);

    // Update the background position by the speed
    position = position - speed;
  }
  // Start the animation
  draw();

})(jQuery);

function collisionDetectionCombine(object1, object2) {
  const dinoObject = object1.getBoundingClientRect();
  const otherObject = object2.getBoundingClientRect();

  return !(
    dinoObject.top > otherObject.bottom ||
    dinoObject.right < otherObject.left ||
    dinoObject.bottom < otherObject.top ||
    dinoObject.left > otherObject.right
  );
}
setInterval(() => {
  if (collisionDetectionCombine(obj, rock1)) {
    clearInterval();
    alertPlayer();
  }
},
  100
)

function Space(){
  document.addEventListener(
    "keydown",
    (event) => {
      const keyname = event.key;
      if(keyname === "Space"){
        jump();
      }
    },
    false,
  );
}
function jump(){
  obj.style.top = 10 + 'px';
}
