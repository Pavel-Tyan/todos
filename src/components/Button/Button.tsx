import { ButtonProps } from "./Button.props";
import cn from "classnames";
import styles from "./Button.module.css";

export const Button = ({ size, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
