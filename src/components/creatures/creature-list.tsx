"use client";

import { creatureColumns } from "@/app/creatures/components/columns";
import { DataTable } from "@/app/creatures/components/data-table";
import { getInitialCreatures, searchCreature } from "@/services/creatures";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CreatureList() {
	// const { data, isLoading } = useQuery({
	// 	queryKey: ["initial_creatures"],
	// 	queryFn: getInitialCreatures,
	// });

	// const { data, isLoading } = useQuery({
	// 	queryKey: ["searchCreature", searchValue],
	// 	queryFn: () => searchCreature(searchValue),
	// });

	return (
		<>
			<DataTable columns={creatureColumns} />
		</>
	);
}
