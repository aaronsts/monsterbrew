"use client";

import { useState } from "react";
import StatblockForm from "./statblock-form";
import ViewStatblock from "./view-statblock";
import { IGetCreatures } from "@/app/editor/page";
import { Monster5e } from "@/types/monster5e";
import { CreatureListSelect } from "../creature-list-select";
import { useQuery } from "@tanstack/react-query";
import { getAllCreatures, getCreature } from "@/services/creatures";

function EditStatblock() {
	const [creature, setCreature] = useState<Monster5e>();
	const [value, setValue] = useState<string>("ancient-black-dragon");

	// This useQuery could just as well happen in some deeper
	// child to <Posts>, data will be available immediately either way
	const { data: creatureList } = useQuery({
		queryKey: ["creatures"],
		queryFn: getAllCreatures,
	});

	const { data } = useQuery({
		queryKey: ["creature", value],
		queryFn: ({ queryKey }) => getCreature(queryKey[1]),
	});

	return (
		<div className="space-y-3 mb-6">
			{creatureList && (
				<CreatureListSelect
					options={creatureList.results}
					setValue={setValue}
				/>
			)}
			<div className="grid md:grid-cols-2 gap-6">
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
