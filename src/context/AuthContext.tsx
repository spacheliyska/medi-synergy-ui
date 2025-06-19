import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = "isAuthenticated";
const SESSION_TIMEOUT = 2 * 60 * 1000; // 2 minutes in ms

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored === "true";
  });
  const navigate = useNavigate();
  const timeoutRef = useRef<number | null>(null);

  const clearSession = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("sessionTimestamp");
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(SESSION_KEY, "true");
      localStorage.setItem("sessionTimestamp", Date.now().toString());

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        clearSession();
        alert("Сесията изтече. Моля, влезте отново.");
      }, SESSION_TIMEOUT);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
