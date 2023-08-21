import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { notes } = context;
  return (
    <>
      <AddNote />
      <div className="container my-4">
        <h2>You Notes</h2>
        <div className="row">
          {notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
