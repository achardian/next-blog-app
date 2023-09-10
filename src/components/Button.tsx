"use client";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 border-none outline-none ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
