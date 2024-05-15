import ClientEditor from "@/components/editor/client-editor";
import { getAllCreatures } from "@/services/creatures";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function Editor() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["creatures"],
		queryFn: getAllCreatures,
	});
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ClientEditor />
		</HydrationBoundary>
	);
}
