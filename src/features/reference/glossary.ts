export type GlossaryCategory = "Chemistry" | "Biology" | "Physics" | "Medicine";

export type GlossaryTerm = {
  term: string;
  category: GlossaryCategory;
  short: string;
  detail: string;
  related: string[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Acid",
    category: "Chemistry",
    short: "A substance that donates hydrogen ions in solution.",
    detail:
      "A strong acid releases almost all of its hydrogen ions in water. A weak acid releases only some, which is why two acids at the same concentration can have very different pH values.",
    related: ["Base", "pH", "Neutralisation"],
  },
  {
    term: "Activation energy",
    category: "Chemistry",
    short: "The minimum energy a reaction needs before it can proceed.",
    detail:
      "Molecules need enough energy to break the bonds that stand in the way. A catalyst lowers this barrier without changing the overall energy released by the reaction.",
    related: ["Catalyst", "Reaction rate", "Enzyme"],
  },
  {
    term: "Action potential",
    category: "Medicine",
    short: "A rapid electrical change that travels along a neuron.",
    detail:
      "Sodium ions rush into the cell and reverse the voltage across its membrane. The signal then travels down the axon before the cell restores its resting voltage.",
    related: ["Neuron", "Synapse"],
  },
  {
    term: "Allele",
    category: "Biology",
    short: "One version of a gene.",
    detail:
      "A person inherits two alleles for most genes, one from each parent. Which allele is expressed depends on whether it is dominant or recessive.",
    related: ["Gene", "DNA"],
  },
  {
    term: "Atom",
    category: "Chemistry",
    short: "The smallest unit of an element that keeps its identity.",
    detail:
      "An atom contains protons and neutrons in a dense nucleus, with electrons around it. The number of protons determines which element it is.",
    related: ["Electron", "Valence electron", "Molecule"],
  },
  {
    term: "Base",
    category: "Chemistry",
    short: "A substance that accepts hydrogen ions or releases hydroxide ions.",
    detail:
      "Strong bases such as sodium hydroxide release hydroxide ions in water. Bases neutralise acids and produce a salt and water together with them.",
    related: ["Acid", "pH", "Neutralisation"],
  },
  {
    term: "Base pair",
    category: "Biology",
    short: "Two nucleotides that pair across the DNA ladder.",
    detail:
      "Adenine pairs with thymine, and guanine pairs with cytosine. This matching rule allows DNA to be copied accurately.",
    related: ["DNA", "Gene"],
  },
  {
    term: "Catalyst",
    category: "Chemistry",
    short: "A substance that speeds a reaction without being used up.",
    detail:
      "A catalyst offers a lower energy route for the reaction. It changes the rate, not the final amount of product at equilibrium.",
    related: ["Activation energy", "Reaction rate", "Enzyme"],
  },
  {
    term: "Cell membrane",
    category: "Biology",
    short: "The selective boundary around a cell.",
    detail:
      "A phospholipid bilayer controls what enters and leaves the cell. Embedded proteins act as channels, pumps and receptors.",
    related: ["Diffusion", "Osmosis"],
  },
  {
    term: "Circuit",
    category: "Physics",
    short: "A closed path through which charge can flow.",
    detail:
      "A complete circuit needs a source of potential difference and a conducting path. Break the path and the current stops.",
    related: ["Current", "Potential difference", "Resistance"],
  },
  {
    term: "Concentration",
    category: "Chemistry",
    short: "The amount of a solute in a given volume of solution.",
    detail:
      "Concentration is often measured in moles per cubic decimetre. Doubling the concentration puts twice as many reacting particles in the same space.",
    related: ["Mole", "Reaction rate", "Titration"],
  },
  {
    term: "Covalent bond",
    category: "Chemistry",
    short: "A bond formed when atoms share a pair of electrons.",
    detail:
      "Shared electrons hold the nuclei together. A covalent bond can be polar or nonpolar depending on how evenly the electrons are shared.",
    related: ["Molecule", "Hydrogen bond", "Valence electron"],
  },
  {
    term: "Current",
    category: "Physics",
    short: "The rate of charge flow through a circuit.",
    detail:
      "Current is measured in amperes. One ampere is one coulomb of charge passing a point each second.",
    related: ["Circuit", "Potential difference", "Resistance"],
  },
  {
    term: "Diffusion",
    category: "Biology",
    short: "The movement of particles from high to low concentration.",
    detail:
      "Particles spread out because of their random motion. Diffusion needs no energy input from the cell and continues until the concentration is even.",
    related: ["Osmosis", "Cell membrane", "Concentration"],
  },
  {
    term: "DNA",
    category: "Biology",
    short: "The molecule that carries genetic instructions.",
    detail:
      "DNA is a double helix of nucleotides. The sequence of bases encodes the proteins a cell can build.",
    related: ["Gene", "Base pair", "Allele"],
  },
  {
    term: "Electron",
    category: "Chemistry",
    short: "A negatively charged particle found around an atom.",
    detail:
      "Electrons occupy shells or orbitals around the nucleus. The electrons in the outer shell are the ones most involved in bonding.",
    related: ["Atom", "Valence electron", "Ionic bond"],
  },
  {
    term: "Endothermic",
    category: "Chemistry",
    short: "A reaction that takes in energy from its surroundings.",
    detail:
      "The products contain more energy than the reactants. The surroundings cool as the reaction absorbs heat.",
    related: ["Exothermic", "Activation energy"],
  },
  {
    term: "Enzyme",
    category: "Biology",
    short: "A protein that speeds up a biological reaction.",
    detail:
      "Enzymes are specific to their substrates. Temperature and pH can change the shape of the active site and slow the reaction.",
    related: ["Catalyst", "Activation energy"],
  },
  {
    term: "Equivalence point",
    category: "Chemistry",
    short: "The point where acid and base have reacted in exact amounts.",
    detail:
      "At equivalence, the moles of acid equal the moles of base for the balanced equation. For a strong acid and strong base, the pH is 7.",
    related: ["Titration", "Indicator", "Neutralisation"],
  },
  {
    term: "Exothermic",
    category: "Chemistry",
    short: "A reaction that releases energy to its surroundings.",
    detail:
      "The products contain less energy than the reactants. The energy difference is released as heat, light or sound.",
    related: ["Endothermic", "Activation energy"],
  },
  {
    term: "Force",
    category: "Physics",
    short: "A push or pull that can change an object's motion.",
    detail:
      "Force is measured in newtons. A net force changes velocity, while balanced forces leave motion unchanged.",
    related: ["Newton's second law", "Friction"],
  },
  {
    term: "Friction",
    category: "Physics",
    short: "A force that resists motion between surfaces.",
    detail:
      "Friction converts kinetic energy into heat. It can be reduced with lubrication or shaped surfaces, but it cannot be removed completely in everyday conditions.",
    related: ["Force", "Kinetic energy"],
  },
  {
    term: "Gene",
    category: "Biology",
    short: "A section of DNA that codes for a protein or trait.",
    detail:
      "Genes are inherited and can exist in different versions called alleles. Gene expression depends on the cell type and its environment.",
    related: ["DNA", "Allele"],
  },
  {
    term: "Glucose",
    category: "Biology",
    short: "A simple sugar used as fuel and as a building block.",
    detail:
      "Photosynthesis produces glucose from carbon dioxide and water. Cells break it down during respiration to release usable energy.",
    related: ["Photosynthesis", "Enzyme"],
  },
  {
    term: "Homeostasis",
    category: "Medicine",
    short: "The body keeping its internal conditions stable.",
    detail:
      "Temperature, blood glucose and water balance are held within narrow ranges. Negative feedback loops detect a change and act to reverse it.",
    related: ["Neuron", "Hormone"],
  },
  {
    term: "Hormone",
    category: "Medicine",
    short: "A chemical messenger carried in the blood.",
    detail:
      "Hormones act on specific target cells with matching receptors. Small amounts can produce large, slow changes across the body.",
    related: ["Homeostasis", "Enzyme"],
  },
  {
    term: "Hydrogen bond",
    category: "Chemistry",
    short: "A weak attraction between polar molecules.",
    detail:
      "Hydrogen bonds form when hydrogen is attached to a highly electronegative atom. They are individually weak but collectively shape water, proteins and DNA.",
    related: ["Covalent bond", "Molecule"],
  },
  {
    term: "Indicator",
    category: "Chemistry",
    short: "A substance that changes colour with pH.",
    detail:
      "Phenolphthalein is colourless below pH 8.2 and pink above it. An indicator marks the end point, which is close to equivalence for a strong acid and strong base.",
    related: ["Titration", "pH", "Equivalence point"],
  },
  {
    term: "Ionic bond",
    category: "Chemistry",
    short: "An attraction between oppositely charged ions.",
    detail:
      "Electrons are transferred rather than shared. The resulting ions pack into a lattice held together by electrostatic attraction.",
    related: ["Electron", "Atom"],
  },
  {
    term: "Kinetic energy",
    category: "Physics",
    short: "The energy an object has because it is moving.",
    detail:
      "Kinetic energy depends on mass and the square of speed. Doubling speed gives four times the kinetic energy.",
    related: ["Force", "Friction"],
  },
  {
    term: "Mole",
    category: "Chemistry",
    short: "An amount containing 6.022 times 10 to the 23 particles.",
    detail:
      "The mole lets chemists count particles by weighing them. One mole of a substance has a mass in grams equal to its relative formula mass.",
    related: ["Concentration", "Titration"],
  },
  {
    term: "Molecule",
    category: "Chemistry",
    short: "A group of atoms held together by covalent bonds.",
    detail:
      "A molecule can contain one element or several. Its shape affects properties such as polarity, boiling point and how it interacts with other molecules.",
    related: ["Covalent bond", "Atom"],
  },
  {
    term: "Neuron",
    category: "Medicine",
    short: "A cell that carries electrical messages through the body.",
    detail:
      "Dendrites receive signals, the cell body integrates them and the axon carries the result toward a synapse. Myelin insulation speeds the signal up.",
    related: ["Action potential", "Synapse"],
  },
  {
    term: "Neutralisation",
    category: "Chemistry",
    short: "The reaction between an acid and a base.",
    detail:
      "An acid and a base react to form a salt and water. The pH moves toward neutral if the acid and base are strong.",
    related: ["Acid", "Base", "Titration"],
  },
  {
    term: "Newton's second law",
    category: "Physics",
    short: "Force equals mass times acceleration.",
    detail:
      "For a fixed mass, a larger force produces a larger acceleration. Doubling the mass halves the acceleration for the same force.",
    related: ["Force", "Kinetic energy"],
  },
  {
    term: "Osmosis",
    category: "Biology",
    short: "The movement of water across a partially permeable membrane.",
    detail:
      "Water moves from a region of higher water potential to lower water potential. Plant cells stay firm when water enters and can lose shape when it leaves.",
    related: ["Diffusion", "Cell membrane"],
  },
  {
    term: "pH",
    category: "Chemistry",
    short: "A scale from 0 to 14 that measures hydrogen ion concentration.",
    detail:
      "pH is negative log base ten of hydrogen ion concentration. Each whole step is a tenfold change in hydrogen ion concentration.",
    related: ["Acid", "Base", "Indicator"],
  },
  {
    term: "Photosynthesis",
    category: "Biology",
    short: "The process plants use to turn light into chemical energy.",
    detail:
      "Carbon dioxide and water become glucose and oxygen. Chlorophyll captures light, and the products move through the plant for growth and storage.",
    related: ["Glucose", "Cell membrane"],
  },
  {
    term: "Potential difference",
    category: "Physics",
    short: "The energy transferred per unit of charge.",
    detail:
      "Potential difference is measured in volts. A 12 volt supply transfers 12 joules for every coulomb of charge that passes through it.",
    related: ["Circuit", "Current", "Resistance"],
  },
  {
    term: "Reaction rate",
    category: "Chemistry",
    short: "How quickly a reaction converts reactants into products.",
    detail:
      "Rate changes with concentration, temperature, surface area and catalysts. Faster particles collide more often and with more energy.",
    related: ["Activation energy", "Catalyst", "Concentration"],
  },
  {
    term: "Resistance",
    category: "Physics",
    short: "How strongly a component opposes current.",
    detail:
      "Resistance is measured in ohms. For a fixed potential difference, a higher resistance means a smaller current.",
    related: ["Current", "Potential difference", "Circuit"],
  },
  {
    term: "Synapse",
    category: "Medicine",
    short: "The junction where a neuron passes a signal on.",
    detail:
      "An electrical signal triggers the release of neurotransmitters into the gap. The next cell responds only if it has the matching receptors.",
    related: ["Neuron", "Action potential"],
  },
  {
    term: "Titration",
    category: "Chemistry",
    short: "A method for finding the concentration of a solution.",
    detail:
      "A solution of known concentration is added until the reaction is complete. The volume used and the balanced equation reveal the unknown concentration.",
    related: ["Equivalence point", "Indicator", "Mole"],
  },
  {
    term: "Valence electron",
    category: "Chemistry",
    short: "An electron in the outermost shell of an atom.",
    detail:
      "Valence electrons are the ones most likely to be shared, lost or gained in bonding. Their number determines an element's group chemistry.",
    related: ["Electron", "Covalent bond", "Ionic bond"],
  },
  {
    term: "Wave",
    category: "Physics",
    short: "A disturbance that transfers energy from place to place.",
    detail:
      "A wave has wavelength, frequency and amplitude. The wave carries energy without carrying matter along with it.",
    related: ["Wavelength", "Current"],
  },
  {
    term: "Wavelength",
    category: "Physics",
    short: "The distance between two matching points on a wave.",
    detail:
      "Wavelength is measured in metres and is inversely related to frequency. Shorter wavelengths carry more energy for electromagnetic waves.",
    related: ["Wave"],
  },
];
