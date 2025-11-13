"use client";

import { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
}

export interface TaskFormData {
  title: string;
  description: string;
  date: string;
  assignee: string;
  priority: string;
  status: string;
}

export default function AddTaskModal({ isOpen, onClose, onSubmit }: AddTaskModalProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    date: "",
    assignee: "",
    priority: "low",
    status: "to_do",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111] text-gray-100 rounded-2xl w-full max-w-md p-6 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-black border border-gray-700 px-3 py-2 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md bg-black border border-gray-700 px-3 py-2 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-md bg-black border border-gray-700 px-3 py-2 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Assignee</label>
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full rounded-md bg-black border border-gray-700 px-3 py-2 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md bg-black border border-gray-700 px-3 py-2 focus:border-amber-400 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md bg-black border border-gray-700 px-3 py-2 focus:border-amber-400 focus:outline-none"
              >
                <option value="to_do">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="not_started">Not Started</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 text-black font-semibold rounded-md py-2 hover:bg-amber-300 transition"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
