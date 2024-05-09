"use client";

import { useState } from "react";
import StatblockForm from "./statblock-form";
import ViewStatblock from "./view-statblock";
import { IGetCreatures } from "@/app/editor/page";
import { Monster5e } from "@/types/monster5e";
import { CreatureListSelect } from "../creature-list-select";

interface IEditStatblock {
	creatureList: IGetCreatures;
}

function EditStatblock({ creatureList }: IEditStatblock) {
	const [creature, setCreature] = useState<Monster5e>();
	const [value, setValue] = useState<string>();

	return (
		<div className="space-y-3 mb-6">
			{creatureList.results && (
				<CreatureListSelect
					creatures={creatureList.results}
					value={value}
					setValue={setValue}
				/>
			)}
			<div className="grid grid-cols-2 gap-6">
				<StatblockForm creature={creature} setCreature={setCreature} />
				<div>
					<ViewStatblock
						value={value}
						creature={creature}
						setCreature={setCreature}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditStatblock;
