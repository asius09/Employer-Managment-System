import { useAuth } from "../../Context";

const FailedTask = ({ task }) => {
  const { authState } = useAuth();
  const isAdmin = authState.user?.role === "admin";

  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--error)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{task.title}</p>
        {isAdmin && task.priority === "high" && (
          <span className="text-xs text-red-500 font-medium">
            High Priority
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Failed: {task.estimatedHours} days ago
      </p>
      <div className="mt-2 flex items-center gap-2">
        {isAdmin ? (
          <>
            <button className="text-xs text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] cursor-pointer">
              <i className="ri-edit-line"></i> Reassign
            </button>
            <button className="text-xs text-[var(--error)] hover:text-red-600 cursor-pointer">
              <i className="ri-delete-bin-line"></i> Delete
            </button>
          </>
        ) : (
          <button className="text-xs text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] cursor-pointer">
            <i className="ri-refresh-line"></i> Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default FailedTask;
