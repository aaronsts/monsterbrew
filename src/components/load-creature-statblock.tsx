"use client";

import * as React from "react";
import { IGetCreatures } from "@/app/editor/page";
import { CreatureListSelect } from "./creature-list-select";
import Statblock from "./statblock";
import { Monster5e, Open5e } from "@sturlen/open5e-ts";

interface ILoadCreatureStatblock {
	data: IGetCreatures;
}

export default function LoadCreatureStatblock(props: ILoadCreatureStatblock) {
	const creatures = props.data.results;
	const [value, setValue] = React.useState("");
	const [creature, setCreature] = React.useState<Monster5e>();

	React.useEffect(() => {
		async function getCreature() {
			const api = await new Open5e();
			const res = await api.monsters.get(value);
			setCreature(res);
		}
		if (value.length > 0) {
			getCreature();
		}
	}, [value]);

	return (
		<div>
			<div>
				{creatures && (
					<CreatureListSelect
						creatures={creatures}
						value={value}
						setValue={setValue}
					/>
				)}
			</div>
			{creature && <Statblock creature={creature} />}
		</div>
	);
}
