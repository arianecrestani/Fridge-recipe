import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useContext,
} from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "tailwindcss/tailwind.css";
type Avatar = string | File;

interface SubmitRegisterData {
  email: string;
  password: string;
  username: string;
  avatar: Avatar;
}

type Props = {};

const Register = (props: Props) => {
  const [formData, setFormData] = useState<SubmitRegisterData>({
    email: "",
    password: "",
    username: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, avatar: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const submitData = new FormData();
    submitData.append("email", formData.email);
    submitData.append("username", formData.username);
    submitData.append("password", formData.password);
    submitData.append("avatar", formData.avatar);

    const requestOptions = {
      method: "POST",
      body: submitData,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/new`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      alert("Success! Check console.");
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong - check console");
      setLoading(false);
    }
  };

  // quando o usuario se registrar vai aparece uma mensagem user has been register.

  return (
    <div className="flex items-center justify-center p-28">
      {user && formData.avatar && (
        <div className="flex-shrink-0 mr-8">
          {typeof formData.avatar === "string" ? (
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-40 h-40 rounded-full mb-4"
            />
          ) : (
            <img
              src={URL.createObjectURL(formData.avatar)}
              alt="Avatar"
              className="w-40 h-40 rounded-full mb-4"
            />
          )}
        </div>
      )}

      <div className="flex flex-col  text-center">
        <h1 className="text-3xl font-bold mb-8 text-orange-500">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          />
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          />
          <input
            type="file"
            name="avatar"
            onChange={handleFile}
            className="mb-4"
          />

          <button
            type="submit"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          >
            Register me!
          </button>
          {loading && <>Loading...</>}
        </form>
      </div>
    </div>
  );
};

export default Register;
