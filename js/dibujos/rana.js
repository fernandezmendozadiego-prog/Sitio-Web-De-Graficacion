// ===== 1. RANA =====
// La rana mira hacia el mouse y saca la lengua al mantener presionado el clic.
// Se escribe en "modo instancia" de p5.js: todas las funciones van con "p."

window.dibujos = window.dibujos || {};

window.dibujos.rana = function (p) {
  let lenguaFuera = 0;

  p.setup = function () {
    p.createCanvas(400, 400);
  };

  p.draw = function () {
    p.background(135, 206, 235);

    // Estanque y nenúfar
    p.noStroke();
    p.fill(40, 120, 180);
    p.rect(0, 280, 400, 120);
    p.fill(60, 160, 70);
    p.ellipse(200, 330, 260, 60);

    let x = 200;
    let y = 250 + p.sin(p.frameCount * 0.05) * 3;

    // Patas traseras
    p.fill(50, 150, 50);
    p.ellipse(x - 80, y + 50, 70, 40);
    p.ellipse(x + 80, y + 50, 70, 40);

    // Cuerpo y panza
    p.fill(80, 190, 80);
    p.ellipse(x, y + 20, 180, 120);
    p.fill(200, 235, 170);
    p.ellipse(x, y + 35, 110, 70);

    // Cabeza
    p.fill(80, 190, 80);
    p.ellipse(x, y - 40, 170, 110);

    // Ojos
    p.ellipse(x - 50, y - 90, 60, 60);
    p.ellipse(x + 50, y - 90, 60, 60);
    p.fill(255);
    p.ellipse(x - 50, y - 90, 44, 44);
    p.ellipse(x + 50, y - 90, 44, 44);
    dibujarPupila(x - 50, y - 90);
    dibujarPupila(x + 50, y - 90);

    // Mejillas
    p.fill(255, 150, 150, 150);
    p.ellipse(x - 60, y - 25, 25, 15);
    p.ellipse(x + 60, y - 25, 25, 15);

    // Lengua
    if (p.mouseIsPressed && dentroDelLienzo()) {
      lenguaFuera = p.min(lenguaFuera + 15, 120);
    } else {
      lenguaFuera = p.max(lenguaFuera - 15, 0);
    }
    if (lenguaFuera > 0) {
      p.stroke(230, 80, 110);
      p.strokeWeight(10);
      p.line(x, y - 15, x, y - 15 + lenguaFuera);
      p.noStroke();
      p.fill(230, 80, 110);
      p.ellipse(x, y - 15 + lenguaFuera, 22, 22);
    }

    // Boca
    p.noFill();
    p.stroke(30, 90, 30);
    p.strokeWeight(4);
    p.arc(x, y - 30, 90, 40, 0, p.PI);
    p.noStroke();

    // Mosca
    let moscaX = 200 + p.cos(p.frameCount * 0.03) * 150;
    let moscaY = 90 + p.sin(p.frameCount * 0.07) * 40;
    p.fill(30);
    p.ellipse(moscaX, moscaY, 10, 8);
    p.fill(255, 255, 255, 180);
    p.ellipse(moscaX - 5, moscaY - 5, 8, 6);
    p.ellipse(moscaX + 5, moscaY - 5, 8, 6);

    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text("Mantén presionado para sacar la lengua", 200, 385);
  };

  function dibujarPupila(ojoX, ojoY) {
    let angulo = p.atan2(p.mouseY - ojoY, p.mouseX - ojoX);
    p.fill(0);
    p.ellipse(ojoX + p.cos(angulo) * 10, ojoY + p.sin(angulo) * 10, 18, 18);
  }

  function dentroDelLienzo() {
    return p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height;
  }
};
