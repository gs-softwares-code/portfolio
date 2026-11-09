"use client";

import React, { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeumorphicSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NeumorphicSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: NeumorphicSelectOption[];
  placeholder?: string;
}

export const NeumorphicSelect = forwardRef<
  HTMLSelectElement,
  NeumorphicSelectProps
>(
  (
    {
      className,
      label,
      error,
      hint,
      id,
      options = [],
      placeholder,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold uppercase tracking-wider font-mono text-text-secondary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : hint ? hintId : undefined
            }
            className={cn(
              "w-full appearance-none rounded-xl bg-bg-base px-4 py-3 pr-10 text-sm font-body text-text-primary transition-all duration-200 cursor-pointer",
              "shadow-neu-pressed border border-black/5",
              "focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent/40 focus:ring-offset-1 focus:ring-offset-bg-base",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error &&
                "border-rose-500/60 ring-1 ring-rose-500/30 focus:ring-rose-500 focus:border-rose-500",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.length > 0
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-bg-base text-text-primary py-2"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-text-secondary">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </div>
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
  }
);

NeumorphicSelect.displayName = "NeumorphicSelect";
