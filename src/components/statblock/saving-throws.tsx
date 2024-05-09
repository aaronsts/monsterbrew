interface ISavingThrows {
	strength_save: number | undefined | null;
	dexterity_save: number | undefined | null;
	constitution_save: number | undefined | null;
	intelligence_save: number | undefined | null;
	wisdom_save: number | undefined | null;
	charisma_save: number | undefined | null;
}

function SavingThrows(props: ISavingThrows) {
	const {
		strength_save,
		dexterity_save,
		constitution_save,
		intelligence_save,
		wisdom_save,
		charisma_save,
	} = props;
	return (
		(strength_save ||
			dexterity_save ||
			constitution_save ||
			intelligence_save ||
			wisdom_save ||
			charisma_save) && (
			<p>
				<span className="font-yatra leading-none">Saving Throws </span>
				<span>{strength_save && `Str +${strength_save}, `}</span>
				<span>{dexterity_save && `Dex +${dexterity_save}, `}</span>
				<span>{constitution_save && `Con +${constitution_save}, `}</span>
				<span>{intelligence_save && `Int +${intelligence_save}, `}</span>
				<span>{wisdom_save && `Wis +${wisdom_save}, `}</span>
				<span>{charisma_save && `Cha +${wisdom_save}`}</span>
			</p>
		)
	);
}

export default SavingThrows;
