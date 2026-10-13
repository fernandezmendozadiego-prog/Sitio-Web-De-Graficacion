// ===== 4. DÍA NEVADO SOLEADO =====
// Como en Khan Academy: el sol va creciendo en draw() mientras cae la nieve.
// Clic para reiniciar el sol.

window.dibujos = window.dibujos || {};

window.dibujos.nevado = function (p) {
  let tamanoSol = 30;
  let copos = [];

  p.setup = function () {
    p.createCanvas(400, 400);
    for (let i = 0; i < 80; i++) {
      copos.push({
        x: p.random(400),
        y: p.random(400),
        tam: p.random(3, 8),
        vel: p.random(0.5, 2)
      });
    }
  };

  p.draw = function () {
    // El cielo se aclara mientras el sol crece
    let claridad = p.constrain(p.map(tamanoSol, 30, 300, 0, 1), 0, 1);
    p.background(p.lerpColor(p.color(90, 130, 190), p.color(170, 215, 255), claridad));

    // Rayos que giran
    p.push();
    p.translate(320, 80);
    p.rotate(p.frameCount * 0.01);
    p.stroke(255, 200, 0);
    p.strokeWeight(4);
    for (let i = 0; i < 12; i++) {
      p.rotate(p.TWO_PI / 12);
      p.line(tamanoSol / 2 + 5, 0, tamanoSol / 2 + 25, 0);
    }
    p.pop();

    // Sol
    p.noStroke();
    p.fill(255, 220, 0);
    p.ellipse(320, 80, tamanoSol, tamanoSol);
    if (tamanoSol < 300) {
      tamanoSol = tamanoSol + 0.5;
    }

    // Montañas
    p.fill(200, 215, 235);
    p.triangle(-50, 300, 120, 120, 280, 300);
    p.fill(225, 235, 250);
    p.triangle(120, 300, 280, 150, 450, 300);
    p.fill(255);
    p.triangle(85, 155, 120, 120, 155, 155);

    // Suelo nevado
    p.fill(250);
    p.rect(0, 290, 400, 110);
    p.ellipse(100, 295, 260, 50);
    p.ellipse(320, 300, 260, 50);

    // Pino
    p.fill(110, 70, 40);
    p.rect(60, 260, 16, 40);
    p.fill(40, 120, 70);
    p.triangle(30, 270, 68, 180, 106, 270);
    p.triangle(38, 235, 68, 160, 98, 235);
    p.fill(255);
    p.ellipse(68, 165, 18, 8);

    // Muñeco de nieve
    dibujarMuneco(260, 330);

    // Nieve
    p.fill(255);
    for (let c of copos) {
      p.ellipse(c.x, c.y, c.tam, c.tam);
      c.y += c.vel;
      c.x += p.sin(p.frameCount * 0.02 + c.tam) * 0.5;
      if (c.y > 400) {
        c.y = -10;
        c.x = p.random(400);
      }
    }

    p.fill(60, 80, 110);
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text("Haz clic para reiniciar el sol", 200, 385);
  };

  // Dibuja el muñeco de nieve; (x, y) es la base del cuerpo
  function dibujarMuneco(x, y) {
    // Brazos de rama
    p.stroke(100, 60, 30);
    p.strokeWeight(4);
    p.line(x - 28, y - 78, x - 65, y - 100);
    p.line(x + 28, y - 78, x + 65, y - 100);
    p.noStroke();

    // Tres bolas de nieve
    p.fill(255);
    p.stroke(210, 225, 240);
    p.strokeWeight(2);
    p.ellipse(x, y - 30, 90, 80);
    p.ellipse(x, y - 85, 66, 60);
    p.ellipse(x, y - 130, 48, 44);
    p.noStroke();

    // Botones
    p.fill(40);
    p.ellipse(x, y - 95, 7, 7);
    p.ellipse(x, y - 78, 7, 7);
    p.ellipse(x, y - 40, 7, 7);

    // Ojos y nariz de zanahoria
    p.ellipse(x - 8, y - 136, 6, 6);
    p.ellipse(x + 8, y - 136, 6, 6);
    p.fill(255, 140, 0);
    p.triangle(x, y - 130, x, y - 124, x + 20, y - 127);

    // Bufanda
    p.fill(220, 40, 40);
    p.rect(x - 26, y - 114, 52, 9, 4);
    p.rect(x + 8, y - 110, 10, 26, 3);

    // Sombrero
    p.fill(25);
    p.rect(x - 24, y - 154, 48, 6);
    p.rect(x - 15, y - 180, 30, 28);
  }

  p.mouseClicked = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      tamanoSol = 30;
    }
  };
};
