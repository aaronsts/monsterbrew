import { useCreaturesStoreV2 } from "@/store/creatureStore";
import BaseInformation from "./base-information";
import Stats from "./stats";

export default function Statblock() {
	const { creature } = useCreaturesStoreV2();

	const senses = creature.senses?.split(" passive") || "";

	return (
		<div className="w-full print:columns-2 text-cararra-950 space-y-3">
			<BaseInformation />
			<Stats />

			<div className="space-y-3">
				<p className="font-yatra">
					Senses{" "}
					<span className="font-sans">{senses[0]} passive Perception</span>
				</p>
			</div>
		</div>
	);
}
