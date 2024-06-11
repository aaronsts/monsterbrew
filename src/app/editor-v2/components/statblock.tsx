import BaseInformation from "./base-information";
import Stats from "./stats";

export default function Statblock() {
	return (
		<div className="w-full print:columns-2 text-cararra-950 space-y-3">
			<BaseInformation />
			<Stats />
		</div>
	);
}
