"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";

import { Link } from "@/components/(tiptap)/tiptap-extension/link-extension";
import { Selection } from "@/components/(tiptap)/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/(tiptap)/tiptap-extension/trailing-node-extension";

import { Button } from "@/components/(tiptap)/tiptap-ui-primitive/button";
import { Spacer } from "@/components/(tiptap)/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/(tiptap)/tiptap-ui-primitive/toolbar";

import { ImageUploadNode } from "@/components/(tiptap)/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/(tiptap)/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/(tiptap)/tiptap-node/list-node/list-node.scss";
import "@/components/(tiptap)/tiptap-node/image-node/image-node.scss";
import "@/components/(tiptap)/tiptap-node/paragraph-node/paragraph-node.scss";

import { HeadingDropdownMenu } from "@/components/(tiptap)/tiptap-ui/heading-dropdown-menu";
// import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/(tiptap)/tiptap-ui/list-dropdown-menu";
import { BlockQuoteButton } from "@/components/(tiptap)/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/(tiptap)/tiptap-ui/code-block-button";
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/(tiptap)/tiptap-ui/color-highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/(tiptap)/tiptap-ui/link-popover";
import { MarkButton } from "@/components/(tiptap)/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/(tiptap)/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/(tiptap)/tiptap-ui/undo-redo-button";

import { ArrowLeftIcon } from "@/components/(tiptap)/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/(tiptap)/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/(tiptap)/tiptap-icons/link-icon";

import { useMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

import "@/components/(tiptap)/tiptap-templates/simple/simple-editor.scss";

interface SimpleEditorProps {
  content?: string; // JSON string dari editor
  onChange?: (content: string) => void;
}

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <BlockQuoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup> */}

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

export function SimpleEditor({ content, onChange }: SimpleEditorProps) {
  const isMobile = useMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  // Buat editor, tapi jangan langsung set content di initial karena nanti akan di-sync via effect
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: "", // kosong dulu
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      try {
        const str = JSON.stringify(json);
        onChange?.(str);
      } catch {
        // ignore
      }
    },
  });

  // Sync content dari prop ke editor setiap kali content prop berubah
  React.useEffect(() => {
    if (!editor) return;
    if (!content) {
      // kalau kosong, reset editor jadi kosong
      editor.commands.clearContent();
      return;
    }
    try {
      const json = JSON.parse(content);
      // cuma update kalau json beda dengan content editor saat ini (hindari loop)
      const current = editor.getJSON();
      if (JSON.stringify(current) !== JSON.stringify(json)) {
        editor.commands.setContent(json, false);
      }
    } catch (error) {
      console.error("SimpleEditor: gagal parsing content prop", error);
    }
  }, [content, editor]);

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="border rounded-lg">
        <Toolbar
          ref={toolbarRef}
          style={
            isMobile
              ? {
                  bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`,
                }
              : {}
          }
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <div className="content-wrapper">
          <EditorContent
            editor={editor}
            role="presentation"
            className="simple-editor-content "
          />
        </div>
      </div>
    </EditorContext.Provider>
  );
}
