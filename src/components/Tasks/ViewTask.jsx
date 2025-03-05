import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const ViewTask = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();
  const { id } = useParams();
  const [viewTask, setViewTask] = useState({});

  useEffect(() => {
    const task = user.tasks.find((task) => task.id === id);
    if (task) {
      setViewTask(task);
    } else {
      navigate("/admin");
    }
  }, [id, user.tasks, navigate]);

  if (!viewTask) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--container-bg)] rounded-lg shadow-xl p-4 w-full max-w-sm mx-auto border border-[var(--border)] max-h-[95vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <i className="ri-eye-line text-xl text-[var(--btn-primary-bg)]"></i>
              View Task
            </h2>
            <button
              onClick={() => navigate("/admin")}
              className="p-1 rounded-md hover:bg-[var(--nested-container-bg)] transition-all duration-200"
            >
              <i className="ri-close-line text-lg text-[var(--text-secondary)]"></i>
            </button>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-[var(--text-primary)]">{viewTask.title}</h3>
              <p className="text-xs text-[var(--text-secondary)]">{viewTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <i className="ri-calendar-event-line"></i>
                  <span>Due Date</span>
                </div>
                <p className="font-medium text-[var(--text-primary)]">
                  {viewTask.dueDate ? dayjs(viewTask.dueDate).format("MMM D, YYYY") : "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <i className="ri-timer-line"></i>
                  <span>Est. Hours</span>
                </div>
                <p className="font-medium text-[var(--text-primary)]">
                  {viewTask.estimatedHours || "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <i className="ri-user-line"></i>
                  <span>Assigned To</span>
                </div>
                <p className="font-medium text-[var(--text-primary)]">
                  {viewTask.assignedTo?.empName || "Not assigned"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <i className="ri-flag-line"></i>
                  <span>Priority</span>
                </div>
                <p className="font-medium text-[var(--text-primary)] capitalize">
                  {viewTask.priority || "Not set"}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                <i className="ri-checkbox-circle-line"></i>
                <span>Status:</span>
                <span className="font-medium text-[var(--text-primary)] capitalize">
                  {viewTask.status || "Not set"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-[var(--btn-primary-bg)] rounded-md hover:bg-[var(--btn-primary-hover)] transition-colors duration-200"
              >
                <i className="ri-arrow-left-line text-sm"></i>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
