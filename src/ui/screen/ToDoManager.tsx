import React, { useState, useEffect } from "react";
import { Task, Priority, Status, CustomDate } from "../../model/types";
import ToDoList from "../component/ToDoList";

const initialDate: CustomDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hour: new Date().getHours().toString().padStart(2, '0'),
  minute: new Date().getMinutes().toString().padStart(2, '0')
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

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const generateUniqueId = () => {
    const idCounter = localStorage.getItem("idCounter");
    let newId = 1;
  
    if (idCounter) {
      newId = parseInt(idCounter) + 1;
    }
  
    localStorage.setItem("idCounter", newId.toString());
    return newId;
  };

  function minTwoDigits(n: number) : string {
    return (n < 10 ? '0' : '') + n;
  }

  const addTask = () => {
    const newTask: Task = {
      id: generateUniqueId(),
      title: newTaskTitle,
      description: newTaskDescription,
      priority: newTaskPriority,
      status: newTaskStatus,
      dueDate: newTaskDueDate,
    };

    const updatedTasks = [...tasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    resetForm();
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasksArray = JSON.parse(storedTasks) as Task[];
      const updatedTasks = tasksArray.map((task) =>
        task.id === taskId ? updatedTask : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setTasks(updatedTasks);
    }
  };
  

  const deleteTask = (taskId: number) => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasksArray = JSON.parse(storedTasks) as Task[];
      const updatedTasks = tasksArray.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
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
            const hour = minTwoDigits(parseInt(value.slice(11, 13)));
            const minute = minTwoDigits(parseInt(value.slice(14, 16)));
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
