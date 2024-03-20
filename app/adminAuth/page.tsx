import AuthForm from "./components/AuthForm";
import Image from "next/image";

function Auth() {
  return (
    <div className="flex flex-col bg-gray-100 w-full h-screen justify-center items-center p-10">
      <Image
        width={180}
        height={180}
        className="mb-4 "
        src="/images/viz.png"
        alt=""
      />
      <AuthForm />
    </div>
  );
}

export default Auth;
