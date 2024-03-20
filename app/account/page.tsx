import { Product } from "@prisma/client";
import getCurrentUser from "../actions/getCurrentUser";
import { getOrders } from "../actions/getOrders";
import Image from "next/image";
import Button from "../components/Button";
import { BiSolidMap, BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { BsFillTelephoneFill } from "react-icons/bs";
import AccountTable from "./components/AccountTable";

const Account = async () => {
  const currentUser = await getCurrentUser();
  const orders = await getOrders();
  return (
    <div className="max-w-screen-xl mx-auto mb-5 relative">
      <h2 className="text-center font-semibold text-2xl">Account Details</h2>
      <div className="flex flex-col gap-3 px-5">
        <h3>
          Hello , <span className="font-semibold">{currentUser?.name}</span>
        </h3>
        <div className="flex gap-4">
          <AccountTable orders={orders} />
          <div className="w-1/4 flex flex-col gap-4">
            <h2 className="font-semibold text-2xl">Customer Details</h2>
            <div className="flex items-center gap-3">
              <BiSolidUser />
              <h3>{currentUser?.name}</h3>
            </div>
            <div className="flex items-center gap-3">
              <MdEmail />
              <h3>{currentUser?.email}</h3>
            </div>
            {currentUser?.address && (
              <div className="flex items-center gap-3">
                <BiSolidMap />
                <h3>{currentUser?.address}</h3>
              </div>
            )}
            {currentUser?.phoneNumber && (
              <div className="flex items-center gap-3">
                <BsFillTelephoneFill />
                <h3>{currentUser?.phoneNumber}</h3>
              </div>
            )}
            <Link href="/account/addresses">
              <Button fullWidth>
                {currentUser?.address ? "Edit" : "Add"} Address
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
