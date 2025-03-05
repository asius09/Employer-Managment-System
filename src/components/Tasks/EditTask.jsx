import React, { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../Context";
import UsersData from "../../utils/UsersData";
import { DropDown, DatePicker, RenderInput } from "../custom";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";

const EditTask = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
  const { user } = authState;
  const { id } = useParams();
  console.log(id);
  const [taskDetails, setTaskDetails] = useState(null);
  const [invalidError, setInvalidError] = useState("");
  const employees = UsersData.employees.map((emp) => emp.fullName);
  const [initialStatus, setInitialStatus] = useState("");
  const priorities = ["Low", "Medium", "High"];
  const statuses = ["new", "accepted", "completed", "failed"];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const editTask = user.tasks.find((task) => task.id === id);
    if (editTask) {
      setInitialStatus(editTask.status);
      setTaskDetails({
        ...editTask,
        employee: editTask.assignedTo.empName,
        postDate: editTask.postDate || dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        dueDate:
          editTask.dueDate ||
          dayjs()
            .add(editTask.estimatedHours || 8, "hour")
            .format("YYYY-MM-DDTHH:mm:ss"),
      });
    }
  }, [id, user.tasks]);

  const validateForm = useCallback(() => {
    if (!taskDetails) return false;
    const errors = [];
    if (!taskDetails.title.trim()) errors.push("Title is required");
    if (!taskDetails.description.trim()) errors.push("Description is required");
    if (!taskDetails.dueDate) errors.push("Due date is required");
    if (!taskDetails.employee) errors.push("Please assign an employee");
    if (!taskDetails.priority) errors.push("Priority is required");
    if (!taskDetails.status) errors.push("Status is required");
    if (!taskDetails.estimatedHours || taskDetails.estimatedHours <= 0)
      errors.push("Please enter valid estimated hours");

    if (errors.length > 0) {
      setInvalidError(errors.join(", "));
      setTimeout(() => setInvalidError(""), 3000);
      return false;
    }
    return true;
  }, [taskDetails]);

  const handleInputChange = useCallback((field, value) => {
    setTaskDetails((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        setInvalidError("");
        const updatedTask = {
          ...taskDetails,
          title: taskDetails.title.trim(),
          description: taskDetails.description.trim(),
          assignedTo: {
            empId: UsersData.employees.find(
              (emp) => emp.fullName === taskDetails.employee
            )?.id,
            empName: taskDetails.employee,
          },
          priority: taskDetails.priority,
          status: taskDetails.status,
          dueDate: dayjs(taskDetails.dueDate).format("YYYY-MM-DD"),
          estimatedHours: taskDetails.estimatedHours,
          [initialStatus]: false,
          [taskDetails.status]: true,
          postDate: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
        };

        const updatedTasks = user.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );

        setAuthState((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            tasks: updatedTasks,
            acceptedTasks:
              taskDetails.status === "accepted" && initialStatus !== "accepted"
                ? prev.user.acceptedTasks + 1
                : prev.user.acceptedTasks,
            completedTasks:
              taskDetails.status === "completed" &&
              initialStatus !== "completed"
                ? prev.user.completedTasks + 1
                : prev.user.completedTasks,
            pendingReviews:
              taskDetails.status === "failed" && initialStatus !== "failed"
                ? prev.user.pendingReviews + 1
                : prev.user.pendingReviews,
          },
        }));
        navigate("/admin");
      }
    },
    [
      taskDetails,
      validateForm,
      user.tasks,
      setAuthState,
      navigate,
      initialStatus,
    ]
  );

  if (!taskDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 z-50 overflow-y-auto">
      {invalidError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center gap-2 z-[60]">
          <i className="ri-error-warning-line text-base text-white" />
          <span className="text-xs font-medium text-white whitespace-normal max-w-xs text-center">
            {invalidError}
          </span>
        </div>
      )}
      <div className="bg-[var(--container-bg)] rounded-lg shadow-xl p-4 w-full max-w-md mx-auto my-2 border border-[var(--border)] max-h-[95vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <i className="ri-edit-line text-xl text-[var(--btn-primary-bg)]"></i>
              Edit Task
            </h2>
            <button
              onClick={() => navigate("/admin")}
              className="p-1 rounded-md hover:bg-[var(--nested-container-bg)] transition-all duration-200"
            >
              <i className="ri-close-line text-lg text-[var(--text-secondary)]"></i>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSave}>
            <RenderInput
              id="title"
              label="Task Title"
              icon="ri-pencil-line"
              type="text"
              name="title"
              onChange={handleInputChange}
              value={taskDetails.title}
              invalidError={invalidError}
            />

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Due Date"
                icon="ri-calendar-event-line"
                value={dayjs(taskDetails.dueDate)}
                onChange={(date) => handleInputChange("dueDate", date)}
                invalid={invalidError && !taskDetails.dueDate}
              />
              <RenderInput
                id="estimatedHours"
                label="Est. Hours"
                icon="ri-timer-line"
                type="number"
                name="estimatedHours"
                onChange={handleInputChange}
                value={taskDetails.estimatedHours}
                invalidError={invalidError}
                min="0"
                step="1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DropDown
                options={employees}
                selectedOption={taskDetails.employee}
                onSelect={(option) => handleInputChange("employee", option)}
                invalid={invalidError && !taskDetails.employee}
                label="Employee"
                icon="ri-user-line"
              />
              <DropDown
                options={priorities}
                selectedOption={taskDetails.priority}
                onSelect={(option) => handleInputChange("priority", option)}
                invalid={invalidError && !taskDetails.priority}
                label="Priority"
                icon="ri-flag-line"
              />
            </div>

            <DropDown
              options={statuses}
              selectedOption={taskDetails.status}
              onSelect={(option) => handleInputChange("status", option)}
              invalid={invalidError && !taskDetails.status}
              label="Status"
              icon="ri-checkbox-circle-line"
            />

            <RenderInput
              id="description"
              label="Task Description"
              icon="ri-file-text-line"
              type="textarea"
              name="description"
              onChange={handleInputChange}
              value={taskDetails.description}
              invalidError={invalidError}
              element="textarea"
            />

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-[var(--btn-secondary-bg)] rounded-md hover:bg-[var(--btn-secondary-hover)] transition-colors duration-200"
              >
                <i className="ri-close-line text-sm"></i>
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-[var(--btn-primary-bg)] rounded-md hover:bg-[var(--btn-primary-hover)] transition-colors duration-200"
              >
                <i className="ri-save-line text-sm"></i>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
