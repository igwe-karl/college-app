import * as React from "react";

import { cn } from "@/lib/utils";
import Icon from "@mdi/react";
import { Label } from "@radix-ui/react-label";
// import { Spinner } from "../spinner";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  value?: string | string[] | number;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  description?: string;
  variant?: "square" | "rounded";
  borderVariant?: "default" | "black" | "transparent";
  inputBackgroundVariant?: "default" | "grey";
  placeholderVariant?: "default" | "solid";
  id?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  PreppendIcon?: any;
  preppendImg?: string;
  AppendIcon?: any;
  appendIconColor?: string;
  onPreppendClick?: any;
  onAppendClick?: any;
  // Validation Props
  touched?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | undefined;
  iconSize?: number;
  containerClassName?: string;
  showIfValid?: boolean;
  rightContent?: string | JSX.Element;
  onclickRightContent?: any;
  loading?: boolean | undefined;
}

const Input = React.forwardRef<HTMLInputElement, IInput>(
  (
    {
      className,
      label,
      type,
      PreppendIcon,
      onPreppendClick,
      AppendIcon,
      onAppendClick,
      appendIconColor,
      rightContent,
      onclickRightContent,
      error,
      loading,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        <div className="flex justify-between">
          <Label className="text-xxs font-bold text-dark capitalize">
            {label}
          </Label>
          {rightContent && (
            <div onClick={onclickRightContent}>{rightContent}</div>
          )}
        </div>
        <div className="relative">
          {PreppendIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon
                path={PreppendIcon}
                size={0.7}
                className=" cursor-pointer"
              />
            </div>
          )}
          <input
            type={type}
            // disabled={loading}
            className={cn(
              "flex h-12 w-full rounded-xl border border-input bg- px-3 py-1 text-base text-dark font-normal shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Spinner />
            </div>
          )} */}
          {AppendIcon && (
            <div
              onClick={onAppendClick}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <Icon
                path={AppendIcon}
                size={0.7}
                className={` cursor-pointer ${appendIconColor}`}
              />
            </div>
          )}
          {error && (
            <span className="mt-2 text-destructive text-xs leading-tight block">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
