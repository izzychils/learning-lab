export type SimulationStatus = "live" | "soon";

export type Simulation = {
  slug?: string;
  title: string;
  subject: "Chemistry" | "Biology" | "Physics" | "Medicine" | "AI";
  description: string;
  level: string;
  duration: string;
  status: SimulationStatus;
  progress: number;
  icon: "atom" | "flask" | "heart" | "dna" | "wave" | "chip" | "spark" | "test";
  badge?: string;
};

export const simulations: Simulation[] = [
  {
    slug: "molecular-lab",
    title: "Molecular lab",
    subject: "Chemistry",
    description: "Build molecules, change the shape and watch the properties follow.",
    level: "Foundation",
    duration: "35 min",
    status: "live",
    progress: 62,
    icon: "atom",
    badge: "Continue",
  },
  {
    slug: "anatomy",
    title: "Body systems",
    subject: "Medicine",
    description: "Move through the nervous, circulatory and respiratory systems.",
    level: "Intermediate",
    duration: "30 min",
    status: "live",
    progress: 38,
    icon: "heart",
    badge: "In progress",
  },
  {
    slug: "ai-tutor",
    title: "AI tutor session",
    subject: "AI",
    description: "Ask about the model on your screen and trace every explanation back.",
    level: "All levels",
    duration: "Open ended",
    status: "live",
    progress: 0,
    icon: "spark",
    badge: "New",
  },
  {
    title: "Reaction bench",
    subject: "Chemistry",
    description: "Mix, heat and observe. A guided bench with apparatus and safety notes.",
    level: "Intermediate",
    duration: "28 min",
    status: "soon",
    progress: 0,
    icon: "flask",
    badge: "In the lab",
  },
  {
    title: "Cell explorer",
    subject: "Biology",
    description: "Step inside a cell and trace how its organelles work together.",
    level: "Foundation",
    duration: "24 min",
    status: "soon",
    progress: 0,
    icon: "dna",
    badge: "Soon",
  },
  {
    title: "Circuit builder",
    subject: "Physics",
    description: "Connect components, close the circuit and measure the change.",
    level: "Intermediate",
    duration: "32 min",
    status: "soon",
    progress: 0,
    icon: "chip",
    badge: "Soon",
  },
  {
    slug: "titration",
    title: "Titration curves",
    subject: "Chemistry",
    description: "Add drops, watch the pH move and find the equivalence point.",
    level: "Advanced",
    duration: "40 min",
    status: "live",
    progress: 12,
    icon: "test",
    badge: "New",
  },
  {
    title: "Waves and sound",
    subject: "Physics",
    description: "Change frequency and amplitude, then see the wave respond.",
    level: "Foundation",
    duration: "26 min",
    status: "soon",
    progress: 0,
    icon: "wave",
    badge: "Soon",
  },
  {
    title: "Photosynthesis",
    subject: "Biology",
    description: "Follow light, water and carbon dioxide through the chloroplast.",
    level: "Foundation",
    duration: "22 min",
    status: "soon",
    progress: 0,
    icon: "dna",
    badge: "Soon",
  },
  {
    title: "Genetics and inheritance",
    subject: "Biology",
    description: "Cross alleles, read a Punnett square and trace a trait through a family.",
    level: "Intermediate",
    duration: "30 min",
    status: "soon",
    progress: 0,
    icon: "dna",
    badge: "Soon",
  },
  {
    title: "Ohm's law bench",
    subject: "Physics",
    description: "Change resistance and voltage, then read the current without a real power supply.",
    level: "Foundation",
    duration: "24 min",
    status: "soon",
    progress: 0,
    icon: "chip",
    badge: "Soon",
  },
  {
    title: "Projectile motion",
    subject: "Physics",
    description: "Change the angle and speed, then follow the path and the forces behind it.",
    level: "Intermediate",
    duration: "28 min",
    status: "soon",
    progress: 0,
    icon: "wave",
    badge: "Soon",
  },
  {
    title: "The beating heart",
    subject: "Medicine",
    description: "Trace blood through the chambers and watch the valves keep it moving one way.",
    level: "Intermediate",
    duration: "26 min",
    status: "soon",
    progress: 0,
    icon: "heart",
    badge: "Soon",
  },
  {
    title: "Neuron signalling",
    subject: "Medicine",
    description: "Follow an action potential from dendrite to synapse, step by step.",
    level: "Advanced",
    duration: "34 min",
    status: "soon",
    progress: 0,
    icon: "spark",
    badge: "Soon",
  },
  {
    title: "Periodic trends",
    subject: "Chemistry",
    description: "Compare radius, electronegativity and reactivity across the table.",
    level: "Intermediate",
    duration: "20 min",
    status: "soon",
    progress: 0,
    icon: "atom",
    badge: "Soon",
  },
];

