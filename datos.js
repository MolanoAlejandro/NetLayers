/**
 * datos.js — Capa de Datos
 * =========================================================
 * Expone window.Datos con toda la información estática del
 * dominio: capas OSI, capas TCP/IP, tabla comparativa y
 * preguntas del quiz.
 *
 * REGLAS DE ESTA CAPA:
 *  ✅ Solo define y exporta datos como constantes.
 *  ❌ No contiene cálculos ni lógica de dominio.
 *  ❌ No accede al DOM (document, alert, etc.).
 * =========================================================
 */

window.Datos = {

  /* ──────────────────────────────────────────────────────
     MODELO OSI — 7 capas (ordenadas de 7 a 1)
  ────────────────────────────────────────────────────── */
  capasOSI: [
    {
      numero: 7,
      nombre: "Aplicación",
      nombreEn: "Application Layer",
      pdu: "Datos",
      color: "#f472b6",
      funcion: "Es la capa más cercana al usuario final. Proporciona servicios de red directamente a las aplicaciones (correo electrónico, navegación web, transferencia de archivos). Define los protocolos que usan los programas para comunicarse entre sí a través de la red.",
      protocolos: ["HTTP", "HTTPS", "FTP", "SMTP", "POP3", "IMAP", "DNS", "DHCP", "SNMP", "SSH", "Telnet"],
      ejemplos: [
        "Un navegador web solicita una página usando HTTP/HTTPS.",
        "Un cliente de correo descarga mensajes mediante POP3 o IMAP.",
        "El sistema operativo consulta un servidor DNS para resolver un nombre de dominio.",
        "Una aplicación de transferencia de archivos usa FTP para subir/descargar ficheros."
      ]
    },
    {
      numero: 6,
      nombre: "Presentación",
      nombreEn: "Presentation Layer",
      pdu: "Datos",
      color: "#a78bfa",
      funcion: "Actúa como el traductor de la red. Se encarga de la codificación, compresión y cifrado de los datos. Asegura que la información enviada por la capa de Aplicación de un sistema pueda ser leída por la capa de Aplicación de otro sistema con diferente formato.",
      protocolos: ["SSL", "TLS", "JPEG", "MPEG", "ASCII", "UTF-8", "XDR", "ASN.1"],
      ejemplos: [
        "Cifrado TLS/SSL para sesiones HTTPS seguras.",
        "Compresión de imágenes en formato JPEG o PNG antes de transmitirlas.",
        "Conversión entre distintas codificaciones de caracteres (ASCII ↔ EBCDIC).",
        "Serialización de objetos en formato JSON o XML para intercambio de datos."
      ]
    },
    {
      numero: 5,
      nombre: "Sesión",
      nombreEn: "Session Layer",
      pdu: "Datos",
      color: "#818cf8",
      funcion: "Gestiona el establecimiento, mantenimiento y terminación de sesiones de comunicación entre dos dispositivos. También se encarga de la sincronización del diálogo y de la recuperación ante interrupciones mediante el uso de puntos de control (checkpoints).",
      protocolos: ["NetBIOS", "RPC", "PPTP", "SIP", "H.323", "SAP", "NFS"],
      ejemplos: [
        "Una videollamada por SIP que establece, mantiene y cierra la sesión de audio/video.",
        "RPC (Remote Procedure Call) que permite ejecutar procedimientos en servidores remotos.",
        "Un proceso de autenticación que verifica credenciales antes de abrir una sesión.",
        "Recuperación de transferencias de archivos interrumpidas usando checkpoints."
      ]
    },
    {
      numero: 4,
      nombre: "Transporte",
      nombreEn: "Transport Layer",
      pdu: "Segmento / Datagrama",
      color: "#4f8ef7",
      funcion: "Garantiza la entrega confiable y ordenada de datos de extremo a extremo. Segmenta los datos de la capa superior, controla el flujo de transmisión y gestiona el control de errores. Define si la comunicación será orientada a conexión (TCP) o sin conexión (UDP).",
      protocolos: ["TCP", "UDP", "SCTP", "DCCP", "SPX"],
      ejemplos: [
        "TCP divide un archivo grande en segmentos numerados y garantiza su entrega ordenada.",
        "UDP transmite paquetes de video en streaming sin garantía de entrega para maximizar velocidad.",
        "El apretón de manos de tres vías (three-way handshake) de TCP establece una conexión fiable.",
        "El control de congestión de TCP reduce la velocidad cuando detecta pérdida de paquetes."
      ]
    },
    {
      numero: 3,
      nombre: "Red",
      nombreEn: "Network Layer",
      pdu: "Paquete",
      color: "#29d9c2",
      funcion: "Determina la ruta lógica (enrutamiento) que deben seguir los paquetes desde el origen hasta el destino a través de múltiples redes. Gestiona el direccionamiento lógico (IP) y la selección de la mejor ruta mediante protocolos de enrutamiento.",
      protocolos: ["IP (IPv4/IPv6)", "ICMP", "OSPF", "BGP", "RIP", "ARP", "NAT", "EIGRP"],
      ejemplos: [
        "Un router decide por cuál interfaz reenviar un paquete IP según su tabla de enrutamiento.",
        "OSPF calcula el camino más corto entre routers en una red empresarial.",
        "ICMP genera el mensaje 'host no alcanzable' cuando un destino no es accesible.",
        "NAT traduce direcciones IP privadas a una dirección pública para acceder a Internet."
      ]
    },
    {
      numero: 2,
      nombre: "Enlace de Datos",
      nombreEn: "Data Link Layer",
      pdu: "Trama (Frame)",
      color: "#4ade80",
      funcion: "Proporciona transmisión confiable de datos entre dos nodos adyacentes de la misma red. Se encarga del direccionamiento físico (dirección MAC), la detección y corrección de errores de la capa física, y el control de acceso al medio (MAC). Se divide en dos subcapas: LLC y MAC.",
      protocolos: ["Ethernet", "Wi-Fi (802.11)", "PPP", "HDLC", "Frame Relay", "ARP", "STP", "VLAN"],
      ejemplos: [
        "Un switch Ethernet reenvía tramas usando la tabla de direcciones MAC.",
        "El protocolo 802.11 gestiona el acceso inalámbrico al medio (CSMA/CA).",
        "PPP establece comunicación punto a punto con autenticación (CHAP/PAP).",
        "STP (Spanning Tree Protocol) previene bucles en redes Ethernet con switches redundantes."
      ]
    },
    {
      numero: 1,
      nombre: "Física",
      nombreEn: "Physical Layer",
      pdu: "Bit",
      color: "#fbbf24",
      funcion: "Define las características eléctricas, mecánicas y funcionales del medio de transmisión. Convierte los datos binarios (bits) en señales eléctricas, ópticas o de radio para su transmisión por el medio físico. No interpreta los datos, solo los transmite.",
      protocolos: ["RS-232", "USB", "DSL", "SONET/SDH", "802.3 (Ethernet físico)", "Bluetooth (PHY)", "Fibra óptica"],
      ejemplos: [
        "Un cable UTP Cat 6 transmite señales eléctricas que representan bits.",
        "La fibra óptica convierte señales eléctricas en pulsos de luz para transmisión.",
        "Un hub repite señales eléctricas en todos sus puertos sin interpretarlas.",
        "El estándar 10BASE-T define voltajes, impedancias y tasas de transmisión del cable Ethernet."
      ]
    }
  ],

  /* ──────────────────────────────────────────────────────
     MODELO TCP/IP — 4 capas
  ────────────────────────────────────────────────────── */
  capasTCPIP: [
    {
      numero: 4,
      nombre: "Aplicación",
      nombreEn: "Application Layer",
      pdu: "Datos",
      color: "#f472b6",
      funcion: "Combina las funciones de las capas de Aplicación, Presentación y Sesión del modelo OSI. Proporciona servicios directamente a las aplicaciones del usuario, incluyendo protocolos para comunicaciones, transferencia de datos, resolución de nombres y administración de red.",
      protocolos: ["HTTP/HTTPS", "FTP", "SMTP", "DNS", "DHCP", "SSH", "SNMP", "Telnet", "SIP"],
      ejemplos: [
        "El navegador usa HTTP para solicitar y mostrar páginas web.",
        "El servidor de correo usa SMTP para enviar mensajes entre servidores.",
        "SSH permite administración remota segura de servidores.",
        "DHCP asigna automáticamente una dirección IP al conectar un dispositivo."
      ]
    },
    {
      numero: 3,
      nombre: "Transporte",
      nombreEn: "Transport Layer",
      pdu: "Segmento / Datagrama",
      color: "#4f8ef7",
      funcion: "Equivale a la capa de Transporte del modelo OSI. Provee comunicación de extremo a extremo entre procesos de aplicación. TCP ofrece entrega confiable y orientada a conexión; UDP provee entrega rápida sin garantías, ideal para aplicaciones en tiempo real.",
      protocolos: ["TCP", "UDP", "SCTP"],
      ejemplos: [
        "TCP garantiza la entrega ordenada de datos para descargar un archivo.",
        "UDP transmite video en tiempo real (streaming) priorizando velocidad sobre precisión.",
        "Un servidor web mantiene múltiples conexiones TCP simultáneas en el puerto 443.",
        "El DNS usa UDP para consultas rápidas de resolución de nombres."
      ]
    },
    {
      numero: 2,
      nombre: "Internet",
      nombreEn: "Internet Layer",
      pdu: "Paquete",
      color: "#29d9c2",
      funcion: "Equivale a la capa de Red del modelo OSI. Es responsable del enrutamiento de paquetes de datos a través de múltiples redes para llegar al destino correcto. El protocolo IP es el pilar fundamental de esta capa.",
      protocolos: ["IPv4", "IPv6", "ICMP", "ICMPv6", "OSPF", "BGP", "ARP"],
      ejemplos: [
        "El protocolo IP encapsula datos con las direcciones de origen y destino.",
        "BGP intercambia información de enrutamiento entre sistemas autónomos de Internet.",
        "ICMP genera respuestas de 'ping' para verificar conectividad entre hosts.",
        "ARP resuelve direcciones IP a direcciones MAC en la red local."
      ]
    },
    {
      numero: 1,
      nombre: "Acceso a la Red",
      nombreEn: "Network Access Layer",
      pdu: "Trama / Bit",
      color: "#fbbf24",
      funcion: "Combina las funciones de las capas Física y de Enlace de Datos del modelo OSI. Define cómo los datos se transmiten físicamente por el medio de red, incluyendo la tecnología de acceso (Ethernet, Wi-Fi), el direccionamiento MAC y la topología de red local.",
      protocolos: ["Ethernet (802.3)", "Wi-Fi (802.11)", "PPP", "ARP", "VLAN (802.1Q)", "Bluetooth"],
      ejemplos: [
        "Ethernet define el formato de trama y el acceso al medio para redes cableadas.",
        "Wi-Fi permite conexión inalámbrica usando CSMA/CA para evitar colisiones.",
        "PPP se usa para conexiones punto a punto como enlaces WAN.",
        "El switch opera en esta capa usando direcciones MAC para reenviar tramas."
      ]
    }
  ],

  /* ──────────────────────────────────────────────────────
     COMPARADOR — Mapeo OSI ↔ TCP/IP
  ────────────────────────────────────────────────────── */
  comparacion: {
    filas: [
      { osi: [7, 6, 5], tcpip: 4, osiLabels: ["Aplicación (7)", "Presentación (6)", "Sesión (5)"],   tcpLabel: "Aplicación",        colorOsi: "#f472b6", colorTcp: "#f472b6" },
      { osi: [4],        tcpip: 3, osiLabels: ["Transporte (4)"],                                     tcpLabel: "Transporte",        colorOsi: "#4f8ef7", colorTcp: "#4f8ef7" },
      { osi: [3],        tcpip: 2, osiLabels: ["Red (3)"],                                            tcpLabel: "Internet",          colorOsi: "#29d9c2", colorTcp: "#29d9c2" },
      { osi: [2, 1],     tcpip: 1, osiLabels: ["Enlace de Datos (2)", "Física (1)"],                  tcpLabel: "Acceso a la Red",   colorOsi: "#4ade80", colorTcp: "#fbbf24" }
    ],
    diferencias: [
      { criterio: "Número de capas",       osi: "7 capas bien definidas",                     tcpip: "4 capas más generales" },
      { criterio: "Propósito original",    osi: "Modelo teórico/conceptual de referencia",    tcpip: "Modelo práctico surgido de ARPANET" },
      { criterio: "Desarrollo",            osi: "Definido por ISO (organismo de estándares)",  tcpip: "Desarrollado por el Departamento de Defensa de EE.UU." },
      { criterio: "Capa de Sesión",        osi: "Capa dedicada (capa 5)",                     tcpip: "Funciones integradas en la capa de Aplicación" },
      { criterio: "Capa de Presentación",  osi: "Capa dedicada (capa 6)",                     tcpip: "Funciones integradas en la capa de Aplicación" },
      { criterio: "Orientación",           osi: "Orientado a conexión en capas inferiores",   tcpip: "Combina conexión y sin conexión según protocolo" },
      { criterio: "Uso actual",            osi: "Referencia educativa y conceptual",           tcpip: "Modelo real implementado en Internet" },
      { criterio: "Fiabilidad",            osi: "Define mecanismos en múltiples capas",       tcpip: "Delega fiabilidad principalmente a TCP" }
    ]
  },

  /* ──────────────────────────────────────────────────────
     QUIZ — 10 preguntas
  ────────────────────────────────────────────────────── */
  preguntasQuiz: [
    {
      pregunta: "¿Cuántas capas tiene el modelo OSI?",
      opciones: ["4 capas", "5 capas", "7 capas", "8 capas"],
      correcta: 2,
      explicacion: "El modelo OSI (Open Systems Interconnection) está dividido en 7 capas: Física, Enlace de Datos, Red, Transporte, Sesión, Presentación y Aplicación."
    },
    {
      pregunta: "¿Qué unidad de datos (PDU) maneja la capa de Transporte en el modelo OSI?",
      opciones: ["Trama (Frame)", "Paquete", "Segmento", "Bit"],
      correcta: 2,
      explicacion: "La capa de Transporte trabaja con Segmentos (en TCP) o Datagramas (en UDP). La trama es de la capa Enlace, el paquete de la capa Red, y el bit de la capa Física."
    },
    {
      pregunta: "¿Cuál es la función principal de la capa de Red (capa 3) del modelo OSI?",
      opciones: [
        "Detectar y corregir errores en la transmisión física",
        "Determinar la ruta lógica y el enrutamiento de paquetes",
        "Establecer y terminar sesiones de comunicación",
        "Cifrar los datos para seguridad en la transmisión"
      ],
      correcta: 1,
      explicacion: "La capa de Red es responsable del enrutamiento: determina el camino que deben seguir los paquetes desde el origen hasta el destino a través de redes interconectadas, usando protocolos como IP, OSPF y BGP."
    },
    {
      pregunta: "En el modelo TCP/IP, ¿con qué capas del modelo OSI se corresponde la capa de Aplicación?",
      opciones: [
        "Solo con la capa 7 (Aplicación)",
        "Con las capas 5, 6 y 7 (Sesión, Presentación y Aplicación)",
        "Con las capas 6 y 7 (Presentación y Aplicación)",
        "Con todas las capas superiores a la capa 4"
      ],
      correcta: 1,
      explicacion: "La capa de Aplicación del modelo TCP/IP agrupa las funciones de tres capas OSI: Sesión (5), Presentación (6) y Aplicación (7). Esto hace que TCP/IP sea un modelo más compacto con solo 4 capas."
    },
    {
      pregunta: "¿Qué protocolo de la capa de Transporte garantiza entrega ordenada y sin errores de los datos?",
      opciones: ["UDP", "IP", "TCP", "HTTP"],
      correcta: 2,
      explicacion: "TCP (Transmission Control Protocol) es un protocolo orientado a conexión que garantiza la entrega ordenada de datos mediante numeración de segmentos, acuses de recibo (ACK) y retransmisión en caso de pérdida. UDP no ofrece estas garantías."
    },
    {
      pregunta: "¿Qué dispositivo de red opera principalmente en la capa 2 (Enlace de Datos) del modelo OSI?",
      opciones: ["Hub", "Router", "Switch", "Firewall"],
      correcta: 2,
      explicacion: "El switch opera en la capa 2 del modelo OSI. Usa las direcciones MAC para decidir a qué puerto reenviar cada trama. El router opera en la capa 3 (Red), y el hub en la capa 1 (Física)."
    },
    {
      pregunta: "¿Cuál es el propósito del protocolo ARP en la capa de Red/Internet?",
      opciones: [
        "Asignar automáticamente direcciones IP a los dispositivos",
        "Resolver direcciones IP en direcciones MAC",
        "Enrutar paquetes entre redes diferentes",
        "Cifrar la comunicación entre dos equipos"
      ],
      correcta: 1,
      explicacion: "ARP (Address Resolution Protocol) traduce o resuelve direcciones IP (capa 3) a direcciones MAC (capa 2). Cuando un dispositivo conoce la IP de destino pero necesita la MAC para enviar la trama, envía un ARP request a la red."
    },
    {
      pregunta: "¿Qué capa del modelo OSI es responsable de la conversión, compresión y cifrado de los datos?",
      opciones: ["Capa de Sesión (5)", "Capa de Presentación (6)", "Capa de Aplicación (7)", "Capa de Transporte (4)"],
      correcta: 1,
      explicacion: "La capa de Presentación (capa 6) se encarga de la sintaxis y semántica de los datos: codificación de caracteres, compresión de datos y cifrado/descifrado (por ejemplo, TLS/SSL opera en esta capa conceptualmente)."
    },
    {
      pregunta: "¿Cuál de las siguientes afirmaciones sobre el modelo OSI es INCORRECTA?",
      opciones: [
        "El modelo OSI fue definido por la ISO como referencia conceptual",
        "El modelo OSI es el modelo que realmente se implementa en Internet hoy",
        "La capa Física del OSI maneja bits y señales eléctricas u ópticas",
        "El modelo OSI tiene capas de Sesión y Presentación que TCP/IP no tiene"
      ],
      correcta: 1,
      explicacion: "El modelo OSI es un modelo de referencia teórico/conceptual definido por la ISO. El modelo que realmente se implementa en Internet es TCP/IP. El modelo OSI sirve como guía educativa y para entender cómo deben funcionar los protocolos de red."
    },
    {
      pregunta: "En el modelo TCP/IP, ¿cuál capa equivale a la capa de Red del modelo OSI?",
      opciones: ["Capa de Acceso a la Red", "Capa de Transporte", "Capa de Internet", "Capa de Aplicación"],
      correcta: 2,
      explicacion: "La capa de Internet del modelo TCP/IP equivale a la capa de Red (capa 3) del modelo OSI. Ambas se encargan del enrutamiento de paquetes y del direccionamiento lógico mediante el protocolo IP."
    }
  ]

}; // fin window.Datos