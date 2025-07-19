import { useState, useEffect } from "react";
import {
  ChatBubbleLeftIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  PaperAirplaneIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

// Mock config for demonstration
const config = {
  apiUrl: "http://127.0.0.1:8000",
};

// Mock user data (replace with actual user context)
const currentUser = {
  id: 46,
  username: "omor",
  image: "/media/users/chosma.jpg",
};

export default function ShowCommentModal({ story, closeCommentModal, isCommentModalOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (story?.comments) {
      setComments(story.comments);
    }
  }, [story]);

  const handleComment = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setReplyingTo(null);
    setNewComment("");
    setReplyText("");
    setEditText("");
  };

  const createComment = async (content, parentId = null) => {
    setLoading(true);
    try {
      const response = await fetch(`${config.apiUrl}/story/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth
        },
        body: JSON.stringify({
          content,
          story: story.id,
          parent: parentId,
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        // Add user info to new comment (since API might not return it)
        const commentWithUser = {
          ...newCommentData,
          user_id: currentUser.id,
          username: currentUser.username,
          image: currentUser.image,
          text: content,
          commented_at: new Date().toISOString(),
          parent_id: parentId,
        };
        setComments((prev) => [...prev, commentWithUser]);
        setNewComment("");
        setReplyText("");
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (commentId, content) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${config.apiUrl}/story/comments/${commentId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId ? { ...comment, text: content } : comment
          )
        );
        setEditingId(null);
        setEditText("");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    setLoading(true);
    try {
      const response = await fetch(
        `${config.apiUrl}/story/comments/delete/${commentId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const startReplying = (comment) => {
    setReplyingTo(comment.id);
    setReplyText("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getCommentThreads = () => {
    const threads = [];
    const parentComments = comments.filter((c) => !c.parent_id);

    parentComments.forEach((parent) => {
      const replies = comments.filter((c) => c.parent_id === parent.id);
      threads.push({ parent, replies });
    });

    return threads;
  };

  const CommentItem = ({ comment, isReply = false }) => {
    const isOwner = comment.user_id === currentUser.id;
    const isEditing = editingId === comment.id;
    const isReplying = replyingTo === comment.id;

    return (
      <div
        className={`${
          isReply ? "ml-8 border-l-2 border-gray-200 pl-4" : ""
        } mb-4`}
      >
        <div className="flex items-start space-x-3">
          <img
            src={
              comment.image
                ? `${config.apiUrl}${comment.image}`
                : "/default-avatar.png"
            }
            alt={comment.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900">
                  {comment.username}
                </h4>
                {isOwner && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(comment)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="mt-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => updateComment(comment.id, editText)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      disabled={loading}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800">{comment.text}</p>
              )}
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>{formatDate(comment.commented_at)}</span>
              {!isReply && (
                <button
                  onClick={() => startReplying(comment)}
                  className="hover:text-blue-500 transition-colors flex items-center"
                >
                  <ChevronRightIcon className="w-4 h-4 mr-1" />
                  Reply
                </button>
              )}
            </div>
            {isReplying && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.username}...`}
                  className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => createComment(replyText, comment.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled={!replyText.trim() || loading}
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
   

      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{scrollbarWidth : "none"}}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Comments</h2>
              <button
                onClick={closeCommentModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Comments List */}
            <div
              className="flex-1 overflow-y-auto p-4"
              style={{ maxHeight: "60vh" , scrollbarWidth: "none" }}
            >
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                getCommentThreads().map(({ parent, replies }) => (
                  <div key={parent.id} className="mb-6">
                    <CommentItem comment={parent} />
                    {replies.map((reply) => (
                      <CommentItem
                        key={reply.id}
                        comment={reply}
                        isReply={true}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* New Comment Input */}
            <div className="border-t p-4">
              <div className="flex items-start space-x-3">
                <img
                  src={
                    currentUser.image
                      ? `${config.apiUrl}${currentUser.image}`
                      : "/default-avatar.png"
                  }
                  alt={currentUser.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => createComment(newComment)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                      disabled={!newComment.trim() || loading}
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
