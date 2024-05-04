"use client";

import { IGetCreatures } from "@/app/editor/page";
import { CreatureListSelect } from "./creature-list-select";
import Statblock from "./statblock";
import { Monster5e, Open5e } from "@sturlen/open5e-ts";
import { useCallback, useEffect, useState } from "react";

interface ILoadCreatureStatblock {
	data: IGetCreatures;
}

export default function LoadCreatureStatblock(props: ILoadCreatureStatblock) {
	const creatures = props.data.results;
	const [value, setValue] = useState("ancient-black-dragon");
	const [isLoading, setLoading] = useState(true);
	const [creature, setCreature] = useState<Monster5e>();

	const getCreature = useCallback(async () => {
		const api = await new Open5e();
		const res = await api.monsters.get(value);
		setCreature(res);
		setLoading(false);
	}, [value]);

	useEffect(() => {
		const localStorageCreature = localStorage.getItem("monsterbrew-creature");
		if (localStorageCreature) {
			setCreature(JSON.parse(localStorageCreature));
		} else if (value.length > 0) {
			getCreature();
		}
	}, [getCreature, value]);

	return (
		<div className="w-full space-y-2">
			{creatures && (
				<CreatureListSelect
					creatures={creatures}
					value={value}
					setValue={setValue}
				/>
			)}
			{isLoading && <p>Loading...</p>}
			{creature && <Statblock creature={creature} />}
		</div>
	);
}
