"use client";

import { ListCreature } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { creatureColumns } from "./columns";
import { DataTable } from "./data-table";
import { getDBCreatures } from "@/database/db.model";

export default function ClientCreatureList() {
	const [tableCreatures, setTableCreatures] = useState<ListCreature[]>([]);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["initialCreatures"],
		queryFn: getDBCreatures,
	});

	useEffect(() => {
		if (!data) return;
		setTableCreatures(data);
		refetch();
	}, [data, refetch]);

	return (
		<DataTable
			data={tableCreatures}
			isLoading={isLoading}
			columns={creatureColumns}
		/>
	);
}
