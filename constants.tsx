
import type { Scene } from './types';
import React from 'react';

export const SCRIPT_SCENES: Scene[] = [
  {
    id: 1,
    title: "INTRO",
    duration: "0:00–0:10",
    voiceover: "“¿Y si te dijera que puedes ganar músculo entrenando menos tiempo? Bienvenido al Heavy Duty, el método que cambió el fisicoculturismo.”",
    visuals: ["Texto central: Heavy Duty: Entrena menos, crece más.", "Fondo oscuro con luces rojas o metálicas.", "Imágenes: atleta entrenando, luces de gimnasio, close-ups de esfuerzo.", "Palabras clave animadas: Intensidad – Eficiencia – Resultados."]
  },
  {
    id: 2,
    title: "¿QUÉ ES EL HEAVY DUTY?",
    duration: "0:10–0:30",
    voiceover: "“El Heavy Duty fue creado por Mike Mentzer. Su idea: el músculo crece cuando descansas, no mientras entrenas. Por eso, entrenas poco, pero al máximo.”",
    visuals: ["Imagen de Mike Mentzer o ilustración tipo silueta.", "Texto animado: “Entrenamiento → Descanso → Crecimiento.”", "Íconos: reloj (tiempo corto), rayo (intensidad), luna (descanso)."]
  },
  {
    id: 3,
    title: "CONCEPTOS BÁSICOS",
    duration: "0:30–0:55",
    voiceover: "“Una repetición es un movimiento completo. Una serie es un conjunto de repeticiones. El fallo muscular es cuando no puedes hacer una más con buena técnica. Y la intensidad, es llegar a ese límite.”",
    visuals: ["Título en pantalla: Conceptos básicos del Heavy Duty.", "Viñetas visuales animadas: Repetición = 1 movimiento completo, Serie = grupo de repeticiones, Fallo muscular = límite del esfuerzo, Intensidad = máximo rendimiento.", "Fondo tipo gimnasio con animaciones simples."]
  },
  {
    id: 4,
    title: "PRINCIPIOS DEL MÉTODO",
    duration: "0:55–1:20",
    voiceover: "“Cinco principios lo definen: Intensidad máxima, Brevedad, Infrecuencia, Progresión e Individualización. Entrenas fuerte, poco y con propósito.”",
    visuals: ["Fondo dinámico con íconos: Fuego = Intensidad, Reloj = Brevedad, Calendario = Infrecuencia, Flecha ascendente = Progresión, Silueta humana = Individualización.", "Texto animado: Menos volumen, más resultados."]
  },
  {
    id: 5,
    title: "EJEMPLO DE RUTINA",
    duration: "1:20–1:45",
    voiceover: "“Una rutina simple: press de pecho, jalón al pecho, sentadillas, press de hombros, curl de bíceps y abdominales. Una sola serie de cada uno… ¡hasta el fallo!”",
    visuals: ["Slide tipo infografía con íconos de ejercicios.", "Texto lateral: 1 serie efectiva por ejercicio, Duración: 30–45 min, 2–3 días por semana.", "Animación mostrando barra de progreso o cronómetro."]
  },
  {
    id: 6,
    title: "CIERRE MOTIVADOR",
    duration: "1:45–2:00",
    voiceover: "“El Heavy Duty no se trata de hacer más, sino de hacerlo mejor. Recuerda: el crecimiento ocurre cuando descansas, no cuando te agotas. Entrena con inteligencia, no con exceso.”",
    visuals: ["Frase final animada: Entrena menos. Entrena fuerte. Crece más.", "Imagen: atleta descansando después de entrenar.", "Logo del canal o texto final: Suscríbete para más entrenamiento inteligente."]
  }
];

export const LOADING_MESSAGES: string[] = [
    "Building intensity...",
    "Focusing on the negative...",
    "Pushing to absolute failure...",
    "Optimizing for growth and recovery...",
    "Synthesizing Mike Mentzer's philosophy...",
    "Rendering high-intensity frames...",
    "Compiling the ultimate workout sequence...",
    "Just one more rep..."
];

export const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 inline-block">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);
