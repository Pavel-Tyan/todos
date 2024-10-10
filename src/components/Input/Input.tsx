import { useContext, useState } from "react";
import { AddTodoContext } from "../TodoProvider/TodoProvider";
import { Button } from "../Button/Button";
import styles from "./Input.module.css";

export const Input = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const addTodoByText = useContext(AddTodoContext);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
      />
      <Button size="large" onClick={() => addTodoByText?.(value)}>
        +
      </Button>
    </div>
  );
};
