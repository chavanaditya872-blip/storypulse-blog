import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        <p>© 2026 StoryPulse. Designed for developer portfolios and practical full stack systems.</p>
        <div className="flex gap-6">
          <span>React.js</span>
          <span>Python Flask</span>
          <span>MySQL Database</span>
          <span>JWT Auth</span>
        </div>
      </div>
    </footer>
  );
}
