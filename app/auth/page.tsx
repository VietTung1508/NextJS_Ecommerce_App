"use client";

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useCallback, useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import Link from "next/link";

type Varient = "SIGNIN" | "SIGNUP";

const Auth = () => {
  const [varient, setVarient] = useState<Varient>("SIGNIN");

  const toggleVarient = useCallback(() => {
    if (varient === "SIGNIN") {
      setVarient("SIGNUP");
    } else {
      setVarient("SIGNIN");
    }
  }, [varient]);

  return (
    <div className="h-screen flex items-center justify-around bg-auth-bg overflow-hidden">
      <div className="w-70 h-94 lg:flex justify-center">
        <div className="bg-auth-bg2 lg:w-3/5 rounded-l-md relative">
          <Link href="/">
            <div className="absolute top-4 left-4 flex items-center justify-center p-1 rounded-full border-2 cursor-pointer hover:opacity-80 transition-all">
              <HiChevronLeft size="25" className="text-auth-btn" />
            </div>
          </Link>
          <div className="lg:p-20 flex flex-col p-10">
            <h3 className="text-white text-4xl font-semibold pb-2">
              {varient === "SIGNIN" ? "Sign In" : "Sign up"}
            </h3>
            <p className="text-sm text-white">
              {varient === "SIGNIN"
                ? "Don't have an account ?"
                : "Already have an account ?"}
              <span
                className="ml-2  hover:border-b-2 cursor-pointer text-auth-btn"
                onClick={toggleVarient}
              >
                {varient === "SIGNIN" ? "Sign up" : "Sign in"}
              </span>
            </p>
            <AuthForm varient={varient} />
          </div>
        </div>
        <div className="w-2/5 h-full relative hidden lg:block">
          <Image
            src="/images/auth.jpg"
            alt="auth-img"
            fill
            className="object-cover rounded-r-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
