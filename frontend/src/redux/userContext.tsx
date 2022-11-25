import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [cars, setCars] = useState([]);
    const [profileImage, setProfileImage] = useState();

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                cars,
                setCars,
                profileImage,
                setProfileImage,
            }}
        >
            {children}
        </UserContext.Provider>
    );
    
};

export default UserProvider;