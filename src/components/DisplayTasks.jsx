import { useContext } from "react";
import { Context } from "../App";
import Task from "./Task";

export default function DisplayTasks() {
  const [data, setData] = useContext(Context);

  return (
    <div className="display-task">
      {data.length == 0 ? (
        <h2>There are no tasks for the moment...</h2>
      ) : (
        data.map((task) => {
          return <Task task={task} />;
        })
      )}
    </div>
  );
}
