import React from 'react';

const Team = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Team Details</h1>
      {/* Placeholder for team info */}
      <section style={{ margin: '1rem 0' }}>
        <h2>Team Info</h2>
        <div>Team Name: (placeholder)</div>
      </section>
      {/* Users Section */}
      <section style={{ margin: '1rem 0' }}>
        <h2>Users</h2>
        <button>Add User</button>
        <ul>
          {/* Map users here */}
          <li>User 1 (placeholder)</li>
          <li>User 2 (placeholder)</li>
        </ul>
      </section>
      {/* Tasks Section */}
      <section style={{ margin: '1rem 0' }}>
        <h2>Tasks</h2>
        <button>Add Task</button>
        <ul>
          {/* Map tasks here */}
          <li>Task 1 (placeholder)</li>
          <li>Task 2 (placeholder)</li>
        </ul>
      </section>
    </div>
  );
};

export default Team;
