export type Practical = {
  slug: string;
  title: string;
  subject: "Chemistry" | "Biology" | "Physics" | "Medicine";
  level: string;
  duration: string;
  summary: string;
  brief: string;
  apparatus: string[];
  safety: string[];
  simulation?: { label: string; href: string };
  steps: { title: string; detail: string }[];
};

export const practicals: Practical[] = [
  {
    slug: "titration-bench",
    title: "Titration: acid meets base",
    subject: "Chemistry",
    level: "Advanced",
    duration: "40 min",
    summary: "Find the concentration of an acid by adding a base one drop at a time.",
    brief:
      "Use a virtual burette to add sodium hydroxide to hydrochloric acid. Read the volume, follow the pH and stop at the point where the indicator changes.",
    apparatus: ["Burette", "Conical flask", "Pipette", "Phenolphthalein", "pH probe"],
    safety: [
      "Wear eye protection when handling acids and bases.",
      "Read the burette at eye level, from the bottom of the meniscus.",
      "Add base slowly near the end point. One extra drop can overshoot the result.",
    ],
    simulation: { label: "Open the titration bench", href: "/dashboard/simulations/titration" },
    steps: [
      {
        title: "Set up the apparatus",
        detail: "Clamp the burette vertically and fill it with 0.100 M sodium hydroxide. Check that the tap is closed.",
      },
      {
        title: "Measure the acid",
        detail: "Pipette 25.0 mL of 0.100 M hydrochloric acid into a clean conical flask and add two drops of phenolphthalein.",
      },
      {
        title: "Record the start",
        detail: "Read the burette before you begin. Record the initial volume to one decimal place, not the amount you think you added.",
      },
      {
        title: "Add base, then slow down",
        detail: "Run base into the flask while swirling. Near 24 mL, add one drop at a time and watch for a lasting pink colour.",
      },
      {
        title: "Find the end point",
        detail: "Stop at the first pale pink that survives a swirl. Read the final volume and calculate the volume added.",
      },
      {
        title: "Repeat and calculate",
        detail: "Repeat the titration to check your value, then use the balanced equation to find the acid concentration.",
      },
    ],
  },
  {
    slug: "molecule-shapes",
    title: "Shape, polarity and behaviour",
    subject: "Chemistry",
    level: "Foundation",
    duration: "18 min",
    summary: "Compare four molecules and connect their geometry to how they behave.",
    brief:
      "Open the molecular workspace and compare water, methane, carbon dioxide and ammonia. Use the model and the tutor note as evidence.",
    apparatus: ["2D molecular model", "Geometry notes", "Tutor source"],
    safety: [
      "This is a structural model, not a scale drawing of electron density.",
      "A simplified 2D model cannot show every quantum effect. Use it to reason about shape and polarity.",
    ],
    simulation: { label: "Open the molecular lab", href: "/dashboard/simulations/molecular-lab" },
    steps: [
      {
        title: "Start with water",
        detail: "Read the bond angle and the polarity. Notice how two lone pairs push the hydrogen atoms closer together.",
      },
      {
        title: "Compare methane",
        detail: "Methane has four bonding pairs and no lone pairs. Explain why its shape is different from water.",
      },
      {
        title: "Test carbon dioxide",
        detail: "The bonds are polar, but the molecule is not. Use the geometry to explain why the dipoles cancel.",
      },
      {
        title: "Finish with ammonia",
        detail: "One lone pair changes the angle. Compare it with water and decide which molecule is more polar.",
      },
    ],
  },
  {
    slug: "body-systems-check",
    title: "A guided body systems check",
    subject: "Medicine",
    level: "Intermediate",
    duration: "20 min",
    summary: "Move through four systems and explain how each structure does its job.",
    brief:
      "Use the interactive body map to identify the main organ in each system, then connect one structure to one function.",
    apparatus: ["Schematic body map", "System notes", "Recall prompts"],
    safety: [
      "The body map is schematic. It is for learning relationships, not for clinical diagnosis.",
      "Do not use this session as a substitute for supervised anatomy practical work.",
    ],
    simulation: { label: "Open the body systems explorer", href: "/dashboard/simulations/anatomy" },
    steps: [
      {
        title: "Map the nervous system",
        detail: "Select the brain and state two things it controls that the rest of the body depends on.",
      },
      {
        title: "Follow circulation",
        detail: "Identify the heart and explain why its left side has a thicker muscular wall.",
      },
      {
        title: "Check respiration",
        detail: "Select the lungs. Describe what moves into the blood and what leaves it.",
      },
      {
        title: "Connect digestion",
        detail: "Find the stomach and explain one relationship between the digestive and circulatory systems.",
      },
    ],
  },
  {
    slug: "reaction-rates",
    title: "What changes a reaction rate?",
    subject: "Chemistry",
    level: "Intermediate",
    duration: "25 min",
    summary: "Plan a fair test for temperature, concentration and surface area.",
    brief:
      "Design a practical that measures how fast a reaction produces gas. Decide what to change, what to measure and what to keep the same.",
    apparatus: ["Conical flask", "Gas syringe", "Stopwatch", "Water bath", "Marble chips"],
    safety: [
      "Real reactions must take place under teacher supervision.",
      "Never heat a closed system. Gas needs a route to escape or a syringe to collect it.",
    ],
    steps: [
      {
        title: "Write the question",
        detail: "Choose one variable to change: temperature, acid concentration or the surface area of the marble chips.",
      },
      {
        title: "Design the fair test",
        detail: "List every variable that must stay the same so that only one factor can explain the result.",
      },
      {
        title: "Choose the measurement",
        detail: "Decide whether you will measure gas volume over time, mass lost or the time taken to collect a fixed volume.",
      },
      {
        title: "Anticipate the graph",
        detail: "Sketch the shape you expect. Explain the gradient and where the curve should flatten.",
      },
      {
        title: "Check your reasoning",
        detail: "Ask the tutor what would happen if the particle size changed but the mass stayed the same.",
      },
    ],
  },
];
