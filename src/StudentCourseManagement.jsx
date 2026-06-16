import React, { useState } from "react";

function StudentCourseManagement() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !course) return;

    const studentData = {
      id: editId || Date.now(),
      name,
      course,
    };

    if (editId) {
      setStudents(
        students.map((student) =>
          student.id === editId ? studentData : student
        )
      );
      setEditId(null);
    } else {
      setStudents([...students, studentData]);
    }

    setName("");
    setCourse("");
  };

  const handleEdit = ({ id, name, course }) => {
    setEditId(id);
    setName(name);
    setCourse(course);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Course Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <br />

      <input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3>Student List</h3>

      {filteredStudents.map((student) => (
        <div key={student.id}>
          <p>
            Name: {student.name} | Course: {student.course}
          </p>

          <button onClick={() => handleEdit(student)}>Edit</button>

          <button onClick={() => handleDelete(student.id)}>Delete</button>
        </div>
      ))}

      <h3>Object Methods Example</h3>
      {students.length > 0 &&
        Object.keys(students[0]).map((key) => (
          <p key={key}>{key}</p>
        ))}
    </div>
  );
}

export default StudentCourseManagement;