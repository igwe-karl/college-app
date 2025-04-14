import Icon from "@mdi/react";
import React from "react";
import classNames from "classnames";

export type IIconButton = {
  className?: string;
  path: any;
  onClick?: any;
  bgColor?: string;
  iconColor?: string;
  hoverColor?: string;
  size?: number;
  enclose?: boolean;
  disabled?: boolean;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IIconButton>(
  (
    {
      className = "",
      path,
      onClick,
      bgColor = "bg-white",
      iconColor = "text-grey-1",
      size = 1,
      enclose = true,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const classes = classNames(
      `${iconColor}`,
      `${bgColor}`,
      `rounded-full`,
      { "p-2": enclose, "opacity-50 cursor-not-allowed": disabled },
      className
    );
    return (
      <button
        ref={ref}
        className={classes}
        {...rest}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon path={path} size={size}></Icon>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
