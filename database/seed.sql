USE blog_platform;

-- Passwords: Admin@123 for admin, User@123 for regular user
INSERT IGNORE INTO users (id, name, email, password_hash, role, bio) VALUES 
(1, 'Admin User', 'admin@example.com', 'scrypt:32768:8:1\\', 'admin', 'Lead Full Stack Administrator and Technical Architect.'),
(2, 'Aditya Chavan', 'aditya@example.com', 'scrypt:32768:8:1\\', 'user', 'Software developer passionate about web architectures and Python.');

INSERT IGNORE INTO categories (id, name, slug, description) VALUES
(1, 'Technology', 'technology', 'Modern compute paradigms and system design'),
(2, 'Python Programming', 'python-programming', 'Deep dives into Flask, Django, and script efficiency'),
(3, 'Web Development', 'web-development', 'Front-end interfaces, React patterns, and clean UX');

INSERT IGNORE INTO posts (id, user_id, category_id, title, slug, description, content, image_url, status, reading_time) VALUES
(1, 1, 2, 'Building Scalable RESTful Backends with Python and Flask', 'building-scalable-restful-backends', 'An exhaustive architectural walkthrough of database connections, session management, and JWT authentication.', 'Flask continues to be one of the cleanest web frameworks in the Python ecosystem. By using SQLAlchemy ORM and Flask-JWT-Extended, engineers can achieve strict security boundaries without the heavyweight overhead of enterprise monoliths. In this guide, we evaluate request pipelines, database connection pools, and error handling middleware.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop', 'published', 4),
(2, 2, 3, 'Mastering React Context API and Tailwind CSS Components', 'mastering-react-context-tailwind', 'Why global state management does not always require Redux in modern single page applications.', 'For small to medium scale SPAs, React Context combined with local storage persistence provides instantaneous authentication state and theme reactivity without boilerplate overhead. Pairing this with Tailwind CSS utility classes produces sleek, responsive layouts that easily adapt between desktop monitors and mobile devices.', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000&auto=format&fit=crop', 'published', 3),
(3, 1, 1, 'Microservices vs Monoliths: A Practical Guide for Modern Devs', 'microservices-vs-monoliths-practical-guide', 'Understanding when to decouple services and when to keep your database schema unified.', 'While distributed systems receive immense hype, starting with a well-structured modular monolith is almost always the right technical decision for engineering agility, database transaction integrity, and minimal DevOps maintenance overhead.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop', 'published', 5);

INSERT IGNORE INTO comments (id, post_id, user_id, comment_text) VALUES
(1, 1, 2, 'Great explanation! The separation of concerns between SQLAlchemy models and route blueprints is very clean.'),
(2, 2, 1, 'Context API makes handling JWT auth tokens seamless on page reloads.');