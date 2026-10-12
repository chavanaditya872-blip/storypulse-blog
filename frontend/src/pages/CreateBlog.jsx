import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('published');
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/admin/categories')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
          setCategoryId(String(res.data[0].id));
        } else {
          setCategories([
            { id: 1, name: 'Technology' },
            { id: 2, name: 'Python Programming' },
            { id: 3, name: 'Web Development' }
          ]);
        }
      })
      .catch(() => {
        setCategories([
          { id: 1, name: 'Technology' },
          { id: 2, name: 'Python Programming' },
          { id: 3, name: 'Web Development' }
        ]);
      });
  }, []);

  const handleSave = async (chosenStatus) => {
    setError('');
    if (!title.trim() || !content.trim()) {
      setError('Title and Article Content are required!');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || title.trim(),
        content: content.trim(),
        category_id: parseInt(categoryId, 10),
        image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        status: chosenStatus
      };

      const res = await API.post('/posts', payload);
      if (res.data?.post?.id) {
        navigate('/posts/' + res.data.post.id);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to publish post. Please check backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Create New Article</h1>
        <p className="text-slate-500 text-sm mt-1">Share your knowledge, code insights, and tutorials with developers.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Article Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Modern Full Stack Systems with Python & React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Short Description</label>
          <input
            type="text"
            placeholder="A brief preview snippet that appears on the homepage cards..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Article Content (HTML allowed) *</label>
          <textarea
            rows="12"
            required
            placeholder="Write your article here... You can use <p>, <h3>, <code>, <ul>, etc."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-slate-300 p-4 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm leading-relaxed font-mono"
          />
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave('draft')}
            className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition text-sm disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSave('published')}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition text-sm shadow-sm disabled:opacity-50"
          >
            {submitting ? 'Publishing...' : 'Publish Article'}
          </button>
        </div>
      </div>
    </div>
  );
}