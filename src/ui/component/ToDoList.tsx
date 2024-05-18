import React, { useState } from "react";
import { Task, Priority, Status } from "../../model/types";
import ToDoItem from "./ToDoItem";

type Props = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
};

const ToDoList: React.FC<Props> = ({ tasks, onEdit, updateTask, deleteTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<Priority | "">("");
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [filterDueDate, setFilterDueDate] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "" || task.status === filterStatus;
    const matchesDueDate = filterDueDate === "" || 
      new Date(`${task.dueDate.year}-${task.dueDate.month + 1}-${task.dueDate.day}`).toISOString().split('T')[0] === filterDueDate;

    return matchesSearchTerm && matchesPriority && matchesStatus && matchesDueDate;
  });

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          value={filterPriority} 
          onChange={(e) => setFilterPriority(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">All Priorities</option>
          <option value={Priority.Low}>Low</option>
          <option value={Priority.Medium}>Medium</option>
          <option value={Priority.High}>High</option>
        </select>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">All Statuses</option>
          <option value={Status.ToDo}>To Do</option>
          <option value={Status.InProgress}>In Progress</option>
          <option value={Status.Done}>Done</option>
        </select>
        <input
          type="date"
          value={filterDueDate}
          onChange={(e) => setFilterDueDate(e.target.value)}
        />
      </div>
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
