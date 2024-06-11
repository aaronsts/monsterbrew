import { initialCreature } from "@/lib/constants";
import { Monster5e } from "@/types/monster5e";
import { create } from "zustand";

interface CreatureStoreProps {
	creature: Monster5e;
	setCreature: (creature: Monster5e) => void;
	updateCreature: (data: Partial<Monster5e>) => void;
}

export const useCreaturesStoreV2 = create<CreatureStoreProps>((set) => ({
	creature: initialCreature,
	setCreature: (data) =>
		set((prevState) => {
			return { creature: data || prevState.creature };
		}),
	updateCreature: (data) =>
		set((prevState) => {
			return { creature: { ...prevState.creature, ...data } };
		}),
}));
