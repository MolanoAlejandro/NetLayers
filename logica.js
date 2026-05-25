/**
 * logica.js — Capa de Lógica
 * =========================================================
 * Expone window.Logica con todas las funciones de dominio.
 *
 * REGLAS DE ESTA CAPA:
 *  ✅ Implementa reglas del dominio (cálculos, validaciones,
 *     evaluaciones de quiz, filtros, etc.).
 *  ✅ Lee datos desde window.Datos.
 *  ❌ NO accede al DOM (document, alert, querySelector, etc.).
 *  ❌ NO modifica la interfaz de usuario directamente.
 *  ❌ NO importa ni invoca a presentacion.js.
 * =========================================================
 */

window.Logica = (function () {

  /* ─── Referencia a la capa de datos (solo lectura) ─── */
  const D = window.Datos;

  /* ================================================================
     SECCIÓN OSI
  ================================================================ */

  /**
   * Obtiene la información de una capa OSI por su número.
   * @param {number} numero  Número de capa (1–7).
   * @returns {object|null}  Objeto de capa o null si no existe.
   */
  function obtenerCapaOSI(numero) {
    if (typeof numero !== 'number' || numero < 1 || numero > 7) return null;
    return D.capasOSI.find(c => c.numero === numero) || null;
  }

  /**
   * Devuelve todas las capas OSI ordenadas de mayor a menor (7→1).
   * @returns {Array}
   */
  function obtenerTodasCapasOSI() {
    return [...D.capasOSI].sort((a, b) => b.numero - a.numero);
  }

  /* ================================================================
     SECCIÓN TCP/IP
  ================================================================ */

  /**
   * Obtiene la información de una capa TCP/IP por su número.
   * @param {number} numero  Número de capa (1–4).
   * @returns {object|null}
   */
  function obtenerCapaTCPIP(numero) {
    if (typeof numero !== 'number' || numero < 1 || numero > 4) return null;
    return D.capasTCPIP.find(c => c.numero === numero) || null;
  }

  /**
   * Devuelve todas las capas TCP/IP ordenadas de mayor a menor (4→1).
   * @returns {Array}
   */
  function obtenerTodasCapasTCPIP() {
    return [...D.capasTCPIP].sort((a, b) => b.numero - a.numero);
  }

  /* ================================================================
     SECCIÓN COMPARADOR
  ================================================================ */

  /**
   * Devuelve las filas de comparación entre OSI y TCP/IP.
   * @returns {Array}
   */
  function obtenerFilasComparacion() {
    return D.comparacion.filas;
  }

  /**
   * Devuelve la tabla de diferencias entre OSI y TCP/IP.
   * @returns {Array}
   */
  function obtenerDiferencias() {
    return D.comparacion.diferencias;
  }

  /* ================================================================
     SECCIÓN QUIZ
  ================================================================ */

  /**
   * Devuelve las preguntas del quiz en orden aleatorio.
   * Usamos Fisher-Yates shuffle para mezclar el arreglo.
   * @returns {Array}  Copia mezclada del arreglo de preguntas.
   */
  function obtenerPreguntasMezcladas() {
    const copia = D.preguntasQuiz.map((p, idx) => ({ ...p, idOriginal: idx }));
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  /**
   * Evalúa si la opción seleccionada por el usuario es correcta.
   * @param {object} pregunta  Objeto de pregunta (con propiedad `correcta`).
   * @param {number} indiceSeleccionado  Índice (0-based) de la opción elegida.
   * @returns {{ esCorrecta: boolean, indiceCorrecta: number, explicacion: string }}
   */
  function evaluarRespuesta(pregunta, indiceSeleccionado) {
    if (!pregunta || indiceSeleccionado === undefined || indiceSeleccionado === null) {
      return { esCorrecta: false, indiceCorrecta: -1, explicacion: '' };
    }
    return {
      esCorrecta:      indiceSeleccionado === pregunta.correcta,
      indiceCorrecta:  pregunta.correcta,
      explicacion:     pregunta.explicacion
    };
  }

  /**
   * Calcula el resultado final del quiz.
   * @param {number} correctas  Número de respuestas correctas.
   * @param {number} total      Total de preguntas respondidas.
   * @returns {{ puntaje: number, porcentaje: number, nivel: string, mensaje: string, color: string }}
   */
  function calcularResultadoQuiz(correctas, total) {
    if (total === 0) return { puntaje: 0, porcentaje: 0, nivel: 'Sin respuestas', mensaje: '', color: '#8b90a8' };

    const porcentaje = Math.round((correctas / total) * 100);

    let nivel, mensaje, color;
    if (porcentaje === 100) {
      nivel   = '¡Perfecto!';
      mensaje = 'Dominas completamente los modelos OSI y TCP/IP. ¡Excelente trabajo!';
      color   = '#4ade80';
    } else if (porcentaje >= 80) {
      nivel   = '¡Muy bien!';
      mensaje = 'Tienes un sólido conocimiento de los modelos de red. Revisa las preguntas fallidas.';
      color   = '#4f8ef7';
    } else if (porcentaje >= 60) {
      nivel   = 'Bien';
      mensaje = 'Vas por buen camino. Refuerza las capas y protocolos donde tuviste errores.';
      color   = '#fbbf24';
    } else if (porcentaje >= 40) {
      nivel   = 'Regular';
      mensaje = 'Necesitas repasar el tema. Revisa especialmente las funciones de cada capa.';
      color   = '#fb923c';
    } else {
      nivel   = 'Para mejorar';
      mensaje = 'Sigue estudiando. Usa el Visualizador OSI y TCP/IP para repasar antes de reintentar.';
      color   = '#f87171';
    }

    return { puntaje: correctas, porcentaje, nivel, mensaje, color };
  }

  /**
   * Genera el texto de display del puntaje (e.g. "7/10").
   * @param {number} correctas
   * @param {number} total
   * @returns {string}
   */
  function formatearPuntaje(correctas, total) {
    return `${correctas}/${total}`;
  }

  /* ================================================================
     UTILIDADES GENERALES
  ================================================================ */

  /**
   * Acorta el texto de PDU para mostrarlo como etiqueta compacta.
   * @param {string} pdu
   * @returns {string}
   */
  function abreviarPDU(pdu) {
    const mapa = {
      'Datos':                 'Datos',
      'Segmento / Datagrama':  'Seg/Dgm',
      'Paquete':               'Paquete',
      'Trama (Frame)':         'Trama',
      'Trama / Bit':           'Trama/Bit',
      'Bit':                   'Bit'
    };
    return mapa[pdu] || pdu;
  }

  /**
   * Genera un color con baja opacidad dado un color hexadecimal (#rrggbb).
   * Se usa para fondos de badges de protocolos.
   * @param {string} hex  Color hexadecimal (e.g. "#f472b6").
   * @param {number} alpha  Valor de opacidad (0–1).
   * @returns {string}  Color en formato rgba.
   */
  function hexConAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /* ── API pública ── */
  return {
    obtenerCapaOSI,
    obtenerTodasCapasOSI,
    obtenerCapaTCPIP,
    obtenerTodasCapasTCPIP,
    obtenerFilasComparacion,
    obtenerDiferencias,
    obtenerPreguntasMezcladas,
    evaluarRespuesta,
    calcularResultadoQuiz,
    formatearPuntaje,
    abreviarPDU,
    hexConAlpha
  };

})();