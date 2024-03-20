"use client";

import { IconType } from "react-icons";

interface AuthButtonSocial {
  icon: IconType;
  onClick: () => void;
}

const AuthButtonSocial: React.FC<AuthButtonSocial> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button onClick={onClick}>
      <Icon
        size="1.5em"
        className="text-auth-text cursor-pointer hover:opacity-80 transition-all"
      />
    </button>
  );
};

export default AuthButtonSocial;
