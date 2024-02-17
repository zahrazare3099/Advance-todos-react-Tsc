import { NoteData, Tag } from "./App";
import Form from "./Form";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availabelTags: Tag[];
};

export default function EditNote({
  onSubmit,
  onAddTag,
  availabelTags,
}: EditNoteProps) {
  const note = useNote();

  return (
    <div>
      <h1 className="mb-4">Edit Note</h1>
      <Form
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availabelTags={availabelTags}
      />
    </div>
  );
}
