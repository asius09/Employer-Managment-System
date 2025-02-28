const FailedTask = () => {
  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--error)]">
      <p className="text-sm text-[var(--text-secondary)]">
        Implement payment gateway
      </p>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Failed: 3 days ago
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button className="text-xs text-[var(--text-muted)]">
          <i className="ri-time-line"></i> 3 days ago
        </button>
      </div>
    </div>
  );
};

export default FailedTask;
