/* eslint-disable @typescript-eslint/no-explicit-any */
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./NewNote";
import useLocalStorage from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";

export type Note = {
  id: string;
} & NoteData;
export type RawNote = {
  id: string;
} & RawNoteData;
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Tag = {
  id: string;
  label: string;
};
function App() {
  // prestence data
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // we have note with own tags
  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  // handle submitting form | add note
  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes: any) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  // update tags state
  const addTags = (tag: Tag) => {
    setTags((pre: any) => [...pre, tag]);
  };

  // update note
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((preNotes: RawNote[]) => {
      return preNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  // on delete note
  const onDeleteNote = (id: string) => {
    setNotes((preNotes: RawNote[]) => {
      return preNotes.filter((note) => note.id !== id);
    });
  };

  // update tag
  const onUpdateTag = (id: string, label: string) => {
    setTags((prevTags: Tag[]) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  // delete tag
  const onDeleteTag = (id: string) => {
    setTags((preTags: Tag[]) => {
      return preTags.filter((tag) => tag.id !== id);
    });
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availabelTags={tags}
              notes={notesWithTags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTags}
              availabelTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          {/* show|Edit note */}
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTags}
                availabelTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
