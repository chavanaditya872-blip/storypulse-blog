import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Clock, User, Calendar, Trash2 } from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    const res = await API.get(`/posts/${id}/comments`);
    setComments(res.data);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await API.post(`/posts/${id}/comments`, { comment_text: newComment });
    setNewComment('');
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    await API.delete(`/comments/${commentId}`);
    fetchComments();
  };

  if (!post) return <div className="p-12 text-center text-slate-500">Loading blog article...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <span className="text-xs font-bold uppercase tracking-wider text-accent-600 bg-purple-50 px-3 py-1 rounded">
        {post.category.name}
      </span>
      <h1 className="text-4xl font-extrabold text-slate-900 mt-4 leading-tight">{post.title}</h1>
      
      <div className="flex items-center gap-6 text-sm text-slate-500 my-6 pb-6 border-b">
        <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author.name}</span>
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.reading_time} min read</span>
      </div>

      <div className="prose max-w-none text-slate-700 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Comment Section */}
      <section className="mt-16 pt-10 border-t">
        <h3 className="text-2xl font-bold mb-6">Discussion ({comments.length})</h3>
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              rows="3"
              placeholder="Join the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
            <button type="submit" className="mt-2 bg-primary-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-700">
              Post Comment
            </button>
          </form>
        ) : (
          <div className="p-4 bg-slate-100 rounded-lg text-sm mb-6">
            Please <Link to="/login" className="text-primary-600 font-semibold underline">log in</Link> to write a comment.
          </div>
        )}

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="p-4 bg-white border rounded-lg flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm text-slate-800">{c.user.name}</p>
                <p className="text-slate-600 text-sm mt-1">{c.comment_text}</p>
                <span className="text-xs text-slate-400 mt-2 block">{new Date(c.created_at).toLocaleString()}</span>
              </div>
              {(user?.id === c.user.id || user?.role === 'admin') && (
                <button onClick={() => handleDeleteComment(c.id)} className="text-slate-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
