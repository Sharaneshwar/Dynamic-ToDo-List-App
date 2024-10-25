import React, { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";

export const UserAuthContext = createContext();

export const useAuth = () => {
    return useContext(UserAuthContext);
};

export const UserAuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        const hardcodedUsername = "23520011";
        const hardcodedPassword = "sharan";

        if (username === hardcodedUsername && password === hardcodedPassword) {
            setIsAuthenticated(true);
            setUser({ username });
            return true;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid credentials, please try again!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <UserAuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};
