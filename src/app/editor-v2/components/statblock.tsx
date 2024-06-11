import BaseInformation from "./base-information";

export default function Statblock() {
	return (
		<div className="w-full print:columns-2 text-cararra-950 space-y-3">
			<BaseInformation />
		</div>
	);
}
