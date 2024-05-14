import React from "react";
import { Task, Priority, Status } from "./types";

type Props = {
  task: Task;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const ToDoItem: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
    console
  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{Priority[task.priority]}</td>
      <td>{Status[task.status]}</td>
      <td>
        {task.dueDate ? task.dueDate.toLocaleDateString() : "No due date"}
      </td>
      <td>
        {task.status == 0 && (
          <button
            onClick={() =>
              updateTask(task.id, { ...task, status: Status.InProgress })
            }
          >
            Start
          </button>
        )}

        {task.status == 1 && (
          <button
            onClick={() =>
              updateTask(task.id, { ...task, status: Status.Done })
            }
          >
            Complete
          </button>
        )}
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDoItem;
