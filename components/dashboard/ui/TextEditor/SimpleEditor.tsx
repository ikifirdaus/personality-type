"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";

type SimpleEditorProps = {
  content: string;
  onUpdate: (content: string) => void;
};

export function SimpleEditor({ content, onUpdate }: SimpleEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TaskList,
      TaskItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Typography,
    ],
    content,
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
    // ❗ penting
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-full border rounded p-2 min-h-[200px]",
      },
    },
    immediatelyRender: false, // <-- ini mencegah TipTap render di server
  });

  // Sync external content changes (e.g. reset form)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <EditorContent
      editor={editor}
      className="prose prose-sm max-w-full border rounded p-2 min-h-[200px]"
    />
  );
}
