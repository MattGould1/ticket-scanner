import { createContext, useContext, useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // You can add additional token validation logic here
    setIsLoading(false);
  }, [token]);

  const value = {
    isAuthenticated: !!token,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
