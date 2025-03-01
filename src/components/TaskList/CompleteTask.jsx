import { useAuth } from "../../Context";

const CompleteTask = ({ task }) => {
  const { authState } = useAuth();
  const isAdmin = authState.user?.role === "admin";

  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--btn-accent-bg)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{task.title}</p>
        {isAdmin && task.priority === "high" && (
          <span className="text-xs text-red-500 font-medium">
            High Priority
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Completed: {task.dueDate}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {isAdmin ? (
          <>
            <button className="text-xs text-[var(--btn-accent-bg)] hover:text-[var(--btn-accent-hover)] cursor-pointer">
              <i className="ri-eye-line"></i> View
            </button>
            <button className="text-xs text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] cursor-pointer">
              <i className="ri-edit-line"></i> Edit
            </button>
          </>
        ) : (
          <button className="text-xs text-[var(--text-muted)]">
            <i className="ri-time-line"></i> {task.estimatedHours} hours
          </button>
        )}
      </div>
    </div>
  );
};

export default CompleteTask;
