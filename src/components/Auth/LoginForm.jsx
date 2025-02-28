import React, { useState } from "react";

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [employeeIdValue, setEmployeeIdValue] = useState("");
  const [shouldRememberUser, setShouldRememberUser] = useState(false);

  const handleEmployeeIdChange = (value) => setEmployeeIdValue(value);
  const handlePasswordChange = (value) => setPasswordValue(value);
  const toggleRememberUser = () => setShouldRememberUser((prev) => !prev);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleFormSubmission = (event) => {
    event.preventDefault();
    console.log("Form submitted with:", {
      employeeId: employeeIdValue,
      password: passwordValue,
      rememberMe: shouldRememberUser,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--page-bg)] p-4">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl bg-[var(--container-bg)] border border-[var(--border)] transform transition-all">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] flex items-center justify-center gap-3">
            <i className="ri-user-3-line text-4xl text-[var(--btn-primary-bg)]"></i>
            Employee Login
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Enter your employee credentials to access the system
          </p>
        </div>
        <form
          className="space-y-6"
          autoComplete="off"
          onSubmit={handleFormSubmission}
        >
          <div className="space-y-2">
            <label
              htmlFor="employeeId"
              className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2"
            >
              <i className="ri-user-3-line text-lg text-[var(--btn-primary-bg)]"></i>
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              onChange={(e) => handleEmployeeIdChange(e.target.value)}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] focus:border-transparent transition-all"
              placeholder="Enter your employee ID"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2"
            >
              <i className="ri-lock-password-line text-lg text-[var(--btn-primary-bg)]"></i>
              Password
            </label>
            <div className="relative">
              <input
                onChange={(e) => handlePasswordChange(e.target.value)}
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 mt-1 border rounded-lg bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--btn-primary-bg)] transition-colors"
              >
                <i
                  className={`ri-eye${
                    isPasswordVisible ? "-line" : "-off-line"
                  } text-lg cursor-pointer`}
                ></i>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={shouldRememberUser}
                onChange={toggleRememberUser}
                className="hidden"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-[var(--text-secondary)] flex items-center gap-2"
              >
                <i
                  className={`ri-checkbox-circle-${
                    shouldRememberUser ? "fill" : "line"
                  } text-lg text-[var(--btn-primary-bg)] cursor-pointer`}
                ></i>
                Remember Me
              </label>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] focus:outline-none transition-colors flex items-center gap-2 cursor-pointer"
            >
              <i className="ri-question-line text-lg"></i>
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white rounded-lg bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--btn-primary-bg)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <i className="ri-login-box-line text-xl"></i>
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            New employee?{" "}
            <button
              type="button"
              className="font-medium text-[var(--btn-primary-bg)] hover:text-[var(--btn-primary-hover)] focus:outline-none transition-colors hover:underline cursor-pointer"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
