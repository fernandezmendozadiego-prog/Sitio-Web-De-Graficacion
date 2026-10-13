// ===== INSPECTOR DEL ÁRBOL DOM =====
// 1. Abre cada página del sitio en un <iframe> oculto y lee su DOM real
//    (incluye el <canvas> que p5.js crea al ejecutarse).
// 2. Convierte cada elemento en un objeto { t: etiqueta, id, c: clases, h: hijos }.
// 3. Dibuja el árbol con listas <ul>/<li> anidadas; el CSS traza las líneas.
// Si el navegador no deja leer las páginas (por ejemplo, al abrir el archivo
// con doble clic), usa la copia guardada en js/dom-datos.js.

const paginas = [
  { archivo: "index.html",          nombre: "Menú principal" },
  { archivo: "rana.html",           nombre: "Rana" },
  { archivo: "dientes-conejo.html", nombre: "Dientes de conejo" },
  { archivo: "cena.html",           nombre: "¿Qué hay de cena?" },
  { archivo: "dia-nevado.html",     nombre: "Día nevado soleado" },
  { archivo: "muneco-nieve.html",   nombre: "Muñeco de nieve" },
  { archivo: "dom-inspector.html",  nombre: "Inspector DOM" }
];

const cache = {};          // árboles ya leídos
let paginaActual = null;

// ---------- 1. Leer el DOM ----------

// Convierte un elemento HTML (y sus hijos) en un objeto sencillo
function aObjeto(el) {
  const nodo = {
    t: el.tagName.toLowerCase(),
    id: el.id || "",
    c: el.getAttribute("class") || "",
    h: []
  };

  // Texto corto de títulos y enlaces, para mostrarlo al pasar el mouse
  if (/^(h[1-6]|a|button|title)$/.test(nodo.t)) {
    nodo.x = el.textContent.trim().replace(/\s+/g, " ").slice(0, 60);
  }

  // En esta misma página no recorremos el árbol dibujado (sería infinito)
  if (el.id === "arbol") {
    nodo.omitido = true;
    return nodo;
  }

  for (const hijo of el.children) {
    if (hijo.classList.contains("lector")) continue; // iframe auxiliar
    nodo.h.push(aObjeto(hijo));
  }
  return nodo;
}

// Abre la página en un iframe oculto y devuelve su árbol
function leerEnVivo(archivo) {
  return new Promise(function (resolver, rechazar) {
    const actual = location.pathname.split("/").pop() || "index.html";
    if (archivo === actual) {
      resolver(aObjeto(document.documentElement));
      return;
    }
    if (location.protocol === "file:") {
      rechazar(new Error("file"));   // el navegador bloquea leer otros archivos
      return;
    }

    const marco = document.createElement("iframe");
    marco.className = "lector";
    marco.src = archivo;

    const limite = setTimeout(function () {
      marco.remove();
      rechazar(new Error("tiempo"));
    }, 8000);

    marco.onload = function () {
      // Esperamos un poco para que p5.js cree el <canvas>
      setTimeout(function () {
        clearTimeout(limite);
        try {
          const arbol = aObjeto(marco.contentDocument.documentElement);
          marco.remove();
          resolver(arbol);
        } catch (error) {
          marco.remove();
          rechazar(error);
        }
      }, 800);
    };

    document.body.appendChild(marco);
  });
}

// ---------- 2. Clasificar etiquetas por color ----------

function categoria(t) {
  if (t === "html") return "n-raiz";
  if (["head", "meta", "title", "link", "style", "base"].includes(t)) return "n-head";
  if (t === "body") return "n-body";
  if (["header", "nav", "main", "section", "article", "aside", "footer"].includes(t)) return "n-semantica";
  if (/^h[1-6]$/.test(t)) return "n-titulo";
  if (["p", "a", "span", "strong", "em", "b", "i", "code", "pre", "ul", "ol", "li",
       "table", "thead", "tbody", "tr", "th", "td", "br"].includes(t)) return "n-texto";
  if (["canvas", "img", "svg", "input", "button", "video", "audio", "iframe"].includes(t)) return "n-media";
  return "n-otro";
}

