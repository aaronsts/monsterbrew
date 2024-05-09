import React from "react";
import { MainNavigation } from "./main-nav";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className=" bg-cararra-950 text-white ">
			<div className="py-6 max-w-7xl h-full mx-auto px-3 flex flex-col gap-6 justify-between items-center">
				<div className="flex flex-col items-center justify-center gap-3">
					<h2>Monsterbrew</h2>

					<ul className="flex gap-3 text-lg">
						<li>
							<Link
								href="/"
								className="hover:underline font-short underline-offset-2 text-cararra-100 transition-colors hover:text-white"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/editor"
								className="hover:underline font-short underline-offset-2 text-cararra-100 transition-colors hover:text-white"
							>
								Editor
							</Link>
						</li>
					</ul>
				</div>

				<div className="space-y-6">
					<p className="text-center text-cararra-100 ">
						Any feedback or suggestions can be send to{" "}
						<a
							className="hover:underline underline-offset-2"
							href="mailto:aaron.staes@gmail.com"
						>
							aaron.staes@gmail.com
						</a>
					</p>
					<p className="text-center text-sm max-w-6xl text-cararra-100">
						&quot;This work includes material taken from the System Reference
						Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC and available
						at{" "}
						<a
							rel="noopener noreferrer"
							target="_blank"
							className="hover:underline underline-offset-2"
							href="https://dnd.wizards.com/resources/systems-reference-document"
						>
							https://dnd.wizards.com/resources/systems-reference-document
						</a>
						. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0
						International License available at{" "}
						<a
							rel="noopener noreferrer"
							target="_blank"
							className="hover:underline underline-offset-2"
							href="https://creativecommons.org/licenses/by/4.0/legalcode"
						>
							https://creativecommons.org/licenses/by/4.0/legalcode
						</a>
						.&quot;
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
