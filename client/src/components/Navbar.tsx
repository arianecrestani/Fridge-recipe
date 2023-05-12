import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

type Props = {};

export const Navbar = (props: Props) => {
  const { user, login, logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Navbar</h1>
      <div>{user ? <p>user logged in!</p> : <p>User logged out!</p>}</div>
      <div>{user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}</div>
    </div>
  );
}