// ---------- 3. Dibujar el árbol ----------

function contar(nodo, prof, datos) {
  datos.total++;
  datos.profundidad = Math.max(datos.profundidad, prof);
  const cat = categoria(nodo.t);
  datos.porCategoria[cat] = (datos.porCategoria[cat] || 0) + 1;
  if (nodo.t === "canvas") datos.canvas++;
  nodo.h.forEach(function (h) { contar(h, prof + 1, datos); });
  return datos;
}

function crearNodo(nodo, prof, abrirHasta) {
  const li = document.createElement("li");
  li.dataset.prof = prof;

  const caja = document.createElement("button");
  caja.type = "button";
  caja.className = "nodo " + categoria(nodo.t);

  const etiqueta = document.createElement("span");
  etiqueta.className = "etiqueta";
  etiqueta.textContent = "<" + nodo.t + ">";
  caja.appendChild(etiqueta);

  if (nodo.id) {
    const id = document.createElement("span");
    id.className = "detalle";
    id.textContent = "#" + nodo.id;
    caja.appendChild(id);
  }
  if (nodo.c) {
    const clases = document.createElement("span");
    clases.className = "detalle";
    clases.textContent = "." + nodo.c.trim().split(/\s+/).join(" .");
    caja.appendChild(clases);
  }
  if (nodo.x) caja.title = nodo.x;
  if (nodo.omitido) {
    caja.title = "Aquí se dibuja este árbol (no se recorre para no repetirlo)";
    caja.classList.add("omitido");
  }

  li.appendChild(caja);

  if (nodo.h.length > 0) {
    const mas = document.createElement("span");
    mas.className = "mas";
    mas.dataset.n = nodo.h.length;
    caja.appendChild(mas);

    const ul = document.createElement("ul");
    nodo.h.forEach(function (hijo) {
      ul.appendChild(crearNodo(hijo, prof + 1, abrirHasta));
    });
    li.appendChild(ul);

    // Párrafos, tablas y bloques de código empiezan cerrados para no saturar el dibujo
    const cerradosPorDefecto = ["p", "pre", "table", "tbody", "thead", "tr", "td", "th", "li", "ul", "ol"];
    if (prof >= abrirHasta || cerradosPorDefecto.includes(nodo.t)) li.classList.add("cerrado");
    actualizarMas(li);
  }
  return li;
}

function actualizarMas(li) {
  const mas = li.querySelector(":scope > .nodo > .mas");
  if (!mas) return;
  mas.textContent = li.classList.contains("cerrado") ? "+" + mas.dataset.n : "−";
}

function dibujar(arbol, origen) {
  const datos = contar(arbol, 0, { total: 0, profundidad: 0, canvas: 0, porCategoria: {} });

  // Páginas pequeñas se muestran completas; las grandes, hasta el 4.º nivel
  const abrirHasta = datos.total <= 45 ? 99 : 4;

  const contenedor = document.getElementById("arbol");
  contenedor.innerHTML = "";
  const ul = document.createElement("ul");
  ul.appendChild(crearNodo(arbol, 0, abrirHasta));
  contenedor.appendChild(ul);

  document.getElementById("estadisticas").innerHTML =
    dato(datos.total, "elementos") +
    dato(datos.profundidad + 1, "niveles de profundidad") +
    dato(datos.porCategoria["n-semantica"] || 0, "contenedores semánticos") +
    dato(datos.canvas, "elementos &lt;canvas&gt;");

  document.getElementById("nota").textContent = origen === "vivo"
    ? "Árbol leído en vivo desde la página, incluyendo los elementos que crea p5.js al ejecutarse (como <canvas>)."
    : "Mostrando la copia guardada del DOM (js/dom-datos.js), porque el navegador no permite leer otros archivos al abrir el sitio con doble clic. En GitHub Pages o en la vista previa de Phoenix Code se lee en vivo.";

  centrarArbol();
}

