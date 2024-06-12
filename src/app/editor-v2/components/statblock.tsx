import { useCreaturesStoreV2 } from "@/store/creatureStore";
import BaseInformation from "./base-information";
import Stats from "./stats";

export default function Statblock() {
	const { creature } = useCreaturesStoreV2();
	return (
		<div className="w-full print:columns-2 text-cararra-950 space-y-3">
			<BaseInformation />
			<Stats />
			<div className="space-y-3">
				<p className="font-yatra">
					Senses <span className="font-sans">{creature.senses}</span>
				</p>
			</div>
		</div>
	);
}
