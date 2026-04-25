import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) setToken(savedToken);

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Invalid user JSON, clearing storage:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
      }
    }

    setAuthLoading(false); 
  }, []);

  const login = (tokendata, userdata) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    //addin new data
    setToken(tokendata);
    setUser(userdata);
    localStorage.setItem("access_token", tokendata);
    localStorage.setItem("user", JSON.stringify(userdata));
    console.log("Logging in with token:", tokendata, "and user:", userdata);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
