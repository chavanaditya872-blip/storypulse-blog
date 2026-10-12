from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.blog import db, Comment, Post
from app.models.user import User

comment_bp = Blueprint("comments", __name__)

@comment_bp.route("/posts/<int:post_id>/comments", methods=["GET"])
def get_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at.desc()).all()
    return jsonify([c.to_dict() for c in comments]), 200

@comment_bp.route("/posts/<int:post_id>/comments", methods=["POST"])
@jwt_required()
def add_comment(post_id):
    user_id = int(get_jwt_identity())
    data = request.get_json() or {}
    text = data.get("comment_text", "").strip()

    if not text:
        return jsonify({"error": "Comment cannot be empty"}), 400

    Post.query.get_or_404(post_id)

    comment = Comment(post_id=post_id, user_id=user_id, comment_text=text)
    db.session.add(comment)
    db.session.commit()

    return jsonify({"message": "Comment posted", "comment": comment.to_dict()}), 201

@comment_bp.route("/comments/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_comment(id):
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    comment = Comment.query.get_or_404(id)

    if comment.user_id != user_id and user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(comment)
    db.session.commit()
    return jsonify({"message": "Comment deleted"}), 200