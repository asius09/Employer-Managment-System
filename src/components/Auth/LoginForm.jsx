import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../Context";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { authenticateUser, isLoading, authState, setAuthState } = useAuth();

  const handleInputChange = useCallback(
    (field) => (value) => {
      setCredentials((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const toggleRememberUser = useCallback(() => {
    setCredentials((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setCredentials((prev) => ({ ...prev }));
    if (credentials.email && credentials.password)
      authenticateUser(credentials);
  };
  useEffect(() => {
    if (authState.user?.role) {
      setTimeout(
        () =>
          navigate(
            authState.user.role === "admin"
              ? "/admin"
              : `/employee/${authState.user.username}`
          ),
        500
      );
    }
  }, [authState.user]);
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
        <form className="space-y-6" autoComplete="off" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2"
            >
              <i className="ri-mail-line text-lg text-[var(--btn-primary-bg)]"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => handleInputChange("email")(e.target.value)}
              className="w-full px-4 py-3 mt-1 border rounded-lg bg-[var(--input-bg)] border-[var(--input-border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] focus:border-transparent transition-all"
              placeholder="Enter your email"
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
                onChange={(e) => handleInputChange("password")(e.target.value)}
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <i className="ri-loader-4-line text-lg animate-spin"></i>
                ) : (
                  <i
                    className={`ri-eye${
                      isPasswordVisible ? "-line" : "-off-line"
                    } text-lg cursor-pointer`}
                  ></i>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={credentials.rememberMe}
                onChange={toggleRememberUser}
                className="hidden"
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-[var(--text-secondary)] flex items-center gap-2"
              >
                <i
                  className={`ri-checkbox-circle-${
                    credentials.rememberMe ? "fill" : "line"
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

          {authState.loginStatus && (
            <div
              id="login-message"
              className={`w-full text-center ${
                authState.loginStatus === "success"
                  ? "text-[var(--success)]"
                  : "text-[var(--error)]"
              }`}
            >
              {authState.loginStatus === "success"
                ? "Login Successful!"
                : authState.errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white rounded-lg bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <i className="ri-loader-4-line text-xl animate-spin"></i>
            ) : (
              <>
                <i className="ri-login-box-line text-xl"></i>
                Login
              </>
            )}
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
