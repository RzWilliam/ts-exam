import React from "react";
import { Task, Priority, Status } from "../../model/types";

type ToDoItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const ToDoItem: React.FC<ToDoItemProps> = ({ task, onEdit, updateTask, deleteTask }) => {
  const handleStart = () => {
    updateTask(task.id, { ...task, status: Status.InProgress });
  };

  const handleComplete = () => {
    updateTask(task.id, { ...task, status: Status.Done });
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
      <td>
        {task.dueDate
          ? `${task.dueDate.day.toString().padStart(2, '0')}/${(task.dueDate.month + 1).toString().padStart(2, '0')}/${task.dueDate.year} ${task.dueDate.hour}:${task.dueDate.minute}`
          : "No due date"}
      </td>
      <td>
        {task.status === Status.ToDo && (
          <button onClick={handleStart}>Start</button>
        )}
        {task.status === Status.InProgress && (
          <button onClick={handleComplete}>Complete</button>
        )}
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default ToDoItem;