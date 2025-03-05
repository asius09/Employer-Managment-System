import React, { useState, useCallback } from "react";
import { useAuth } from "../../Context";
import UsersData from "../../utils/UsersData";
import { DropDown, DatePicker, RenderInput } from "../custom";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../../Hooks";
import dayjs from "dayjs";

const PostNewTask = () => {
  const { authState, setAuthState } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();
  const employees = UsersData.employees;

  const [lastTaskId, setLastTaskId] = useState(16);
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
    (name, value) => {
      setTaskDetails((prev) => ({ ...prev, [name]: value }));
    },
    [setTaskDetails]
  );

  const validateForm = useCallback(() => {
    const errors = [];
    if (!taskDetails.title.trim()) errors.push("Title is required");
    if (!taskDetails.description.trim()) errors.push("Description is required");
    if (!taskDetails.dueDate) errors.push("Due date is required");
    if (!selectedEmployee) errors.push("Please assign an employee");
    if (!selectedPriority) errors.push("Priority is required");
    if (!taskDetails.estimatedHours || taskDetails.estimatedHours <= 0)
      errors.push("Please enter valid estimated hours");

    if (errors.length > 0) {
      setInvalidError(errors.join(", "));
      setTimeout(() => setInvalidError(""), 3000);
      return false;
    }
    return true;
  }, [taskDetails, selectedEmployee, selectedPriority]);

  const clearLocalStorage = () => {
    clearSelectedEmployee();
    clearSelectedPriority();
    clearTaskDetails();
  };

  const handleNewPost = useCallback(() => {
    if (!validateForm()) return;
    const newTask = {
      ...taskDetails,
      id: `task${lastTaskId + 1}`,
      priority: selectedPriority.toLowerCase(),
      assignedTo: {
        empId: employees.find((emp) => emp.fullName === selectedEmployee).id,
        empName: selectedEmployee,
      },
      postDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    };
    const updatedAdmin = {
      ...user,
      activeTasks: user.activeTasks + 1,
      tasks: [...user.tasks, newTask],
    };
    setAuthState((prev) => ({ ...prev, user: updatedAdmin }));
    setLastTaskId((prev) => prev + 1);
    handleClose();
  }, [
    validateForm,
    taskDetails,
    lastTaskId,
    user,
    setAuthState,
    employees,
    selectedEmployee,
    selectedPriority,
    handleClose,
  ]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {invalidError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-500 px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center gap-2 z-[60]">
          <i className="ri-error-warning-line text-white" />
          <span className="text-xs font-medium text-white">{invalidError}</span>
        </div>
      )}
      <div className="bg-[var(--container-bg)] rounded-xl shadow-2xl p-4 w-full max-w-md mx-auto border border-[var(--border)] max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Post New Task
            </h2>
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-[var(--nested-container-bg)] transition-all duration-200"
            >
              <i className="ri-close-line text-xl text-[var(--text-secondary)]"></i>
            </button>
          </div>

          <RenderInput
            id="task-title"
            label="Task Title"
            icon="ri-pencil-line"
            name="title"
            value={taskDetails.title}
            onChange={handleInputChange}
            invalidError={invalidError}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DropDown
              options={employees.map((emp) => emp.fullName)}
              selectedOption={selectedEmployee}
              onSelect={setSelectedEmployee}
              invalid={invalidError && !selectedEmployee}
              label="Assign To"
              icon="ri-user-line"
            />
            <DropDown
              options={["Low", "Medium", "High"]}
              selectedOption={selectedPriority}
              onSelect={setSelectedPriority}
              invalid={invalidError && !selectedPriority}
              label="Priority"
              icon="ri-flag-line"
            />
            <DatePicker
              label="Due Date"
              icon="ri-calendar-event-line"
              value={taskDetails.dueDate ? dayjs(taskDetails.dueDate) : null}
              onChange={(date) => handleInputChange("dueDate", date)}
              invalid={invalidError && !taskDetails.dueDate}
            />
            <RenderInput
              id="estimated-hours"
              label="Estimated Hours"
              type="number"
              icon="ri-timer-line"
              name="estimatedHours"
              value={taskDetails.estimatedHours || ""}
              onChange={handleInputChange}
              invalidError={
                invalidError &&
                (!taskDetails.estimatedHours || taskDetails.estimatedHours <= 0)
              }
              min="0"
              step="1"
            />
          </div>

          <RenderInput
            label="Task Description"
            icon="ri-file-text-line"
            name="description"
            value={taskDetails.description}
            onChange={handleInputChange}
            invalidError={invalidError && !taskDetails.description.trim()}
            element="textarea"
          />

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <button
              className="px-4 py-2 rounded-lg bg-[var(--btn-secondary-bg)] text-white hover:bg-[var(--btn-secondary-hover)] transition-all duration-200 text-sm font-medium"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleNewPost}
              className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-white hover:bg-[var(--btn-primary-hover)] transition-all duration-200 text-sm font-medium"
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
