'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const router = useRouter();
    const [error, setError] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        try {
            await axios.post('/api/auth/login', form);
            router.push('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                {error && <p className="text-red-500 text-sm">{error}</p>}

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
                    Login
                </button>

                <p className="text-center text-sm">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
