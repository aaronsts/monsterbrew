"use client";
import Statblock from "../statblock/statblock";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useReactToPrint } from "react-to-print";
import PdfStatblock from "../statblock/pdf-statblock";
import { useCreaturesStore } from "@/store/zustand";

export default function ViewStatblock() {
	const { creature, setCreature } = useCreaturesStore();
	const [localCreature, setLocalCreature] = useState("");

	const componentRef = useRef(null);

	const reactToPrintContent = useCallback(() => {
		return componentRef.current;
	}, []);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: `${creature?.name}`,
		removeAfterPrint: true,
	});

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
			<div className="bg-white md:sticky z-30 top-16">
				<div className="flex gap-3 pb-3">
					{localCreature && (
						<Button variant="secondary" onClick={loadLocalCreature}>
							Load Local Creature
						</Button>
					)}
					<Button onClick={handlePrint} variant="primary">
						Save to PDF
					</Button>
				</div>
			</div>
			<Statblock />
			<div className="hidden">
				{creature && <PdfStatblock ref={componentRef} creature={creature} />}
			</div>
		</div>
	);
}
