import React, { useState } from "react";

/**
 * MULTI-ACCOUNT COMMENT SYSTEM
 *
 * This component demonstrates:
 * 1. Account switching
 * 2. State management with useState
 * 3. Adding comments/replies
 * 4. Nested data structures
 */

export default function MultiAccountComments() {
  // ============================================
  // STEP 1: DEFINE AVAILABLE ACCOUNTS
  // ============================================
  // This is an array of user objects. Each user has an id, name, and color for visual distinction
  const accounts = [
    { id: 1, name: "Alice", color: "#3b82f6" }, // Blue
    { id: 2, name: "Bob", color: "#10b981" }, // Green
    { id: 3, name: "Charlie", color: "#f59e0b" }, // Orange
    { id: 4, name: "Diana", color: "#ec4899" }, // Pink
  ];

  // ============================================
  // STEP 2: SET UP STATE VARIABLES
  // ============================================
  // useState is a React Hook that lets you add state to functional components

  // Track which account is currently active (starts with Alice)
  const [currentAccount, setCurrentAccount] = useState(accounts[0]);

  // Store all comments in an array
  const [comments, setComments] = useState([]);

  // Track what the user is typing
  const [newCommentText, setNewCommentText] = useState("");

  // Track reply text and which comment is being replied to
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  // ============================================
  // STEP 3: FUNCTION TO SWITCH ACCOUNTS
  // ============================================
  const switchAccount = (account) => {
    setCurrentAccount(account);
    // Clear any text inputs when switching accounts
    setNewCommentText("");
    setReplyText("");
    setReplyingTo(null);
  };

  // ============================================
  // STEP 4: FUNCTION TO ADD A NEW COMMENT
  // ============================================
  const addComment = () => {
    // Don't add empty comments
    if (!newCommentText.trim()) return;

    // Create a new comment object
    const newComment = {
      id: Date.now(), // Unique ID using timestamp
      text: newCommentText,
      author: currentAccount,
      timestamp: new Date().toLocaleTimeString(),
      replies: [], // Each comment can have replies
    };

    // Add the new comment to the comments array
    // We use the spread operator (...) to create a new array with existing comments plus the new one
    setComments([...comments, newComment]);

    // Clear the input field
    setNewCommentText("");
  };

  // ============================================
  // STEP 5: FUNCTION TO ADD A REPLY
  // ============================================
  const addReply = (commentId) => {
    // Don't add empty replies
    if (!replyText.trim()) return;

    // Create a new reply object
    const newReply = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      text: replyText,
      author: currentAccount,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Find the comment and add the reply to it
    // We use map() to create a new array, updating only the target comment
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          // Return a new comment object with the reply added
          return {
            ...comment, // Copy all existing properties
            replies: [...comment.replies, newReply], // Add new reply to replies array
          };
        }
        return comment; // Return unchanged for other comments
      }),
    );

    // Clear reply state
    setReplyText("");
    setReplyingTo(null);
  };

  // ============================================
  // STEP 6: RENDER THE UI
  // ============================================
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Multi-Account Comment System
      </h1>

      {/* Account Switcher */}
      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Switch Account:</h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => switchAccount(account)}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  currentAccount.id === account.id ? account.color : "white",
                color: currentAccount.id === account.id ? "white" : "#333",
                border: `2px solid ${account.color}`,
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s",
              }}
            >
              {account.name}
              {currentAccount.id === account.id && " (Active)"}
            </button>
          ))}
        </div>

        {/* Show currently active account */}
        <p
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "4px",
            borderLeft: `4px solid ${currentAccount.color}`,
          }}
        >
          Currently logged in as:{" "}
          <strong style={{ color: currentAccount.color }}>
            {currentAccount.name}
          </strong>
        </p>
      </div>

      {/* Add New Comment Section */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "2px solid #e5e7eb",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            color: currentAccount.color,
          }}
        >
          Post as {currentAccount.name}:
        </h3>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "12px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={addComment}
          style={{
            marginTop: "10px",
            padding: "10px 24px",
            backgroundColor: currentAccount.color,
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Post Comment
        </button>
      </div>

      {/* Comments List */}
      <div>
        <h2>Comments ({comments.length}):</h2>

        {comments.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: "40px",
            }}
          >
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: "#fff",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "15px",
              }}
            >
              {/* Comment Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: comment.author.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    marginRight: "12px",
                  }}
                >
                  {comment.author.name[0]}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: comment.author.color,
                    }}
                  >
                    {comment.author.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {comment.timestamp}
                  </div>
                </div>
              </div>

              {/* Comment Text */}
              <p
                style={{
                  margin: "10px 0",
                  lineHeight: "1.6",
                }}
              >
                {comment.text}
              </p>

              {/* Show message if viewing your own comment */}
              {comment.author.id === currentAccount.id && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    backgroundColor: "#f9fafb",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    margin: "10px 0",
                    fontStyle: "italic",
                  }}
                >
                  This is your comment. You can't reply to yourself, but others
                  can reply to you!
                </p>
              )}

              {/* Reply Button - Only show if not your own comment */}
              {comment.author.id !== currentAccount.id && (
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  style={{
                    padding: "6px 16px",
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#374151",
                  }}
                >
                  Reply
                </button>
              )}

              {/* Reply Input (shows when replying to this comment) */}
              {replyingTo === comment.id && (
                <div
                  style={{
                    marginTop: "15px",
                    paddingLeft: "20px",
                    borderLeft: `3px solid ${currentAccount.color}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Replying as{" "}
                    <strong style={{ color: currentAccount.color }}>
                      {currentAccount.name}
                    </strong>
                  </p>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    style={{
                      width: "100%",
                      minHeight: "60px",
                      padding: "10px",
                      fontSize: "13px",
                      borderRadius: "4px",
                      border: "1px solid #d1d5db",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <button
                      onClick={() => addReply(comment.id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: currentAccount.color,
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                        marginRight: "8px",
                      }}
                    >
                      Post Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#f3f4f6",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Replies List */}
              {comment.replies.length > 0 && (
                <div
                  style={{
                    marginTop: "20px",
                    paddingLeft: "20px",
                    borderLeft: "2px solid #e5e7eb",
                  }}
                >
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      style={{
                        backgroundColor: "#f9fafb",
                        padding: "15px",
                        borderRadius: "6px",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: reply.author.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "14px",
                            marginRight: "10px",
                          }}
                        >
                          {reply.author.name[0]}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: reply.author.color,
                            }}
                          >
                            {reply.author.name}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#6b7280",
                            }}
                          >
                            {reply.timestamp}
                          </div>
                        </div>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          lineHeight: "1.5",
                        }}
                      >
                        {reply.text}
                      </p>

                      {/* Show message if viewing your own reply */}
                      {reply.author.id === currentAccount.id && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#6b7280",
                            backgroundColor: "#fff",
                            padding: "6px 10px",
                            borderRadius: "3px",
                            margin: "6px 0 0 0",
                            fontStyle: "italic",
                          }}
                        >
                          Your reply
                        </p>
                      )}

                      {/* Reply to Reply Button - Only if not your own reply */}
                      {reply.author.id !== currentAccount.id && (
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          style={{
                            marginTop: "8px",
                            padding: "4px 12px",
                            backgroundColor: "#f3f4f6",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                            color: "#374151",
                          }}
                        >
                          Reply
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
