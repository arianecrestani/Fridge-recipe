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
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-6 bg-gray-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
