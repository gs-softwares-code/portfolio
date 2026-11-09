"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface NeumorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "accent" | "dark" | "ghost" | "pressed";
  size?: "sm" | "md" | "lg";
  isPressed?: boolean;
}

export const NeumorphicButton = forwardRef<
  HTMLButtonElement,
  NeumorphicButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isPressed = false,
      disabled,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const buttonType = type || "button";

    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-5 py-2.5 text-sm rounded-xl gap-2",
      lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5",
    };

    const variantClasses = {
      default: cn(
        "bg-bg-base text-text-primary border border-white/70",
        isPressed
          ? "shadow-neu-pressed"
          : "shadow-neu-flat hover:shadow-neu-flat-lg hover:-translate-y-0.5 active:shadow-neu-pressed active:translate-y-0"
      ),
      accent: cn(
        "bg-brand-accent text-white border border-brand-accentLight/30",
        isPressed
          ? "shadow-neu-pressed bg-brand-accentHover"
          : "shadow-neu-accent hover:bg-brand-accentHover hover:shadow-neu-flat-lg hover:-translate-y-0.5 active:bg-brand-accentHover active:translate-y-0"
      ),
      dark: cn(
        "bg-bg-dark text-darkText-primary border border-white/10",
        isPressed
          ? "shadow-neu-dark-pressed"
          : "shadow-neu-dark-flat hover:shadow-neu-dark-flat-lg hover:-translate-y-0.5 active:shadow-neu-dark-pressed active:translate-y-0"
      ),
      ghost: cn(
        "bg-transparent text-text-primary hover:bg-bg-base/60 hover:shadow-neu-flat-sm active:shadow-neu-pressed"
      ),
      pressed: cn(
        "bg-bg-base text-text-primary border border-white/40 shadow-neu-pressed"
      ),
    };

    return (
      <button
        ref={ref}
        type={buttonType}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium font-body transition-all duration-200 select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
          "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";
