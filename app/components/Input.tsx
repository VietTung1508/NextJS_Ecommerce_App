"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  type?: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  id: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder,
  disabled,
  register,
  errors,
  required,
  id,
}) => {
  return (
    <div className="bg-auth-inp flex flex-col mb-4 w-full py-2 px-2 rounded-sm">
      <label className="text-auth-text font-semibold text-xs mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="bg-transparent outline-none text-white placeholder-white opacity-75"
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
