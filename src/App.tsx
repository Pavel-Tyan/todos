import styles from "./App.module.css";
import { Input } from "./components/Input/Input";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoProvider } from "./components/TodoProvider/TodoProvider";

function App() {
  return (
    <div className={styles.wrapper}>
      <TodoProvider>
        <Input />
        <TodoList />
      </TodoProvider>
    </div>
  );
}

export default App;
