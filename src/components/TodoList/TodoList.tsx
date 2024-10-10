import { useContext, useEffect, useState } from "react";
import {
  Context,
  ChangeStatusContext,
  Todo,
  DeleteCompletedContext,
} from "../TodoProvider/TodoProvider";
import { TodoItem } from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";
import { Button } from "../Button/Button";

export type Filter = "completed" | "active" | "all";

export const TodoList = () => {
  const todos = useContext<Todo[]>(Context);
  const [filter, setFilter] = useState<Filter>("all");
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>(todos);

  const changeStatusById = useContext(ChangeStatusContext);
  const deleteCompleted = useContext(DeleteCompletedContext);

  useEffect(() => {
    if (filter === "completed") {
      setDisplayedTodos(todos.filter((item) => item.hasCompleted));
      return;
    }

    if (filter === "active") {
      setDisplayedTodos(todos.filter((item) => !item.hasCompleted));
      return;
    }

    setDisplayedTodos(todos);
  }, [todos, filter]);

  return (
    <div>
      {displayedTodos.map((item) => {
        return (
          <div className={styles.item} key={item.id}>
            <Button size="large" onClick={() => changeStatusById?.(item.id)}>
              Change status
            </Button>
            <TodoItem text={item.text} hasCompleted={item.hasCompleted} />
          </div>
        );
      })}
      <div className={styles.buttonWrapper}>
        <Button size="large" onClick={() => setFilter("active")}>
          Show Active
        </Button>
        <Button size="large" onClick={() => setFilter("completed")}>
          Show Completed
        </Button>
        <Button size="large" onClick={() => setFilter("all")}>
          Show All
        </Button>
        <Button size="large" onClick={() => deleteCompleted?.()}>
          Delete Completed
        </Button>
      </div>
    </div>
  );
};
