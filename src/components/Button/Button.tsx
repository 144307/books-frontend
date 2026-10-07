import { Link } from "react-router";
import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "outline" | "accent";
  size?: "md" | "lg";
  to?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

const SIZE_CLASSES = {
  md: "rounded-none px-2.5 pt-[0.5625rem] pb-2 text-[0.8rem] sm:px-4 sm:text-[0.9rem]",
  lg: "rounded-none px-5 pt-[0.8125rem] pb-3 text-sm",
} as const;

const VARIANT_CLASSES = {
  outline:
    "border border-amber-800 bg-transparent text-[#1f2430] enabled:hover:border-[#1f2430] enabled:hover:bg-[#1f2430] enabled:hover:text-[#f7f4ee]",
  accent:
    "border border-[#e6ac8e] bg-[#e6ac8e] text-[#1f2430] enabled:hover:border-[#d18a63] enabled:hover:bg-[#d18a63]",
} as const;

function Button({
  variant = "outline",
  size = "md",
  to,
  href,
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) {
  const classes = `cursor-pointer text-center font-medium uppercase tracking-wide sm:tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]}${className ? ` ${className}` : ""}`;

  if (to)
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );

  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export default Button;
