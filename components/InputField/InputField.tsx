"use client";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password";
  error?: FieldError;
}

export default function InputField({
  id,
  label,
  type,
  placeholder,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className="mb-2">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...props}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border-red-500" : ""
        }`}
      />
      {error?.message && (
        <span className="text-red-500 text-xs italic">{error.message}</span>
      )}
    </div>
  );
}
