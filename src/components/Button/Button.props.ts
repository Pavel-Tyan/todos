import React from "react";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  size: "small" | "large";
  children: React.ReactNode;
}
