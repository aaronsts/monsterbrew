import React from "react";

export default function SpecialThanks() {
	return (
		<div className="text-xl max-w-prose space-y-3">
			<h2>Disclaimers</h2>
			<p>
				The website uses{" "}
				<a
					rel="noopener noreferrer"
					className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
					target="_blank"
					href="https://plausible.io/privacy-focused-web-analytics"
				>
					Plausible Analytics
				</a>{" "}
				and{" "}
				<a
					rel="noopener noreferrer"
					className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
					target="_blank"
					href="https://sentry.io/welcome/"
				>
					Sentry Error Monitoring
				</a>{" "}
				to track any statistics or errors. No personal user data is collected.
			</p>
			<p>
				This tool is still in the early stages of development, there are a ton
				of features planned that, in time, will get added. If you have an idea
				or suggestion for a feature request, please send it to{" "}
				<a
					className="hover:underline underline-offset-2"
					href="mailto:aaron.staes@gmail.com"
				>
					aaron.staes@gmail.com
				</a>
				. Cheers!
			</p>
			<p>
				Monsterbrew relies on the API created by the awesome folks over at
				<a
					rel="noopener noreferrer"
					className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
					target="_blank"
					href="https://open5e.com/"
				>
					Open5e
				</a>
			</p>
			<p className="text-base">
				&quot;This work includes material taken from the System Reference
				Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available at{" "}
				<a
					rel="noopener noreferrer"
					className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
					target="_blank"
					href="https://dnd.wizards.com/resources/systems-reference-document"
				>
					https://dnd.wizards.com/resources/systems-reference-document
				</a>
				. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0
				International License available at{" "}
				<a
					rel="noopener noreferrer"
					className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
					target="_blank"
					href="https://creativecommons.org/licenses/by/4.0/legalcode"
				>
					https://creativecommons.org/licenses/by/4.0/legalcode
				</a>
				.&quot;
			</p>
		</div>
	);
}
