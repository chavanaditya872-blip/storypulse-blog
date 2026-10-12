import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../services/api';
import { Clock, MessageSquare, ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    API.get('/posts' + (searchQuery ? '?search=' + encodeURIComponent(searchQuery) : ''))
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      })
      .catch((err) => {
        console.warn('Backend offline or database issue. Displaying fallback posts.', err);
        setPosts([
          {
            id: 1,
            title: 'Building Scalable RESTful Backends with Python and Flask',
            description: 'An architectural walkthrough of database connections, JWT authentication, and MySQL pooling.',
            reading_time: 4,
            created_at: 'Oct 12, 2026',
            image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop',
            author: { name: 'Admin User' },
            category: { name: 'Python Programming' },
            comments_count: 2
          },
          {
            id: 2,
            title: 'Mastering React Context API and Tailwind CSS Components',
            description: 'Why global state management does not always require Redux in modern single page apps.',
            reading_time: 3,
            created_at: 'Oct 12, 2026',
            image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&auto=format&fit=crop',
            author: { name: 'Aditya Chavan' },
            category: { name: 'Web Development' },
            comments_count: 1
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {!searchQuery && (
        <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 px-6 text-center shadow-inner">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Discover Stories, Ideas & Inspiration
            </h1>
            <p className="mt-4 text-indigo-100 text-lg">
              Explore hand-crafted articles, share your engineering knowledge, and grow your developer portfolio.
            </p>
          </div>
        </header>
      )}

      <main className="max-w-5xl mx-auto px-6 py-12">
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Search results for: <span className="text-indigo-600">"{searchQuery}"</span>
            </h2>
            <Link to="/" className="text-xs text-slate-500 hover:underline">Clear search filter</Link>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-400 font-semibold text-lg">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-slate-700">No articles available</h3>
            <p className="text-slate-500 text-sm mt-1">Be the first to publish a story on StoryPulse!</p>
            <Link to="/write" className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold">
              Write an Article
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row">
                <div className="md:w-2/5 h-56 md:h-auto overflow-hidden bg-slate-100">
                  <img 
                    src={post.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                        {post.category?.name || 'General'}
                      </span>
                      <span className="text-xs text-slate-400">• {post.created_at || 'Recent'}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 leading-snug hover:text-indigo-600 transition">
                      <Link to={'/posts/' + post.id}>{post.title}</Link>
                    </h3>
                    <p className="mt-2.5 text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-4">
                      <span>By <strong className="text-slate-800">{post.author?.name || 'Author'}</strong></span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.reading_time || 3} min read</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {post.comments_count || 0}</span>
                    </div>
                    <Link to={'/posts/' + post.id} className="text-indigo-600 font-bold flex items-center gap-1 hover:underline">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}