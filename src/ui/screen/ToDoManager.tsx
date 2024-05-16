import React, { useState } from "react";
import { Task, Priority, Status, CustomDate } from "../../model/types";
import ToDoList from "../component/ToDoList";

const initialDate: CustomDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hour: new Date().getHours(),
  minute: new Date().getMinutes()
};

const ToDoManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>(
    Priority.Low
  );
  const [newTaskStatus, setNewTaskStatus] = useState<Status>(Status.ToDo);
  const [newTaskDueDate, setNewTaskDueDate] = useState<CustomDate>(initialDate);

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      priority: newTaskPriority,
      status: newTaskStatus,
      dueDate: newTaskDueDate,
    };
    setTasks([...tasks, newTask]);
    localStorage.setItem(newTask.id.toString(), JSON.stringify({ ...tasks,newTask }));
    resetForm();
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(taskId.toString(), JSON.stringify({ ...updatedTask, status: 1 }));
  };
  

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.removeItem(taskId.toString()); 
    setTasks(updatedTasks);
  };
  

  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority(Priority.Low);
    setNewTaskStatus(Status.ToDo);
    setNewTaskDueDate(initialDate);
  };

  return (
    <div>
      <h2>ToDo List</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Priority:</label>
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(Number(e.target.value))}
        >
          <option value={Priority.Low}>Low</option>
          <option value={Priority.Medium}>Medium</option>
          <option value={Priority.High}>High</option>
        </select>
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="datetime-local"
          value={`${newTaskDueDate.year.toString().padStart(4, '0')}-${(newTaskDueDate.month + 1).toString().padStart(2, '0')}-${newTaskDueDate.day.toString().padStart(2, '0')}T${newTaskDueDate.hour.toString().padStart(2, '0')}:${newTaskDueDate.minute.toString().padStart(2, '0')}`}
          onChange={(e) => {
            const value = e.target.value;
            const year = parseInt(value.slice(0, 4));
            const month = parseInt(value.slice(5, 7)) - 1;
            const day = parseInt(value.slice(8, 10));
            const hour = parseInt(value.slice(11, 13));
            const minute = parseInt(value.slice(14, 16));
            setNewTaskDueDate({ year, month, day, hour, minute });
          }}
        />

      </div>
      <button onClick={addTask}>Add Task</button>

      <hr />

      <h3>Tasks</h3>
      <ToDoList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
};

export default ToDoManager;
