import React from "react";
import { MainNavigation } from "./main-nav";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="h-64 bg-zinc-900 text-white ">
			<div className="py-6 max-w-6xl mx-auto px-3 flex justify-between">
				<div>
					<h2>Monsterbrew</h2>
				</div>
				<div className="w-1/3">
					<ul className="space-y-1 text-lg text-zinc-100">
						<li>
							<Link
								href="/"
								className="hover:underline underline-offset-2 text-zinc-300 transition-colors hover:text-white"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/editor"
								className="hover:underline underline-offset-2 text-zinc-300 transition-colors hover:text-white"
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
