from datetime import datetime
from app.models.user import db

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    slug = db.Column(db.String(60), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    posts = db.relationship("Post", backref="category", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "description": self.description
        }

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), default="https://images.unsplash.com/photo-1498050108023-c5249f4df085")
    status = db.Column(db.String(20), default="published")
    reading_time = db.Column(db.Integer, default=3)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    comments = db.relationship("Comment", backref="post", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "description": self.description,
            "content": self.content,
            "image_url": self.image_url,
            "status": self.status,
            "reading_time": self.reading_time,
            "created_at": self.created_at.strftime("%b %d, %Y"),
            "author": {
                "id": self.author.id,
                "name": self.author.name
            },
            "category": {
                "id": self.category.id,
                "name": self.category.name,
                "slug": self.category.slug
            },
            "comments_count": len(self.comments)
        }

class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    comment_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "comment_text": self.comment_text,
            "created_at": self.created_at.strftime("%b %d, %Y %I:%M %p"),
            "user": {
                "id": self.user.id,
                "name": self.user.name
            }
        }