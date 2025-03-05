import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../Context";

dayjs.extend(relativeTime);

const RenderTask = ({ task, handleEditTask, handleViewTask }) => {
  const {
    authState: { user },
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) =>
    ({
      completed: "text-green-500",
      failed: "text-red-500",
      "in progress": "text-blue-500",
    }[status?.toLowerCase()] || "text-yellow-500");

  const getPriorityColor = (priority) =>
    ({
      high: "text-orange-500",
      medium: "text-yellow-500",
      low: "text-gray-500",
    }[priority?.toLowerCase()] || "");

  const getPriorityIcon = (priority) =>
    ({
      high: "ri-flag-2-fill text-orange-500",
      medium: "ri-flag-2-line text-yellow-500",
      low: "ri-flag-line text-gray-500",
    }[priority?.toLowerCase()] || "ri-flag-line");

  const formatDate = (date) => {
    const now = dayjs();
    const taskDate = dayjs(date);
    return now.diff(taskDate, "day") < 7
      ? taskDate.fromNow()
      : taskDate.format("MMM D, YYYY h:mm A");
  };

  const renderButtons = () => {
    if (loading)
      return (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-[var(--btn-primary-bg)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      );

    const isAdmin = user.role === "admin";
    const isAssignedEmployee = task.assignedTo?.id === user.id;

    if (isAdmin)
      return (
        <button
          onClick={() => handleEditTask(task.id)}
          className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-[var(--btn-primary-bg)] rounded-md hover:bg-[var(--btn-primary-hover)] transition-colors duration-200"
        >
          <i className="ri-edit-line"></i>Edit
        </button>
      );

    const buttonConfigs = {
      new: {
        action: () => {}, // Replace with actual action
        label: "Accept",
        icon: "ri-check-line",
        color: "bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)]",
      },
      "in progress": [
        {
          action: () => {}, // Replace with actual action
          label: "Complete",
          icon: "ri-check-double-line",
          color: "bg-green-500 hover:bg-green-600",
        },
        {
          action: () => {}, // Replace with actual action
          label: "Failed",
          icon: "ri-close-line",
          color: "bg-red-500 hover:bg-red-600",
        },
      ],
    };

    const config = buttonConfigs[task.status?.toLowerCase()];
    if (!config || (Array.isArray(config) && !isAssignedEmployee)) return null;

    const renderButton = ({ action, label, icon, color }) => (
      <button
        key={label}
        onClick={action}
        className={`flex items-center gap-1 px-2 py-1 text-xs font-medium text-white ${color} rounded-md transition-colors duration-200`}
      >
        <i className={icon}></i>
        {label}
      </button>
    );

    return Array.isArray(config) ? (
      <div className="flex gap-2">{config.map(renderButton)}</div>
    ) : (
      renderButton(config)
    );
  };

  return (
    <div
      className={`w-full bg-[var(--container-bg)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200`}
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3
              className={`font-medium text-sm text-[var(--text-primary)] truncate`}
            >
              {task.title}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
            {task.description.length > 50
              ? `${task.description.substring(0, 50)}...`
              : task.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--text-secondary)]">
            {[
              {
                icon: "ri-time-line",
                value: formatDate(task.postDate),
                label: `Posted: ${formatDate(task.postDate)}`,
              },
              {
                icon: "ri-calendar-event-line",
                value: formatDate(task.dueDate),
                label: `Due: ${formatDate(task.dueDate)}`,
              },
              {
                icon: "ri-timer-line",
                value: `${task.estimatedHours}h`,
                label: "Est. Time",
              },
              {
                icon: getPriorityIcon(task.priority),
                value: task.priority,
                className: `capitalize ${getPriorityColor(task.priority)}`,
                label: "Priority",
              },
              {
                icon: "ri-user-line",
                value: task.assignedTo?.empName || "Unassigned",
                label: "Assigned to",
              },
            ].map(({ icon, value, className = "", label }, index) => (
              <div
                key={index}
                className="flex items-center gap-1 group relative"
              >
                <i className={icon}></i>
                <span className={className}>{value}</span>
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          {renderButtons()}
          <button
            onClick={() => handleViewTask(task.id)}
            className="px-2 py-1 text-xs font-medium text-white hover:text-[var(--text-primary)] bg-[var(--btn-secondary-bg)] hover:bg-[var(--btn-secondary-hover)] rounded-md transition-colors duration-200"
          >
            <i className="ri-eye-line mr-1 text-white"></i>View
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderTask;
