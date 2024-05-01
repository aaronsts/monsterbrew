import CreateStatblock from "@/components/create-statblock";
import { CreatureListSelect } from "@/components/creature-list-select";
import Statblock from "@/components/statblock";
import { Monster5e, Open5e } from "@sturlen/open5e-ts";

interface IGetCreatures {
	count: number;
	next: string;
	previous: string | null;
	results: { slug: string; name: string }[];
}

const api = new Open5e();

async function getCreatures() {
	try {
		const res = await fetch(
			"https://api.open5e.com/monsters/?format=json&fields=slug,name&limit=10&document__slug=wotc-srd"
		);
		if (!res.ok) throw new Error("Failed to fetch data");
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function getData() {
	try {
		const res = await api.monsters.get("wolf");
		return res;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
}

export default async function Editor() {
	const creature: Monster5e | undefined = await getData();
	const { results: creatures }: IGetCreatures = await getCreatures();

	return (
		<div>
			<h1>Create a monster</h1>
			<div className="flex gap-12 mb-6">
				<CreateStatblock />
				<div>
					<div>{creatures && <CreatureListSelect creatures={creatures} />}</div>
					{creature && <Statblock creature={creature} />}
				</div>
			</div>
		</div>
	);
}
