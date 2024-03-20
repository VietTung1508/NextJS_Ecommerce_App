import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AccountForm from "./components/AccountForm";
import getCurrentUser from "@/app/actions/getCurrentUser";

const Page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="max-w-screen-xl mx-auto px-5 mb-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Your Address</h2>
        <div className="flex items-center gap-2">
          <AiOutlineArrowLeft />
          <Link href="/account">
            <h3 className="font-semibold">Back To Account Page</h3>
          </Link>
        </div>
      </div>
      {
        //@ts-ignore
        <AccountForm currentUser={currentUser} />
      }
    </div>
  );
};

export default Page;
