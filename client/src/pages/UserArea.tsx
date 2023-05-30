import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ShowFavorites } from "../components/UserInfo";

interface Props {}


export const UserArea = ({}: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="m-10 flex justify-center">
      <div className="flex  ">
        {user ? (
          <div className="flex m-6">
            <div>
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-40 h-40 rounded-full m-10"
              />
              <div className="ml-14">
                <p className="text-xl font-bold">{user.username}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="ml-18">
              <ShowFavorites />
            </div>
          </div>
        ) : (
          <p className="text-orange-500">You should login first.</p>
        )}
      </div>
    </div>
  );
};
