import React from 'react';

const User = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Management</h1>
      {/* Placeholder for user form */}
      <section style={{ margin: '1rem 0' }}>
        <h2>Add/Edit User</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <button type="submit">Save User</button>
        </form>
      </section>
      {/* Placeholder for user details */}
      <section style={{ margin: '1rem 0' }}>
        <h2>User Details</h2>
        <div>Name: (placeholder)</div>
        <div>Email: (placeholder)</div>
      </section>
    </div>
  );
};

export default User;
