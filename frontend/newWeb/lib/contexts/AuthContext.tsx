
"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {jwtDecode} from "jwt-decode";
export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("[v0] Failed to restore auth:", error);

      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // const response = await fetch("http://127.0.0.1:5000/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });
      const response = await fetch("http://localhost:5000/auth/login", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");

      }

      console.log("[v0] FULL LOGIN RESPONSE:", responseData);

      const data = responseData.data;

      if (!data?.token) {
        throw new Error("Token missing from backend response");
      }

      const newToken = data.token;

      const userData: User = {
        id: data.user?.id || "",
        name: data.user?.name || "",
        email: data.user?.email || email,
      };

      console.log("[v0] Login successful:", {
        userData,
        newToken,
      });

      setToken(newToken);
      setUser(userData);

      localStorage.setItem("auth_token", newToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));

    } catch (error) {
      console.error("[v0] Login error:", error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const url=process.env.FLASK_API_URL||"http://127.0.1:5000";
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });


      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Signup failed");

      }

      console.log("[v0] FULL SIGNUP RESPONSE:", responseData);

      const data = responseData.data;

      if (!data?.token) {
        throw new Error("Token missing from backend response");
      }

      const newToken = data.token;

      const userData: User = {
        id: data.user?.id || "",
        name: data.user?.name || name,
        email: data.user?.email || email,
      };

      console.log("[v0] Signup successful:", {
        userData,
        newToken,
      });

      setToken(newToken);
      setUser(userData);

      localStorage.setItem("auth_token", newToken);
      localStorage.setItem("auth_user", JSON.stringify(userData));

    } catch (error) {
      console.error("[v0] Signup error:", error);
      throw error;
    }
  };

  // const logout = () => {
  //   setUser(null);
  //   setToken(null);

  //   localStorage.removeItem("auth_token");
  //   localStorage.removeItem("auth_user");
  // };
  const TOKEN_EXPIRY_MS = 1800000;
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // 1. Initial check: Retrieve token on app mount
    const savedToken = localStorage.getItem('auth_token');
    if (!savedToken) return;

    try {
      const decoded: any = jwtDecode(savedToken);
      const currentTime = Date.now() / 1000; // Convert to seconds

      // If it's already expired, wipe it instantly
      if (decoded.exp < currentTime) {
        logout();
        return;
      }

      // 2. Set state if valid
      setToken(savedToken);

      // 3. Schedule automatic wipe for the exact millisecond it expires
      const timeLeftInSeconds = decoded.exp - currentTime;
      const timeoutId = setTimeout(() => {
        alert("Your session has expired. Please log in again.");
        logout();
      }, timeLeftInSeconds * 1000);

      // Cleanup timeout if token changes or component unmounts
      return () => clearTimeout(timeoutId);

    } catch (error) {
      console.error("[Auth] Invalid token parsed, purging storage:", error);
      logout();
    }
  }, [token]);
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");

    // Clean up the timer if it exists
    // if (logoutTimerRef.current) {
    //   clearTimeout(logoutTimerRef.current);
    //   logoutTimerRef.current = null;
    // }
    // console.log("[v0] Token expired or user logged out. Session deleted.");
  };

  /**
   * Starts a 30-minute countdown to automatically wipe out the token
   */
  const startAutoLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    
    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, TOKEN_EXPIRY_MS);
  };

  // Restore auth state on app load
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Start the timer on page refresh if the user is logged in
        startAutoLogoutTimer();
      }
    } catch (error) {
      console.error("[v0] Failed to restore auth:", error);
      logout();
    } finally {
      setLoading(false);
    }

    // Cleanup timer on component unmount
    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

