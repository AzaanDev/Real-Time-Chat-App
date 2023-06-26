import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/reducers/AuthSlice";
import { SignUp, Login } from "../../api/api";

interface FormValues {
  Username: string;
  Password: string;
}

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormValues>({
    Username: "",
    Password: "",
  });

  const [isSignUp, setIsSignUp] = useState<Boolean>(false);
  const [error, setError] = useState<String>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/\s/g, "");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: sanitizedValue,
    }));
  };

  const handleToggleMode = (): void => {
    setIsSignUp(!isSignUp);
    setFormData({
      Username: "",
      Password: "",
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const jsonFormData = JSON.stringify(formData);
    if (isSignUp == true) {
      if (verifyInputs()) {
        var message = await SignUp(jsonFormData);
      }
    } else {
      try {
        var r = await Login(jsonFormData);
        console.log(r);
        dispatch(
          setCredentials({
            user_id: r.id,
            accessToken: r.token,
            name: r.username,
          })
        );
        navigate("/Home");
      } catch (e) {
        console.log(e);
      }
    }
  };

  const verifyInputs = (): Boolean => {
    if (isSignUp) {
      if (formData.Username.length < 5) {
        setError("Username too short");
        return false;
      }
      if (formData.Password.length < 8) {
        setError("Password too short");
        return false;
      }
    }
    //API CALL TO CHECK IF USERNAME IS IN DATABASE
    setError("");
    return true;
  };

  return (
    <div className="bg-primary h-screen w-screen text-white flex items-center justify-center">
      <form
        className="bg-secondary rounded-md p-4 w-[400px] h-[500px]justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center border-b-2 border-primary pb-5 text-5xl">
          {isSignUp ? <div>Sign Up</div> : <div>Login</div>}
        </h1>
        <div className="flex flex-col space-y-1">
          <label className="block pb-2 pt-5">Username:</label>
          <input
            type="text"
            name="Username"
            className="form-input"
            value={formData.Username}
            onChange={handleChange}
          />
          <label className="block pb-2 pt-5">Password:</label>
          <input
            type="password"
            name="Password"
            className="form-input"
            value={formData.Password}
            onChange={handleChange}
          />
          <br />
          <div className="text-red-400">{error}</div>
          <input
            type="submit"
            value={isSignUp ? "Sign up" : "Login"}
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded text-center"
          ></input>
        </div>
        <button
          onClick={handleToggleMode}
          type="button"
          className="pt-2 text-blue-400 font-medium hover:underline"
        >
          {isSignUp ? <div>Login</div> : <div>Register</div>}
        </button>
      </form>
    </div>
  );
};

export default Auth;
