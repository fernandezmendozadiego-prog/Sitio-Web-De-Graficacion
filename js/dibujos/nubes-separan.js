// ===== 7. NUBES QUE SE SEPARAN =====
// Basado en el código de Khan Academy: leftX baja, rightX sube y sunRadius crece.
// Mejoras: cielo en degradado, sol con cara, rayos y resplandor, nubes con sombra,
// un arcoíris que aparece conforme las nubes se separan, colinas y pájaros.
// Cuando las nubes salen de la pantalla, la animación vuelve a empezar.

window.dibujos = window.dibujos || {};

window.dibujos.nubes = function (p) {
  let leftX = 150;
  let rightX = 250;
  let sunRadius = 100;

  const coloresArcoiris = [
    [255, 80, 80], [255, 160, 60], [255, 230, 80],
    [100, 210, 100], [80, 160, 255], [150, 100, 220]
  ];

  p.setup = function () {
    p.createCanvas(400, 400);
  };

  p.draw = function () {
    // Cielo en degradado
    for (let y = 0; y < 400; y++) {
      p.stroke(p.lerpColor(p.color(110, 190, 255), p.color(200, 242, 255), y / 400));
      p.line(0, y, 400, y);
    }

    // Arcoíris: se hace más visible mientras más separadas están las nubes
    let separacion = rightX - leftX;
    let opacidad = p.constrain(p.map(separacion, 100, 300, 0, 170), 0, 170);
    p.noFill();
    p.strokeWeight(9);
    for (let i = 0; i < coloresArcoiris.length; i++) {
      let c = coloresArcoiris[i];
      p.stroke(c[0], c[1], c[2], opacidad);
      p.arc(200, 360, 380 - i * 18, 380 - i * 18, p.PI, p.TWO_PI);
    }
    p.noStroke();

    // Resplandor y rayos del sol
    p.fill(255, 200, 60, 50);
    p.ellipse(200, 100, sunRadius * 1.4, sunRadius * 1.4);
    p.push();
    p.translate(200, 100);
    p.rotate(-p.frameCount * 0.008);
    p.stroke(255, 190, 40, 180);
    p.strokeWeight(5);
    for (let i = 0; i < 12; i++) {
      p.rotate(p.TWO_PI / 12);
      p.line(sunRadius * 0.55, 0, sunRadius * 0.55 + 20, 0);
    }
    p.pop();
    p.noStroke();

    // Sol
    p.fill(255, 170, 0);
    p.ellipse(200, 100, sunRadius, sunRadius);

    // Cara del sol (crece con él)
    // La cara crece con el sol, pero con un tamaño máximo para que no se deforme
    let s = p.min(sunRadius / 100, 2.2);
    p.fill(120, 60, 0);
    p.ellipse(200 - 15 * s, 92 - 2 * s, 8 * s, 10 * s);
    p.ellipse(200 + 15 * s, 92 - 2 * s, 8 * s, 10 * s);
    p.fill(255, 120, 80, 150);
    p.ellipse(200 - 26 * s, 106, 12 * s, 7 * s);
    p.ellipse(200 + 26 * s, 106, 12 * s, 7 * s);
    p.noFill();
    p.stroke(120, 60, 0);
    p.strokeWeight(3 * s);
    p.arc(200, 104, 26 * s, 18 * s, 0, p.PI);
    p.noStroke();

    // Colinas
    p.fill(120, 200, 110);
    p.ellipse(90, 420, 360, 160);
    p.fill(95, 180, 90);
    p.ellipse(330, 430, 380, 170);

    // clouds: primero la sombra, luego la nube blanca
    p.fill(205, 220, 235);
    p.ellipse(leftX, 156, 126, 97);
    p.ellipse(leftX + 62, 156, 70, 60);
    p.ellipse(leftX - 62, 156, 70, 60);
    p.ellipse(rightX, 106, 126, 97);
    p.ellipse(rightX + 62, 106, 70, 60);
    p.ellipse(rightX - 62, 106, 70, 60);

    p.fill(255, 255, 255);
    // left cloud
    p.ellipse(leftX, 150, 126, 97);
    p.ellipse(leftX + 62, 150, 70, 60);
    p.ellipse(leftX - 62, 150, 70, 60);

    // right cloud
    p.ellipse(rightX, 100, 126, 97);
    p.ellipse(rightX + 62, 100, 70, 60);
    p.ellipse(rightX - 62, 100, 70, 60);

    // Pájaros
    p.noFill();
    p.stroke(60, 60, 90);
    p.strokeWeight(2);
    for (let i = 0; i < 3; i++) {
      let bx = (p.frameCount * (0.8 + i * 0.3) + i * 140) % 460 - 30;
      let by = 220 + i * 25 + p.sin(p.frameCount * 0.05 + i) * 6;
      let ala = p.sin(p.frameCount * 0.25 + i) * 3;
      p.arc(bx - 6, by + ala, 12, 10, p.PI, p.TWO_PI);
      p.arc(bx + 6, by + ala, 12, 10, p.PI, p.TWO_PI);
    }
    p.noStroke();

    leftX -= 1;
    rightX += 1;
    sunRadius += 2;

    // Cuando las nubes salen de la pantalla, vuelve a empezar
    if (leftX < -100) reiniciar();

    p.fill(30, 80, 40);
    p.textSize(13);
    p.textAlign(p.CENTER);
    p.text("Haz clic para reiniciar", 200, 390);
  };

  function reiniciar() {
    leftX = 150;
    rightX = 250;
    sunRadius = 100;
  }

  p.mouseClicked = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      reiniciar();
    }
  };
};
