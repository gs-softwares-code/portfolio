import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface NeumorphicCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "inset" | "dark-inset";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export const NeumorphicCard = forwardRef<HTMLDivElement, NeumorphicCardProps>(
  (
    {
      className,
      variant = "default",
      interactive = false,
      padding = "md",
      role,
      tabIndex,
      onKeyDown,
      children,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: "p-0",
      sm: "p-4",
      md: "p-6 md:p-8",
      lg: "p-8 md:p-12",
    };

    const variantClasses = {
      default: cn(
        "bg-bg-base text-text-primary neu-rim shadow-neu-flat",
        interactive &&
          "transition-all duration-300 hover:shadow-neu-flat-lg hover:-translate-y-1 cursor-pointer active:translate-y-0 active:shadow-neu-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      ),
      dark: cn(
        "bg-bg-dark text-darkText-primary neu-rim-dark shadow-neu-dark-flat",
        interactive &&
          "transition-all duration-300 hover:shadow-neu-dark-flat-lg hover:-translate-y-1 cursor-pointer active:translate-y-0 active:shadow-neu-dark-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
      ),
      inset: "bg-bg-base text-text-primary border border-white/40 shadow-neu-pressed",
      "dark-inset":
        "bg-bg-dark text-darkText-primary border border-white/5 shadow-neu-dark-pressed",
    };

    // Keyboard activation handler for interactive cards
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      // Handle Enter and Space when interactive and key originated on the card itself
      if (interactive && e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
        if (e.key === " ") {
          e.preventDefault(); // Suppress viewport scrolling on Space
        }
        if (typeof e.currentTarget.click === "function") {
          e.currentTarget.click();
        } else if (props.onClick) {
          (props.onClick as React.MouseEventHandler<HTMLDivElement>)(
            e as unknown as React.MouseEvent<HTMLDivElement>
          );
        }
      }
    };

    const computedRole = role ?? (interactive ? "button" : undefined);
    const computedTabIndex = tabIndex ?? (interactive ? 0 : undefined);

    return (
      <div
        ref={ref}
        role={computedRole}
        tabIndex={computedTabIndex}
        onKeyDown={handleKeyDown}
        className={cn(
          "rounded-2xl relative",
          paddingClasses[padding],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeumorphicCard.displayName = "NeumorphicCard";
