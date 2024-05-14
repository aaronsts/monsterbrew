import { ISavingThrow, ISkill } from "@/types";
import { create } from "zustand";

interface CreatureFormStore {
	savingThrows: ISavingThrow[];
	setSavingThrows: (save: ISavingThrow[]) => void;
	skillList: ISkill[];
	setSkillList: (skill: ISkill[]) => void;
	damageList: string[];
	setDamageList: (dmg: string[]) => void;
	conditionList: string[];
	setConditionList: (condition: string[]) => void;
}

export const useCreatureFormStore = create<CreatureFormStore>((set) => ({
	savingThrows: [],
	setSavingThrows: (save) => set(() => ({ savingThrows: [...save] })),
	skillList: [],
	setSkillList: (skl) => set(() => ({ skillList: [...skl] })),
	damageList: [],
	setDamageList: (dmg) => set(() => ({ damageList: [...dmg] })),
	conditionList: [],
	setConditionList: (cnd) => set(() => ({ conditionList: [...cnd] })),
}));
