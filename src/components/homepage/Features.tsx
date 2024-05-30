import React from "react";
import potionIcon from "../../assets/potion-icons.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Features() {
	return (
		<div className="flex flex-col-reverse w-full justify-between items-center md:flex-row gap-12 py-12">
			<div className="max-w-prose md:w-2/3 grid grid-cols-2 gap-3 h-fit space-y-3 text-xl">
				<div className="space-y-3 col-span-2">
					<h2>Features</h2>
					<p>
						To start working on a creature in Monsterbrew, there are a couple
						option, you can create one from scratch, select an existing creature
						found in the SRD or you can import your own statblock.
					</p>
				</div>
				<div>
					<h3>Import Options</h3>
					<ul className="list-disc list-inside">
						<li>
							<a
								rel="noopener noreferrer"
								className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
								target="_blank"
								href="https://open5e.com/"
							>
								Open5e
							</a>{" "}
							JSON
						</li>
						<li>
							<a
								rel="noopener noreferrer"
								className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
								target="_blank"
								href="https://tetra-cube.com/dnd/dnd-statblock.html"
							>
								Tetra-cube
							</a>{" "}
							JSON (.monster files)
						</li>
						<li>
							<a
								rel="noopener noreferrer"
								className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
								target="_blank"
								href="https://improvedinitiative.app/"
							>
								Improved Initiative
							</a>{" "}
							JSON
						</li>
					</ul>
				</div>
				<div>
					<h3>Export Options</h3>
					<ul className="list-disc list-inside">
						<li>Open5e JSON </li>
						<li>Improved Initiative JSON </li>
						<li>
							<a
								rel="noopener noreferrer"
								className="underline underline-offset-4 text-zinc-500 hover:text-cararra-950"
								target="_blank"
								href="https://homebrewery.naturalcrit.com/"
							>
								Homebrewery V3
							</a>{" "}
							Markdown
						</li>
						<li>PDF</li>
					</ul>
				</div>

				<Link href="/editor" passHref legacyBehavior>
					<Button variant="primary" className="w-fit">
						Start Creating
					</Button>
				</Link>
			</div>
			<div className=" w-fit">
				<Image
					src={potionIcon}
					width={potionIcon.width}
					height={potionIcon.height}
					alt="Three icons of potions in sizes small, greater and superior potion"
				/>
			</div>
		</div>
	);
}
