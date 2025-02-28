import React from "react";
import TaskList from "../TaskList/TaskList";
import { useParams } from "react-router";
import { useTheme } from "../../Context/ThemeContext";

const EmployeeDashboard = () => {
  const { theme, handleThemeToggle } = useTheme();
  const { username } = useParams();
  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Good Morning, {username}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Logged in since: 8:00 AM | Total hours today: 4.5 hrs
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            >
              <i
                className={`ri-${
                  theme === "dark" ? "sun-fill" : "contrast-2-line"
                } text-lg`}
              ></i>
            </button>
            <button className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center gap-2 cursor-pointer">
              <i className="ri-logout-box-r-line"></i>
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Task Overview Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Task Overview Cards */}
        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--btn-primary-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            New Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-primary-bg)]">
            12
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks awaiting action
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--btn-accent-bg)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Completed Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--btn-accent-bg)]">
            45
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks successfully completed
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--info)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Accepted Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--info)]">23</div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks in progress
          </p>
        </div>

        <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--error)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Failed Tasks
          </h3>
          <div className="text-4xl font-bold text-[var(--error)]">3</div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Tasks that couldn't be completed
          </p>
        </div>
      </div>

      {/* Task Details Section */}
      <div className="max-w-7xl mx-auto mt-8">
        <TaskList />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
