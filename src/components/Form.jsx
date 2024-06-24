import { useState, useContext, useRef } from "react";
import { Context } from "../App";

export default function Form() {
  const [data, setData] = useContext(Context);
  const [errorTask, setErrorTask] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorTaskLabel, setErrorTaskLabel] = useState("Insert your task");
  const [errorDescriptionLabel, setErrorDescriptionLabel] = useState(
    "Insert your description"
  );
  const [taskAdded, setTaskAdded] = useState(false);
  const formRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const task = formData.get("task");
    const description = formData.get("description");
    let taskValidation = false;
    let descriptionValidation = false;

    if (task.length < 3 || task.length > 25) {
      setErrorTask(true);
      setErrorTaskLabel("Invalid task");
    } else {
      setErrorTask(false);
      setErrorTaskLabel("Insert your task");
      taskValidation = true;
    }

    if (description.length < 3 || description.length > 35) {
      setErrorDescription(true);
      setErrorDescriptionLabel("Invalid Description");
    } else {
      setErrorDescription(false);
      setErrorDescriptionLabel("Insert your description");
      descriptionValidation = true;
    }

    if (taskValidation && descriptionValidation) {
      setData([
        { id: crypto.randomUUID(), task: task, description: description },
        ...data,
      ]);
      setTaskAdded(true);
      setTimeout(() => {
        setTaskAdded(false);
      }, 2000);
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="task" className={errorTask ? "label-error" : undefined}>
          {errorTaskLabel}
        </label>
        <input
          type="text"
          name="task"
          id="task"
          className={errorTask ? "error-task" : undefined}
        />

        <label
          htmlFor="description"
          className={errorDescription ? "label-error" : undefined}
        >
          {errorDescriptionLabel}
        </label>
        <input
          type="text"
          name="description"
          id="description"
          className={errorDescription ? "error-description" : undefined}
        />

        <button>Submit</button>
      </form>
      <h2 className={taskAdded ? "task-added-visible" : "task-added-hidden"}>
        Task Added!
      </h2>
    </>
  );
}
