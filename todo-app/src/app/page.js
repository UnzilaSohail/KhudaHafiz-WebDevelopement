'use client'; // tells Next.js this is a client component

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');      // input box state
  const [tasks, setTasks] = useState([]);      // tasks array state

  // Add new task
  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        completed: false,
        editing: false,
        createdAt: new Date().toLocaleString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  // Toggle complete checkbox
  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // Toggle edit mode
  const toggleEdit = (index) => {
    const updated = [...tasks];
    updated[index].editing = true;
    setTasks(updated);
  };

  // Save edited task
  const saveEdit = (index) => {
    const updated = [...tasks];
    updated[index].editing = false;
    setTasks(updated);
  };

  // Update text while editing
  const updateTaskText = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

  // Delete task
  const deleteTask = (index) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Title */}
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
       Unzilas Todo App (Next.js)
      </h1>

      {/* Input + Add button */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task"
          style={{
            width: '200px',
            padding: '6px',
            fontSize: '14px',
            height: '30px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: '4px 12px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              background: '#f2f2f2',
              color: '#000',
              marginBottom: '10px',
              padding: '10px 15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '320px',
              borderRadius: '4px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {/* on left side checkbox + text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                {task.editing ? (
                  <input
                    value={task.text}
                    onChange={(e) => updateTaskText(index, e.target.value)}
                    style={{ fontSize: '14px', padding: '4px', width: '150px' }}
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      fontSize: '14px',
                    }}
                  >
                    {task.text}
                  </span>
                )}
              </div>

              {/* Date line */}
              {!task.editing && (
                <small style={{ fontSize: '12px', color: '#555' }}>
                   Added on: {task.createdAt}
                </small>
              )}
            </div>

            {/* Right: Edit/Save + Delete */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {task.editing ? (
                <button
                  onClick={() => saveEdit(index)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => toggleEdit(index)}
                  style={{
                    padding: '6px 10px',
                    backgroundColor: '#FFA500',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteTask(index)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
