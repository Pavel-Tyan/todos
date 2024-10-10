import { TodoItemProps } from "./TodoItem.props";
import styles from "./TodoItem.module.css";
import cn from "classnames";

export const TodoItem = ({ text, hasCompleted }: TodoItemProps) => {
  return (
    <div className={cn(styles.item, { [styles.completed]: hasCompleted })}>
      {text}
    </div>
  );
};
