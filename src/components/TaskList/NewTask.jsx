const NewTask = ({ highPriority = true }) => {
  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--btn-primary-bg)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Create user authentication
        </p>
        {highPriority && (
          <span className="text-xs text-red-500 font-medium">
            High Priority
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--text-muted)] mt-1">Added: 1 hour ago</p>
      <div className="mt-2 flex items-center gap-2">
        <button className="text-xs text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] cursor-pointer">
          <i className="ri-check-line"></i> Accept
        </button>
        <button className="text-xs text-[var(--error)] hover:text-red-600 cursor-pointer">
          <i className="ri-close-line"></i> Reject
        </button>
      </div>
    </div>
  );
};

export default NewTask;
