import React, { useEffect, useState } from "react";

function NotesManager() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      setNotes(savedNotes);
    } catch (err) {
      setError("Failed to load notes");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (err) {
      setError("Failed to save notes");
    }
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.trim()) {
      setError("Note cannot be empty");
      return;
    }

    setError("");

    if (editId) {
      setNotes(
        notes.map((item) =>
          item.id === editId ? { ...item, text: note } : item
        )
      );
      setEditId(null);
    } else {
      setNotes([
        ...notes,
        {
          id: Date.now(),
          text: note,
        },
      ]);
    }

    setNote("");
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setNote(item.text);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  const filteredNotes = notes.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Notes Manager</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <br />

      <input
        type="text"
        placeholder="Search Note"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Notes List</h3>

      {filteredNotes.length > 0 ? (
        filteredNotes.map((item) => (
          <div key={item.id}>
            <p>{item.text}</p>

            <button onClick={() => handleEdit(item)}>Edit</button>

            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No Notes Found</p>
      )}
    </div>
  );
}

export default NotesManager;