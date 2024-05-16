import React from "react";
import { Task, Priority, Status } from "../../model/types";

type Props = {
  task: Task;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const ToDoItem: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
  const handleStart = () => {
    updateTask(task.id, { ...task, status: 1 }); // Update status to 'InProgress'
  };

  const handleComplete = () => {
    updateTask(task.id, { ...task, status: 2 }); // Update status to 'Done'
    localStorage.setItem(task.id.toString(), JSON.stringify({ ...task, status: 2 }));
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{Priority[task.priority]}</td>
      <td>{Status[task.status]}</td>
      <td>{task.dueDate ? `${task.dueDate.day}/${task.dueDate.month}/${task.dueDate.year} ${task.dueDate.hour}:${task.dueDate.minute}` : "No due date"}</td>
      <td>
        {task.status === 0 && (
          <button onClick={handleStart}>Start</button>
        )}

        {task.status === 1 && (
          <button onClick={handleComplete}>Complete</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDoItem;
