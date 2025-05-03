import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../appwrite/auth";
import {login} from "../store/authSlice";
import {useForm} from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

function Login() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();

  const login = async (data) => {
    console.log(data);
    try {
      const session = await authService.login(data);
      console.log(session);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <Input
          type="email"
          placeholder="Enter your Email"
          {...register("email", {
            required: true,
          })}
        />
        <Input
          type="password"
          placeholder="Enter your Password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}

export default Login;
