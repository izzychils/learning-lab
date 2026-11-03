export type Element = "C" | "H" | "N" | "O";

export type Atom = {
  id: string;
  element: Element;
  x: number;
  y: number;
  r: number;
};

export type Bond = {
  from: string;
  to: string;
  order: 1 | 2;
};

export type Molecule = {
  id: "water" | "methane" | "carbon-dioxide" | "ammonia";
  name: string;
  formula: string;
  formulaPlain: string;
  geometry: string;
  polarity: string;
  mass: string;
  keyIdea: string;
  note: string;
  atoms: Atom[];
  bonds: Bond[];
};

export const molecules: Molecule[] = [
  {
    id: "water",
    name: "Water",
    formula: "H₂O",
    formulaPlain: "H2O",
    geometry: "Bent, 104.5°",
    polarity: "Polar",
    mass: "18.02 g/mol",
    keyIdea: "Electronegativity",
    note: "Oxygen pulls the shared electrons closer, so the oxygen end carries a slight negative charge and each hydrogen end a slight positive charge. That uneven pull is why water dissolves so many ionic compounds.",
    atoms: [
      { id: "o", element: "O", x: 260, y: 230, r: 36 },
      { id: "h1", element: "H", x: 158, y: 146, r: 22 },
      { id: "h2", element: "H", x: 362, y: 146, r: 22 },
    ],
    bonds: [
      { from: "o", to: "h1", order: 1 },
      { from: "o", to: "h2", order: 1 },
    ],
  },
  {
    id: "methane",
    name: "Methane",
    formula: "CH₄",
    formulaPlain: "CH4",
    geometry: "Tetrahedral, 109.5°",
    polarity: "Non polar",
    mass: "16.04 g/mol",
    keyIdea: "Molecular shape",
    note: "Carbon sits at the centre with four equivalent bonds pushed as far apart as possible. The true shape is tetrahedral. This flat view is a projection, so the angles look like 90 degrees even though they are 109.5.",
    atoms: [
      { id: "c", element: "C", x: 260, y: 210, r: 36 },
      { id: "h1", element: "H", x: 260, y: 76, r: 21 },
      { id: "h2", element: "H", x: 128, y: 210, r: 21 },
      { id: "h3", element: "H", x: 392, y: 210, r: 21 },
      { id: "h4", element: "H", x: 260, y: 344, r: 21 },
    ],
    bonds: [
      { from: "c", to: "h1", order: 1 },
      { from: "c", to: "h2", order: 1 },
      { from: "c", to: "h3", order: 1 },
      { from: "c", to: "h4", order: 1 },
    ],
  },
  {
    id: "carbon-dioxide",
    name: "Carbon dioxide",
    formula: "CO₂",
    formulaPlain: "CO2",
    geometry: "Linear, 180°",
    polarity: "Non polar",
    mass: "44.01 g/mol",
    keyIdea: "Cancelling dipoles",
    note: "Each carbon to oxygen bond is polar, but the two bonds point in exactly opposite directions. The two pulls cancel, so the molecule as a whole has no dipole even though it contains polar bonds.",
    atoms: [
      { id: "c", element: "C", x: 260, y: 210, r: 33 },
      { id: "o1", element: "O", x: 118, y: 210, r: 34 },
      { id: "o2", element: "O", x: 402, y: 210, r: 34 },
    ],
    bonds: [
      { from: "c", to: "o1", order: 2 },
      { from: "c", to: "o2", order: 2 },
    ],
  },
  {
    id: "ammonia",
    name: "Ammonia",
    formula: "NH₃",
    formulaPlain: "NH3",
    geometry: "Trigonal pyramidal, 107°",
    polarity: "Polar",
    mass: "17.03 g/mol",
    keyIdea: "Lone pair geometry",
    note: "Nitrogen keeps one lone pair of electrons. That pair repels the three bonding pairs more strongly than they repel each other, squeezing the H to N to H angle below the tetrahedral angle and making the molecule polar.",
    atoms: [
      { id: "n", element: "N", x: 260, y: 226, r: 36 },
      { id: "h1", element: "H", x: 132, y: 158, r: 21 },
      { id: "h2", element: "H", x: 388, y: 158, r: 21 },
      { id: "h3", element: "H", x: 260, y: 344, r: 21 },
    ],
    bonds: [
      { from: "n", to: "h1", order: 1 },
      { from: "n", to: "h2", order: 1 },
      { from: "n", to: "h3", order: 1 },
    ],
  },
];
