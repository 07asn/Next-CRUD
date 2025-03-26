'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const router = useRouter();
    const [error, setError] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        setError('');
        try {
            await axios.post('/api/auth/register', form);
            router.push('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Register</h1>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Create Account
                </button>

                <p className="text-center text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}
