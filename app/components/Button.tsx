import clsx from "clsx";

interface ButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  danger?: boolean;
  gray?: boolean;
  main?: boolean;
  children?: React.ReactNode;
  mg?: string;
  animate?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  fullWidth,
  type = "button",
  onClick,
  danger,
  main,
  children,
  gray,
  mg = "0",
  animate,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        `py-2 px-8 rounded-md btn btn-primary font-semibold shadow-[0px_0px_20px_-7px_#edf2f7]
        my-${mg} hover:opacity-90 transition-all
        `,
        disabled && "opacity-50 cursor-default hover:opacity-100",
        fullWidth && "w-full",
        danger && "bg-red-500 hover:bg-red-600 text-white",
        main && "bg-auth-btn hover:bg-auth-btn-500",
        gray && "bg-gray-500 hover:bg-gray-600",
        !danger && !main && !gray && "bg-sky-400 hover:bg-sky-500 text-white",
        animate && "animate-drop"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
