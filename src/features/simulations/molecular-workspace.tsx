import { MoleculeExplorer } from "@/features/simulations/molecule-explorer";

export function MolecularWorkspace() {
  return (
    <div className="rounded-[30px] bg-[#0b0a08] p-2 shadow-[0_24px_60px_-40px_rgba(18,17,14,0.8)] sm:p-3">
      <MoleculeExplorer />
    </div>
  );
}
