// Ejemplo de la sección de teoría: dibujo con canvas nativo (sin p5.js)
const canvas = document.getElementById("demoCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "skyblue";
ctx.fillRect(0, 0, 400, 300);

ctx.beginPath();
ctx.arc(200, 150, 60, 0, Math.PI * 2);
ctx.fillStyle = "gold";
ctx.fill();
ctx.lineWidth = 4;
ctx.strokeStyle = "orange";
ctx.stroke();

ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.fillText("Hola canvas", 140, 260);
