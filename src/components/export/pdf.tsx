import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";
import { useCreaturesStore } from "@/store/zustand";
import { useCallback, useRef } from "react";
import PdfStatblock from "../statblock/pdf-statblock";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function ExportPdf() {
	const { creature } = useCreaturesStore();
	const componentRef = useRef(null);

	const reactToPrintContent = useCallback(() => {
		return componentRef.current;
	}, []);

	const handlePrint = useReactToPrint({
		content: reactToPrintContent,
		documentTitle: `${creature?.name}`,
		removeAfterPrint: true,
	});
	return (
		<>
			<DropdownMenuItem onClick={handlePrint}>PDF</DropdownMenuItem>
			<div className="hidden">
				<PdfStatblock ref={componentRef} />
			</div>
		</>
	);
}
