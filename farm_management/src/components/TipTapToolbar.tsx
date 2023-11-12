import { type Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

type Props = {
  editor: Editor | null;
};
function TipTapToolbar({ editor }: Props) {
  // console.log(editor.isActive({ textAlign: "center" }));

  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap border border-input  rounded-sm p-1 my-2">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("taskList")}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
      >
        <ListTodoIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrderedIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Separator orientation="vertical" className="h-auto" />
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeftIcon className="h-3.5 w-3.5" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRightIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenterIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "justify" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
      >
        <AlignJustifyIcon className="h-3.5 w-3.5" />
      </Toggle>
      <Separator orientation="vertical" className="h-auto" />
    </div>
  );
}

export default TipTapToolbar;
