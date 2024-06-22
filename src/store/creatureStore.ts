import { CHALLENGE_RATINGS } from "@/lib/constants";
import { Creature5e, SavingThrow, Skill } from "@/types/monster5e";
import { create } from "zustand";

interface CreatureStoreProps {
	creature: Creature5e | null;
	savingThrows: SavingThrow[];
	skills: Skill[];
	setSavingThrows: (savingThrows: SavingThrow[]) => void;
	setSkills: (skill: Skill[]) => void;
	setCreature: (creature: Creature5e) => void;
	updateCreature: (data: Partial<Creature5e>) => void;
	challengeRating: () => { label: string; value: string; prof: number };
}

export const useCreaturesStoreV2 = create<CreatureStoreProps>((set, get) => ({
	creature: null,
	savingThrows: [],
	skills: [],
	setSavingThrows: (data) => set(() => ({ savingThrows: [...data] })),
	setSkills: (data) => set(() => ({ skills: [...data] })),
	challengeRating: () => {
		if (get().creature)
			CHALLENGE_RATINGS.find(
				(cr) => get().creature!.challenge_rating === cr.label
			) || { label: "0", value: "10", prof: 2 };
		return { label: "0", value: "10", prof: 2 };
	},
	setCreature: (data) =>
		set(() => {
			return { creature: data };
		}),
	updateCreature: (data) =>
		set((prevState) => ({
			...prevState,
			creature: {
				...prevState.creature,
				...data,
			} as Creature5e,
		})),
}));
