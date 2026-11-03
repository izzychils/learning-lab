export type SystemId = "nervous" | "circulation" | "respiratory" | "digestive";

export type BodySystem = {
  id: SystemId;
  label: string;
  organ: string;
  title: string;
  stat: string;
  copy: string;
  facts: string[];
  calloutY: number;
  focusX: number;
  focusY: number;
  focusRx: number;
  focusRy: number;
};

export const bodySystems: BodySystem[] = [
  {
    id: "nervous",
    label: "Nervous",
    organ: "Brain",
    title: "The control centre",
    stat: "86 billion neurons",
    copy: "The brain receives sensory input, compares it with memory and sends the signals that move the body. Everything you explore in the lab passes through here.",
    facts: ["Signals travel as electrical impulses.", "The cortex folds to fit more surface area."],
    calloutY: 80,
    focusX: 170,
    focusY: 80,
    focusRx: 34,
    focusRy: 28,
  },
  {
    id: "circulation",
    label: "Circulation",
    organ: "Heart",
    title: "The pressure engine",
    stat: "About 5 litres a minute",
    copy: "The heart drives blood through the lungs and around the body. Its valves keep flow moving in one direction, even as pressure changes.",
    facts: ["The right side sends blood to the lungs.", "The left side sends oxygenated blood to the body."],
    calloutY: 220,
    focusX: 170,
    focusY: 220,
    focusRx: 27,
    focusRy: 27,
  },
  {
    id: "respiratory",
    label: "Respiration",
    organ: "Lungs",
    title: "The gas exchange",
    stat: "About 480 million alveoli",
    copy: "Air moves through branching airways until it reaches tiny air sacs wrapped in capillaries. Oxygen crosses into the blood and carbon dioxide crosses out.",
    facts: ["The diaphragm creates the pressure change.", "Alveoli increase the surface area for diffusion."],
    calloutY: 190,
    focusX: 165,
    focusY: 226,
    focusRx: 54,
    focusRy: 44,
  },
  {
    id: "digestive",
    label: "Digestion",
    organ: "Stomach",
    title: "The breakdown chamber",
    stat: "About 1.5 litres capacity",
    copy: "The stomach mixes food with acid and enzymes, turning a meal into a paste that can move into the small intestine for absorption.",
    facts: ["Acid kills many swallowed microbes.", "The lining renews itself to resist the acid."],
    calloutY: 296,
    focusX: 192,
    focusY: 294,
    focusRx: 26,
    focusRy: 26,
  },
];
