import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError('Connection error: ' + err.message + ' (Check if Flask server is running on port 5000)');
      } else {
        setError('Registration failed. Check backend console.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-md w-full">
        <h2 className="text-3xl font-black text-slate-900 text-center tracking-tight">Create Account</h2>
        <p className="text-slate-500 text-sm text-center mt-1 mb-6">Join the developer writing community</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3.5 rounded-xl mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Aditya Chavan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="aditya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 px-3.5 py-2.5 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none text-sm"
            />
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-bold hover:bg-primary-700 transition shadow-sm disabled:opacity-50"
          >
            {submitting ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}