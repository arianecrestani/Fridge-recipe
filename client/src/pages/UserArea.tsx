import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ShowFavorites } from "../components/UserInfo";

interface Props {}

export const UserArea = ({}: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="m-24 flex justify-center">
      <div className="flex border-4 border-gray-400 p-8 m-8 rounded-lg">
        {user && (
          <div className="flex">
            <div>
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-40 h-40 rounded-full m-10"
              />
              <div className="ml-14">
                <p className="text-xl m-8 font-bold">{user.username}</p>
                <p className="text-gray-500">{user.email}</p>
                <button className="p-4 m-4 bg-orange-500 text-white rounded-lg px-4">
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex m-8">
        <ShowFavorites />
      </div>
    </div>
  );
};
