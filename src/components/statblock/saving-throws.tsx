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
		<div className="flex gap-1">
			<h4>Saving Throws</h4>
			<p>
				<span>
					{strength_save && strength_save !== 0 && `Str +${strength_save}, `}
				</span>
				<span>
					{dexterity_save && dexterity_save !== 0 && `Dex +${dexterity_save}, `}
				</span>
				<span>
					{constitution_save &&
						constitution_save !== 0 &&
						`Con +${constitution_save}, `}
				</span>
				<span>
					{intelligence_save &&
						intelligence_save !== 0 &&
						`Int +${intelligence_save}, `}
				</span>
				<span>
					{wisdom_save && wisdom_save !== 0 && `Wis +${wisdom_save}, `}
				</span>
				<span>
					{charisma_save && charisma_save !== 0 && `Cha +${wisdom_save}`}
				</span>
			</p>
		</div>
	);
}

export default SavingThrows;
