import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useNavigation} from "react-router-dom";
import authService from "../appwrite/auth";
import {useForm} from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

function SignUp() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const {register, handleSubmit} = useForm();

  const createAccount = async (data) => {
    console.log(data);
    setError("");
    try {
      const account = await authService.createAccount(data);
      console.log(account);
      if (account) {
        const user = await authService.getCurrentUser();
        console.log(user);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(createAccount)}>
        <Input
          type="text"
          placeholder="Enter your name"
          {...register("FullName", {
            required: true,
          })}
        />
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", {required: true})}
        />
        <Input
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;
