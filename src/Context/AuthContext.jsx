import { createContext, useCallback, useContext, useState } from "react";
import UsersData from "../utils/UsersData";
import useLocalStorage from "../Hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState, clearAuthState] = useLocalStorage(
    "authState",
    {
      isAuthenticated: false,
      user: null,
      loginStatus: null,
      errorMessage: null,
    }
  );

  const authenticateUser = useCallback(
    async (credentials) => {
      if (!credentials || Object.keys(credentials).length === 0) {
        return;
      }

      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const { email, password } = credentials;
        const { admin, employees } = UsersData;

        if (email === admin?.email) {
          if (password === admin.password) {
            setAuthState({
              isAuthenticated: true,
              user: { ...admin, role: "admin" },
              loginStatus: "success",
              errorMessage: null,
            });
            return;
          }
          setAuthState({
            isAuthenticated: false,
            user: null,
            loginStatus: "failed",
            errorMessage: "Incorrect password",
          });
          return;
        }

        const employee = employees.find(
          (emp) => emp.email === email && emp.password === password
        );

        if (employee) {
          setAuthState({
            isAuthenticated: true,
            user: { ...employee, role: "employee" },
            loginStatus: "success",
            errorMessage: null,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loginStatus: "failed",
            errorMessage: "Invalid credentials",
          });
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loginStatus: "failed",
          errorMessage: "Authentication failed. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthState]
  );

  const logout = useCallback(() => {
    clearAuthState();
  }, [clearAuthState]);

  return (
    <AuthContext.Provider
      value={{
        authenticateUser,
        isLoading,
        authState,
        setAuthState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
