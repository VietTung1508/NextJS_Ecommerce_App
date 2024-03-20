"use client";

import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/store/features/adminSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "./AuthForm.scss";

const AuthForm = () => {
  const [see, setSee] = useState(false);
  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const admin = useAppSelector((state) => state.admin.admin);

  const dispatch: any = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (admin) {
      router.push("/admin");
    }
  }, []);

  const handleLogInAdmin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginStart());
    try {
      axios
        .post("/api/adminAuth", credentials)
        .then((res) => {
          toast.success("Admin Login Successfully");
          dispatch(
            loginSuccess({ admin: res.data, token: res.data.accessToken })
          );
          router.push("/admin");
          setCredentials({
            email: "",
            password: "",
          });
          router.push("/admin");
        })
        .catch((e) => {
          console.log(e);
          setErr(true);
        })
        .finally(() => setIsLoading(false));
    } catch (e) {
      dispatch(loginFailure());
      setErr(true);
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form className="loginBox" onSubmit={handleLogInAdmin}>
      <div className="input_wrap">
        <label>Email</label>
        <input
          name="email"
          type="text"
          disabled={isLoading}
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div className="input_wrap password">
        <label>Password</label>
        <input
          type={see ? "text" : "password"}
          className="password"
          name="password"
          disabled={isLoading}
          value={credentials.password}
          onChange={handleChange}
        />
        <span
          className="watchPass"
          onClick={() => {
            setSee(!see);
          }}
        >
          {see ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      <span className="err">{err && "Email or Password is incorrect"}</span>
      <button disabled={isLoading} className="btn">
        Đăng Nhập
      </button>
    </form>
  );
};

export default AuthForm;
