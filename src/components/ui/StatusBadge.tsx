import React from "react";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "accent" | "warning" | "neutral";
  size?: "sm" | "md";
  pulse?: boolean;
  dark?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  className,
  variant = "success",
  size = "md",
  pulse = true,
  dark = false,
  children,
  ...props
}) => {
  const dotColorClasses = {
    success: "bg-brand-success",
    accent: "bg-brand-accent",
    warning: "bg-amber-500",
    neutral: "bg-slate-400",
  };

  const ringColorClasses = {
    success: "bg-brand-success/30",
    accent: "bg-brand-accent/30",
    warning: "bg-amber-500/30",
    neutral: "bg-slate-400/30",
  };

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase select-none transition-all duration-200",
        dark
          ? "bg-bg-dark/80 text-darkText-primary border border-white/10 shadow-neu-dark-pressed"
          : "bg-bg-base text-text-primary neu-rim shadow-neu-flat-sm",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping",
              ringColorClasses[variant]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            dotColorClasses[variant]
          )}
        />
      </span>
      <span>{children}</span>
    </span>
  );
};
