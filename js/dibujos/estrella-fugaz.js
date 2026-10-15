// ===== 8. ESTRELLA FUGAZ =====
// Basado en el código de Khan Academy: dos estrellas cambian xpos/ypos y xpos2/ypos2
// en cada cuadro y cruzan el cielo en diagonal.
// Mejoras: cielo con estrellas que titilan, luna, montañas, estela brillante
// detrás de cada estrella fugaz (guardando sus posiciones anteriores en un arreglo)
// y relanzamiento automático cuando salen de la pantalla.

window.dibujos = window.dibujos || {};

window.dibujos.estrella = function (p) {
  let xpos = 0;
  let ypos = 50;

  let xpos2 = 400;
  let ypos2 = 150;

  let estela1 = [];   // posiciones anteriores de la estrella 1
  let estela2 = [];   // posiciones anteriores de la estrella 2
  let cielo = [];     // estrellas fijas del fondo

  p.setup = function () {
    p.createCanvas(400, 400);
    for (let i = 0; i < 90; i++) {
      cielo.push({
        x: p.random(400),
        y: p.random(320),
        tam: p.random(1, 3),
        fase: p.random(p.TWO_PI)
      });
    }
  };

  p.draw = function () {
    p.background(29, 40, 115);

    // Brillo más claro cerca del horizonte
    p.noStroke();
    for (let i = 0; i < 6; i++) {
      p.fill(80, 90, 180, 18);
      p.rect(0, 200 + i * 25, 400, 200);
    }

    // Estrellas del fondo que titilan
    for (let s of cielo) {
      let brillo = 150 + p.sin(p.frameCount * 0.05 + s.fase) * 100;
      p.fill(255, 255, 230, brillo);
      p.ellipse(s.x, s.y, s.tam, s.tam);
    }

    // Luna con cráteres
    p.fill(250, 245, 215, 60);
    p.ellipse(330, 70, 80, 80);
    p.fill(250, 245, 215);
    p.ellipse(330, 70, 56, 56);
    p.fill(225, 220, 190);
    p.ellipse(320, 62, 12, 12);
    p.ellipse(340, 80, 8, 8);
    p.ellipse(338, 60, 6, 6);

    xpos = xpos + 3;
    ypos = ypos + 1;

    xpos2 = xpos2 - 2;
    ypos2 = ypos2 + 2;

    // Guardar la posición para dibujar la estela (máximo 25 puntos)
    estela1.push({ x: xpos, y: ypos });
    estela2.push({ x: xpos2, y: ypos2 });
    if (estela1.length > 25) estela1.shift();
    if (estela2.length > 25) estela2.shift();

    dibujarEstela(estela1);
    dibujarEstela(estela2);

    dibujarEstrella(xpos, ypos);
    dibujarEstrella(xpos2, ypos2);

    // Montañas y pinos (silueta)
    p.fill(18, 24, 70);
    p.triangle(-40, 400, 90, 290, 220, 400);
    p.triangle(140, 400, 290, 270, 440, 400);
    p.fill(12, 16, 50);
    p.rect(0, 370, 400, 30);
    for (let i = 0; i < 9; i++) {
      let x = 15 + i * 47;
      let alto = 30 + (i % 3) * 10;
      p.triangle(x - 10, 375, x, 375 - alto, x + 10, 375);
    }

    // Cuando las dos estrellas ya salieron, se lanzan otra vez
    let fuera1 = xpos > 430 || ypos > 430;
    let fuera2 = xpos2 < -30 || ypos2 > 430;
    if (fuera1 && fuera2) reiniciar();

    p.fill(200, 210, 255);
    p.textSize(13);
    p.textAlign(p.CENTER);
    p.text("Haz clic para lanzar las estrellas", 200, 392);
  };

  // Estrella con resplandor y destellos en cruz
  function dibujarEstrella(x, y) {
    p.noStroke();
    p.fill(255, 242, 0, 50);
    p.ellipse(x, y, 30, 30);
    p.fill(255, 242, 0, 90);
    p.ellipse(x, y, 18, 18);

    p.stroke(255, 250, 200, 200);
    p.strokeWeight(1.5);
    let d = 10 + p.sin(p.frameCount * 0.3) * 3;
    p.line(x - d, y, x + d, y);
    p.line(x, y - d, x, y + d);
    p.noStroke();

    p.fill(255, 242, 0);
    p.ellipse(x, y, 10, 10);
    p.fill(255, 255, 220);
    p.ellipse(x, y, 4, 4);
  }

  // Línea que se va haciendo más delgada y transparente hacia atrás
  function dibujarEstela(puntos) {
    for (let i = 1; i < puntos.length; i++) {
      let t = i / puntos.length;           // 0 = punto más viejo, 1 = más nuevo
      p.stroke(255, 242, 150, t * 200);
      p.strokeWeight(t * 6);
      p.line(puntos[i - 1].x, puntos[i - 1].y, puntos[i].x, puntos[i].y);
    }
    p.noStroke();
  }

  function reiniciar() {
    xpos = 0;
    ypos = 50;
    xpos2 = 400;
    ypos2 = 150;
    estela1 = [];
    estela2 = [];
  }

  p.mouseClicked = function () {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      reiniciar();
    }
  };
};
