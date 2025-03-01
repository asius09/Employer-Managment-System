import { useAuth } from "../../Context";

const AcceptTask = ({ task }) => {
  const { authState, setAuthState } = useAuth();
  const isAdmin = authState.user?.role === "admin";
  const { tasks } = authState.user;
  const handleComplete = () => {
    if (!task) return;

    const completionDate = new Date().toISOString().split("T")[0];

    const updatedTask = {
      ...task,
      status: "completed",
      completed: true,
      accepted: false,
      dueDate: completionDate,
    };
    const updatedTasks = tasks.map((t) => (t.id === task.id ? updatedTask : t));
    setAuthState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        tasks: updatedTasks,
        taskCounts: {
          ...prev.user.taskCounts,
          accepted: Math.max(0, prev.user.taskCounts.accepted - 1),
          completed: prev.user.taskCounts.completed + 1,
        },
      },
    }));
  };
  const handleFail = () => {
    if (!task) return;

    const day = Math.floor(Math.random() * 10);
    const updateTask = {
      ...task,
      status: "failed", // Changed from "completed" to "failed"
      accepted: false,
      failed: true,
      dueDate: day,
    };

    const updatedTasks = tasks.map((t) => (t.id === task.id ? updateTask : t));

    setAuthState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        tasks: updatedTasks,
        taskCounts: {
          ...prev.user.taskCounts,
          accepted: Math.max(0, prev.user.taskCounts.accepted - 1),
          failed: prev.user.taskCounts.failed + 1,
        },
      },
    }));
  };
  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--info)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{task.title}</p>
        {!isAdmin && task.priority === "high" && (
          <span className="text-xs text-red-500 font-medium">
            High Priority
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Due: {task.dueDate}
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
              onClick={handleComplete}
              className="text-xs text-[var(--btn-accent-bg)] hover:text-[var(--btn-accent-hover)] cursor-pointer"
            >
              <i className="ri-check-double-line"></i> Complete
            </button>
            <button
              onClick={handleFail}
              className="text-xs text-[var(--error)] hover:text-red-600 cursor-pointer"
            >
              <i className="ri-close-line"></i> Fail
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptTask;
