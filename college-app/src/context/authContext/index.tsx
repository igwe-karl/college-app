import { createContext, useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  userLoggedIn: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // ... rest of your existing AuthProvider code ...
}; 