import React, { useState } from "react";
import TextInputForm from "../../../shared/components/TextInputForm";
import TextButton from "../../../shared/components/TextButton";
import Logo from "../../../shared/components/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function EmailPasswordContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/my-store");
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  
  return (
    <div className="bg-fixed flex justify-center items-center min-h-screen bg-[url('https://www.skyweaver.net/images/media/wallpapers/wallpaper1.jpg">
      <div className="mt-32 mb-20 w-full max-w-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-12 flex flex-col justify-center items-center rounded-3xl">
        <Logo onClick={() => navigate("/")} />
        <form
          className="max-w-sm mx-auto flex flex-col w-full mt-5"
          onSubmit={handleLogin}
        >
          <TextInputForm
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextInputForm
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextButton
            btnName="Log In"
            btnColor="bg-blue-500"
            textColor="text-white"
            hoverColor={"bg-blue-600"}
          />
          <TextButton
            btnName="Register"
            onClick={() => {
              navigate("/register");
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
