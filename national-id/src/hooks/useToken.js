import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        // const tokenString = sessionStorage.getItem('token');
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log(userToken)
        return userToken
    }
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        // sessionStorage.setItem('token', JSON.stringify(userToken));
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    }
    return {
        setToken: saveToken,
        token
    }
}