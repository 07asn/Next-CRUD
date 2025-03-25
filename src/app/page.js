'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', id: null });

  async function fetchUsers() {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (form.id) {
        await axios.put(`/api/users/${form.id}`, {
          name: form.name,
          email: form.email,
        });
      } else {
        await axios.post('/api/users', {
          name: form.name,
          email: form.email,
        });
      }
      setForm({ name: '', email: '', id: null });
      fetchUsers();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }

  function handleEdit(user) {
    setForm({ name: user.name, email: user.email, id: user.id });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6"> User Manager</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <button
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              form.id ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {form.id ? '✅ Update User' : ' Add User'}
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-sm px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
