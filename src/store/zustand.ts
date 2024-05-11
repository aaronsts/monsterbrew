import { initialCreature } from "@/lib/constants";
import { Monster5e } from "@/types/monster5e";
import { create } from "zustand";

interface CreatureStore {
	creatures: { slug: string; name: string }[];
	creature: Monster5e;
	selectedCreature: string;
	setCreatures: (data: { slug: string; name: string }[]) => void;
	setCreature: (creature: Monster5e) => void;
	setSelectedCreature: (slug: string) => void;
}

export const useCreaturesStore = create<CreatureStore>((set) => ({
	creatures: [],
	creature: initialCreature,
	selectedCreature: "ancient-black-dragon",
	setCreatures: (data) => set(() => ({ creatures: [...data] })),
	setCreature: (data) =>
		set((prevState) => {
			return { creature: data || prevState.creature };
		}),
	setSelectedCreature: (slug) => set(() => ({ selectedCreature: slug })),
}));
