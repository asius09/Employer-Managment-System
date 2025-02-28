const CompleteTask = () => {
  return (
    <div className="p-4 bg-[var(--nested-container-bg)] rounded-lg border-l-4 border-[var(--btn-accent-bg)]">
      <p className="text-sm text-[var(--text-secondary)]">
        Design new UI
      </p>
      <p className="text-xs text-[var(--text-muted)] mt-1">
        Completed: 2 days ago
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button className="text-xs text-[var(--text-muted)]">
          <i className="ri-time-line"></i> 2 days ago
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
