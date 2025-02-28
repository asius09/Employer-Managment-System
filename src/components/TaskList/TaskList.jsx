import React from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

const TaskList = () => {
  return (
    <div className="bg-[var(--container-bg)] p-6 rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Task Management
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* New Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              New Tasks
            </h3>
            <span className="text-sm text-[var(--text-muted)]">
              2 High Priority
            </span>
          </div>
          <NewTask />
        </div>

        {/* Accepted Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Accepted Tasks
          </h3>
          <AcceptTask />
        </div>

        {/* Completed Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Completed Tasks
          </h3>
          <CompleteTask />
        </div>

        {/* Failed Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Failed Tasks
          </h3>
          <FailedTask />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
