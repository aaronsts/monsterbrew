import { QueryClient } from "@tanstack/react-query";
import { getInitialCreatures } from "@/services/creatures";
import { DataTable } from "./components/data-table";
import { creatureColumns } from "./components/columns";

export default async function Creatures() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["initialCreatures"],
		queryFn: getInitialCreatures,
	});

	return <DataTable columns={creatureColumns} />;
}
