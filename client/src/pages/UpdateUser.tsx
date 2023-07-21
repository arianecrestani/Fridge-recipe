import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import React from "react";

type Props = {};
type Avatar = string | File;

interface FormData {
  email: string;
  password: string;
  username: string;
  avatar: Avatar;
}

export const UpdateUser = (props: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const [updateMessage, setUpdateMessage] = useState("");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    avatar: "",
  });
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = new FormData();
    if (formData.email !== "") {
      submitData.append("email", formData.email);
    }
    if (formData.password !== "") {
      submitData.append("password", formData.password);
    }
    if (formData.username !== "") {
      submitData.append("username", formData.username);
    }
    if (formData.avatar !== "") {
      submitData.append("avatar", formData.avatar);
    }
    const requestOptions = {
      method: "PUT",
      headers: new Headers({ Authorization: `Bearer ${token}` }),
      body: submitData,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/update/${user?._id}`,
        requestOptions
      );
      const result = await response.json();
      if (result.message === "User has been updated") {
      
        setUser(result.updatedUser);
        setUpdateMessage(result.message);
      } else {
        setUpdateMessage(result.message);
      }
      setFormData({
        email: "",
        password: "",
        username: "",
        avatar: "",
      });
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, avatar: "" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-28">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Update User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your current email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your new password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          ref={fileInput}
          type="file"
          id="avatar"
          name="avatar"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
          onChange={handleFile}
        />
        <button
          type="submit"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
        >
          Update
        </button>
        <p>{updateMessage}</p>
      </form>
    </div>
  );
};
