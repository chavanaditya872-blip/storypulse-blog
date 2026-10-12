import re
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from app.models.blog import db, Post, Category
from app.models.user import User

blog_bp = Blueprint("blogs", __name__)

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text.lower()).strip()
    return re.sub(r'[-\s]+', '-', text)

@blog_bp.route("", methods=["GET"])
def get_posts():
    search_query = request.args.get("search", "").strip()
    category_slug = request.args.get("category", "").strip()

    query = Post.query.filter_by(status="published")

    if category_slug:
        query = query.join(Category).filter(Category.slug == category_slug)

    if search_query:
        query = query.filter(
            Post.title.ilike(f"%{search_query}%") | Post.description.ilike(f"%{search_query}%")
        )

    posts = query.order_by(Post.created_at.desc()).all()
    return jsonify([p.to_dict() for p in posts]), 200

@blog_bp.route("/<int:id>", methods=["GET"])
def get_single_post(id):
    post = Post.query.get_or_404(id)
    return jsonify(post.to_dict()), 200

@blog_bp.route("", methods=["POST"])
@jwt_required()
def create_post():
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()
    content = data.get("content", "").strip()
    category_id = data.get("category_id")
    image_url = data.get("image_url", "").strip() or "https://images.unsplash.com/photo-1498050108023-c5249f4df085"

    if not title or not content or not category_id:
        return jsonify({"error": "Title, content, and category are required"}), 400

    base_slug = slugify(title)
    unique_slug = f"{base_slug}-{int(datetime.utcnow().timestamp())}"
    reading_time = max(1, len(content.split()) // 180)

    post = Post(
        user_id=user_id,
        category_id=category_id,
        title=title,
        slug=unique_slug,
        description=description or title,
        content=content,
        image_url=image_url,
        reading_time=reading_time
    )
    db.session.add(post)
    db.session.commit()

    return jsonify({"message": "Post created successfully", "post": post.to_dict()}), 201

@blog_bp.route("/user/my-posts", methods=["GET"])
@jwt_required()
def get_user_posts():
    user_id = int(get_jwt_identity())
    posts = Post.query.filter_by(user_id=user_id).order_by(Post.created_at.desc()).all()
    return jsonify([p.to_dict() for p in posts]), 200

@blog_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_post(id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    post = Post.query.get_or_404(id)

    if post.user_id != user_id and user.role != "admin":
        return jsonify({"error": "Unauthorized deletion request"}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({"message": "Post deleted successfully"}), 200