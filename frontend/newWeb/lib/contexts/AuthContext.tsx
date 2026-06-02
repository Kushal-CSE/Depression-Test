// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const savedToken = localStorage.getItem("auth_token");
//     const savedUser = localStorage.getItem("auth_user");

//     if (savedToken && savedUser) {
//       setToken(savedToken);
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Login failed");
//       }

//       const data = await response.json();
//       const newToken = data.token || data.access_token;
//       const userData: User = {
//         id: data.user?.id || data.id || "",
//         name: data.user?.name || data.name || "",
//         email: data.user?.email || email,
//       };
//       console.log("[v0] Login successful:", { userData, newToken });
//       setToken(newToken);
//       setUser(userData);
//       localStorage.setItem("auth_token", newToken);
//       localStorage.setItem("auth_user", JSON.stringify(userData));
//     } catch (error) {
//       console.error("[v0] Login error:", error);
//       throw error;
//     }
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Signup failed");
//       }

//       // const data = await response.json();
//       // console.log("FULL LOGIN RESPONSE:", data);
//       // const newToken = data.token || data.access_token;
//       // const userData: User = {
//       //   id: data.user?.id || data.id || '',
//       //   name: data.user?.name || name,
//       //   email: data.user?.email || email,
//       // };

//       // setToken(newToken);
//       // setUser(userData);
//       // localStorage.setItem('auth_token', newToken);
//       // localStorage.setItem('auth_user', JSON.stringify(userData));
//       const responseData = await response.json();

//       console.log("FULL RESPONSE:", responseData);

//       const data = responseData.data;

//       const newToken = data.token;

//       const userData: User = {
//         id: data.user?.id || "",
//         name: data.user?.name || "",
//         email: data.user?.email || email,
//       };

//       console.log("[v0] Login successful:", { userData, newToken });

//       setToken(newToken);
//       setUser(userData);

//       localStorage.setItem("auth_token", newToken);
//       localStorage.setItem("auth_user", JSON.stringify(userData));
//     } catch (error) {
//       console.error("[v0] Signup error:", error);
//       throw error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("auth_user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         login,
//         signup,
//         logout,
//         isAuthenticated: !!token,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/signup", {
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

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

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

