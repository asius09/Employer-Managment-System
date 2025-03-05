import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { TaskList, PostNewTask, EditTask, ViewTask } from "../Tasks";
import { useAuth, useTheme } from "../../Context";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, authState } = useAuth();
  const { theme, handleThemeToggle } = useTheme();
  const isPostNewTaskOpen = location.pathname === "/admin/post-new-task";
  const isEditTaskOpen = location.pathname.startsWith("/admin/edittask");
  const isViewTaskOpen = location.pathname.startsWith("/admin/viewtask");

  const openPostTask = () => {
    navigate(isPostNewTaskOpen ? "/admin" : "/admin/post-new-task");
  };
  const openEditTask = (taskId) => {
    navigate(isEditTaskOpen ? "/admin" : `/admin/edittask/${taskId}`);
  };

  const openViewTask = (taskId) => {
    navigate(isViewTaskOpen ? "/admin" : `/admin/viewtask/${taskId}`);
  };

  const user = authState.user?.role === "admin" ? authState.user : null;
  const handleLogout = () => {
    if (isPostNewTaskOpen || isEditTaskOpen || isViewTaskOpen) return;
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isPostNewTaskOpen || isEditTaskOpen || isViewTaskOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPostNewTaskOpen, isEditTaskOpen, isViewTaskOpen]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Admin Dashboard
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Comprehensive management and analytics
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={isPostNewTaskOpen ? undefined : handleThemeToggle}
              className={`h-10 w-10 flex items-center justify-center rounded-full bg-[var(--container-bg)] text-[var(--text-primary)] transition-all duration-200 shadow-sm hover:shadow-md border border-[var(--input-border)] cursor-pointer`}
              disabled={isPostNewTaskOpen || isEditTaskOpen}
            >
              <i
                className={`ri-${
                  theme === "dark" ? "sun-fill" : "contrast-2-line"
                } text-lg`}
              ></i>
            </button>
            <button
              className={`h-10 px-4 flex items-center justify-center rounded-full bg-[var(--container-bg)] text-[var(--text-primary)] transition-all duration-200 shadow-sm hover:shadow-md border border-[var(--input-border)] cursor-pointer`}
              disabled={isPostNewTaskOpen || isEditTaskOpen}
            >
              <i className="ri-dashboard-line"></i>
              <span className="ml-2">Analytics</span>
            </button>
            <button
              onClick={handleLogout}
              className={`h-10 px-4 flex items-center justify-center rounded-full bg-[var(--container-bg)] text-[var(--text-primary)] transition-all duration-200 shadow-sm hover:shadow-md border border-[var(--input-border)] cursor-pointer`}
              disabled={isPostNewTaskOpen || isEditTaskOpen}
            >
              <i className="ri-logout-box-r-line"></i>
              <span className="ml-2">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--btn-primary-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            System Users
          </h3>
          <div className="text-4xl font-bold text[var(--btn-primary-bg)]">
            {user.employeesCount}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Total registered users
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--info)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Active Processes
          </h3>
          <div className="text-4xl font-bold text-[var(--info)]">
            {user.activeTasks}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Ongoing system activities
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--btn-accent-bg)]">
          <h3 className="text-lg font-semibold text[var(--text-primary)] mb-4">
            Completed Jobs
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-accent-bg)]">
            {user.completedTasks}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Successful operations
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--error)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Pending Actions
          </h3>
          <div className="text-4xl font-bold text-[var(--error)]">
            {user.pendingReviews}
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Requiring attention
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 flex justify-end gap-4">
        <button
          onClick={openPostTask}
          disabled={isPostNewTaskOpen || isEditTaskOpen}
          className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
        >
          <i className="ri-add-line"></i>
          Create New Process
        </button>
        <button
          disabled={isPostNewTaskOpen || isEditTaskOpen}
          className="px-4 py-2 rounded-lg bg-[var(--btn-secondary-bg)] text-white hover:bg-[var(--btn-secondary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
        >
          <i className="ri-settings-5-line"></i>
          System Settings
        </button>
      </div>
      {isPostNewTaskOpen && <PostNewTask />}
      {isEditTaskOpen && <EditTask />}
      {isViewTaskOpen && <ViewTask />}
      <div className="max-w-7xl mx-auto mt-8">
        <TaskList
          tasks={user.tasks}
          handleEditTask={openEditTask}
          handleViewTask={openViewTask}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
