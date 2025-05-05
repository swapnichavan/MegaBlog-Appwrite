import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import authService from "../appwrite/auth";
import {login as authLogin} from "../store/authSlice";
import {useForm} from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";
import {Link} from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();

  const login = async (data) => {
    setError("");
    console.log(data);
    try {
      const session = await authService.login(data);
      console.log(session);
      if (session) {
        dispatch(authLogin(session));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-grey-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
