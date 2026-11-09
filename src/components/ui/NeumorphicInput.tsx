"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface NeumorphicInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const NeumorphicInput = forwardRef<
  HTMLInputElement,
  NeumorphicInputProps
>(({ className, label, error, hint, id, disabled, ...props }, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider font-mono text-text-secondary select-none"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : hint ? hintId : undefined
          }
          className={cn(
            "w-full rounded-xl bg-bg-base px-4 py-3 text-sm font-body text-text-primary transition-all duration-200",
            "shadow-neu-pressed border border-black/5 placeholder:text-text-muted/60",
            "focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent/40 focus:ring-offset-1 focus:ring-offset-bg-base",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error &&
              "border-rose-500/60 ring-1 ring-rose-500/30 focus:ring-rose-500 focus:border-rose-500",
            className
          )}
          {...props}
        />
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-rose-700 dark:text-rose-400 mt-0.5"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-text-secondary mt-0.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

NeumorphicInput.displayName = "NeumorphicInput";
