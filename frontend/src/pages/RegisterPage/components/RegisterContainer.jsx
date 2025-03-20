import React, { useState } from "react";
import TextInputForm from "../../../shared/components/TextInputForm";
import Logo from "../../../shared/components/Logo";
import TextButton from "../../../shared/components/TextButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function RegisterContainer() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    password: ""
  });
  // const [username, setUsername] = useState("");
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form, [name]: value
    });
    console.log(form)
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const success = await register(form.username, form.name, form.password);
      // console.log("success...", success);
      if (success) {
        navigate("/login");
      } else {
        setErrorMessage("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  return (
    <div className="bg-fixed flex justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1532522593358-9e5e2a22f231?q=80&w=1603&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-400 bg-blend-multiply">
      <div className="mt-20 mb-20 w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-12 flex flex-col justify-center items-center rounded-3xl">
        <Logo onClick={() => navigate("/")}/>
        <form
          className="max-w-sm mx-auto flex flex-col w-full mt-5"
          onSubmit={handleRegister}
        >
          <TextInputForm
            type="text"
            id="username"
            name="username"
            placeholder="Enter Your Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextInputForm
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextInputForm
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextButton
            btnName="Register"
            btnColor="bg-blue-500"
            textColor="text-white"
            hoverColor={"bg-blue-600"}
          />
          <TextButton
            btnName="Log In"
            onClick={() => {
              navigate("/login");
            }}
            btnColor="bg-gray-100 dark:bg-gray-600"
            textColor="text-gray-800 dark:text-white"
            hoverColor={"bg-gray-200 dark:bg-gray-700"}
          />
        </form>
      </div>
    </div>
  );
}
