import React from "react";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-500 via-violet-600 to-purple-700 hover:from-blue-600 hover:via-violet-700 hover:to-purple-800 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
