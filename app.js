// by Dmitry Mikhaltsov
// 2020

const canvas = document.getElementById("canvas");
const menuContainer = document.getElementById("menuContainer");
const btnRotate = document.getElementById("btnRotate");
const btnScale = document.getElementById("btnScale");
const btnReflection = document.getElementById("btnReflection");
const ctx = canvas.getContext("2d");

let X_POS = 0;
let Y_POS = 0;

let isScale = false;
let isRef = false;
let scale = 1;
let rotate = 0;
let ref = [-1, 1];

function mouseMoveHandler(evt) {
  const { x, y } = getMousePos(canvas, evt);
  X_POS = x;
  Y_POS = y;
}
function contextMenuHandler(evt) {
  evt.preventDefault();
  canvas.removeEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("keyup", keyupHandler);
  menuContainer.classList.remove("hidden");
  render();
}
function keyupHandler(evt) {
  switch (evt.key) {
    case "ArrowLeft":
      X_POS -= 5;
      break;
    case "ArrowRight":
      X_POS += 5;
      break;
    case "ArrowUp":
      Y_POS -= 5;
      break;
    case "ArrowDown":
      Y_POS += 5;
      break;
  }
  render();
}
function rotateHandler() {
  if (isScale) {
    rotate += 10;
  }
  ctx.translate(X_POS, Y_POS);
  ctx.rotate((Math.PI / 180) * 10);
  ctx.translate(-X_POS, -Y_POS);
  render();
}
function reflectionHandler() {
  ctx.translate(X_POS, Y_POS);
  if (isScale) {
    isRef = true;
  }
  ctx.scale(...ref);
  ctx.translate(-X_POS, -Y_POS);
  render();
}
function scaleHandler() {
  if (isScale) {
    scale = 1;
    isScale = !isScale;
    ctx.restore();
    ctx.translate(X_POS, Y_POS);
    ctx.scale(scale, scale);
    ctx.rotate((Math.PI / 180) * rotate);
    if (isRef) {
      ctx.scale(...ref);
      isRef = false;
    }
    rotate = 0;
    ctx.translate(-X_POS, -Y_POS);
    render();
  } else {
    scale = 1.3;
    isScale = !isScale;
    ctx.save();
    ctx.translate(X_POS, Y_POS);
    ctx.scale(scale, scale);
    ctx.translate(-X_POS, -Y_POS);
    render();
  }
}
function draw() {
  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.ellipse(X_POS, Y_POS, 50, 55, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.ellipse(X_POS, Y_POS, 35, 50, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "black";

  ctx.beginPath();
  ctx.moveTo(X_POS - 10, Y_POS + 50);
  ctx.quadraticCurveTo(X_POS - 10, Y_POS + 65, X_POS + 45, Y_POS + 76);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(X_POS + 8, Y_POS + 50);
  ctx.quadraticCurveTo(X_POS - 20, Y_POS + 65, X_POS + 45, Y_POS + 75);
  ctx.fill();

  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.moveTo(X_POS + 15, Y_POS + 54);
  ctx.quadraticCurveTo(X_POS + 25, Y_POS + 71, X_POS + 47, Y_POS + 75);
  ctx.fill();
}
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
}
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

canvas.addEventListener("mousemove", mouseMoveHandler);
canvas.addEventListener("contextmenu", contextMenuHandler);
btnRotate.addEventListener("click", rotateHandler);
btnReflection.addEventListener("click", reflectionHandler);
btnScale.addEventListener("click", scaleHandler);
