import { createContext, useCallback, useState } from "react";
import { TodoProviderProps } from "./TodoProvider.props";

export type Todo = {
  id: string;
  text: string;
  hasCompleted: boolean;
};

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const Context = createContext<Todo[]>([]);
export const ChangeStatusContext = createContext<((id: string) => void) | null>(
  null
);
export const DeleteCompletedContext = createContext<(() => void) | null>(null);
export const AddTodoContext = createContext<((text: string) => void) | null>(
  null
);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const changeStatusById = useCallback(
    (id: string) => {
      const cloned = JSON.parse(JSON.stringify(todos)) as Todo[];

      for (let i = 0; i < cloned.length; i++) {
        if (cloned[i].id === id) {
          cloned[i].hasCompleted = !cloned[i].hasCompleted;
          setTodos(cloned);
          break;
        }
      }
    },
    [todos]
  );

  const deleteCompleted = useCallback(() => {
    const cloned = JSON.parse(JSON.stringify(todos)) as Todo[];
    const filtered = cloned.filter((item: Todo) => !item.hasCompleted);
    setTodos(filtered);
  }, [todos]);

  const addTodoByText = useCallback(
    (text: string) => {
      const cloned = JSON.parse(JSON.stringify(todos)) as Todo[];

      cloned.push({
        id: uid(),
        text: text,
        hasCompleted: false,
      });

      setTodos(cloned);
    },
    [todos]
  );

  return (
    <Context.Provider value={todos}>
      <ChangeStatusContext.Provider value={changeStatusById}>
        <DeleteCompletedContext.Provider value={deleteCompleted}>
          <AddTodoContext.Provider value={addTodoByText}>
            {children}
          </AddTodoContext.Provider>
        </DeleteCompletedContext.Provider>
      </ChangeStatusContext.Provider>
    </Context.Provider>
  );
};
