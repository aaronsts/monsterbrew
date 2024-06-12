"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCreature } from "@/services/creatures";
import { useCreaturesStore } from "@/store/zustand";
import { useCreatureForm } from "@/hooks/use-creature-form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useSearchParams } from "next/navigation";
import Statblock from "./statblock";
import StatblockForm from "./statblock-form";
import { useCreaturesStoreV2 } from "@/store/creatureStore";

export default function ClientEditor() {
	const searchParams = useSearchParams();
	const { setSelectedCreature, selectedCreature } = useCreaturesStore();
	const { updateCreature } = useCreaturesStoreV2();

	useEffect(() => {
		const paramsCreature = searchParams.get("creature");
		if (paramsCreature === null) return;
		setSelectedCreature(paramsCreature as string);
	}, [searchParams, setSelectedCreature]);

	const { data, isLoading } = useQuery({
		queryKey: ["creature", selectedCreature],
		queryFn: () => getCreature(selectedCreature),
	});

	useEffect(() => {
		if (!data) return;
		updateCreature(data);
	}, [data, updateCreature]);

	return (
		<div className="grid md:grid-cols-2 gap-6">
			<StatblockForm />
			<div className="flex flex-col relative gap-3">
				{/* <div className="print:hidden flex items-center justify-end sticky top-16 bg-white py-3 gap-3">
					<ImportButton />
					<ExportOptions />
				</div> */}
				{isLoading ? <LoadingSpinner /> : <Statblock />}
			</div>
		</div>
	);
}
