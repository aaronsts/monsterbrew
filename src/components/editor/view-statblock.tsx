"use client";

import { IGetCreatures } from "@/app/editor/page";
import { CreatureListSelect } from "../creature-list-select";
import Statblock from "../statblock";
import { Open5e } from "@sturlen/open5e-ts";
import { useCallback, useEffect, useState } from "react";
import { Monster5e } from "@/types/monster5e";
import { Button } from "../ui/button";

interface IViewStatblock {
	creatureList: IGetCreatures;
	creature: Monster5e | undefined;
	setCreature: React.Dispatch<React.SetStateAction<Monster5e | undefined>>;
}

export default function ViewStatblock(props: IViewStatblock) {
	const creatures = props.creatureList.results;
	const { creature, setCreature } = props;

	const [value, setValue] = useState("ancient-black-dragon");
	const [isLoading, setLoading] = useState(true);
	const getCreature = useCallback(async () => {
		const api = await new Open5e();
		const result = await api.monsters.get(value);
		setCreature(result as Monster5e);
		setLoading(false);
	}, [setCreature, value]);

	useEffect(() => {
		getCreature();
	}, [getCreature, setCreature, value]);

	const loadLocalCreature = () => {
		const localStorageCreature = localStorage.getItem("monsterbrew-creature");
		if (!localStorageCreature) return;
		setCreature(JSON.parse(localStorageCreature));
	};

	return (
		<div className="w-full space-y-2">
			<div className="flex gap-3">
				{creatures && (
					<CreatureListSelect
						creatures={creatures}
						value={value}
						setValue={setValue}
						getCreature={getCreature}
					/>
				)}
				{localStorage.getItem("monsterbrew-creature") && (
					<Button onClick={loadLocalCreature}>Load Local Creature</Button>
				)}
			</div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				creature && <Statblock creature={creature} />
			)}
		</div>
	);
}
