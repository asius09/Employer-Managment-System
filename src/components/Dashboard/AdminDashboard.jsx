import React, { useState } from "react";
import TaskList from "../TaskList/TaskList";
import PostNewTask from "../TaskList/PostNewTask";
import { useTheme } from "../../Context/ThemeContext";

const AdminDashboard = () => {
  const { theme, handleThemeToggle } = useTheme;
  const [isPostNewTaskOpen, setIsPostNewTaskOpen] = useState(false);
  const togglePostNewTask = () => {
    setIsPostNewTaskOpen((prev) => !prev);
  };
  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Admin
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Manage employee tasks and performance
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={handleThemeToggle}
              className="fixed top-4 right-4 px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--text-primary)] hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 shadow-md"
            >
              <i
                className={`ri-${
                  theme === "dark" ? "sun-fill" : "contrast-2-line"
                } text-lg`}
              ></i>
            </button>
            <button className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer">
              <i className="ri-settings-3-line"></i>
              Settings
            </button>
            <button className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer">
              <i className="ri-logout-box-r-line"></i>
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Employee Overview Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Employee Overview Cards */}
        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--btn-primary-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Total Employees
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-primary-bg)]">
            56
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Active employees in system
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--btn-accent-bg)]">
          <h3 className="text-lg font-semibold text[var(--text-primary)] mb-4">
            Active Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-accent-bg)]">
            189
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks currently in progress
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--info)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Completed Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--info)]">1,234</div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks completed this month
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--error)]">
          <h3 className="text-lg font-semibold text[var(--text-primary)] mb-4">
            Pending Reviews
          </h3>
          <div className="text-4xl font-bold text[var(--error)]">12</div>
          <p className="text-sm text[var(--text-secondary)] mt-2">
            Performance reviews pending
          </p>
        </div>
      </div>

      {/* Task Post Button */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-end">
        <button
          onClick={togglePostNewTask}
          className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
        >
          <i className="ri-add-line"></i>
          Post New Task
        </button>
      </div>
      <PostNewTask
        togglePostNewTask={togglePostNewTask}
        isPostNewTaskOpen={isPostNewTaskOpen}
      />

      {/* Task Management Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <TaskList />
      </div>
    </div>
  );
};

export default AdminDashboard;
