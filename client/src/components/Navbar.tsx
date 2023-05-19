import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";


type Props = {};

export const Navbar = (props: Props) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-between bg-orange-400 py-2 px-4">
      <h1 className="text-white">Navbar</h1>
      <div>
        {user ? (
          <div className="flex items-center">
            <p className="text-white mr-4">User logged in!</p>
            <button
              className="bg-white text-orange-400 rounded-lg py-2 px-4"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link className="text-white" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

