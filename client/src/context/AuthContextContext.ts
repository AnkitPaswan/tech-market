import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (userData: unknown) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
