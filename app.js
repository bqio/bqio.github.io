// by Dmitry Mikhaltsov
// 2020

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let X_POS = 100;
let Y_POS = 125;

let scale = 1;

// Rotate method
document.getElementById("rotate").addEventListener("click", () => {
  ctx.translate(X_POS, Y_POS);
  ctx.rotate((Math.PI / 180) * 10);
  ctx.translate(-X_POS, -Y_POS);
  render();
});

// Reflection method
document.getElementById("reflection").addEventListener("click", () => {
  ctx.translate(X_POS, Y_POS);
  ctx.scale(-1, 1);
  ctx.translate(-X_POS, -Y_POS);
  render();
});

// Scale method
document.getElementById("scale").addEventListener("click", () => {
  if (scale == 1.3) {
    scale = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } else {
    scale = 1.3;
  }
  ctx.translate(X_POS, Y_POS);
  ctx.scale(scale, scale);
  ctx.translate(-X_POS, -Y_POS);
  render();
});

// Move method
document.addEventListener("keyup", (e) => {
  switch (e.key) {
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
});

render();

function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";

  // Draw black ellipse
  ctx.beginPath();
  ctx.ellipse(X_POS, Y_POS, 50, 55, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "white";

  // Draw white ellipse
  ctx.beginPath();
  ctx.ellipse(X_POS, Y_POS, 35, 50, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "black";

  // Draw first quadratic curve
  ctx.beginPath();
  ctx.moveTo(X_POS - 10, Y_POS + 50);
  ctx.quadraticCurveTo(X_POS - 10, Y_POS + 65, X_POS + 45, Y_POS + 76);
  ctx.fill();

  // Draw second quadratic curve
  ctx.beginPath();
  ctx.moveTo(X_POS + 8, Y_POS + 50);
  ctx.quadraticCurveTo(X_POS - 20, Y_POS + 65, X_POS + 45, Y_POS + 75);
  ctx.fill();

  ctx.fillStyle = "white";

  // Draw white quadratic curve
  ctx.beginPath();
  ctx.moveTo(X_POS + 15, Y_POS + 54);
  ctx.quadraticCurveTo(X_POS + 25, Y_POS + 71, X_POS + 47, Y_POS + 75);
  ctx.fill();
}
