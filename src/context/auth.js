//src/app/context > auth

"use client"; // Indicates this file runs in the client-side environment
import { createContext, useContext, useEffect, useState } from "react";

// Default state for authentication, containing a null user, token, and placeholder functions
const defaultState = {
  user: null,    // Placeholder for the authenticated user
  token: null,   // Placeholder for the authentication token
  setToken: () => {}, // Placeholder function to set the token
  logout: () => {},   // Placeholder function to handle logout
};

// Create the AuthContext with the default state
const AuthContext = createContext(defaultState);

// AuthProvider component to manage authentication state and provide context to the rest of the app
function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token); // State to store the token

  // useEffect to check localStorage for a stored token on component mount
  useEffect(() => {
    const _token = localStorage.getItem("@library/token"); // Retrieve the token from localStorage
    if (_token) {
      setToken(_token); // If a token exists in localStorage, update the state
    }
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Logout function to remove the token from localStorage and reset the state
  function logout() {
    localStorage.removeItem("@library/token"); // Remove the token from localStorage
    setToken(null); // Clear the token state
  }

  return (
    // Provide the token, user (currently null), setToken function, and logout function to the context
    <AuthContext.Provider
      value={{
        token,
        user: null, // User is null here, could be updated with more logic (e.g., fetching user info from API)
        setToken,
        logout,
      }}
    >
      {children} {/* Render any children components that need access to this context */}
    </AuthContext.Provider>
  );
}

// Custom hook to easily access the AuthContext in any component
function useAuth() {
  return useContext(AuthContext); // Access and return the AuthContext value (token, setToken, logout)
}

export { AuthProvider, useAuth, AuthContext }; // Export the AuthProvider, useAuth hook, and AuthContext for use in other parts of the app
