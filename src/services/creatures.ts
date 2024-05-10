import { Open5e } from "@sturlen/open5e-ts";
import { toast } from "sonner";

const API_BASE_URL = "https://api.open5e.com/monsters";

interface IgetCreatures {
	count: number;
	next: string | null;
	previous: string | null;
	results: { slug: string; name: string }[];
}

export async function getAllCreatures() {
	try {
		const res = await fetch(
			`${API_BASE_URL}/?format=json&limit=500&fields=slug,name&document__slug=wotc-srd`
		);
		if (!res.ok) throw new Error("Failed to fetch data");
		const data: IgetCreatures = await res.json();
		return data;
	} catch (error: any) {
		toast.error(`Something went wrong ${error.message}`);
	}
}

export async function getCreature(slug: string) {
	const api = new Open5e();
	try {
		const result = await api.monsters.get(slug);
		if (!result) throw new Error(`Failed to fetch data for ${slug}`);
		return result;
	} catch (error: any) {
		toast.error(`Something went wrong: ${error.message}`);
	}
}
