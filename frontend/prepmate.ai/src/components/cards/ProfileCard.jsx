import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";
import {User} from 'lucide-react';

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    if (!user) return null;
    // console.log(user);

    return (
        <div className="flex items-center">
            {user?.data?.profileImageUrl ? (
  <img
    src={user.data.profileImageUrl}
    alt="Profile"
    className="w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover"
  />
) : (
  <div className="w-11 h-11 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
    <User className="w-6 h-6 text-gray-500" />
  </div>
)}
            <div>
                <div className="text-[15px] text-black font-bold leading-3">
                    {user.name || ""}
                </div>
                <button
                    className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;
