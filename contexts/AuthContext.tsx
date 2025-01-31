import { createContext, useContext, useEffect, useState, useMemo } from "react";
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
  const { token } = useAppSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    // You can add additional token validation logic here
    setIsLoading(false);
  }, [token]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      isLoading,
    }),
    [token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
