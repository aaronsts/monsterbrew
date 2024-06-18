import { QueryClient } from "@tanstack/react-query";
import { getAllCreatures } from "@/services/creatures";
import ClientCreatureList from "./components/client-creature-list";

export default async function Creatures() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["initialCreatures"],
		queryFn: getAllCreatures,
	});

	return <ClientCreatureList />;
}
