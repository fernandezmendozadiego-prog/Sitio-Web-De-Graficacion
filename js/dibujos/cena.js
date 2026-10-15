// ===== 3. ¿QUÉ HAY DE CENA? =====
// Un plato con comida y texto. Cada clic cambia el platillo.

window.dibujos = window.dibujos || {};

window.dibujos.cena = function (p) {
  let platillos = ["Pizza", "Tacos", "Hamburguesa", "Spaghetti"];
  let actual = 0;

  p.setup = function () {
    p.createCanvas(400, 400);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    // Mantel a cuadros con ciclos for anidados
    p.noStroke();
    for (let x = 0; x < 400; x += 40) {
      for (let y = 0; y < 400; y += 40) {
        if ((x + y) % 80 === 0) {
          p.fill(220, 60, 60);
        } else {
          p.fill(255, 240, 240);
        }
        p.rect(x, y, 40, 40);
      }
    }

    // Título
    p.fill(255);
    p.rect(60, 15, 280, 50, 12);
    p.fill(60, 30, 20);
    p.textSize(26);
    p.text("¿Qué hay de cena?", 200, 40);

    // Cubiertos
    p.fill(190);
    p.rect(40, 140, 12, 170, 6);
    p.rect(34, 130, 4, 40);
    p.rect(42, 130, 4, 40);
    p.rect(50, 130, 4, 40);
    p.rect(350, 140, 12, 170, 6);
    p.ellipse(356, 150, 22, 60);

    // Plato
    p.fill(250);
    p.ellipse(200, 225, 260, 260);
    p.fill(235);
    p.ellipse(200, 225, 200, 200);

    // Comida
    let escala = 1 + p.sin(p.frameCount * 0.08) * 0.03;
    p.push();
    p.translate(200, 225);
    p.scale(escala);
    if (actual === 0) dibujarPizza();
    if (actual === 1) dibujarTacos();
    if (actual === 2) dibujarHamburguesa();
    if (actual === 3) dibujarSpaghetti();
    p.pop();

    // Nombre del platillo
    p.fill(255);
    p.rect(90, 345, 220, 40, 12);
    p.fill(60, 30, 20);
    p.textSize(22);
    p.text("Hoy: " + platillos[actual], 200, 365);
  };

  p.mouseClicked = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      actual = (actual + 1) % platillos.length;
    }
  };

  function dibujarPizza() {
    p.fill(230, 170, 80);
    p.ellipse(0, 0, 170, 170);
    p.fill(220, 60, 40);
    p.ellipse(0, 0, 150, 150);
    p.fill(255, 220, 110);
    p.ellipse(0, 0, 135, 135);
    p.fill(180, 40, 40);
    p.ellipse(-35, -30, 25, 25);
    p.ellipse(30, -35, 25, 25);
    p.ellipse(0, 10, 25, 25);
    p.ellipse(-30, 35, 25, 25);
    p.ellipse(35, 30, 25, 25);
    p.stroke(200, 140, 60);
    p.strokeWeight(2);
    p.line(-85, 0, 85, 0);
    p.line(0, -85, 0, 85);
    p.noStroke();
  }

  function dibujarTacos() {
    for (let i = -1; i <= 1; i++) {
      p.push();
      p.translate(i * 55, 0);
      p.fill(240, 200, 110);
      p.arc(0, 20, 70, 110, p.PI, p.TWO_PI);
      p.fill(120, 70, 40);
      p.ellipse(0, 5, 55, 20);
      p.fill(80, 180, 70);
      p.ellipse(-12, -2, 18, 10);
      p.ellipse(10, -4, 18, 10);
      p.fill(240, 80, 60);
      p.ellipse(0, -6, 10, 10);
      p.pop();
    }
  }

  function dibujarHamburguesa() {
    p.fill(220, 150, 60);
    p.arc(0, -10, 150, 100, p.PI, p.TWO_PI);
    p.fill(255, 240, 200);
    p.ellipse(-30, -35, 8, 5);
    p.ellipse(10, -45, 8, 5);
    p.ellipse(35, -30, 8, 5);
    p.fill(80, 180, 70);
    p.rect(-80, -12, 160, 12, 6);
    p.fill(250, 200, 40);
    p.triangle(-75, 0, 75, 0, 0, 25);
    p.fill(110, 60, 30);
    p.rect(-75, 0, 150, 25, 10);
    p.fill(220, 150, 60);
    p.rect(-75, 25, 150, 25, 0, 0, 15, 15);
  }

  function dibujarSpaghetti() {
    p.noFill();
    p.stroke(245, 210, 120);
    p.strokeWeight(4);
    for (let i = 0; i < 12; i++) {
      p.ellipse(p.sin(i) * 25, p.cos(i * 1.3) * 20, 100 - i * 3, 70 - i * 2);
    }
    p.noStroke();
    p.fill(200, 50, 40);
    p.ellipse(0, 0, 90, 60);
    p.fill(130, 70, 40);
    p.ellipse(-20, -5, 28, 28);
    p.ellipse(18, 5, 28, 28);
    p.ellipse(0, -15, 24, 24);
    p.fill(60, 150, 60);
    p.ellipse(5, 15, 14, 8);
  }
};
