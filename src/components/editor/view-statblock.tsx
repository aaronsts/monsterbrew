"use client";
import Statblock from "../statblock/statblock";
import { Open5e } from "@sturlen/open5e-ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { Monster5e } from "@/types/monster5e";
import { Button } from "../ui/button";
import { useReactToPrint } from "react-to-print";
import PdfStatblock from "../statblock/pdf-statblock";

interface IViewStatblock {
	value: string | undefined;
	creature: Monster5e | undefined;
	setCreature: React.Dispatch<React.SetStateAction<Monster5e | undefined>>;
}

export default function ViewStatblock(props: IViewStatblock) {
	const { creature, setCreature, value } = props;
	const [localCreature, setLocalCreature] = useState("");
	const [isLoading, setLoading] = useState(true);

	const componentRef = useRef(null);

	const reactToPrintContent = useCallback(() => {
		return componentRef.current;
	}, []);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: `${creature?.name}`,
		removeAfterPrint: true,
	});

	const getCreature = useCallback(async () => {
		const api = await new Open5e();
		if (value) {
			const result = await api.monsters.get(value);
			setCreature(result as Monster5e);
			setLoading(false);
		} else {
			const result = await api.monsters.get("ancient-black-dragon");
			setCreature(result as Monster5e);
			setLoading(false);
		}
	}, [setCreature, value]);

	useEffect(() => {
		getCreature();
	}, [getCreature, setCreature, value]);

	useEffect(() => {
		if (!localStorage.hasOwnProperty("monsterbrew-creature")) return;
		setLocalCreature(localStorage.getItem("monsterbrew-creature") as string);
	}, []);

	const loadLocalCreature = () => {
		const localStorageCreature = localStorage.getItem("monsterbrew-creature");
		if (!localStorageCreature) return;
		setCreature(JSON.parse(localStorageCreature));
	};

	return (
		<div className="w-full space-y-2">
			<div className="flex gap-3">
				{localCreature && (
					<Button variant="secondary" onClick={loadLocalCreature}>
						Load Local Creature
					</Button>
				)}
				<Button onClick={handlePrint} variant="primary">
					Save to PDF
				</Button>
			</div>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				creature && <Statblock creature={creature} />
			)}
			<div className="hidden">
				{creature && <PdfStatblock ref={componentRef} creature={creature} />}
			</div>
		</div>
	);
}
