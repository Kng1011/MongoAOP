import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CommentSection.css';
import API_URL from '../config';

const CommentSection = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    text: ''
  });
  const [editingComment, setEditingComment] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/comments/movie/${movieId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingComment) {
      setEditingComment({ ...editingComment, [name]: value });
    } else {
      setNewComment({ ...newComment, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingComment) {
        await axios.patch(`${API_URL}/comments/${editingComment._id}`, editingComment);
        setEditingComment(null);
      } else {
        await axios.post(`${API_URL}/comments`, {
          ...newComment,
          movie_id: movieId
        });
        setNewComment({ name: '', email: '', text: '' });
      }
      fetchComments();
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
  };

  const handleDelete = async (commentId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        background: '#fff',
        customClass: {
          popup: 'animated fadeInDown'
        }
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/comments/${commentId}`);
        await Swal.fire({
          title: 'Deleted!',
          text: 'Your comment has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#fff'
        });
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the comment.',
        icon: 'error',
        confirmButtonColor: '#dc3545',
        background: '#fff'
      });
    }
  };

  const handleCancel = () => {
    setEditingComment(null);
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={editingComment ? editingComment.name : newComment.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={editingComment ? editingComment.email : newComment.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="text"
          placeholder="Write your comment..."
          value={editingComment ? editingComment.text : newComment.text}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {editingComment ? 'Update Comment' : 'Add Comment'}
        </button>
        {editingComment && (
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        )}
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <h4>{comment.name}</h4>
              <span className="comment-date">
                {new Date(comment.date).toLocaleDateString()}
              </span>
            </div>
            <p>{comment.text}</p>
            <div className="comment-actions">
              <button onClick={() => handleEdit(comment)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(comment._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection; 