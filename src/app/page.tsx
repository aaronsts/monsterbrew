import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col gap-3">
				<h1 className="font-yatra capitalize">
					Unique creatures <br /> for your D&D adventures
				</h1>
				<p className="font-short max-w-xl pb-3">
					Start from scratch or select a preset creature and bring it to life.
				</p>
				<div className="flex gap-2">
					<Link href="/editor" passHref legacyBehavior>
						<Button variant="primary" className="w-fit" size="lg">
							Start Creating
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
