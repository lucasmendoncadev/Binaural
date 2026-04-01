import { Activity } from "@/types";

export const activities: Activity[] = [
  {
    id: "reading",
    name: "Reading",
    icon: "book-open",
    frequencyRange: [10, 12],
    brainwaveCategory: "Alpha",
    noiseColors: ["Pink"],
    description: "Alpha waves paired with pink noise for calm, absorbed reading.",
    whyItWorks:
      "Alpha waves (10-12 Hz) promote a relaxed yet alert state ideal for sustained reading. Pink noise masks distractions with a balanced, natural sound that won't compete with your inner voice.",
  },
  {
    id: "light-study",
    name: "Light Study",
    icon: "notebook-pen",
    frequencyRange: [10, 14],
    brainwaveCategory: "Alpha",
    noiseColors: ["Pink", "White"],
    description: "Gentle alpha-to-low-beta for light review and study sessions.",
    whyItWorks:
      "The transition zone between alpha and low beta (10-14 Hz) supports learning and memory consolidation without overstimulation, perfect for reviewing notes or casual study.",
  },
  {
    id: "focus",
    name: "Focus",
    icon: "crosshair",
    frequencyRange: [14, 18],
    brainwaveCategory: "Low Beta",
    noiseColors: ["Pink", "White"],
    description: "Low beta waves to sharpen attention and maintain sustained focus.",
    whyItWorks:
      "Low beta waves (14-18 Hz) are associated with active concentration and problem-solving. Combined with pink or white noise, they help maintain a focused state for extended periods.",
  },
  {
    id: "deep-work",
    name: "Deep Work",
    icon: "brain",
    frequencyRange: [16, 20],
    brainwaveCategory: "Beta",
    noiseColors: ["White", "Pink"],
    description: "Beta-range binaural beats for high-intensity cognitive work.",
    whyItWorks:
      "Beta waves (16-20 Hz) drive peak cognitive performance and analytical thinking. White noise creates a consistent sound wall that blocks interruptions during demanding tasks.",
  },
  {
    id: "writing",
    name: "Writing",
    icon: "pen-tool",
    frequencyRange: [10, 14],
    brainwaveCategory: "Alpha",
    noiseColors: ["Pink", "Brown"],
    description: "Alpha waves to support a smooth creative writing flow.",
    whyItWorks:
      "Writing benefits from the alpha state (10-14 Hz), which balances creativity and structure. Pink or brown noise provides a warm backdrop that supports the rhythm of putting words on the page.",
  },
  {
    id: "analytical",
    name: "Analytical Work",
    icon: "bar-chart-2",
    frequencyRange: [18, 24],
    brainwaveCategory: "High Beta",
    noiseColors: ["White"],
    description: "High beta for complex analysis, math, and logical reasoning.",
    whyItWorks:
      "High beta waves (18-24 Hz) stimulate intense analytical processing and logical reasoning. White noise helps maintain this high-alert state without the jittery feeling of caffeine.",
  },
  {
    id: "creative",
    name: "Creative Thinking",
    icon: "lightbulb",
    frequencyRange: [8, 10],
    brainwaveCategory: "Alpha",
    noiseColors: ["Pink", "Brown"],
    description: "Low alpha to open creative pathways and free association.",
    whyItWorks:
      "Lower alpha waves (8-10 Hz) are linked to creative insight and divergent thinking. The relaxed alertness allows your mind to make novel connections without forcing them.",
  },
  {
    id: "relaxation",
    name: "Relaxation",
    icon: "cloud",
    frequencyRange: [8, 10],
    brainwaveCategory: "Alpha",
    noiseColors: ["Brown", "Pink"],
    description: "Alpha waves and brown noise for unwinding and stress relief.",
    whyItWorks:
      "Alpha waves (8-10 Hz) naturally increase during relaxation. Brown noise, with its deep, rumbling quality, creates a cocooning effect that helps release tension and calm the nervous system.",
  },
  {
    id: "meditation",
    name: "Meditation",
    icon: "flower-2",
    frequencyRange: [4, 8],
    brainwaveCategory: "Theta",
    noiseColors: ["Brown", "Pink"],
    description: "Theta waves for deep meditation and mindfulness practice.",
    whyItWorks:
      "Theta waves (4-8 Hz) are the signature of deep meditation, appearing when the conscious mind quiets and deeper awareness emerges. Brown noise supports this by providing a grounding, earthy backdrop.",
  },
  {
    id: "pre-sleep",
    name: "Pre-Sleep",
    icon: "sunset",
    frequencyRange: [4, 6],
    brainwaveCategory: "Theta",
    noiseColors: ["Brown"],
    description: "Low theta to ease the transition from wakefulness to sleep.",
    whyItWorks:
      "Low theta waves (4-6 Hz) mirror the brain's natural pre-sleep pattern. Brown noise, with its emphasis on low frequencies, creates a warm, enveloping sound environment that signals your body to wind down.",
  },
  {
    id: "sleep",
    name: "Sleep",
    icon: "moon",
    frequencyRange: [1, 4],
    brainwaveCategory: "Delta",
    noiseColors: ["Brown"],
    description: "Delta waves and brown noise for deep, restorative sleep.",
    whyItWorks:
      "Delta waves (1-4 Hz) dominate deep sleep stages when the body repairs itself. Brown noise masks nighttime disturbances while its low-frequency character naturally promotes drowsiness.",
  },
];
