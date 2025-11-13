"use client";

import { useState } from "react";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskDetails | null;
  onAddComment?: (comment: string) => void;
  onAddAttachment?: (attachment: string) => void;
}

export interface TaskDetails {
  title: string;
  description: string;
  date: string;
  assignee: string;
  priority: string;
  status: string;
  comments: string[];
  attachments: string[];
}

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
  onAddComment,
  onAddAttachment,
}: TaskDetailsModalProps) {
  const [newComment, setNewComment] = useState("");
  const [newAttachment, setNewAttachment] = useState("");

  if (!isOpen || !task) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    onAddComment?.(newComment);
    setNewComment("");
  };

  const handleAddAttachment = () => {
    if (!newAttachment.trim()) return;
    onAddAttachment?.(newAttachment);
    setNewAttachment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111] text-gray-100 rounded-2xl w-full max-w-2xl p-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>

        {/* Task Info */}
        <div className="space-y-2 text-sm mb-5">
          <p className="text-gray-300">{task.description}</p>
          <div className="grid grid-cols-2 gap-y-1 mt-2">
            <p>
              <span className="text-gray-500">Status:</span> {task.status}
            </p>
            <p>
              <span className="text-gray-500">Priority:</span> {task.priority}
            </p>
            <p>
              <span className="text-gray-500">Assignee:</span> {task.assignee}
            </p>
            <p>
              <span className="text-gray-500">Date:</span> {task.date}
            </p>
          </div>
        </div>

        <hr className="border-gray-800 mb-4" />

        {/* Comments Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-amber-400">Comments</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {task.comments.length ? (
              task.comments.map((c, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm">
                  {c}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>

          {/* Add Comment */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 rounded-md bg-black border border-gray-700 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            />
            <button
              onClick={handleAddComment}
              className="bg-amber-400 text-black font-semibold rounded-md px-4 py-2 hover:bg-amber-300 transition"
            >
              Add
            </button>
          </div>
        </div>

        <hr className="border-gray-800 mb-4" />

        {/* Attachments Section */}
        <div>
          <h3 className="font-semibold mb-2 text-amber-400">Attachments</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {task.attachments.length ? (
              task.attachments.map((a, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-sm">
                  📎 {a}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No attachments yet.</p>
            )}
          </div>

          {/* Add Attachment */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Add attachment name..."
              value={newAttachment}
              onChange={(e) => setNewAttachment(e.target.value)}
              className="flex-1 rounded-md bg-black border border-gray-700 px-3 py-2 text-sm focus:border-amber-400 focus:outline-none"
            />
            <button
              onClick={handleAddAttachment}
              className="bg-amber-400 text-black font-semibold rounded-md px-4 py-2 hover:bg-amber-300 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
