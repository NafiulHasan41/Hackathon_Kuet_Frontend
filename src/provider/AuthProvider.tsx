'use client';
import { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/useToast";


export interface User {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
  role: "admin" | "user";
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  createUser: (name: string, email: string, password: string , imageURL: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const showToast = useToast();

  const API_URL = process.env.NEXT_PUBLIC_API_URL ;

  const createUser = async (name: string, email: string, password: string, imageURL: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password , imageURL });
      setUser(response.data);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", response.data.token); 
      setUser(response.data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    showToast(  "success" ,"Logged out successfully");
    setUser(null);
    router.push("/authentication");
  };

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Token validation error:", error);
          logOut();
        }
      }
      setLoading(false);
    };
    validateUser();
  }, []);

  const value: AuthContextProps = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
