// ============================================
// DADES DELS 21 EXERCICIS AMB CONFIGURACIÓ VISUAL
// ============================================

const EXERCISES_DATA = [
  {
    id: 1,
    title: "Sistema de diamants",
    description: "Comprovar el sistema de diamants amb sortides/atac: 50/30, 70/40 i 30/20. Assegura't que les boles arriben exactament als punts calculats.",
    category: "comprovacio",
    difficulty: 2,
    completed: false,
    notes: "",
    diagram: {
      type: "sistemaDiamants",
      bolaBLanca: { x: 25, y: 70 },
      bolaGroga: { x: 75, y: 30 },
      bolaVermella: { x: 50, y: 50 },
      sortides: ["50/30", "70/40", "30/20"],
      bandes: [1, 2, 3],
      efecte: 0,
      trajectoria: [
        { x: 25, y: 70 },
        { x: 50, y: 0 },
        { x: 75, y: 70 },
        { x: 50, y: 100 },
        { x: 75, y: 30 }
      ]
    },
    visualNotes: "Observa com canvia l'angle segons el punt de sortida. Els diamants et permeten calcular matemàticament la trajectòria."
  },
  {
    id: 2,
    title: "Cinc bandes al centre",
    description: "La comprovació a cinc bandes amb la tercera bola al centre de la taula. Practica la trajectòria completa controlant la velocitat.",
    category: "comprovacio",
    difficulty: 3,
    completed: false,
    notes: "",
    diagram: {
      type: "cincBandes",
      bolaBLanca: { x: 15, y: 30 },
      bolaGroga: { x: 50, y: 50 },
      bolaVermella: { x: 85, y: 70 },
      bandes: [1, 2, 3, 4, 5],
      efecte: 1,
      trajectoria: [
        { x: 15, y: 30 },
        { x: 30, y: 0 },
        { x: 70, y: 0 },
        { x: 100, y: 40 },
        { x: 100, y: 80 },
        { x: 60, y: 100 },
        { x: 85, y: 70 }
      ],
      puntsCritics: ["racó 4a banda", "racó 5a banda"]
    },
    visualNotes: "Trajectòria llarga que requereix força controlada. Els racons són punts crítics."
  },
  {
    id: 3,
    title: "Sense efecte",
    description: "Practicar el 'sense efecte'. Colpeja la bola al centre exacte per aconseguir una trajectòria natural sense rotació lateral.",
    category: "sense_efecte",
    difficulty: 1,
    completed: false,
    notes: "",
    diagram: {
      type: "senseEfecte",
      bolaBLanca: { x: 25, y: 50 },
      bolaGroga: { x: 60, y: 30 },
      bolaVermella: { x: 75, y: 70 },
      bandes: [1, 2, 3],
      efecte: 0,
      trajectoria: [
        { x: 25, y: 50 },
        { x: 50, y: 0 },
        { x: 75, y: 50 },
        { x: 60, y: 30 }
      ]
    },
    visualNotes: "La bola segueix una trajectòria predictible i natural. Ideal per començar."
  },
  {
    id: 4,
    title: "La cabanya amb bola retrasada",
    description: "La cabanya amb la bola 1 retrasada. Exercici clàssic per treballar l'angle i el control de distància.",
    category: "altres",
    difficulty: 3,
    completed: false,
    notes: "",
    diagram: {
      type: "cabanya",
      bolaBLanca: { x: 20, y: 25 },
      bolaGroga: { x: 50, y: 75 },
      bolaVermella: { x: 80, y: 25 },
      bandes: [1, 2, 3],
      efecte: 0,
      trajectoria: [
        { x: 20, y: 25 },
        { x: 35, y: 0 },
        { x: 65, y: 100 },
        { x: 100, y: 60 },
        { x: 80, y: 25 }
      ]
    },
    visualNotes: "Posició clàssica. La bola groga retrasada fa que hagis de calcular bé l'angle."
  },
  {
    id: 5,
    title: "Mitja bola sense efecte",
    description: "Prendre just mitja bola sense efecte. Concentra't en la precisió del colp i la trajectòria natural de la bola.",
    category: "sense_efecte",
    difficulty: 2,
    completed: false,
    notes: "",
    diagram: {
      type: "mitjaBola",
      bolaBLanca: { x: 30, y: 50 },
      bolaGroga: { x: 70, y: 50 },
      bolaVermella: { x: 70, y: 20 },
      bandes: [1, 2],
      efecte: 0,
      trajectoria: [
        { x: 30, y: 50 },
        { x: 50, y: 100 },
        { x: 70, y: 50 }
      ]
    },
    visualNotes: "Contacte exacte a mitja bola. Practica la precisió del cop."
  },
  {
    id: 6,
    title: "Contra efecte bàsic",
    description: "Un contra efecte. Practica colpejar la bola aplicant rotació contrària al sentit natural del moviment.",
    category: "contra_efecte",
    difficulty: 3,
    completed: false,
    notes: "",
    diagram: {
      type: "contraEfecte",
      bolaBLanca: { x: 20, y: 50 },
      bolaGroga: { x: 60, y: 70 },
      bolaVermella: { x: 80, y: 30 },
      bandes: [1, 2, 3],
      efecte: -3,
      trajectoria: [
        { x: 20, y: 50 },
        { x: 40, y: 0 },
        { x: 70, y: 60 },
        { x: 100, y: 40 },
        { x: 80, y: 30 }
      ]
    },
    visualNotes: "L'efecte contrari fa que la bola 'obri' més després de tocar la banda."
  },
  {
    id: 7,
    title: "El renversé",
    description: "Un altre contra efecte, el renversé. Tècnica avançada de contra efecte amb trajectòria invertida.",
    category: "contra_efecte",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "renverse",
      bolaBLanca: { x: 25, y: 40 },
      bolaGroga: { x: 55, y: 80 },
      bolaVermella: { x: 75, y: 20 },
      bandes: [1, 2, 3, 4],
      efecte: -4,
      trajectoria: [
        { x: 25, y: 40 },
        { x: 50, y: 0 },
        { x: 80, y: 70 },
        { x: 100, y: 50 },
        { x: 70, y: 100 },
        { x: 75, y: 20 }
      ]
    },
    visualNotes: "Tècnica molt avançada. La bola fa un recorregut inesperat gràcies al contra efecte."
  },
  {
    id: 8,
    title: "Línia blanca comportament normal",
    description: "Sense efecte, línia blanca comportament normal. Observa com la bola segueix una trajectòria predictible.",
    category: "sense_efecte",
    difficulty: 1,
    completed: false,
    notes: "",
    diagram: {
      type: "liniaBlanca",
      bolaBLanca: { x: 20, y: 50 },
      bolaGroga: { x: 80, y: 50 },
      bolaVermella: { x: 50, y: 80 },
      bandes: [2],
      efecte: 0,
      trajectoria: [
        { x: 20, y: 50 },
        { x: 50, y: 100 },
        { x: 80, y: 50 }
      ]
    },
    visualNotes: "Trajectòria perfectament simètrica. Base per entendre altres exercicis."
  },
  {
    id: 9,
    title: "Mitja bola, sense efecte",
    description: "Mitja bola, sense efecte. Practica l'execució precisa del contacte a mitja bola.",
    category: "sense_efecte",
    difficulty: 2,
    completed: false,
    notes: "",
    diagram: {
      type: "mitjaBola2",
      bolaBLanca: { x: 35, y: 60 },
      bolaGroga: { x: 65, y: 40 },
      bolaVermella: { x: 85, y: 80 },
      bandes: [1, 2, 3],
      efecte: 0,
      trajectoria: [
        { x: 35, y: 60 },
        { x: 55, y: 0 },
        { x: 75, y: 100 },
        { x: 100, y: 70 },
        { x: 85, y: 80 }
      ]
    },
    visualNotes: "Variant de mitja bola amb més recorregut."
  },
  {
    id: 10,
    title: "Efecte i atac a la tangent",
    description: "Efecte i atac a la tangent de la bola 2. Combina rotació lateral amb un angle tangencial per aconseguir trajectòries complexes.",
    category: "altres",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "tangent",
      bolaBLanca: { x: 30, y: 30 },
      bolaGroga: { x: 70, y: 30 },
      bolaVermella: { x: 60, y: 70 },
      bandes: [1, 2, 3],
      efecte: 4,
      trajectoria: [
        { x: 30, y: 30 },
        { x: 50, y: 0 },
        { x: 90, y: 50 },
        { x: 70, y: 100 },
        { x: 60, y: 70 }
      ]
    },
    visualNotes: "L'efecte lateral combinat amb angle tangencial crea trajectòries sorprenents."
  },
  {
    id: 11,
    title: "Doblet amb efecte zero",
    description: "Doblet, efecte zero. Practica el cop doble mantenint la bola sense rotació lateral.",
    category: "sense_efecte",
    difficulty: 3,
    completed: false,
    notes: "",
    diagram: {
      type: "doblet",
      bolaBLanca: { x: 25, y: 25 },
      bolaGroga: { x: 75, y: 25 },
      bolaVermella: { x: 75, y: 75 },
      bandes: [1, 3, 2],
      efecte: 0,
      trajectoria: [
        { x: 25, y: 25 },
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 75, y: 75 }
      ]
    },
    visualNotes: "El doblet requereix càlcul precís dels angles de reflexió."
  },
  {
    id: 12,
    title: "Passabola amb efecte 4",
    description: "Passabola, prendre poca bola amb efecte 4. Tècnica de contacte mínim amb molta rotació lateral.",
    category: "altres",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "passabola",
      bolaBLanca: { x: 20, y: 60 },
      bolaGroga: { x: 50, y: 40 },
      bolaVermella: { x: 80, y: 60 },
      bandes: [1, 2],
      efecte: 4,
      trajectoria: [
        { x: 20, y: 60 },
        { x: 40, y: 0 },
        { x: 70, y: 100 },
        { x: 80, y: 60 }
      ]
    },
    visualNotes: "Contacte molt fi amb la bola 1. L'efecte és clau per completar l'exercici."
  },
  {
    id: 13,
    title: "Posició de comprovació cinc bandes",
    description: "Posició de comprovació per arribada a cinc bandes. Verifica que la trajectòria és correcta segons els càlculs.",
    category: "comprovacio",
    difficulty: 3,
    completed: false,
    notes: "",
    diagram: {
      type: "cincBandes2",
      bolaBLanca: { x: 20, y: 40 },
      bolaGroga: { x: 50, y: 60 },
      bolaVermella: { x: 80, y: 40 },
      bandes: [1, 2, 3, 4, 5],
      efecte: 1,
      trajectoria: [
        { x: 20, y: 40 },
        { x: 40, y: 0 },
        { x: 80, y: 0 },
        { x: 100, y: 30 },
        { x: 100, y: 80 },
        { x: 50, y: 100 },
        { x: 80, y: 40 }
      ]
    },
    visualNotes: "Comprovació de la correcció del càlcul a cinc bandes."
  },
  {
    id: 14,
    title: "Comprovació cinc bandes (variant)",
    description: "Igual que l'anterior però des d'una posició diferent. Repeteix la comprovació des d'un altre angle.",
    category: "comprovacio",
    difficulty: 3,
    completed: false,
    notes: "",
    diagram: {
      type: "cincBandes3",
      bolaBLanca: { x: 30, y: 30 },
      bolaGroga: { x: 60, y: 70 },
      bolaVermella: { x: 90, y: 30 },
      bandes: [1, 2, 3, 4, 5],
      efecte: 2,
      trajectoria: [
        { x: 30, y: 30 },
        { x: 50, y: 0 },
        { x: 90, y: 0 },
        { x: 100, y: 50 },
        { x: 100, y: 90 },
        { x: 40, y: 100 },
        { x: 90, y: 30 }
      ]
    },
    visualNotes: "Variant amb angle diferent. Comprova que el mètode funciona des de qualsevol posició."
  },
  {
    id: 15,
    title: "Màxim efecte vertical",
    description: "Amb màxim efecte dirigint la bola 1 vertical. Aplica el màxim d'efecte possible mantenint la direcció vertical.",
    category: "altres",
    difficulty: 5,
    completed: false,
    notes: "",
    diagram: {
      type: "maximEfecte",
      bolaBLanca: { x: 50, y: 80 },
      bolaGroga: { x: 50, y: 20 },
      bolaVermella: { x: 80, y: 50 },
      bandes: [1, 3, 2],
      efecte: 5,
      trajectoria: [
        { x: 50, y: 80 },
        { x: 50, y: 0 },
        { x: 100, y: 30 },
        { x: 70, y: 100 },
        { x: 80, y: 50 }
      ]
    },
    visualNotes: "Exercici d'alta dificultat. Requereix precisió extrema en l'aplicació de l'efecte."
  },
  {
    id: 16,
    title: "Mètode Tüzül",
    description: "Comprovar el mètode Tüzül. Sistema de diamants avançat per trajectòries complexes.",
    category: "comprovacio",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "tuzul",
      bolaBLanca: { x: 25, y: 75 },
      bolaGroga: { x: 60, y: 30 },
      bolaVermella: { x: 85, y: 65 },
      bandes: [1, 2, 3, 4],
      efecte: 1,
      trajectoria: [
        { x: 25, y: 75 },
        { x: 45, y: 0 },
        { x: 85, y: 80 },
        { x: 100, y: 60 },
        { x: 70, y: 100 },
        { x: 85, y: 65 }
      ]
    },
    visualNotes: "Sistema Tüzül: mètode matemàtic per calcular trajectòries a quatre bandes."
  },
  {
    id: 17,
    title: "Mètode DPM",
    description: "Comprovar cabanya pel mètode DPM (Diamants Paral·lels Mitjans). Sistema alternatiu per calcular trajectòries.",
    category: "comprovacio",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "dpm",
      bolaBLanca: { x: 20, y: 30 },
      bolaGroga: { x: 55, y: 75 },
      bolaVermella: { x: 80, y: 20 },
      bandes: [1, 2, 3],
      efecte: 0,
      trajectoria: [
        { x: 20, y: 30 },
        { x: 35, y: 0 },
        { x: 65, y: 100 },
        { x: 100, y: 50 },
        { x: 80, y: 20 }
      ]
    },
    visualNotes: "DPM: sistema que utilitza diamants paral·lels per calcular la sortida."
  },
  {
    id: 18,
    title: "Assajar atac",
    description: "Assajar atac. Practica diferents angles d'atac a la primera banda.",
    category: "altres",
    difficulty: 2,
    completed: false,
    notes: "",
    diagram: {
      type: "atac",
      bolaBLanca: { x: 30, y: 70 },
      bolaGroga: { x: 70, y: 40 },
      bolaVermella: { x: 60, y: 80 },
      bandes: [1, 2, 3],
      efecte: 2,
      trajectoria: [
        { x: 30, y: 70 },
        { x: 50, y: 0 },
        { x: 80, y: 80 },
        { x: 100, y: 60 },
        { x: 60, y: 80 }
      ]
    },
    visualNotes: "Practica diferents angles d'atac. Experimenta amb punts de sortida diferents."
  },
  {
    id: 19,
    title: "Bola fina",
    description: "Assajar bola fina. Contacte mínim amb la bola objectiu per aconseguir angles extrems.",
    category: "altres",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "bolaFina",
      bolaBLanca: { x: 25, y: 50 },
      bolaGroga: { x: 55, y: 35 },
      bolaVermella: { x: 75, y: 75 },
      bandes: [1, 2, 3],
      efecte: 3,
      trajectoria: [
        { x: 25, y: 50 },
        { x: 45, y: 0 },
        { x: 85, y: 80 },
        { x: 100, y: 70 },
        { x: 75, y: 75 }
      ]
    },
    visualNotes: "Contacte mínim (bola fina) permet angles impossibles amb contacte normal."
  },
  {
    id: 20,
    title: "Bola fina (variant)",
    description: "Assajar bola fina des d'una altra posició. Repeteix l'exercici anterior amb diferent col·locació.",
    category: "altres",
    difficulty: 4,
    completed: false,
    notes: "",
    diagram: {
      type: "bolaFina2",
      bolaBLanca: { x: 35, y: 40 },
      bolaGroga: { x: 60, y: 60 },
      bolaVermella: { x: 85, y: 30 },
      bandes: [1, 2, 3],
      efecte: 3,
      trajectoria: [
        { x: 35, y: 40 },
        { x: 50, y: 0 },
        { x: 90, y: 70 },
        { x: 100, y: 50 },
        { x: 85, y: 30 }
      ]
    },
    visualNotes: "Variant de bola fina. Practica la precisió del contacte mínim."
  },
  {
    id: 21,
    title: "Sortida",
    description: "Assajar la sortida. Practica diferents tipus de sortides i velocitats inicials.",
    category: "altres",
    difficulty: 2,
    completed: false,
    notes: "",
    diagram: {
      type: "sortida",
      bolaBLanca: { x: 15, y: 50 },
      bolaGroga: { x: 50, y: 45 },
      bolaVermella: { x: 85, y: 55 },
      bandes: [1, 2],
      efecte: 1,
      trajectoria: [
        { x: 15, y: 50 },
        { x: 30, y: 0 },
        { x: 70, y: 100 },
        { x: 85, y: 55 }
      ]
    },
    visualNotes: "Practica diferents tipus de sortides: suau, mitjana, forta. Controla la velocitat."
  }
];

// Exportar les dades
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EXERCISES_DATA;
}
