import ClientEditor from "@/components/editor/client-editor";
import { getAllCreatures } from "@/services/creatures";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Info } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Editor() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["creatures"],
    queryFn: getAllCreatures,
  });
  return (
    <Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="bg-cararra-100 border border-cararra-800 px-4 py-3 rounded-md flex gap-2">
          <Info />
          <div>
            <h3>Monsterbrew V2</h3>
            <p className="leading-snug">
              I have been working on the next version of monsterbrew for quite a
              while now, it will soon be released and replace this one. <br />{" "}
              You can already test it out here:{" "}
              <Link
                className="font-semibold hover:underline underline-offset-2"
                href="https://monsterbrew-app.vercel.app/"
                target="_blank"
              >
                Visit Monsterbrew V2
              </Link>
            </p>
          </div>
        </div>
        <ClientEditor />
      </HydrationBoundary>
    </Suspense>
  );
}
