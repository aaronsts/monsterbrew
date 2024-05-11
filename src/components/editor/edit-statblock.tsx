"use client";

import { useEffect } from "react";
import StatblockForm from "./statblock-form";
import ViewStatblock from "./view-statblock";
import { useQuery } from "@tanstack/react-query";
import { getAllCreatures } from "@/services/creatures";
import { useCreaturesStore } from "@/store/zustand";

function EditStatblock() {
	const { setCreatures } = useCreaturesStore();

	const { data } = useQuery({
		queryKey: ["creatures"],
		queryFn: getAllCreatures,
	});

	useEffect(() => {
		if (!data) return;
		setCreatures(data.results);
	}, [data, setCreatures]);

	return (
		<div className="space-y-3 mb-6">
			<div className="grid md:grid-cols-2 gap-6">
				<StatblockForm />
				<ViewStatblock />
			</div>
		</div>
	);
}

export default EditStatblock;
