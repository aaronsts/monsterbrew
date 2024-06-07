import { API_BASE_URL } from "@/services/creatures";
import Dexie, { EntityTable, Table } from "dexie";
import { toast } from "sonner";

interface Creature {
	id?: number;
	name: string;
	slug: string;
	document__slug: string;
	challenge_rating: string;
	environments: string[];
	type: string;
	size: string;
}

const db = new Dexie("monsterbrewCreatures") as Dexie & {
	creatures: EntityTable<Creature, "id">;
};

db.version(1).stores({
	creatures: "++id, name, challenge_rating, type, size, document__slug",
});

// Populate
db.on("ready", function () {
	return db.creatures.count(async function (count) {
		if (count > 10) {
			console.log("Indexed DB already populated");
		} else {
			console.log("Database is empty. Populating...");
			await fetch(
				`${API_BASE_URL}/?format=json&limit=5000&fields=slug,name,challenge_rating,type,size,environments,document__slug&document__slug__in=5e,wotc-srd,tob,cc,tob2,dmag,menagerie,tob3,taldorei,tob-2023`
			)
				.then((data) => data.json())
				.then(async (data) => {
					data.results.forEach(async (creature: Creature) => {
						await db.creatures.add({
							...creature,
						});
					});
				})
				.then(() => console.log("Done Populating"))
				.catch((err) => {
					toast.error(`Something went wrong: ${err.message}`);
					console.error(err.message);
				});
		}
	});
});

export async function getDBCreatures() {
	return db.table("creatures").toArray();
}

export type { Creature };
export { db };
