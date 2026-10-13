// ===== 5. MUÑECO DE NIEVE =====
// Saluda con el brazo, sus ojos siguen al mouse y al hacer clic
// cambia el color de la bufanda.

window.dibujos = window.dibujos || {};

window.dibujos.muneco = function (p) {
  let colores;
  let indiceColor = 0;

  p.setup = function () {
    p.createCanvas(400, 400);
    colores = [
      p.color(220, 40, 40),
      p.color(40, 110, 220),
      p.color(40, 170, 80),
      p.color(160, 60, 200)
    ];
  };

  p.draw = function () {
    p.background(30, 50, 100);

    // Estrellas (randomSeed para que no cambien de lugar)
    p.noStroke();
    p.fill(255, 255, 200);
    p.randomSeed(5);
    for (let i = 0; i < 40; i++) {
      let brillo = p.random(2, 4) + p.sin(p.frameCount * 0.1 + i);
      p.ellipse(p.random(400), p.random(250), brillo, brillo);
    }

    // Luna
    p.fill(250, 250, 220);
    p.ellipse(70, 70, 60, 60);
    p.fill(30, 50, 100);
    p.ellipse(85, 62, 55, 55);

    // Suelo
    p.fill(240, 245, 255);
    p.rect(0, 320, 400, 80);

    // Brazo izquierdo
    p.stroke(100, 60, 30);
    p.strokeWeight(6);
    p.line(150, 220, 80, 180);
    p.line(95, 190, 85, 165);

    // Brazo derecho que saluda
    let angulo = p.sin(p.frameCount * 0.1) * 0.5 - 0.6;
    p.push();
    p.translate(250, 220);
    p.rotate(angulo);
    p.line(0, 0, 80, 0);
    p.line(60, 0, 75, -18);
    p.line(60, 0, 78, 12);
    p.pop();
    p.noStroke();

    // Tres bolas de nieve
    p.fill(255);
    p.ellipse(200, 300, 150, 140);
    p.ellipse(200, 205, 115, 105);
    p.ellipse(200, 125, 85, 80);

    // Botones
    p.fill(40);
    p.ellipse(200, 185, 10, 10);
    p.ellipse(200, 210, 10, 10);
    p.ellipse(200, 235, 10, 10);

    // Bufanda
    p.fill(colores[indiceColor]);
    p.rect(155, 155, 90, 16, 8);
    p.rect(215, 160, 18, 50, 6);

    // Sombrero
    p.fill(25);
    p.rect(160, 85, 80, 10);
    p.rect(175, 40, 50, 50);
    p.fill(colores[indiceColor]);
    p.rect(175, 75, 50, 10);

    // Ojos que siguen al mouse
    p.fill(20);
    let mx = p.map(p.constrain(p.mouseX, 0, 400), 0, 400, -4, 4);
    let my = p.map(p.constrain(p.mouseY, 0, 400), 0, 400, -3, 3);
    p.ellipse(185 + mx, 115 + my, 10, 10);
    p.ellipse(215 + mx, 115 + my, 10, 10);

    // Nariz de zanahoria
    p.fill(255, 140, 0);
    p.triangle(200, 125, 200, 135, 235, 130);

    // Sonrisa de carbón
    p.fill(20);
    for (let i = -2; i <= 2; i++) {
      p.ellipse(200 + i * 8, 148 - p.abs(i) * 2, 5, 5);
    }

    // Copos
    p.fill(255);
    for (let i = 0; i < 50; i++) {
      let x = (i * 53 + p.frameCount * 0.3) % 400;
      let y = (i * 97 + p.frameCount * (1 + (i % 3))) % 400;
      p.ellipse(x, y, 4, 4);
    }

    p.fill(60, 80, 120);
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text("Haz clic para cambiar la bufanda", 200, 385);
  };

  p.mouseClicked = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      indiceColor = (indiceColor + 1) % colores.length;
    }
  };
};
