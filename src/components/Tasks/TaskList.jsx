import React, { useState } from "react";
import { useAuth } from "../../Context";
import RenderTask from "./RenderTask";
import FilterDropDown from "../custom/FilterDropDown";
import dayjs from "dayjs";

const TaskList = ({ tasks = [], handleEditTask, handleViewTask }) => {
  const { authState } = useAuth();
  const isAdmin = authState.user?.role === "admin";
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [filter, setFilter] = useState("all");

  const highPriorityTaskCount = tasks.filter(
    (task) => task.priority === "high" && task.status === "new"
  ).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "high") return task.priority === "high";
    if (filter === "accepted") return task.status === "accepted";
    if (filter === "completed") return task.status === "completed";
    if (filter === "failed") return task.status === "failed";
    if (filter === "recent") return task.status === "new";
    return task.status === filter;
  });

  const visibleTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 6);

  const filterOptions = [
    "all",
    "new",
    "high",
    "accepted",
    "completed",
    "failed",
    "recent",
  ];

  return (
    <div className="bg-[var(--container-bg)] p-8 rounded-2xl shadow-xl">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            {isAdmin ? "Task Management Dashboard" : "My Task Overview"}
          </h2>
          {highPriorityTaskCount > 0 && (
            <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
              {highPriorityTaskCount} High Priority Task
              {highPriorityTaskCount !== 1 && "s"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          {isAdmin && (
            <FilterDropDown
              options={filterOptions}
              selectedOption={filter}
              onSelect={setFilter}
            />
          )}
          {tasks.length > 5 && (
            <button
              className="px-5 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
              onClick={() => setShowAllTasks(!showAllTasks)}
            >
              {showAllTasks ? "Show Less" : "View All Tasks"}
              <i
                className={`ri-arrow-${showAllTasks ? "up" : "down"}-s-line`}
              ></i>
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <RenderTask
              task={task}
              key={task.id}
              handleEditTask={handleEditTask}
              handleViewTask={handleViewTask}
            />
          ))
        ) : (
          <p className="text-sm text-[var(--text-muted)] col-span-full text-center py-8">
            No tasks available at the moment
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
