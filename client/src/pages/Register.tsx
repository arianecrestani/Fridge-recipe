import React, { ChangeEvent, FormEvent, useState } from "react";
import 'tailwindcss/tailwind.css';
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

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
        
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input name="username" placeholder="username" onChange={handleChange} />
        <input type="file" name="avatar" onChange={handleFile} />
        {formData.avatar && (
          <div>
            <h3>Avatar Preview:</h3>
            {typeof formData.avatar === "string" ? (
              <img src={formData.avatar} alt="Avatar"  className="w-40 h-40 rounded-full mb-4"/>
            ) : (
              <img src={URL.createObjectURL(formData.avatar)} alt="Avatar"  className="w-40 h-40 rounded-full mb-4" />
            )}
          </div>
        )}

        <button type="submit" style={{ marginRight: "1em" }}>
          Register me!
        </button>
        {loading && <>Loading...</>}
      </form>
    </div>
  );
};

export default Register;
