import React, { useState, useCallback } from "react";
import { useAuth } from "../../Context";
import UsersData from "../../utils/UsersData";
import { DropDown } from "../custom";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../../Hooks";

const PostNewTask = () => {
  const { authState, setAuthState } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();
  const employees = UsersData.employees;

  const [lastTaskId, setLastTaskId] = useState(13);
  const [selectedEmployee, setSelectedEmployee, clearSelectedEmployee] =
    useLocalStorage("selectedEmployee", "");
  const [selectedPriority, setSelectedPriority, clearSelectedPriority] =
    useLocalStorage("selectedPriority", "");
  const [taskDetails, setTaskDetails, clearTaskDetails] = useLocalStorage(
    "taskDetails",
    {
      title: "",
      description: "",
      dueDate: "",
      estimatedHours: 0,
      assignedBy: "admin1",
      status: "new",
      accepted: false,
      completed: false,
      failed: false,
      new: true,
    }
  );
  const [invalidError, setInvalidError] = useState("");

  const handleClose = useCallback(() => {
    navigate("/admin");
    clearLocalStorage();
  }, [navigate]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTaskDetails((prev) => ({ ...prev, [name]: value }));
    },
    [setTaskDetails]
  );

  const validateInputs = useCallback(() => {
    return (
      taskDetails.title &&
      taskDetails.description &&
      taskDetails.dueDate &&
      taskDetails.estimatedHours > 0 &&
      selectedEmployee &&
      selectedPriority
    );
  }, [taskDetails, selectedEmployee, selectedPriority]);

  const clearLocalStorage = () => {
    clearSelectedEmployee();
    clearSelectedPriority();
    clearTaskDetails();
  };

  const handleNewPost = useCallback(() => {
    if (!validateInputs()) {
      setInvalidError("Please fill all required fields");
      setTimeout(() => setInvalidError(""), 2000);
      return;
    }

    const newTask = {
      ...taskDetails,
      id: lastTaskId + 1,
      priority: selectedPriority,
      assignedTo: selectedEmployee,
    };

    const updatedAdmin = {
      ...user,
      activeTasks: user.activeTasks + 1,
      tasks: [...user.tasks, newTask],
    };
    setAuthState((prev) => ({
      ...prev,
      user: updatedAdmin,
    }));

    const employee = employees.find((emp) => emp.fullName === selectedEmployee);
    if (employee) {
      const updatedEmployee = {
        ...employee,
        tasks: [...employee.tasks, newTask],
        taskCounts: {
          ...employee.taskCounts,
          new: employee.taskCounts.new + 1,
        },
      };
      // TODO: Update employee data when backend is implemented
    }

    setLastTaskId((prev) => prev + 1);
    handleClose();
    clearLocalStorage();
  }, [
    validateInputs,
    taskDetails,
    lastTaskId,
    user,
    setAuthState,
    employees,
    selectedEmployee,
    selectedPriority,
    handleClose,
    clearSelectedEmployee,
    clearSelectedPriority,
    clearTaskDetails,
  ]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-scrollbar">
      {invalidError && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-500 px-6 py-3 rounded-lg shadow-lg animate-fade-in flex items-center gap-2 z-10">
          <i className="ri-error-warning-line text-lg text-white" />
          <span className="text-sm font-medium text-white">{invalidError}</span>
        </div>
      )}
      <div className="bg-[var(--container-bg)] rounded-xl shadow-2xl p-8 w-full h-screen md:w-auto md:h-auto md:max-w-2xl border border-[var(--border)] relative overflow-y-auto">
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
              <i className="ri-task-line text-3xl text-[var(--btn-primary-bg)]"></i>
              Post New Task
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg[var(--nested-container-bg)] transition-all duration-200 hover:scale-105"
            >
              <i className="ri-close-line text-2xl text-[var(--text-secondary)]"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-pencil-line text-lg"></i>
                Task Title
              </label>
              <input
                type="text"
                name="title"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  invalidError && !taskDetails.title
                    ? "border-red-500"
                    : "border-[var(--input-border)]"
                } bg-[var(--input-bg)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] cursor-pointer transition-all duration-200 hover:border-[var(--btn-primary-bg)]`}
                placeholder="Enter task title"
                onChange={handleInputChange}
                value={taskDetails.title}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                <i className="ri-user-line text-lg"></i>
                Assign To
              </label>
              <DropDown
                options={employees.map((emp) => emp.fullName)}
                selectedOption={selectedEmployee}
                onSelect={setSelectedEmployee}
                invalid={invalidError && !selectedEmployee}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text[var(--text-secondary)]">
              <i className="ri-file-text-line text-lg"></i>
              Task Description
            </label>
            <textarea
              name="description"
              className={`w-full px-4 py-2.5 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] text[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] cursor-pointer transition-all duration-200 hover:border-[var(--btn-primary-bg)] placeholder-[var(--text-muted)] ${
                invalidError && !taskDetails.description
                  ? "border-red-500"
                  : "border-[var(--input-border)]"
              }`}
              rows={taskDetails.description.length > 100 ? 4 : 2}
              placeholder="Enter task description"
              value={taskDetails.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text[var(--text-secondary)]">
                <i className="ri-calendar-event-line text-lg text[var(--btn-primary-bg)]"></i>
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dueDate"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    invalidError && !taskDetails.dueDate
                      ? "border-red-500"
                      : "border-[var(--input-border)]"
                  } bg-[var(--input-bg)] text[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] cursor-pointer transition-all duration-200 hover:border-[var(--btn-primary-bg)] appearance-none`}
                  value={taskDetails.dueDate}
                  onChange={handleInputChange}
                />
                <i className="ri-calendar-line absolute right-3 top-1/2 -translate-y-1/2 text[var(--text-muted)] pointer-events-none"></i>
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text[var(--text-secondary)]">
                <i className="ri-flag-line text-lg"></i>
                Priority
              </label>
              <DropDown
                options={["Low", "Medium", "High"]}
                selectedOption={selectedPriority}
                onSelect={setSelectedPriority}
                invalid={invalidError && !selectedPriority}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text[var(--text-secondary)]">
                <i className="ri-timer-line text-lg text[var(--btn-primary-bg)]"></i>
                Estimated Hours
              </label>
              <div className="relative">
                <input
                  id="estimated-hours"
                  type="number"
                  name="estimatedHours"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    invalidError &&
                    (taskDetails.estimatedHours === 0 ||
                      !taskDetails.estimatedHours)
                      ? "border-red-500"
                      : "border-[var(--input-border)]"
                  } bg-[var(--input-bg)] text[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] cursor-pointer transition-all duration-200 hover:border-[var(--btn-primary-bg)]`}
                  placeholder="Enter hours"
                  value={taskDetails.estimatedHours || ""}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[var(--border)]">
            <button
              className="px-6 py-2.5 rounded-lg bg-[var(--btn-secondary-bg)] text-white hover:bg-[var(--btn-secondary-hover)] transition-all duration-200 hover:scale-105 flex items-center gap-2 font-medium"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleNewPost}
              className="px-6 py-2.5 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-all duration-200 hover:scale-105 flex items-center gap-2 font-medium"
            >
              Post Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNewTask;
