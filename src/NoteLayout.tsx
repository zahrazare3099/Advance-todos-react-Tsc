/* eslint-disable react-refresh/only-export-components */
import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "./App";

type NoteLayoutProps = {
  notes: Note[];
};
export default function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const [note] = notes.filter((note) => note.id === id);

  if (note == null) <Navigate to="/" replace />;
  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}
