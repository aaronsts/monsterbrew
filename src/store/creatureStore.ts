import { CHALLENGE_RATINGS, initialCreature } from "@/lib/constants";
import { Monster5e, SavingThrow, Skill } from "@/types/monster5e";
import { create } from "zustand";

interface CreatureStoreProps {
	creature: Monster5e;
	savingThrows: SavingThrow[];
	skills: Skill[];
	setSavingThrows: (savingThrows: SavingThrow[]) => void;
	setSkills: (skill: Skill[]) => void;
	setCreature: (creature: Monster5e) => void;
	updateCreature: (data: Partial<Monster5e>) => void;
	challengeRating: () => { label: string; value: string; prof: number };
}

export const useCreaturesStoreV2 = create<CreatureStoreProps>((set, get) => ({
	creature: initialCreature,
	savingThrows: [],
	skills: [],
	setSavingThrows: (data) => set(() => ({ savingThrows: [...data] })),
	setSkills: (data) => set(() => ({ skills: [...data] })),
	challengeRating: () =>
		CHALLENGE_RATINGS.find(
			(cr) => get().creature.challenge_rating === cr.label
		) || { label: "0", value: "10", prof: 2 },

	setCreature: (data) =>
		set((prevState) => {
			return { creature: data || prevState.creature };
		}),
	updateCreature: (data) =>
		set((prevState) => {
			return { creature: { ...prevState.creature, ...data } };
		}),
}));
