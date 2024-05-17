import React, { useState } from "react";
import { Task } from "../../model/types";
import ToDoItem from "./ToDoItem";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const ToDoList: React.FC<Props> = ({ tasks, onEdit, updateTask, deleteTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <ToDoItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
