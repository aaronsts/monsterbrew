"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2] },
				history: false,
			}),
			Underline,
		],
		content: "<p>Hello World! 🌎️</p>",
		editable: true,
	});

	if (!editor) {
		return null;
	}

	return (
		<div>
			<ToggleGroup type="multiple">
				<ToggleGroupItem
					value="bold"
					className={editor.isActive("bold") ? "bg-zinc-100 text-zinc-900" : ""}
					onClick={() => editor.chain().focus().toggleBold().run()}
					aria-label="Toggle bold"
				>
					<Bold className="w-4 h-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="italic"
					className={
						editor.isActive("italic") ? "bg-zinc-100 text-zinc-900" : ""
					}
					onClick={() => editor.chain().focus().toggleItalic().run()}
					aria-label="Toggle Italic"
				>
					<Italic className="w-4 h-4" />
				</ToggleGroupItem>
				<ToggleGroupItem
					value="underline"
					className={
						editor.isActive("underline") ? "bg-zinc-100 text-zinc-900" : ""
					}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					aria-label="Toggle Underline"
				>
					<UnderlineIcon className="w-4 h-4" />
				</ToggleGroupItem>
			</ToggleGroup>
			<EditorContent editor={editor} />;
		</div>
	);
};

export default Tiptap;
