const AcceptTask = () => {
  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--info)]">
      <p className="text-sm text-[var(--text-secondary)]">
        Develop new feature
      </p>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Accepted: 3 hours ago
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button className="text-xs text-[var(--btn-accent-bg)] hover:text-[var(--btn-accent-hover)] cursor-pointer">
          <i className="ri-check-double-line"></i> Complete
        </button>
        <button className="text-xs text-[var(--error)] hover:text-red-600 cursor-pointer">
          <i className="ri-close-line"></i> Fail
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
