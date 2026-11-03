export type QuizSubject = "Chemistry" | "Biology" | "Physics" | "Medicine";

export type QuizQuestion = {
  id: string;
  subject: QuizSubject;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const quizSubjects: QuizSubject[] = ["Chemistry", "Biology", "Physics", "Medicine"];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "chem-1",
    subject: "Chemistry",
    prompt: "Why is the bond angle in water 104.5 degrees instead of 109.5?",
    options: [
      "Oxygen is more electronegative than hydrogen",
      "Two lone pairs repel more strongly than bonding pairs",
      "Water has only two covalent bonds",
      "Hydrogen atoms repel each other",
    ],
    answer: 1,
    explanation:
      "Oxygen has two lone pairs. Lone pairs occupy more space than bonding pairs, so they push the two O-H bonds closer together.",
  },
  {
    id: "chem-2",
    subject: "Chemistry",
    prompt: "Which molecule has polar bonds but is overall nonpolar?",
    options: ["H2O", "NH3", "CO2", "HCl"],
    answer: 2,
    explanation:
      "Carbon dioxide is linear. The two C=O dipoles point in opposite directions and cancel, so the molecule has no net dipole.",
  },
  {
    id: "chem-3",
    subject: "Chemistry",
    prompt: "What is the pH when a strong acid and strong base reach equivalence?",
    options: ["1", "7", "10", "14"],
    answer: 1,
    explanation:
      "At equivalence, the acid and base have neutralised each other. The remaining solution is water and a neutral salt, so the pH is 7 at 25 degrees Celsius.",
  },
  {
    id: "chem-4",
    subject: "Chemistry",
    prompt: "What does a catalyst change in a reaction?",
    options: [
      "The activation energy",
      "The mass of the products",
      "The number of protons",
      "The final equilibrium position",
    ],
    answer: 0,
    explanation:
      "A catalyst provides an alternative route with lower activation energy. It speeds the reaction without changing the overall energy difference between reactants and products.",
  },
  {
    id: "chem-5",
    subject: "Chemistry",
    prompt: "Which electron shell is most involved in bonding?",
    options: ["The nucleus", "The innermost shell", "The outermost shell", "The neutron shell"],
    answer: 2,
    explanation:
      "Valence electrons sit in the outermost shell. They are the electrons most likely to be shared, lost or gained.",
  },
  {
    id: "bio-1",
    subject: "Biology",
    prompt: "In DNA, adenine pairs with which base?",
    options: ["Guanine", "Cytosine", "Thymine", "Uracil"],
    answer: 2,
    explanation:
      "Adenine pairs with thymine through two hydrogen bonds. Guanine pairs with cytosine through three.",
  },
  {
    id: "bio-2",
    subject: "Biology",
    prompt: "Osmosis moves water from which region?",
    options: [
      "Low water potential to high water potential",
      "High water potential to low water potential",
      "Low solute concentration to high solute concentration in reverse",
      "Only from inside a cell to outside",
    ],
    answer: 1,
    explanation:
      "Water moves from a higher water potential to a lower water potential across a partially permeable membrane. It does not require energy from the cell.",
  },
  {
    id: "bio-3",
    subject: "Biology",
    prompt: "Where does photosynthesis take place in a plant cell?",
    options: ["Mitochondrion", "Chloroplast", "Ribosome", "Vacuole"],
    answer: 1,
    explanation:
      "Chloroplasts contain chlorophyll and the enzymes needed to convert light energy, carbon dioxide and water into glucose and oxygen.",
  },
  {
    id: "bio-4",
    subject: "Biology",
    prompt: "What happens to an enzyme when it is heated well above its optimum?",
    options: [
      "It becomes a substrate",
      "Its active site changes shape",
      "It gains a new active site",
      "It turns into DNA",
    ],
    answer: 1,
    explanation:
      "High temperature breaks the weak bonds holding the enzyme's shape. The active site no longer fits the substrate, so the enzyme is denatured.",
  },
  {
    id: "bio-5",
    subject: "Biology",
    prompt: "Which pair of products comes out of photosynthesis?",
    options: ["Glucose and oxygen", "Glucose and carbon dioxide", "Water and oxygen", "ATP and DNA"],
    answer: 0,
    explanation:
      "Photosynthesis uses carbon dioxide and water to make glucose. Oxygen is released as a by-product when water is split.",
  },
  {
    id: "phys-1",
    subject: "Physics",
    prompt: "What is the unit of force?",
    options: ["Joule", "Watt", "Newton", "Volt"],
    answer: 2,
    explanation: "Force is measured in newtons. One newton accelerates a one kilogram mass at one metre per second squared.",
  },
  {
    id: "phys-2",
    subject: "Physics",
    prompt: "Which equation links potential difference, current and resistance?",
    options: ["V = I / R", "V = I x R", "V = R / I", "V = I + R"],
    answer: 1,
    explanation:
      "Potential difference equals current multiplied by resistance. For a fixed resistance, doubling the voltage doubles the current.",
  },
  {
    id: "phys-3",
    subject: "Physics",
    prompt: "If an object's speed doubles, what happens to its kinetic energy?",
    options: ["It stays the same", "It doubles", "It triples", "It quadruples"],
    answer: 3,
    explanation:
      "Kinetic energy depends on the square of speed. Doubling speed multiplies kinetic energy by four.",
  },
  {
    id: "phys-4",
    subject: "Physics",
    prompt: "What is true of the current in a series circuit?",
    options: [
      "It is the same at every point",
      "It is largest before the first component",
      "It splits at every component",
      "It is always zero",
    ],
    answer: 0,
    explanation:
      "Charge cannot build up in a series loop. The same current flows through every component, even when the voltage is shared.",
  },
  {
    id: "phys-5",
    subject: "Physics",
    prompt: "How do you find the speed of a wave?",
    options: ["Frequency / wavelength", "Frequency x wavelength", "Wavelength / amplitude", "Amplitude x frequency"],
    answer: 1,
    explanation:
      "Wave speed equals frequency multiplied by wavelength. A wave with a 2 metre wavelength at 3 hertz travels at 6 metres per second.",
  },
  {
    id: "med-1",
    subject: "Medicine",
    prompt: "Which organ adds oxygen to blood?",
    options: ["Kidneys", "Lungs", "Liver", "Stomach"],
    answer: 1,
    explanation:
      "The lungs exchange oxygen from the air into the blood and remove carbon dioxide. The heart then pumps that oxygenated blood around the body.",
  },
  {
    id: "med-2",
    subject: "Medicine",
    prompt: "Which chamber of the heart has the thickest muscular wall?",
    options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    answer: 3,
    explanation:
      "The left ventricle pumps blood at high pressure into the aorta and the rest of the body, so its muscle wall is the thickest.",
  },
  {
    id: "med-3",
    subject: "Medicine",
    prompt: "What is the basic signalling cell of the nervous system?",
    options: ["Neuron", "Nephron", "Platelet", "Alveolus"],
    answer: 0,
    explanation:
      "Neurons carry electrical impulses. Dendrites receive signals, the axon carries them and a synapse passes them to the next cell.",
  },
  {
    id: "med-4",
    subject: "Medicine",
    prompt: "What is a main job of the kidneys?",
    options: [
      "Produce red blood cells",
      "Filter blood and balance water",
      "Add oxygen to blood",
      "Store bile",
    ],
    answer: 1,
    explanation:
      "The kidneys filter waste from blood and adjust water and salt balance. They also help regulate blood pressure and pH.",
  },
  {
    id: "med-5",
    subject: "Medicine",
    prompt: "Where does most nutrient absorption happen?",
    options: ["Stomach", "Large intestine", "Small intestine", "Oesophagus"],
    answer: 2,
    explanation:
      "The small intestine has folds and villi that create a large surface area for absorbing nutrients into the blood and lymph.",
  },
];
