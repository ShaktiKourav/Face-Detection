import { useState } from "react";
import {
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  icon,
  rightIcon,
  error,
  disabled = false,
  required = false,
  className = "",
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (

    <div className="w-full">

      {/* Label */}

      {label && (

        <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">

          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}

        </label>

      )}

      {/* Input */}

      <div
        className={`

          flex
          items-center
          gap-3

          rounded-2xl

          border

          border-pink-100

          bg-white/80

          px-4

          py-3

          shadow-sm

          backdrop-blur-xl

          transition-all

          duration-300

          focus-within:border-pink-400
          focus-within:ring-2
          focus-within:ring-pink-300

          dark:border-white/10
          dark:bg-[#1d1b2e]/80

          ${disabled ? "opacity-60 cursor-not-allowed" : ""}

          ${className}

        `}
      >

        {/* Left Icon */}

        {icon && (

          <div className="text-pink-500">

            {icon}

          </div>

        )}

        {/* Input */}

        <input

          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }

          placeholder={placeholder}

          value={value}

          name={name}

          onChange={onChange}

          disabled={disabled}

          className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 outline-none dark:text-white"

        />

        {/* Password */}

        {isPassword && (

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="text-gray-500 transition hover:text-pink-500"
          >

            {showPassword ? (

              <MdVisibilityOff size={22} />

            ) : (

              <MdVisibility size={22} />

            )}

          </button>

        )}

        {/* Right Icon */}

        {!isPassword && rightIcon && (

          <div>

            {rightIcon}

          </div>

        )}

      </div>

      {/* Error */}

      {error && (

        <p className="mt-2 text-sm font-medium text-red-500">

          {error}

        </p>

      )}

    </div>

  );

};

export default Input;