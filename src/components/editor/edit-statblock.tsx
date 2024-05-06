"use client";

import React, { useState } from "react";
import StatblockForm from "./statblock-form";
import ViewStatblock from "./view-statblock";
import { IGetCreatures } from "@/app/editor/page";
import { Monster5e } from "@/types/monster5e";

interface IEditStatblock {
	creatureList: IGetCreatures;
}

function EditStatblock({ creatureList }: IEditStatblock) {
	const [creature, setCreature] = useState<Monster5e>();

	return (
		<div className="space-y-6 mb-6">
			<StatblockForm setCreature={setCreature} />
			<ViewStatblock
				creature={creature}
				setCreature={setCreature}
				creatureList={creatureList}
			/>
		</div>
	);
}

export default EditStatblock;
