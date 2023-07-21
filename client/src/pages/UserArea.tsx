import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ShowFavorites } from "../components/UserInfo";
import { UpdateUser } from "./UpdateUser";

interface Props {}

export const UserArea = ({}: Props) => {
  const { user } = useContext(AuthContext);

  // Add state variable to control the visibility of the UpdateUser form
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div className="m-24 flex justify-center flex-wrap">
      {user && (
        <div className="flex border-4 border-gray-400 p-8 m-8 rounded-lg">
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
                <button
                  className="p-4 m-4 bg-orange-500 text-white rounded-lg px-4"
                  onClick={() => setShowUpdateForm((prev) => !prev)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateForm && <UpdateUser />}
      <div className="flex m-8">
        <ShowFavorites />
      </div>
    </div>
  );
};
