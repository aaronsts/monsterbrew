import CreateStatblock from "@/components/create-statblock";
import Statblock from "@/components/statblock";
import { Monster5e, Open5e } from "@sturlen/open5e-ts";

async function getData() {
	const api = new Open5e();
	try {
		const res = await api.monsters.get("wolf");
		return res;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
}

export default async function Editor() {
	const ancientBlackDragon: Monster5e | undefined = await getData();
	return (
		<div>
			<h1>Create a monster</h1>
			<div className="flex gap-12 mb-6">
				<CreateStatblock />
				{ancientBlackDragon && <Statblock creature={ancientBlackDragon} />}
			</div>
		</div>
	);
}
