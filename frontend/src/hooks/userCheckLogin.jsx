import { useEffect, useState } from "react";
import axios from "axios";

export const useCheckLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
            return;
        }
        axios.post('http://localhost:5000/api/auth/check-login', {}, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            if (res.data.status === true) {
                setIsLoggedIn(true);
                setUser(res.data.user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        })
        .catch(() => {
            setIsLoggedIn(false);
            setUser(null);
        });
    }, []);

    return { isLoggedIn, user };
};
