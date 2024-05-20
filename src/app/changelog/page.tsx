import { Divider } from "@/components/ui/divider";

export default async function Changelog() {
	return (
		<div className="prose prose-zinc prose-h3:mb-0 prose-h3:leading-tight prose-p:my-3">
			<h2>Changelog</h2>
			<div>
				<Divider />
				<h3>V1.2.0</h3>
				<p>Bugfixes</p>
			</div>
			<div>
				<Divider />
				<h3>V1.1.0</h3>
				<p>Bugfixes</p>
			</div>
			<div>
				<Divider />
				<h3>V1.0.0 Initial Release</h3>
				<span className="font-short">Thursday - 09/05/2024</span>
				<p>
					After some work, I was finally content with showing the project to the
					public, still a lot of work to do. But ready for user testing.
				</p>
				<ul className="list-disc">
					<li>Create creature from scratch</li>
					<li>Display creature</li>
					<li>Edit Creature</li>
					<li>Add Export Options</li>
				</ul>
			</div>
		</div>
	);
}
