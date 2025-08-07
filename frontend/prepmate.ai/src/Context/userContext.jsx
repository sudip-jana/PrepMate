import React, {createContext, useState,useEffect} from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user) return;

        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const updateUser = (userData) => {
        console.log(userData)
        setUser(userData);
        // console.log(userData.token);
        localStorage.setItem("token", userData.data.token);
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

    return (
        <UserContext.Provider value={{user, loading, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;