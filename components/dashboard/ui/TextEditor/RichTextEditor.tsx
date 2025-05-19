// components/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Image],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose min-h-[200px] p-2 border rounded",
      },
    },
    // Fix SSR issue
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button
          onClick={() => {
            const url = prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          Image
        </button>
        <button
          onClick={() => {
            const url = prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
