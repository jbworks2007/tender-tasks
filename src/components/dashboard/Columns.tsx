"use client";
import { useState } from "react";
import TaskCard from "../cards/TaskCard";
import { HiMiniPlus, HiEllipsisHorizontal } from "react-icons/hi2";
import tasksData from "@/assets/dataset/tasks.json";
import AddTaskModal, { TaskFormData } from "@/components/modals/AddTaskModal";
import TaskDetailsModal, { TaskDetails } from "@/components/modals/TaskDetailsModal";

export default function Columns() {
  const groupedTasks = tasksData.reduce<Record<string, typeof tasksData>>((acc, task) => {
    if (!acc[task.listing]) acc[task.listing] = [];
    acc[task.listing].push(task);
    return acc;
  }, {});

  const listings = Object.keys(groupedTasks);

  const [open, setOpen] = useState(false);

  const handleAddTask = (data: TaskFormData) => {
    console.log("New task added:", data);
    // You can POST this to your /api/save route to store in JSON
  };

  const [viewDetails, setViewDetails] = useState(false);
  const [task, setTask] = useState<TaskDetails>({} as TaskDetails);

  const handleTaskClick = (task: TaskDetails) => {
    setTask(task);
    setViewDetails(true);
  };

  const addComment = (comment: string) => {
    setTask((prev) => ({
      ...prev,
      comments: [...prev.comments, comment],
    }));
  };

  const addAttachment = (attachment: string) => {
    setTask((prev) => ({
      ...prev,
      attachments: [...prev.attachments, attachment],
    }));
  };

  return (
    <div className="">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Create columns according to listing */}
        {listings.map((listing) => (
          <div key={listing} className="bg-black p-5 rounded-md">
            {/* Column Header */}
            <div className="flex items-center justify-between mx-1">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded-full filter blur-[1px] ${
                    listing == "in_progress"
                      ? "bg-blue-500"
                      : listing == "not_started"
                      ? "bg-orange-400"
                      : "bg-amber-300"
                  }`}
                ></div>
                <div className="ms-3 text-xl font-bold capitalize">{listing.replace("_", " ")}</div>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="p-1 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out"
                  onClick={() => setOpen(true)}
                >
                  <HiMiniPlus size={25} />
                </div>
                <div className="p-1 rounded-full hover:bg-gray-700 transition duration-500 ease-in-out">
                  <HiEllipsisHorizontal size={25} />
                </div>
              </div>
            </div>
            {/* Task Card */}
            <div className="space-y-4">
              {groupedTasks[listing].map((task, index) => (
                <div key={index} onClick={() => handleTaskClick(task)} className="cursor-pointer">
                  <TaskCard
                    key={index}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    assignee={task.assignee}
                    date={task.date}
                    priority={task.priority}
                    comments={task.comments}
                    attachments={task.attachments}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <AddTaskModal isOpen={open} onClose={() => setOpen(false)} onSubmit={handleAddTask} />
      <TaskDetailsModal
        isOpen={viewDetails}
        onClose={() => setViewDetails(false)}
        task={task}
        onAddComment={addComment}
        onAddAttachment={addAttachment}
      />
    </div>
  );
}
