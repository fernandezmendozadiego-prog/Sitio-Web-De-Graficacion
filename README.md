# Despliegue de gráficos · Graficación 5SA

Sitio web con los proyectos de dibujo realizados en Khan Academy, adaptados a código web estándar con **HTML, CSS, JavaScript y p5.js**.

🔗 **Sitio publicado:** https://TU-USUARIO.github.io/graficacion/

## Contenido

- **Menú principal** (`index.html`): vistas previas de cada dibujo y la sección teórica completa
  (etiqueta `<canvas>`, contexto de renderizado 2D y fundamentos de p5.js).
- **Dibujos interactivos**, cada uno en su propia página con botón para volver al menú:
  1. Rana
  2. Dientes de conejo
  3. ¿Qué hay de cena?
  4. Día nevado soleado
  5. Muñeco de nieve
- **Dibujos animados**:
  6. El sol que explota
  7. Nubes que se separan
  8. Estrella fugaz
- **Inspector del DOM** (`dom-inspector.html`): dibuja de forma gráfica el árbol DOM de cada
  página del sitio (de `<html>` a `<head>`, `<body>`, `<header>`, `<main>`, `<canvas>`, etc.).

## Estructura

```
├── index.html            Menú principal + teoría
├── rana.html
├── dientes-conejo.html
├── cena.html
├── dia-nevado.html
├── muneco-nieve.html
├── sol-explota.html
├── nubes-separan.html
├── estrella-fugaz.html
├── dom-inspector.html    Árbol DOM de cada página
├── css/
│   ├── styles.css        Estilos del sitio
│   └── dom-inspector.css Estilos del árbol DOM
├── img/                  Vistas previas de los dibujos
└── js/
    ├── teoria.js         Ejemplo de canvas nativo (contexto 2D)
    ├── dom-inspector.js  Lee el DOM de cada página y lo dibuja
    ├── dom-datos.js      Copia guardada del DOM (respaldo)
    └── dibujos/          Un archivo de p5.js por dibujo
```

## Tecnologías

- HTML5 y CSS3
- JavaScript
- [p5.js](https://p5js.org/) 1.9.4 (cargado desde CDN)
- GitHub Pages para el despliegue
