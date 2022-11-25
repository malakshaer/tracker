import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [cars, setCars] = useState([]);
    const [userImage, setUserImage] = useState();

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                cars,
                setCars,
                userImage,
                setUserImage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
    
};

export default UserProvider;