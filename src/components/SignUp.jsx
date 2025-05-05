import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import authService from "../appwrite/auth";
import {useForm} from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import {login} from "../store/authSlice";
import Logo from "./Logo";

function SignUp() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>
        {error && (
          <p className="mt-8 text-center text-base text-red-600">{error}</p>
        )}
        <form onSubmit={handleSubmit(createAccount)}>
          <div className="space-y-5">
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
            <Button type="submit" className="text-center w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
