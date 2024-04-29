"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({ heading: { levels: [1, 2] }, history: false }),
		],
		content: "<p>Hello World! 🌎️</p>",
		editable: true,
	});

	return (
		<div>
			<div>
				<button
					type="button"
					onClick={() => editor?.chain().focus().toggleBold().run()}
				>
					Bold
				</button>
			</div>
			<EditorContent editor={editor} />;
		</div>
	);
};

export default Tiptap;
