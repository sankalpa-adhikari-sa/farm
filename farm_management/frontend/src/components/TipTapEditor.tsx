import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapToolbar from "./TipTapToolbar";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
//do not use starterkit import and modify seperately
function TipTapEditor({
  description,
  onChange,
  placeholder,
}: {
  description: string;
  onChange: any;
  placeholder: string;
}) {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass:
          "first:before:text-muted-foreground text-sm first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
        emptyNodeClass:
          "first:before:text-muted-foreground text-sm first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
      Document,
      Paragraph,
      Text,
      TextAlign.configure({
        defaultAlignment: "left",
        types: ["paragraph"],
      }),
      Italic,
      Bold,
      BulletList.configure({
        HTMLAttributes: {
          class: "pl-4 list-disc",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "pl-4 list-decimal",
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex gap-2",
        },
      }),
      ListItem,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });
  return (
    <div>
      <TipTapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTapEditor;
