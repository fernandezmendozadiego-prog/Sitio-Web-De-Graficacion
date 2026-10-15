// ===== 6. EL SOL QUE EXPLOTA =====
// Basado en el código de Khan Academy: la variable sunSize crece 1 en cada cuadro.
// Mejoras: cielo en degradado que pasa del amanecer al día, resplandor y rayos
// que giran, nubes y pájaros, paisaje con casa y árboles, y una "explosión"
// (destello blanco) cuando el sol llena la pantalla; después vuelve a empezar.

window.dibujos = window.dibujos || {};

window.dibujos.solExplota = function (p) {
  // the starting size for the sun
  let sunSize = 30;

  let destello = 0;     // brillo del destello de la explosión (0 = sin destello)
  let nubes = [];
  let pajaros = [];

  p.setup = function () {
    p.createCanvas(400, 400);
    for (let i = 0; i < 3; i++) {
      nubes.push({ x: p.random(400), y: p.random(40, 160), v: p.random(0.2, 0.5) });
    }
    for (let i = 0; i < 4; i++) {
      pajaros.push({ x: p.random(-200, 400), y: p.random(60, 200), v: p.random(0.8, 1.5) });
    }
  };

  p.draw = function () {
    // Cielo en degradado: empieza naranja (amanecer) y se vuelve azul conforme crece el sol
    let dia = p.constrain(p.map(sunSize, 30, 250, 0, 1), 0, 1);
    let arriba = p.lerpColor(p.color(255, 140, 90), p.color(82, 222, 240), dia);
    let horizonte = p.lerpColor(p.color(255, 210, 130), p.color(190, 245, 255), dia);
    for (let y = 0; y < 300; y++) {
      p.stroke(p.lerpColor(arriba, horizonte, y / 300));
      p.line(0, y, 400, y);
    }
    p.noStroke();

    // Resplandor alrededor del sol
    for (let i = 3; i >= 1; i--) {
      p.fill(255, 220, 80, 35);
      p.ellipse(200, 298, sunSize * (1 + i * 0.25), sunSize * (1 + i * 0.25));
    }

    // Rayos que giran
    p.push();
    p.translate(200, 298);
    p.rotate(p.frameCount * 0.01);
    p.stroke(255, 210, 60, 200);
    p.strokeWeight(4);
    for (let i = 0; i < 16; i++) {
      p.rotate(p.TWO_PI / 16);
      p.line(sunSize * 0.6, 0, sunSize * 0.6 + 18, 0);
    }
    p.pop();
    p.noStroke();

    // The sun, a little circle on the horizon
    p.fill(255, 204, 0);
    p.ellipse(200, 298, sunSize, sunSize);
    p.fill(255, 232, 110);
    p.ellipse(200, 298, sunSize * 0.7, sunSize * 0.7);

    // Nubes que avanzan despacio
    for (let n of nubes) {
      p.fill(255, 255, 255, 220);
      p.ellipse(n.x, n.y, 70, 34);
      p.ellipse(n.x + 28, n.y + 4, 50, 26);
      p.ellipse(n.x - 28, n.y + 4, 50, 26);
      n.x += n.v;
      if (n.x > 450) n.x = -50;
    }

    // Pájaros (dos arcos que aletean)
    p.noFill();
    p.stroke(60, 60, 80);
    p.strokeWeight(2);
    for (let b of pajaros) {
      let ala = p.sin(p.frameCount * 0.2 + b.x) * 4;
      p.arc(b.x - 6, b.y + ala, 12, 10, p.PI, p.TWO_PI);
      p.arc(b.x + 6, b.y + ala, 12, 10, p.PI, p.TWO_PI);
      b.x += b.v;
      if (b.x > 420) {
        b.x = -20;
        b.y = p.random(60, 200);
      }
    }
    p.noStroke();

    // The land, blocking half of the sun
    p.fill(76, 168, 67);
    p.rect(0, 300, 400, 100);
    p.fill(66, 150, 58);
    p.rect(0, 340, 400, 60);
    p.fill(58, 135, 52);
    p.rect(0, 375, 400, 25);

    // Casa
    p.fill(240, 230, 210);
    p.rect(40, 270, 60, 45);
    p.fill(190, 70, 60);
    p.triangle(32, 272, 70, 240, 108, 272);
    p.fill(120, 80, 50);
    p.rect(62, 290, 16, 25);
    p.fill(150, 210, 255);
    p.rect(46, 280, 12, 12);
    p.rect(84, 280, 12, 12);

    // Árboles
    dibujarArbol(320, 300);
    dibujarArbol(360, 310);

    // Flores
    for (let i = 0; i < 12; i++) {
      p.fill(i % 2 === 0 ? p.color(255, 240, 120) : p.color(255, 150, 190));
      p.ellipse(20 + i * 33, 330 + (i % 3) * 15, 6, 6);
    }

    sunSize = sunSize + 1;

    // ¡Explosión! Cuando el sol llena la pantalla, destello blanco y vuelve a empezar
    if (sunSize > 560) {
      destello = 255;
      sunSize = 30;
    }
    if (destello > 0) {
      p.fill(255, 255, 255, destello);
      p.rect(0, 0, 400, 400);
      destello -= 6;
    }

    p.fill(255);
    p.textSize(13);
    p.textAlign(p.CENTER);
    p.text("Haz clic para reiniciar", 200, 392);
  };

  function dibujarArbol(x, y) {
    p.fill(110, 70, 40);
    p.rect(x - 5, y - 10, 10, 25);
    p.fill(40, 120, 50);
    p.ellipse(x, y - 25, 40, 40);
    p.fill(55, 145, 60);
    p.ellipse(x - 6, y - 30, 22, 22);
  }

  p.mouseClicked = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      sunSize = 30;
      destello = 0;
    }
  };
};
