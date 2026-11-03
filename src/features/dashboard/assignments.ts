export type AssignmentStatus = "open" | "submitted" | "graded";

export type Assignment = {
  id: string;
  title: string;
  brief: string;
  subject: "Chemistry" | "Biology" | "Physics" | "Medicine";
  type: "Practical" | "Quiz" | "Review" | "Write-up";
  className: string;
  due: string;
  dueOrder: number;
  status: AssignmentStatus;
  grade?: number;
  href: string;
  actionLabel: string;
};

export const assignments: Assignment[] = [
  {
    id: "rates-of-reaction",
    title: "Rates of reaction",
    brief: "Design the fair test, choose your measurement and explain the graph you expect.",
    subject: "Chemistry",
    type: "Practical",
    className: "Chemistry 11B",
    due: "Tomorrow, 09:00",
    dueOrder: 1,
    status: "open",
    href: "/dashboard/practicals",
    actionLabel: "Open practical",
  },
  {
    id: "cell-division",
    title: "Cell division checkpoint",
    brief: "Five questions on mitosis, chromosomes and the stages of the cell cycle.",
    subject: "Biology",
    type: "Quiz",
    className: "Biology 11C",
    due: "Thursday, 14:00",
    dueOrder: 2,
    status: "open",
    href: "/dashboard/practice",
    actionLabel: "Start practice",
  },
  {
    id: "body-systems-review",
    title: "Body systems review",
    brief: "Use the body map to explain one relationship between two organ systems.",
    subject: "Medicine",
    type: "Review",
    className: "Science foundation",
    due: "Friday, 11:30",
    dueOrder: 3,
    status: "open",
    href: "/dashboard/simulations/anatomy",
    actionLabel: "Open the map",
  },
  {
    id: "molecular-geometry",
    title: "Molecular geometry",
    brief: "Compare water and methane, then explain the difference in bond angle.",
    subject: "Chemistry",
    type: "Practical",
    className: "Chemistry 11B",
    due: "Last Friday, 09:00",
    dueOrder: 4,
    status: "submitted",
    href: "/dashboard/simulations/molecular-lab",
    actionLabel: "Review your work",
  },
  {
    id: "periodic-trends",
    title: "Periodic trends",
    brief: "A ten question check on radius, electronegativity and group behaviour.",
    subject: "Chemistry",
    type: "Quiz",
    className: "Science foundation",
    due: "Last Wednesday, 10:00",
    dueOrder: 5,
    status: "graded",
    grade: 88,
    href: "/dashboard/periodic-table",
    actionLabel: "Open the table",
  },
  {
    id: "titration-writeup",
    title: "Titration write-up",
    brief: "Record the method, the end point and one source of uncertainty in your notebook.",
    subject: "Chemistry",
    type: "Write-up",
    className: "Chemistry 11B",
    due: "Next Monday, 09:00",
    dueOrder: 6,
    status: "graded",
    grade: 92,
    href: "/dashboard/notebook",
    actionLabel: "Open notebook",
  },
];
