import { NoteData, Tag } from "./App";
import Form from "./Form";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availabelTags: Tag[];
};

export default function NewNote({
  onSubmit,
  onAddTag,
  availabelTags,
}: NewNoteProps) {
  return (
    <div>
      <h1 className="mb-4">New Note</h1>
      <Form
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availabelTags={availabelTags}
      />
    </div>
  );
}