export const liveSimulations = simulations.filter((simulation) => simulation.status === "live");

export const overviewStats = [
  { label: "Simulations complete", value: "13", detail: "+3 this month", tone: "ink" },
  { label: "Study time", value: "4.2h", detail: "48 min this week", tone: "flare" },
  { label: "Current streak", value: "7", detail: "days in a row", tone: "ink" },
  { label: "Average score", value: "86%", detail: "+4 points", tone: "flare" },
];

export const weeklyActivity = [
  { day: "Mon", minutes: 38 },
  { day: "Tue", minutes: 64 },
  { day: "Wed", minutes: 22 },
  { day: "Thu", minutes: 78 },
  { day: "Fri", minutes: 48 },
  { day: "Sat", minutes: 16 },
  { day: "Sun", minutes: 8 },
];

export const upcoming = [
  {
    title: "Rates of reaction",
    subject: "Chemistry",
    due: "Tomorrow, 09:00",
    type: "Practical",
    tone: "flare",
  },
  {
    title: "Cell division checkpoint",
    subject: "Biology",
    due: "Thursday, 14:00",
    type: "Quiz",
    tone: "ink",
  },
  {
    title: "Body systems review",
    subject: "Medicine",
    due: "Friday, 11:30",
    type: "Review",
    tone: "ink",
  },
];

export const mastery = [
  { label: "Atomic structure", value: 92 },
  { label: "Bonding and shape", value: 78 },
  { label: "Cell biology", value: 64 },
  { label: "Human systems", value: 71 },
  { label: "Forces and motion", value: 45 },
  { label: "Waves", value: 30 },
];

export const recentResults = [
  { title: "Molecular geometry", type: "Simulation", score: 88, date: "Today" },
  { title: "The periodic table", type: "Quiz", score: 94, date: "Yesterday" },
  { title: "Circulatory system", type: "Checkpoint", score: 76, date: "Mon" },
  { title: "Covalent bonds", type: "Quiz", score: 82, date: "Sun" },
];

export const classes = [
  {
    name: "Chemistry 11B",
    code: "CHM-11B",
    teacher: "Mr. Samuel Adeniyi",
    members: 28,
    average: 82,
    next: "Rates of reaction",
    nextTime: "Tomorrow, 09:00",
    color: "flare",
  },
  {
    name: "Biology 11C",
    code: "BIO-11C",
    teacher: "Dr. Amaka Obi",
    members: 26,
    average: 78,
    next: "Cell division",
    nextTime: "Thursday, 14:00",
    color: "ink",
  },
  {
    name: "Science foundation",
    code: "SCI-10A",
    teacher: "Ms. Zainab Bello",
    members: 31,
    average: 86,
    next: "Forces and motion",
    nextTime: "Friday, 10:00",
    color: "ink",
  },
];

export const classLearners = [
  { name: "Ada Nwosu", initials: "AN", progress: 92, status: "On track" },
  { name: "Tunde Bello", initials: "TB", progress: 78, status: "On track" },
  { name: "Zara Kabir", initials: "ZK", progress: 46, status: "Needs help" },
  { name: "Chidi Obi", initials: "CO", progress: 88, status: "On track" },
  { name: "Farah Bello", initials: "FB", progress: 64, status: "Watch" },
  { name: "Somto Eze", initials: "SE", progress: 71, status: "On track" },
];

export const notifications = [
  { title: "Your molecular lab progress was saved", time: "12 min ago" },
  { title: "New tutor answer ready to review", time: "1 hour ago" },
  { title: "Class practical added for tomorrow", time: "Yesterday" },
];
