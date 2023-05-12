import React, { ChangeEvent, useState } from "react";

type Props = { }

interface inputData {
  email: string;
  password: string;
  username: string;
}

const Register = (props: Props) => {

  const [inputData, setInputData] = useState<inputData>({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", inputData.email);
    urlencoded.append("username", inputData.username);
    urlencoded.append("password", inputData.password);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/users/new`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      alert("Success! Check console.");
    } catch (error) {
      console.log(error);
      alert("Something went wrong - check console");
    }
  };

  return (
    <div>
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
        <input
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <button type="submit">Register me </button>
      </form>
    </div>
  );
};

export default Register;
