import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import ClientEditor from "./components/client-editor";

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
