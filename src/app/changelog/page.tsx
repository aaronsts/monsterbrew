import { Divider } from "@/components/ui/divider";

export default async function Changelog() {
	return (
		<div className="prose max-w-4xl mx-auto prose-zinc prose-h3:mb-0 prose-h3:leading-tight prose-p:my-3">
			<h2>Changelog</h2>
			<div>
				<Divider />
				<h3>V1.6.0</h3>
				<span className="font-short">Friday - 07/06/2024</span>
				<p>
					WIth this release, It is easier to search for a specific creature that
					you want to use as a template. Creatures are stored locally for better
					and faster search results.
				</p>
				<ul>
					<li>
						A creatures page has been added with filters for Challenge Rating,
						Size, Type, Source and Environment.
					</li>
					<li>Removed the dropdown select in the editor.</li>
					<li>
						Multiple sources for homebrew mosnters have been added (all
						available via open5e)
					</li>
					<li>
						Creatures will be fetched and stored locally in the browser for
						better search results.
					</li>
				</ul>
			</div>
			<div>
				<Divider />
				<h3>V1.5.0</h3>
				<span className="font-short">Thursday - 30/05/2024</span>
				<p>
					Finally created a decent homepage. The main focus was on implementing
					support for Improved Initiative.
				</p>
				<ul>
					<li>Add Homepage w/ info about features.</li>
					<li>
						Add Improved Initiative as supported format for import / export
					</li>
				</ul>
			</div>
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
