import { QueryClient } from "@tanstack/react-query";
import { getInitialCreatures } from "@/services/creatures";
import CreatureList from "@/components/creatures/creature-list";

export default async function Creatures() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["initialCreatures"],
		queryFn: getInitialCreatures,
	});

	return (
		<div>
			<CreatureList />
		</div>
	);
}
