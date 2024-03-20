import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user: User;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ user, onClick }) => {
  return (
    <div className="w-10 h-10  cursor-pointer relative" onClick={onClick}>
      <Image
        src={user.image ? user.image : "/images/placeholder.jpg"}
        fill
        alt="user logo"
        className="object-cover rounded-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Avatar;
