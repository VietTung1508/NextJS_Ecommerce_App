"use client";
import Input from "@/app/components/Input";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Button from "@/app/components/Button";
import AuthButtonSocial from "./AuthButtonSocial";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface AuthFormProps {
  varient: "SIGNUP" | "SIGNIN";
}

const AuthForm: React.FC<AuthFormProps> = ({ varient }) => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (varient === "SIGNUP") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Register Successfully");
          signIn("credentials", data);
          router.push("/");
        })
        .catch((e) => {
          console.log(e);
          toast.error("Register Failed");
        })
        .finally(() => setIsLoading(false));
    } else {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            console.log("Error");
            toast.success("Failed to Sign in");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged In. Please Wait . . . ");
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialLogin = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          console.log("Error");
          toast.error(`Failed To Sign In With ${action}`);
        }

        if (callback?.ok) {
          toast.success(`Sign In With ${action} Successfully`);
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="my-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-start"
      >
        {varient === "SIGNUP" && (
          <Input
            type="text"
            label="Name"
            placeholder="Username"
            register={register}
            disabled={isLoading}
            errors={errors}
            required
            id="name"
          />
        )}
        <Input
          type="text"
          label="Email"
          placeholder="Email"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
          id="email"
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
          id="password"
        />
        <Button disabled={isLoading} type="submit" main mg="8">
          {varient === "SIGNIN" ? "Sign In" : "Sign Up"}
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <p className="text-auth-text text-sm mr-2 ">
          You can also {varient === "SIGNIN" ? "Sign In" : "Sign Up"} with
        </p>
        <AuthButtonSocial
          icon={BsFacebook}
          onClick={() => {
            socialLogin("facebook");
          }}
        />
        <AuthButtonSocial
          icon={BsGoogle}
          onClick={() => {
            socialLogin("google");
          }}
        />
      </div>
    </div>
  );
};

export default AuthForm;
