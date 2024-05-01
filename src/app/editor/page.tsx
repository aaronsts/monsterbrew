import CreateStatblock from "@/components/create-statblock";
import LoadCreatureStatblock from "@/components/load-creature-statblock";
import { toast } from "sonner";

export interface IGetCreatures {
	count: number;
	next: string;
	previous: string | null;
	results: { slug: string; name: string }[];
}

async function getCreatures() {
	try {
		const res = await fetch(
			"https://api.open5e.com/monsters/?format=json&limit=500&fields=slug,name&document__slug=wotc-srd"
		);
		if (!res.ok) throw new Error("Failed to fetch data");
		const data = await res.json();
		return data;
	} catch (error: any) {
		toast.error(`Something went wrong ${error.message}`);
	}
}

export default async function Editor() {
	const data: IGetCreatures = await getCreatures();
	return (
		<div>
			<h1>Create a monster</h1>

			<div className="flex gap-12 mb-6">
				<CreateStatblock />
				<LoadCreatureStatblock data={data} />
			</div>
		</div>
	);
}
