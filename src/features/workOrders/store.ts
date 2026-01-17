import { create } from "zustand";

type WorkOrdersUIState = {
  statusFilter: "ALL" | "OPEN" | "IN_PROGRESS" | "CLOSED";
  search: string;
  setStatusFilter: (v: WorkOrdersUIState["statusFilter"]) => void;
  setSearch: (v: string) => void;
};

export const useWorkOrdersUI = create<WorkOrdersUIState>((set) => ({
  statusFilter: "ALL",
  search: "",
  setStatusFilter: (v) => set({ statusFilter: v }),
  setSearch: (v) => set({ search: v })
}));
