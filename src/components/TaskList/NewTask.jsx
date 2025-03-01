import { useAuth } from "../../Context";

const NewTask = ({ task }) => {
  const { authState, setAuthState } = useAuth();
  const isAdmin = authState.user?.role === "admin";
  const { tasks } = authState.user;
  const handleAccept = () => {
    if (!task) return;
    const now = new Date().toISOString().split("T")[0];
    const updatedTask = {
      ...task,
      status: "accepted",
      accepted: true,
      new: false,
      dueDate: now,
    };

    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));

    setAuthState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        tasks: updatedTasks,
        taskCounts: {
          ...prev.user.taskCounts,
          new: Math.max(0, prev.user.taskCounts.new - 1),
          accepted: prev.user.taskCounts.accepted + 1,
        },
      },
    }));
  };
  const handleReject = () => {
    if (!task) return;

    const updatedTask = {
      ...task,
      status: "rejected",
      new: false,
      rejected: true,
    };

    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));

    setAuthState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        tasks: updatedTasks,
        taskCounts: {
          ...prev.user.taskCounts,
          new: Math.max(0, prev.user.taskCounts.new - 1),
        },
      },
    }));
  };

  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--btn-primary-bg)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{task.title}</p>
        {task.priority && task.priority === "high" && (
          <span className="text-xs text-red-500 font-medium">
            High Priority
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Added: {task.estimatedHours} hour ago
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
          <>
            <button
              onClick={handleAccept}
              className="text-xs text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] cursor-pointer"
            >
              <i className="ri-check-line"></i> Accept
            </button>
            <button
              onClick={handleReject}
              className="text-xs text-[var(--error)] hover:text-red-600 cursor-pointer"
            >
              <i className="ri-close-line"></i> Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewTask;
