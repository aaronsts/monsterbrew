"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCreatures, getCreature } from "@/services/creatures";
import { useCreaturesStore } from "@/store/zustand";
import { useCreatureForm } from "@/hooks/use-creature-form";
import { CreatureListSelect } from "../creature-list-select";
import StatblockForm from "./statblock-form";
import ExportOptions from "../export/export-options";
import Statblock from "../statblock/statblock";
import ImportButton from "../import-button";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "../ui/loading-spinner";

export default function ClientEditor() {
	const searchParams = useSearchParams();
	const { setCreatures, setSelectedCreature, selectedCreature } =
		useCreaturesStore();
	const { form, loadCreatureValues, onSubmit } = useCreatureForm();

	const { data } = useQuery({
		queryKey: ["creatures"],
		queryFn: getAllCreatures,
	});

	useEffect(() => {
		if (!data) return;
		setCreatures(data.results);
	}, [data, setCreatures]);

	useEffect(() => {
		const paramsCreature = searchParams.get("creature");
		if (paramsCreature === null) return;
		setSelectedCreature(paramsCreature as string);
	}, [searchParams, setSelectedCreature]);

	const { isLoading } = useQuery({
		queryKey: ["creature", selectedCreature],
		queryFn: () => getCreature(selectedCreature),
	});

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<StatblockForm form={form} onSubmit={onSubmit} />
			<div className="flex flex-col relative gap-3">
				<div className="print:hidden flex items-center justify-end sticky top-16 bg-white py-3 gap-3">
					<ImportButton />
					<ExportOptions />
				</div>
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<Statblock loadCreatureValues={loadCreatureValues} />
				)}
			</div>
		</div>
	);
}
