// ===== 2. DIENTES DE CONEJO =====
// Igual que en Khan Academy: el tamaño de los dientes depende de una variable,
// que aquí se controla con un deslizador (slider) de p5.js.

window.dibujos = window.dibujos || {};

window.dibujos.conejo = function (p) {
  let deslizador;

  p.setup = function () {
    p.createCanvas(400, 400);
    // createSlider(mínimo, máximo, valor inicial)
    deslizador = p.createSlider(10, 90, 40);
    deslizador.parent("controles-conejo");
    deslizador.style("width", "260px");
  };

  p.draw = function () {
    p.background(170, 220, 140);

    let largoDientes = deslizador.value();
    let cx = 200;
    let cy = 230;
    p.noStroke();

    // Orejas
    let mov = p.sin(p.frameCount * 0.05) * 5;
    p.fill(240);
    p.ellipse(cx - 55, cy - 150 + mov, 60, 170);
    p.ellipse(cx + 55, cy - 150 - mov, 60, 170);
    p.fill(255, 180, 200);
    p.ellipse(cx - 55, cy - 145 + mov, 30, 130);
    p.ellipse(cx + 55, cy - 145 - mov, 30, 130);

    // Cabeza
    p.fill(240);
    p.ellipse(cx, cy, 230, 210);

    // Ojos que parpadean
    p.fill(40);
    if (p.frameCount % 150 < 8) {
      p.rect(cx - 65, cy - 35, 40, 5);
      p.rect(cx + 25, cy - 35, 40, 5);
    } else {
      p.ellipse(cx - 45, cy - 35, 30, 36);
      p.ellipse(cx + 45, cy - 35, 30, 36);
      p.fill(255);
      p.ellipse(cx - 40, cy - 42, 10, 10);
      p.ellipse(cx + 50, cy - 42, 10, 10);
    }

    // Mejillas
    p.fill(255, 190, 200);
    p.ellipse(cx - 75, cy + 15, 35, 22);
    p.ellipse(cx + 75, cy + 15, 35, 22);

    // Dientes (dependen de la variable)
    p.fill(255);
    p.stroke(180);
    p.strokeWeight(2);
    p.rect(cx - 22, cy + 25, 21, largoDientes, 0, 0, 5, 5);
    p.rect(cx + 1, cy + 25, 21, largoDientes, 0, 0, 5, 5);
    p.noStroke();

    // Nariz y hocico
    p.fill(255, 130, 160);
    p.triangle(cx - 12, cy + 2, cx + 12, cy + 2, cx, cy + 15);
    p.stroke(120);
    p.strokeWeight(3);
    p.noFill();
    p.arc(cx - 12, cy + 22, 24, 18, 0, p.PI);
    p.arc(cx + 12, cy + 22, 24, 18, 0, p.PI);

    // Bigotes
    p.strokeWeight(2);
    p.line(cx - 40, cy + 15, cx - 100, cy + 5);
    p.line(cx - 40, cy + 22, cx - 100, cy + 28);
    p.line(cx + 40, cy + 15, cx + 100, cy + 5);
    p.line(cx + 40, cy + 22, cx + 100, cy + 28);
    p.noStroke();

    p.fill(30, 70, 30);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text("largoDientes = " + largoDientes, 200, 385);
  };
};
