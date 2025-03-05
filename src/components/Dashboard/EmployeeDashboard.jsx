import React from "react";
import TaskList from "../Tasks/TaskList";
import { useTheme } from "../../Context/ThemeContext";
import { useAuth } from "../../Context";
import { useNavigate } from "react-router";

const EmployeeDashboard = () => {
  const { logout, authState } = useAuth();
  const user = authState.user?.role === "admin" ? null : authState.user;
  const taskCounts = user.taskCounts;
  const navigate = useNavigate();
  const { theme, handleThemeToggle } = useTheme();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Good Morning, {user.fullName}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Logged in since: 8:00 AM | Total hours today: 4.5 hrs
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0 items-center">
            <button
              onClick={handleThemeToggle}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--container-bg)] text-[var(--text-primary)] hover:bg-[var(--nested-container-bg)] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-[var(--input-border)]"
            >
              <i
                className={`ri-${
                  theme === "dark" ? "sun-fill" : "contrast-2-line"
                } text-lg`}
              ></i>
            </button>
            <button
              onClick={handleLogout}
              className="h-10 px-4 flex items-center justify-center rounded-full bg-[var(--container-bg)] text-[var(--text-primary)] hover:bg-[var(--nested-container-bg)] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-[var(--input-border)]"
            >
              <i className="ri-logout-box-r-line"></i>
              <span className="ml-2">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task Overview Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Task Overview Cards */}
        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 border-[var(--btn-primary-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            New Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-primary-bg)]">
            {taskCounts.new}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks awaiting action
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 border-[var(--btn-accent-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Completed Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-accent-bg)]">
            {taskCounts.completed}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks successfully completed
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 border-[var(--info)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Accepted Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--info)]">
            {taskCounts.accepted}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks in progress
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 border-[var(--error)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Failed Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--error)]">
            {taskCounts.failed}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks that couldn't be completed
          </p>
        </div>
      </div>

      {/* Task Details Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <TaskList tasks={user.tasks} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
