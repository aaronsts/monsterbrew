import React from "react";

export default function About() {
	return (
		<div className="flex flex-col items-center py-6 gap-3">
			<h2>Why Monsterbrew</h2>
			<p className="text-xl  text-center  max-w-prose">
				Monsterbrew is a tool to create or customize creature statblock for
				Dungeons and Dragons 5th edition (D&D 5e). The goal is to provide an
				intuitive and user-friendly interface that makes it easy for Dungeon
				Masters to create new and unique creatures or tweak existing ones for
				their campaigns.
			</p>
		</div>
	);
}
