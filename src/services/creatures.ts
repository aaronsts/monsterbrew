import { Monster5e } from "@/types/monster5e";
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

export async function getInitialCreatures() {
	try {
		const res = await fetch(
			`${API_BASE_URL}/?format=json&limit=5000&fields=slug,name,challenge_rating,type,size,environments,document__slug&document__slug__in=5e,wotc-srd,tob,cc,tob2,dmag,menagerie,tob3,taldorei,tob-2023`
		);
		if (!res.ok) throw new Error("Failed to fetch data");
		const data: any = await res.json();
		return data;
	} catch (error: any) {
		toast.error(`Something went wrong ${error.message}`);
	}
}

export async function searchCreature(searchParams: string) {
	try {
		const res = await fetch(`${API_BASE_URL}/?search=${searchParams}`);
		if (!res.ok) throw new Error(`Failed to fetch data for ${searchParams}`);
		const data = await res.json();
		return data;
	} catch (error: any) {
		toast.error(`Something went wrong: ${error.message}`);
	}
}

export async function getCreature(slug: string) {
	try {
		const res = await fetch(`${API_BASE_URL}/${slug}`);
		if (!res.ok) throw new Error(`Failed to fetch data for ${slug}`);
		const data: Monster5e = await res.json();
		return data;
	} catch (error: any) {
		toast.error(`Something went wrong: ${error.message}`);
	}
}
