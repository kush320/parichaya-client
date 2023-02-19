import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: '',
    onLogout: () => { },
    onLogin: (token) => { }

})

export default AuthContext;
