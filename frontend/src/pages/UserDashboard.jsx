import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Trash2, PenSquare } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await API.get('/posts/user/my-posts');
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this blog?')) return;
    try {
      await API.delete('/posts/' + id);
      fetchMyPosts();
    } catch (err) {
      alert('Failed to delete post.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Creator Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, {user?.name}</p>
        </div>
        <Link to="/write" className="flex items-center gap-1.5 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 shadow-sm transition">
          <PenSquare className="h-4 w-4" /> Write New Post
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-400">You haven't authored any posts yet.</td></tr>
            ) : posts.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-bold text-slate-800">
                  <Link to={'/posts/' + p.id} className="hover:text-indigo-600 transition">{p.title}</Link>
                </td>
                <td className="p-4 text-slate-600">{p.category?.name || 'General'}</td>
                <td className="p-4">
                  <span className={'px-2.5 py-0.5 rounded-full text-xs font-semibold ' + (p.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700')}>
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{p.created_at}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="text-slate-400 hover:text-red-600 transition" title="Delete post">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}