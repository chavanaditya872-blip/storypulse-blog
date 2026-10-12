from flask import Blueprint, jsonify
from app.middleware.auth import admin_required
from app.models.user import User
from app.models.blog import Post, Comment, Category

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/stats", methods=["GET"])
@admin_required()
def get_stats():
    return jsonify({
        "total_users": User.query.count(),
        "total_posts": Post.query.count(),
        "total_comments": Comment.query.count(),
        "total_categories": Category.query.count()
    }), 200

@admin_bp.route("/categories", methods=["GET"])
def get_categories():
    categories = Category.query.all()
    return jsonify([c.to_dict() for c in categories]), 200