import { createContext, useContext, createSignal, ParentComponent, onCleanup } from "solid-js";

interface AuthContextType {
  isAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: ParentComponent = (props) => {
  const [isAuthenticated, setIsAuthenticated] = createSignal(!!localStorage.getItem('token'));

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
      } else {
        // Handle error response
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // Clear token on unmount
  onCleanup(() => {
    localStorage.removeItem('token');
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {props.children}
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