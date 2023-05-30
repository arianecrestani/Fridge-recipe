import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

type Props = {};

export const Navbar = (props: Props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex items-center bg-orange-400 py-2 px-4 justify-between">
      <div className="m-2">
        <Link className="text-white" to="/">
          Home
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex">
              <Link to="/user" className="text-white">
                UserArea
              </Link>
            </div>
            <p className="text-white mr-36">User logged in!</p>

            <button
              className="bg-white text-orange-400 rounded-lg p-2 px-4"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <div className="mr-4">
              <Link className="text-white" to="/login">
                Login
              </Link>
            </div>
            <div>
              <Link className="text-white" to="/register">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
