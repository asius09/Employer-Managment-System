import React from "react";

const PostNewTask = ({ togglePostNewTask, isPostNewTaskOpen }) => {
  return (
    <div
      className={`${
        isPostNewTaskOpen ? "fixed" : "hidden"
      } inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50`}
    >
      <div className="bg-[var(--container-bg)] rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--input-border)] pb-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <i className="ri-task-line text-[var(--btn-primary-bg)]"></i>
              Post New Task
            </h2>
            <button
              onClick={togglePostNewTask}
              className="p-2 rounded-lg hover:bg-[var(--nested-container-bg)] transition-colors duration-200"
            >
              <i className="ri-close-line text-xl text-[var(--text-secondary)]"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-pencil-line"></i>
                Task Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
                placeholder="Enter task title"
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-user-line"></i>
                Assign To
              </label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]">
                <option value="">Select employee</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
              <i className="ri-file-text-line"></i>
              Task Description
            </label>
            <textarea
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]"
              rows="4"
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-calendar-event-line text-[var(--btn-primary-bg)]"></i>
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] appearance-none"
                />
                <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"></i>
              </div>
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-flag-line"></i>
                Priority
              </label>
              <select className="w-full px-4 py-2.5 pr-2 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-timer-line text-[var(--btn-primary-bg)]"></i>
                Estimated Hours
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] appearance-none"
                  placeholder="Enter hours"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-[var(--text-muted)] pointer-events-none">
                  <i className="ri-arrow-up-s-line"></i>
                  <i className="ri-arrow-down-s-line -mt-1.5"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--input-border)]">
            <button
              className="px-5 py-2.5 rounded-lg bg-[var(--btn-secondary-bg)] text-white hover:bg-[var(--btn-secondary-hover)] transition-colors duration-200 flex items-center gap-2"
              onClick={togglePostNewTask}
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2">
              Post Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNewTask;
