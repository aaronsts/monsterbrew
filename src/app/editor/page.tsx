import EditStatblock from "@/components/editor/edit-statblock";
import { getAllCreatures } from "@/services/creatures";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { toast } from "sonner";

export interface IGetCreatures {
	count: number;
	next: string;
	previous: string | null;
	results: { slug: string; name: string }[];
}

export default async function Editor() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["creatures"],
		queryFn: getAllCreatures,
	});
	// const data: IGetCreatures = await getCreatures();
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<EditStatblock />
		</HydrationBoundary>
	);
}
