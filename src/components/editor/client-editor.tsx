"use client";

import { useEffect } from "react";
import StatblockForm from "./statblock-form";
import { useQuery } from "@tanstack/react-query";
import { getAllCreatures } from "@/services/creatures";
import { useCreaturesStore } from "@/store/zustand";
import { useCreatureForm } from "@/hooks/use-creature-form";
import { CreatureListSelect } from "../creature-list-select";
import { Button } from "../ui/button";
import ExportOptions from "../export/export-options";
import Statblock from "../statblock/statblock";
import ImportButton from "../import-button";

export default function ClientEditor() {
	const { setCreatures } = useCreaturesStore();
	const { form, loadCreatureValues, onSubmit } = useCreatureForm();

	const { data } = useQuery({
		queryKey: ["creatures"],
		queryFn: getAllCreatures,
	});

	useEffect(() => {
		if (!data) return;
		setCreatures(data.results);
	}, [data, setCreatures]);

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<div className="space-y-3">
				<div className="flex justify-between gap-2 pb-3">
					<ImportButton />
				</div>
				<StatblockForm form={form} onSubmit={onSubmit} />
			</div>
			<div className="flex flex-col relative gap-3">
				<div className="print:hidden flex items-center justify-between sticky top-16 bg-white pb-3 gap-3">
					<CreatureListSelect />

					<ExportOptions />
				</div>
				<Statblock loadCreatureValues={loadCreatureValues} />
			</div>
		</div>
	);
}
