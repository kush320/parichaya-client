import { useState, useCallback, useEffect } from "react";

import AuthContext from "./auth-context";
function getStoredToken() {
    // const tokenString = sessionStorage.getItem('token');
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
}
function storeToken(token) {
    // sessionStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('token', JSON.stringify(token));
}

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getStoredToken() === null ? false : true);
    const [token, setToken] = useState(getStoredToken());

    const logoutHandler = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setIsLoggedIn(false);
    }
        , []);

    const loginHandler = useCallback((token) => {
        storeToken(token)
        setToken(token);
        setIsLoggedIn(true);
    }
        , []);

    const contextValue = {
        isLoggedIn: isLoggedIn,
        token: token,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }





    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;

