import { useContext, useState, useRef } from "react";
import { Context } from "../App";

export default function Task({ task }) {
  const [data, setData] = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const refForm = useRef();

  function handleDelete(e) {
    e.preventDefault();

    setData((prev) => {
      return prev.filter((data) => data.id !== task.id);
    });
  }

  function handleEdit(e) {
    e.preventDefault();

    setEditMode(true);
  }

  function handleSubmitEdit(e) {
    e.preventDefault();

    const formData = new FormData(refForm.current);
    const taskName = formData.get("task");
    const descriptionName = formData.get("description");

    data.map((item) => {
      if (item.id === task.id) {
        item.task = taskName;
        item.description = descriptionName;
      }
    });

    setEditMode(false);
  }

  return (
    <div className="task">
      <div className="information">
        <span>{task.task}</span>
        <p>{task.description}</p>
      </div>
      <div className="buttons">
        <button className="button-delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="button-edit" onClick={handleEdit}>
          Edit
        </button>
      </div>
      <form
        className={editMode ? "form-edit visible" : "form-edit hidden"}
        ref={refForm}
        onSubmit={handleSubmitEdit}
      >
        <input type="text" name="task" placeholder="Task's name" />
        <input
          type="text"
          name="description"
          placeholder="Task's description"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
