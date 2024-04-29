"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline as UnderlineIcon } from "lucide-react";

const TiptapEditor = (props: {
	description: string;
	onChange: (...event: any[]) => void;
}) => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				class:
					"prose w-full max-w-full px-3 py-2 text-sm rounded-md min-h-[60px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
			},
		},
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2] },
				history: false,
			}),
			Underline,
			Placeholder.configure({
				placeholder: "ex. Amphibious. The dragon can breathe air and water.",
			}),
		],
		content: props.description,
		onUpdate({ editor }) {
			props.onChange(editor.getHTML());
		},
		editable: true,
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="border border-zinc-200 shadow-sm rounded-md">
			<ToggleGroup className="justify-start  p-2" type="multiple">
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
			<EditorContent className="border-t" editor={editor} />
		</div>
	);
};

export default TiptapEditor;
