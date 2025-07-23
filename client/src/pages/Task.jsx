import React from 'react';

const Task = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Management</h1>
      {/* Placeholder for task form */}
      <section style={{ margin: '1rem 0' }}>
        <h2>Add/Edit Task</h2>
        <form>
          <input type="text" placeholder="Title" />
          <textarea placeholder="Description" />
          <select>
            <option>Assign to...</option>
            <option>User 1 (placeholder)</option>
          </select>
          <button type="submit">Save Task</button>
        </form>
      </section>
      {/* Placeholder for task details */}
      <section style={{ margin: '1rem 0' }}>
        <h2>Task Details</h2>
        <div>Title: (placeholder)</div>
        <div>Description: (placeholder)</div>
        <div>Status: (placeholder)</div>
        <div>Assigned To: (placeholder)</div>
      </section>
    </div>
  );
};

export default Task;
