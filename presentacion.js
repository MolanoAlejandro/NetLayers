/**
 * presentacion.js — Capa de Presentación
 * =========================================================
 * Responsable de:
 *  - Renderizar los componentes de la UI en el DOM.
 *  - Capturar eventos del usuario (clicks, etc.).
 *  - Llamar a window.Logica para obtener datos procesados.
 *  - Mostrar resultados en la página.
 *
 * REGLAS DE ESTA CAPA:
 *  ✅ Lee el DOM y escucha eventos del navegador.
 *  ✅ Invoca funciones de window.Logica.
 *  ❌ NO hace cálculos de dominio directamente.
 *  ❌ NO accede a window.Datos directamente.
 *  ❌ NO es invocada por logica.js ni datos.js.
 * =========================================================
 */

(function () {
  'use strict';

  /* ================================================================
     ESTADO GLOBAL DE LA UI
  ================================================================ */
  const estado = {
    seccionActiva:    'osi',
    capasOSIrender:   false,
    capasTCPrender:   false,
    comparadorRender: false,

    // Quiz
    preguntas:        [],
    indicePregunta:   0,
    correctas:        0,
    historial:        [],   // { pregunta, seleccionada, correcta }
    quizActivo:       false
  };

  /* ================================================================
     INICIALIZACIÓN
  ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    inicializarNavegacion();
    renderizarCapasOSI();    // Precargamos la primera sección
  });

  /* ================================================================
     NAVEGACIÓN
  ================================================================ */
  function inicializarNavegacion() {
    const botones = document.querySelectorAll('.nav-btn');
    botones.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const seccion = btn.dataset.section;
        cambiarSeccion(seccion);
      });
    });
  }

  function cambiarSeccion(idSeccion) {
    // Actualizar botones activos
    document.querySelectorAll('.nav-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.section === idSeccion);
    });

    // Mostrar sección correcta
    document.querySelectorAll('.app-section').forEach(function (sec) {
      sec.classList.remove('active');
    });
    const secEl = document.getElementById('section-' + idSeccion);
    if (secEl) secEl.classList.add('active');

    estado.seccionActiva = idSeccion;

    // Renderizado diferido (solo cuando se visita por primera vez)
    if (idSeccion === 'tcpip' && !estado.capasTCPrender) {
      renderizarCapasTCPIP();
      estado.capasTCPrender = true;
    }
    if (idSeccion === 'comparador' && !estado.comparadorRender) {
      renderizarComparador();
      estado.comparadorRender = true;
    }
    if (idSeccion === 'quiz') {
      inicializarInterfazQuiz();
    }
  }

  /* ================================================================
     SECCIÓN OSI
  ================================================================ */
  function renderizarCapasOSI() {
    const stack = document.getElementById('osi-stack');
    if (!stack) return;

    const capas = window.Logica.obtenerTodasCapasOSI();
    stack.innerHTML = '';

    capas.forEach(function (capa) {
      const card = crearTarjetaCapa(capa);
      card.addEventListener('click', function () {
        seleccionarCapaOSI(capa.numero, card);
      });
      stack.appendChild(card);
    });

    estado.capasOSIrender = true;
  }

  function seleccionarCapaOSI(numero, cardEl) {
    // Quitar selección previa
    document.querySelectorAll('#osi-stack .layer-card').forEach(function (c) {
      c.classList.remove('selected');
    });
    cardEl.classList.add('selected');

    const capa = window.Logica.obtenerCapaOSI(numero);
    if (!capa) return;

    const panel = document.getElementById('osi-detail');
    panel.style.borderColor = capa.color;
    panel.innerHTML = crearHTMLDetalleCapa(capa);
  }

  /* ================================================================
     SECCIÓN TCP/IP
  ================================================================ */
  function renderizarCapasTCPIP() {
    const stack = document.getElementById('tcpip-stack');
    if (!stack) return;

    const capas = window.Logica.obtenerTodasCapasTCPIP();
    stack.innerHTML = '';

    capas.forEach(function (capa) {
      const card = crearTarjetaCapa(capa);
      card.addEventListener('click', function () {
        seleccionarCapaTCPIP(capa.numero, card);
      });
      stack.appendChild(card);
    });
  }

  function seleccionarCapaTCPIP(numero, cardEl) {
    document.querySelectorAll('#tcpip-stack .layer-card').forEach(function (c) {
      c.classList.remove('selected');
    });
    cardEl.classList.add('selected');

    const capa = window.Logica.obtenerCapaTCPIP(numero);
    if (!capa) return;

    const panel = document.getElementById('tcpip-detail');
    panel.style.borderColor = capa.color;
    panel.innerHTML = crearHTMLDetalleCapa(capa);
  }

  /* ================================================================
     CONSTRUCTORES DE HTML COMPARTIDOS (OSI + TCP/IP)
  ================================================================ */

  /**
   * Crea el elemento DOM de una tarjeta de capa.
   * @param {object} capa
   * @returns {HTMLElement}
   */
  function crearTarjetaCapa(capa) {
    const div = document.createElement('div');
    div.className = 'layer-card';
    div.style.setProperty('--layer-color', capa.color);
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', 'Capa ' + capa.numero + ': ' + capa.nombre);

    const pduAbrev = window.Logica.abreviarPDU(capa.pdu);

    div.innerHTML =
      '<span class="layer-num" style="color:' + capa.color + '; background:' + window.Logica.hexConAlpha(capa.color, 0.12) + '">' +
        'C' + capa.numero +
      '</span>' +
      '<div class="layer-info">' +
        '<div class="layer-name">' + capa.nombre + '</div>' +
        '<div class="layer-en">' + capa.nombreEn + '</div>' +
      '</div>' +
      '<span class="layer-pdu">' + pduAbrev + '</span>';

    // Soporte teclado
    div.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); div.click(); }
    });

    return div;
  }

  /**
   * Genera el HTML completo del panel de detalle para una capa.
   * @param {object} capa
   * @returns {string}
   */
  function crearHTMLDetalleCapa(capa) {
    const bgAlpha  = window.Logica.hexConAlpha(capa.color, 0.12);
    const bgAlpha2 = window.Logica.hexConAlpha(capa.color, 0.08);

    // Protocolos
    const protocolosHTML = capa.protocolos.map(function (p) {
      return '<span class="protocol-tag" style="color:' + capa.color + '; border-color:' + capa.color + '; background:' + bgAlpha2 + '">' + p + '</span>';
    }).join('');

    // Ejemplos
    const ejemplosHTML = capa.ejemplos.map(function (ej) {
      return '<div class="example-item">' +
        '<span class="example-dot" style="background:' + capa.color + '"></span>' +
        '<span>' + ej + '</span>' +
      '</div>';
    }).join('');

    return '<div class="detail-content">' +
      '<div class="detail-header">' +
        '<div class="detail-num" style="color:' + capa.color + '">' + capa.numero + '</div>' +
        '<div class="detail-title-group">' +
          '<div class="detail-layer-name">' + capa.nombre + '</div>' +
          '<div class="detail-layer-en">' + capa.nombreEn + '</div>' +
        '</div>' +
        '<span class="detail-pdu-badge" style="color:' + capa.color + '; background:' + bgAlpha + '; border:1px solid ' + capa.color + '">' + window.Logica.abreviarPDU(capa.pdu) + '</span>' +
      '</div>' +

      '<p class="detail-section-label">Función principal</p>' +
      '<div class="detail-function" style="border-left-color:' + capa.color + '">' + capa.funcion + '</div>' +

      '<p class="detail-section-label">Protocolos y estándares</p>' +
      '<div class="protocols-list">' + protocolosHTML + '</div>' +

      '<p class="detail-section-label">Ejemplos del mundo real</p>' +
      '<div class="examples-list">' + ejemplosHTML + '</div>' +
    '</div>';
  }

  /* ================================================================
     SECCIÓN COMPARADOR
  ================================================================ */
  function renderizarComparador() {
    renderizarGridComparacion();
    renderizarTabladiferencias();
  }

  function renderizarGridComparacion() {
    const grid = document.getElementById('comparador-grid');
    if (!grid) return;

    const filas = window.Logica.obtenerFilasComparacion();

    // Encabezados
    grid.innerHTML =
      '<div class="comp-header osi">Modelo OSI (7 capas)</div>' +
      '<div class="comp-header mid">↔</div>' +
      '<div class="comp-header tcp">TCP/IP (4 capas)</div>';

    filas.forEach(function (fila) {
      // Celda OSI
      const osiCell = document.createElement('div');
      osiCell.className = 'comp-cell';
      const osiHTML = fila.osiLabels.map(function (label) {
        return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">' +
          '<span class="comp-dot" style="background:' + fila.colorOsi + '"></span>' +
          '<span style="color:#e8eaf0;font-size:13px">' + label + '</span>' +
        '</div>';
      }).join('');
      osiCell.innerHTML = osiHTML;

      // Celda central (conector)
      const midCell = document.createElement('div');
      midCell.className = 'comp-cell mid';
      midCell.innerHTML = '<span class="comp-connector">↔</span>';

      // Celda TCP/IP
      const tcpCell = document.createElement('div');
      tcpCell.className = 'comp-cell';
      tcpCell.innerHTML =
        '<span class="comp-dot" style="background:' + fila.colorTcp + '"></span>' +
        '<span style="color:#e8eaf0;font-size:13px">' + fila.tcpLabel + '</span>';

      grid.appendChild(osiCell);
      grid.appendChild(midCell);
      grid.appendChild(tcpCell);
    });
  }

  function renderizarTabladiferencias() {
    const panel = document.getElementById('diferencias-panel');
    if (!panel) return;

    const diferencias = window.Logica.obtenerDiferencias();

    let html = '<h3>Diferencias Clave: OSI vs TCP/IP</h3>' +
      '<table class="dif-table">' +
        '<thead><tr>' +
          '<th>Criterio</th><th>OSI</th><th>TCP/IP</th>' +
        '</tr></thead><tbody>';

    diferencias.forEach(function (d) {
      html += '<tr>' +
        '<td>' + d.criterio + '</td>' +
        '<td>' + d.osi + '</td>' +
        '<td>' + d.tcpip + '</td>' +
      '</tr>';
    });

    html += '</tbody></table>';
    panel.innerHTML = html;
  }

  /* ================================================================
     SECCIÓN QUIZ
  ================================================================ */
  function inicializarInterfazQuiz() {
    const btnIniciar = document.getElementById('btn-iniciar-quiz');
    if (btnIniciar && !btnIniciar._listenerAsignado) {
      btnIniciar.addEventListener('click', iniciarQuiz);
      btnIniciar._listenerAsignado = true;
    }

    const btnReinicio = document.getElementById('btn-reiniciar-quiz');
    if (btnReinicio && !btnReinicio._listenerAsignado) {
      btnReinicio.addEventListener('click', reiniciarQuiz);
      btnReinicio._listenerAsignado = true;
    }
  }

  function iniciarQuiz() {
    estado.preguntas      = window.Logica.obtenerPreguntasMezcladas();
    estado.indicePregunta = 0;
    estado.correctas      = 0;
    estado.historial      = [];
    estado.quizActivo     = true;

    mostrarVista('quiz-inicio',    false);
    mostrarVista('quiz-pregunta',  true);
    mostrarVista('quiz-resultado', false);

    mostrarPregunta();
  }

  function reiniciarQuiz() {
    mostrarVista('quiz-resultado', false);
    mostrarVista('quiz-inicio',    true);
  }

  function mostrarPregunta() {
    const p       = estado.preguntas[estado.indicePregunta];
    const total   = estado.preguntas.length;
    const actual  = estado.indicePregunta + 1;

    // Progreso
    const fill = document.getElementById('quiz-progress-fill');
    if (fill) fill.style.width = ((actual - 1) / total * 100) + '%';

    const counter = document.getElementById('quiz-counter');
    if (counter) counter.textContent = 'Pregunta ' + actual + ' de ' + total;

    // Texto de la pregunta
    const qText = document.getElementById('quiz-question-text');
    if (qText) qText.textContent = p.pregunta;

    // Opciones
    const optContainer = document.getElementById('quiz-options');
    if (!optContainer) return;
    optContainer.innerHTML = '';

    const letras = ['A', 'B', 'C', 'D'];
    p.opciones.forEach(function (opcion, idx) {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.setAttribute('type', 'button');
      btn.innerHTML =
        '<span class="option-letter">' + letras[idx] + '</span>' +
        '<span>' + opcion + '</span>';
      btn.addEventListener('click', function () {
        procesarRespuesta(idx);
      });
      optContainer.appendChild(btn);
    });

    // Ocultar feedback y botón siguiente
    ocultarFeedback();
    mostrarVista('btn-siguiente', false);
  }

  function procesarRespuesta(indiceSeleccionado) {
    if (!estado.quizActivo) return;

    const p          = estado.preguntas[estado.indicePregunta];
    const resultado  = window.Logica.evaluarRespuesta(p, indiceSeleccionado);

    // Deshabilitar todas las opciones
    const opciones = document.querySelectorAll('.quiz-option');
    opciones.forEach(function (btn, idx) {
      btn.disabled = true;
      if (idx === resultado.indiceCorrecta) {
        btn.classList.add('correct');
      }
      if (idx === indiceSeleccionado && !resultado.esCorrecta) {
        btn.classList.add('wrong');
      }
    });

    // Contar correctas
    if (resultado.esCorrecta) estado.correctas++;

    // Guardar historial
    estado.historial.push({
      pregunta:     p.pregunta,
      seleccionada: indiceSeleccionado,
      correcta:     resultado.indiceCorrecta,
      esCorrecta:   resultado.esCorrecta
    });

    // Mostrar feedback
    mostrarFeedback(resultado);

    // Botón siguiente / finalizar
    const btnSig = document.getElementById('btn-siguiente');
    if (btnSig) {
      btnSig.classList.remove('hidden');
      btnSig.textContent = (estado.indicePregunta + 1 < estado.preguntas.length)
        ? 'Siguiente →'
        : 'Ver Resultado';
      // Evitar listener duplicado
      const nuevoBtn = btnSig.cloneNode(true);
      btnSig.parentNode.replaceChild(nuevoBtn, btnSig);
      nuevoBtn.classList.remove('hidden');
      nuevoBtn.addEventListener('click', avanzarPregunta);
    }
  }

  function mostrarFeedback(resultado) {
    const fb = document.getElementById('quiz-feedback');
    if (!fb) return;
    fb.classList.remove('hidden', 'correct-fb', 'wrong-fb');

    if (resultado.esCorrecta) {
      fb.className  = 'quiz-feedback correct-fb';
      fb.textContent = '✓ ¡Correcto! ' + resultado.explicacion;
    } else {
      fb.className  = 'quiz-feedback wrong-fb';
      fb.textContent = '✗ Incorrecto. ' + resultado.explicacion;
    }
  }

  function ocultarFeedback() {
    const fb = document.getElementById('quiz-feedback');
    if (fb) {
      fb.classList.add('hidden');
      fb.textContent = '';
    }
  }

  function avanzarPregunta() {
    estado.indicePregunta++;

    if (estado.indicePregunta >= estado.preguntas.length) {
      mostrarResultadoFinal();
    } else {
      mostrarPregunta();
    }
  }

  function mostrarResultadoFinal() {
    estado.quizActivo = false;

    const total     = estado.preguntas.length;
    const resultado = window.Logica.calcularResultadoQuiz(estado.correctas, total);
    const puntaje   = window.Logica.formatearPuntaje(estado.correctas, total);

    // Score display
    const scoreEl = document.getElementById('result-score-display');
    if (scoreEl) scoreEl.textContent = puntaje;

    const msgEl = document.getElementById('result-msg');
    if (msgEl) msgEl.innerHTML =
      '<strong style="color:' + resultado.color + '">' + resultado.nivel + '</strong>' +
      ' — ' + resultado.porcentaje + '% · ' + resultado.mensaje;

    // Breakdown de respuestas
    const bdEl = document.getElementById('result-breakdown');
    if (bdEl) {
      bdEl.innerHTML = '';
      estado.historial.forEach(function (item, idx) {
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML =
          '<span class="breakdown-icon">' + (item.esCorrecta ? '✅' : '❌') + '</span>' +
          '<span style="font-size:12px;color:' + (item.esCorrecta ? '#4ade80' : '#f87171') + '">' +
            'P' + (idx + 1) + ': ' + item.pregunta.substring(0, 60) + (item.pregunta.length > 60 ? '…' : '') +
          '</span>';
        bdEl.appendChild(div);
      });
    }

    // Actualizar barra al 100%
    const fill = document.getElementById('quiz-progress-fill');
    if (fill) fill.style.width = '100%';

    mostrarVista('quiz-pregunta',  false);
    mostrarVista('quiz-resultado', true);
  }

  /* ================================================================
     UTILIDADES DE PRESENTACIÓN
  ================================================================ */

  /**
   * Muestra u oculta un elemento por su ID.
   * @param {string} id
   * @param {boolean} visible
   */
  function mostrarVista(id, visible) {
    const el = document.getElementById(id);
    if (!el) return;
    if (visible) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  }

})();