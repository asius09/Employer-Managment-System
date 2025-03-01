import React, { useState } from "react";
import { AcceptTask, CompleteTask, FailedTask, NewTask } from "./";
import { useAuth } from "../../Context";

const TaskList = ({ tasks = [] }) => {
  const { authState } = useAuth();
  const isAdmin = authState.user?.role === "admin";
  const [showAllTasks, setShowAllTasks] = useState({
    new: false,
    accepted: false,
    completed: false,
    failed: false,
  });

  // Check if tasks is an array before using array methods
  const isValidTasksArray = Array.isArray(tasks);

  const highPriorityTaskCount = isValidTasksArray
    ? tasks.filter((task) => task.priority === "high" && task.status === "new")
        .length
    : 0;

  const userTasks = {
    new: isValidTasksArray ? tasks.filter((task) => task.status === "new") : [],
    accepted: isValidTasksArray
      ? tasks.filter((task) => task.status === "accepted")
      : [],
    failed: isValidTasksArray
      ? tasks.filter((task) => task.status === "failed")
      : [],
    completed: isValidTasksArray
      ? tasks.filter((task) => task.status === "completed")
      : [],
  };

  const renderTaskSection = (
    title,
    tasks,
    Component,
    showPriorityCount = false,
    type
  ) => {
    const isTasksArray = Array.isArray(tasks);
    const visibleTasks = isTasksArray
      ? showAllTasks[type]
        ? tasks
        : tasks.slice(0, 2)
      : [];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h3>
          {showPriorityCount && highPriorityTaskCount > 0 && (
            <span className="text-sm text-[var(--text-muted)]">
              {highPriorityTaskCount} High Priority
            </span>
          )}
        </div>
        {isTasksArray && visibleTasks.length > 0 ? (
          <>
            {visibleTasks.map((task) => (
              <Component task={task} key={task.id} />
            ))}
            {tasks.length > 2 && (
              <button
                className="w-full px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                onClick={() =>
                  setShowAllTasks((prev) => ({ ...prev, [type]: !prev[type] }))
                }
              >
                <i
                  className={`ri-${
                    showAllTasks[type] ? "arrow-up-s" : "arrow-down-s"
                  }-line`}
                ></i>
                {showAllTasks[type] ? "Show Less" : "See More"}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm text-[var(--text-muted)]">No tasks available</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          {isAdmin ? "Task Management" : "My Tasks"}
        </h2>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        {renderTaskSection("New Tasks", userTasks.new, NewTask, isAdmin, "new")}
        {renderTaskSection(
          isAdmin ? "Accepted Tasks" : "My Tasks",
          userTasks.accepted,
          AcceptTask,
          false,
          "accepted"
        )}
        {renderTaskSection(
          isAdmin ? "Completed Tasks" : "Completed",
          userTasks.completed,
          CompleteTask,
          false,
          "completed"
        )}
        {renderTaskSection(
          isAdmin ? "Failed Tasks" : "Failed",
          userTasks.failed,
          FailedTask,
          false,
          "failed"
        )}
      </div>
    </div>
  );
};

export default TaskList;
