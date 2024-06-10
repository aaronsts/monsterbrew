import ClientEditor from "@/components/editor/client-editor";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Editor() {
	const queryClient = new QueryClient();

	return (
		<Suspense>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<ClientEditor />
			</HydrationBoundary>
		</Suspense>
	);
}