function dato(numero, texto) {
  return '<div class="dato"><strong>' + numero + "</strong><span>" + texto + "</span></div>";
}

// Desplaza el contenedor para que la raíz quede al centro
function centrarArbol() {
  const cont = document.getElementById("contenedorArbol");
  cont.scrollLeft = (cont.scrollWidth - cont.clientWidth) / 2;
}

// ---------- 4. Mostrar una página ----------

function mostrar(archivo) {
  paginaActual = archivo;
  document.querySelectorAll("#selector button").forEach(function (b) {
    const activo = b.dataset.archivo === archivo;
    b.classList.toggle("activo", activo);
    b.setAttribute("aria-selected", activo);
  });

  if (cache[archivo]) {
    dibujar(cache[archivo].arbol, cache[archivo].origen);
    return;
  }

  document.getElementById("arbol").innerHTML = '<p class="cargando">Leyendo el DOM de ' + archivo + "…</p>";
  document.getElementById("estadisticas").innerHTML = "";

  leerEnVivo(archivo)
    .then(function (arbol) {
      cache[archivo] = { arbol: arbol, origen: "vivo" };
    })
    .catch(function () {
      const guardado = window.DOM_GUARDADO && window.DOM_GUARDADO[archivo];
      if (guardado) cache[archivo] = { arbol: guardado, origen: "guardado" };
    })
    .then(function () {
      if (paginaActual !== archivo) return;   // el usuario ya eligió otra
      if (cache[archivo]) {
        dibujar(cache[archivo].arbol, cache[archivo].origen);
      } else {
        document.getElementById("arbol").innerHTML =
          '<p class="cargando">No se pudo leer ' + archivo + ".</p>";
      }
    });
}

// ---------- 5. Eventos ----------

document.addEventListener("DOMContentLoaded", function () {
  // Botones para elegir la página
  const selector = document.getElementById("selector");
  paginas.forEach(function (pag) {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.dataset.archivo = pag.archivo;
    b.innerHTML = pag.nombre + "<small>" + pag.archivo + "</small>";
    b.addEventListener("click", function () { mostrar(pag.archivo); });
    selector.appendChild(b);
  });

  // Abrir / cerrar un nodo al hacer clic
  document.getElementById("arbol").addEventListener("click", function (e) {
    const caja = e.target.closest(".nodo");
    if (!caja) return;
    const li = caja.parentElement;
    if (!li.querySelector(":scope > ul")) return;
    li.classList.toggle("cerrado");
    actualizarMas(li);
  });

  document.getElementById("btnExpandir").addEventListener("click", function () {
    document.querySelectorAll("#arbol li.cerrado").forEach(function (li) {
      li.classList.remove("cerrado");
      actualizarMas(li);
    });
    centrarArbol();
  });

  document.getElementById("btnContraer").addEventListener("click", function () {
    document.querySelectorAll("#arbol li").forEach(function (li) {
      if (li.querySelector(":scope > ul") && li.dataset.prof !== "0") {
        li.classList.add("cerrado");
        actualizarMas(li);
      }
    });
    centrarArbol();
  });

  // Cambiar entre vista de árbol (de arriba hacia abajo) y vista de lista (indentada)
  const btnArbol = document.getElementById("btnVistaArbol");
  const btnLista = document.getElementById("btnVistaLista");
  btnArbol.addEventListener("click", function () {
    document.getElementById("arbol").classList.remove("lista");
    btnArbol.classList.add("activo");
    btnLista.classList.remove("activo");
    centrarArbol();
  });
  btnLista.addEventListener("click", function () {
    document.getElementById("arbol").classList.add("lista");
    btnLista.classList.add("activo");
    btnArbol.classList.remove("activo");
  });

  mostrar("index.html");
});
