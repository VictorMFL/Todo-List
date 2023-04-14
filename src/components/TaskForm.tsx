import React, { ChangeEvent, FormEvent } from "react";

import styles from "./TaskForm.module.css";

// interface
import { ITask } from "../interfaces/Task";

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
};

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {

  const [id, setId] = React.useState<number>(0);
  const [title, setTitle] = React.useState<string>("");
  const [difficulty, setDifficulty] = React.useState<number>(0);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = { id, title, difficulty };

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDifficulty(0);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setDifficulty(parseInt(event.target.value));
    }
  };

  React.useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  return (
    <form className={styles.form} onSubmit={addTaskHandler}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título de tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="text"
          name="difficulty"
          placeholder="Dificuldade de tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
