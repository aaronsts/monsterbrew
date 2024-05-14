import { initialCreature } from "@/lib/constants";
import { ISavingThrow, ISkill } from "@/types";
import { Monster5e } from "@/types/monster5e";
import { create } from "zustand";

interface CreatureFormStore {
	savingThrows: ISavingThrow[];
	setSavingThrows: (save: ISavingThrow) => void;
	skillList: ISkill[];
	setSkillList: (skill: ISkill) => void;
	damageList: string[];
	setDamageList: (dmg: string) => void;
	conditionList: string[];
	setConditionList: (condition: string) => void;
}

export const useCreatureFormStore = create<CreatureFormStore>((set) => ({
	savingThrows: [],
	setSavingThrows: (save) =>
		set((prevState) => ({ savingThrows: [...prevState.savingThrows, save] })),
	skillList: [],
	setSkillList: (skl) =>
		set((prevState) => ({ skillList: [...prevState.skillList, skl] })),
	damageList: [],
	setDamageList: (dmg) =>
		set((prevState) => ({ damageList: [...prevState.damageList, dmg] })),
	conditionList: [],
	setConditionList: (condition) =>
		set((prevState) => ({
			conditionList: [...prevState.conditionList, condition],
		})),
}));
