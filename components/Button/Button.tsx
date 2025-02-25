import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className = "",
  type = "button",
  loading,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      onClick={onClick}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
