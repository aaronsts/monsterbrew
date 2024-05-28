import { Divider } from "@/components/ui/divider";

export default async function Changelog() {
	return (
		<div className="prose prose-zinc prose-h3:mb-0 prose-h3:leading-tight prose-p:my-3">
			<h2>Changelog</h2>
			<div>
				<Divider />
				<h3>V1.4.0</h3>
				<span className="font-short">Tuesday - 28/05/2024</span>
				<p>
					More bugfixes, added Error monitoring from Sentry. Markdown is now
					supported in action and ability components.
				</p>
				<ul>
					<li>Update styling for navigation</li>
					<li>fix: Add reactions to statblock </li>
					<li>fix: Add error message when creature is undefined </li>
					<li>Add Sentry for Error Monitoring </li>
					<li>Support Markdown in action & abilitiy components </li>
					<li>Add description to form </li>
					<li>updated README </li>
				</ul>
			</div>
			<div>
				<Divider />
				<h3>V1.3.0</h3>
				<p>
					General bugfixes, tetra-cube monster files are better supported when
					uploading. Added a changelog page to keep track of updates and
					changes. Added Mythic Actions and Regional effects to the creature
					form.
				</p>
				<ul>
					<li>fix: sync open5e format</li>
					<li>feat: add changelog page</li>
					<li>fix: tetra converter</li>
					<li>feat: add print styles</li>
					<li>feat: Mythic and regionals</li>
				</ul>
			</div>
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
