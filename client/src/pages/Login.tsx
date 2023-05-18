import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

type Props = {};

interface SubmitData {
  email: string;
  password: string;
}

const Login = ({}: Props) => {
  const { login } = useContext(AuthContext);
  const [inputData, setFormData] = useState<SubmitData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(inputData.email, inputData.password);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
