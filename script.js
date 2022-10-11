// "use strict";

// // Change theme to dark by adding the `dark` classname to html element.
// const changeThemeToDark = () => {
//   document.documentElement.setAttribute("data-theme", "dark"); //set theme to light
// };

// // Reset the html class to default
// const changeThemeToLight = () => {
//   document.documentElement.setAttribute("data-theme", "light"); //set theme to light
// };

let theme = localStorage.getItem("data-theme");
const changeThemeToDark = () => {
  document.documentElement.setAttribute("data-theme", "dark"); // set theme to dark
  localStorage.setItem("data-theme", "dark"); // save theme to local storage
};

const changeThemeToLight = () => {
  document.documentElement.setAttribute("data-theme", "light"); // set theme light
  localStorage.setItem("data-theme", "light"); // save theme to local storage
};

// Get the element based on ID
const checkbox = document.getElementById("switch");
// Apply retrived them to the website
checkbox.addEventListener("change", () => {
  let theme = localStorage.getItem("data-theme"); // Retrieve saved them from local storage
  if (theme === "dark") {
    changeThemeToLight();
  } else {
    changeThemeToDark();
  }
});

var points = [],
  velocity2 = 5, // velocity squared
  canvas = document.getElementById("container"),
  context = canvas.getContext("2d"),
  radius = 5,
  boundaryX = 200,
  boundaryY = 200,
  numberOfPoints = 30;

init();

function init() {
  // create points
  for (var i = 0; i < numberOfPoints; i++) {
    createPoint();
  }
  // create connections
  for (var i = 0, l = points.length; i < l; i++) {
    var point = points[i];
    if (i == 0) {
      points[i].buddy = points[points.length - 1];
    } else {
      points[i].buddy = points[i - 1];
    }
  }

  // animate
  animate();
}

function createPoint() {
  var point = {},
    vx2,
    vy2;
  point.x = Math.random() * boundaryX;
  point.y = Math.random() * boundaryY;
  // random vx
  point.vx = (Math.floor(Math.random()) * 2 - 1) * Math.random();
  vx2 = Math.pow(point.vx, 2);
  // vy^2 = velocity^2 - vx^2
  vy2 = velocity2 - vx2;
  point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
  points.push(point);
}

function resetVelocity(point, axis, dir) {
  var vx, vy;
  if (axis == "x") {
    point.vx = dir * Math.random();
    vx2 = Math.pow(point.vx, 2);
    // vy^2 = velocity^2 - vx^2
    vy2 = velocity2 - vx2;
    point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
  } else {
    point.vy = dir * Math.random();
    vy2 = Math.pow(point.vy, 2);
    // vy^2 = velocity^2 - vx^2
    vx2 = velocity2 - vy2;
    point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
  }
}

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#97badc";
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = "#8ab2d8";
  context.stroke();
}

function draw() {
  for (var i = 0, l = points.length; i < l; i++) {
    // circles
    var point = points[i];
    point.x += point.vx;
    point.y += point.vy;
    drawCircle(point.x, point.y);
    // lines
    drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
    // check for edge
    if (point.x < 0 + radius) {
      resetVelocity(point, "x", 1);
    } else if (point.x > boundaryX - radius) {
      resetVelocity(point, "x", -1);
    } else if (point.y < 0 + radius) {
      resetVelocity(point, "y", 1);
    } else if (point.y > boundaryY - radius) {
      resetVelocity(point, "y", -1);
    }
  }
}

function animate() {
  context.clearRect(0, 0, 200, 200);
  draw();
  requestAnimationFrame(animate);
}

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}
