import React from "react";
import { MainNavigation } from "./main-nav";
import Link from "next/link";
import MonsterbrewLogo from "./monsterbrew-logo";

const Footer = () => {
	return (
		<footer className="print:hidden mt-auto bg-cararra-950 text-white ">
			<div className="py-6 max-w-7xl h-full mx-auto px-3 flex flex-col gap-6 justify-between items-center">
				<div className="flex flex-col items-center justify-center gap-3">
					<Link href="/" className="fill-cararra-50 flex gap-2 items-center">
						<MonsterbrewLogo />
						<p className="hidden md:block font-yatra text-3xl">Monsterbrew</p>
					</Link>

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
			</div>
		</footer>
	);
};

export default Footer;
