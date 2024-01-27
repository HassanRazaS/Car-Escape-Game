const combObj = document.querySelector("div.mainCombine");
const obj = document.querySelector("div.mainCar");
const road = document.querySelector("div#sandyRoad");

const rock1 = document.getElementById('rock1')
const rock2 = document.getElementById('rock2')
const rock3 = document.getElementById('rock3')
const rock4 = document.getElementById('rock4')

let mouseX = 0;
let mouseY = 0;

let carX = 240;
let carY = 240;

let speed = 0.05;

function moveCombineVertical(carVert) { /* pulls the car's y position and sets the combine's y value to that */
    var yVal = carVert;

    combObj.style.top = yVal + 'px';
}

function moveCombineHorizontal() { /* Called when a collision is detected to effectively inch the combine forward*/
    const currentLeft = parseInt(combObj.style.left) || 0;
    combObj.style.left = (currentLeft + 75) + 'px';
    console.log("movement called")
}


function collisionDetectionCombine(object1, object2) {
    const carObject = object1.getBoundingClientRect();
    const otherObject = object2.getBoundingClientRect();

    return !(
        carObject.top > otherObject.bottom ||
        carObject.right < otherObject.left ||
        carObject.bottom < otherObject.top ||
        carObject.left > otherObject.right
    );
}

setInterval(() => {
    if (collisionDetectionCombine(obj, combObj)) {
        clearInterval();
        alertPlayer();
    }
},
    100
)

function alertPlayer() {
    alert('GAME OVER. Wanna play again?');
    if (confirm("Do u want to go back to main menu?")) {
        window.location.href = "sandRaceMainMenu.html"
    }
}


function animate() {
    let distX = mouseX - carX;
    let distY = mouseY - carY;


    carX = carX + (distX * speed);
    carY = carY + (distY * speed);

    obj.style.left = carX + "px";
    if ((carY < road.offsetTop + road.offsetHeight - 125) && carY > road.offsetTop + 125) { // https://www.w3schools.com/jsref/prop_element_offsettop.asp
        obj.style.top = carY + "px";
    }

    if ((carY < road.offsetTop + road.offsetHeight - 125) && carY > road.offsetTop + 125) { // https://www.w3schools.com/jsref/prop_element_offsettop.asp
        combObj.style.top = (carY - 200) + "px";
    }

    requestAnimationFrame(animate);
}
animate();

document.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    setTimeout(() => {
        moveCombineVertical(mouseY);
    }, 200);
})


function checkCollision(car, obstacle) {// Hassan
    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        carRect.left < obstacleRect.right &&
        carRect.right > obstacleRect.left &&
        carRect.top < obstacleRect.bottom &&
        carRect.bottom > obstacleRect.top
    ) { return true; }
    else { return false; }
}


setInterval(() => { // Hassan
    if (
        checkCollision(obj, rock1) ||
        checkCollision(obj, rock2) ||
        checkCollision(obj, rock3) ||
        checkCollision(obj, rock4)
    ) {
        moveCombineHorizontal();
    }
}, 550);

