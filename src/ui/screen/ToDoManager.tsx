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
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>(Priority.Low);
  const [newTaskStatus, setNewTaskStatus] = useState<Status>(Status.ToDo);
  const [newTaskDueDate, setNewTaskDueDate] = useState<CustomDate>(initialDate);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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

  const minTwoDigits = (n: number): string => {
    return (n < 10 ? '0' : '') + n;
  };

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

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskPriority(task.priority);
    setNewTaskStatus(task.status);
    setNewTaskDueDate(task.dueDate);
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? updatedTask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    resetForm();
  };

  const saveTask = () => {
    if (editingTaskId !== null) {
      const updatedTask: Task = {
        id: editingTaskId,
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        status: newTaskStatus,
        dueDate: newTaskDueDate,
      };
      updateTask(editingTaskId, updatedTask);
    } else {
      addTask();
    }
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const resetForm = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority(Priority.Low);
    setNewTaskStatus(Status.ToDo);
    setNewTaskDueDate(initialDate);
    setEditingTaskId(null);
  };

  return (
    <div className="container">
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
          onChange={(e) => setNewTaskPriority(Number(e.target.value) as Priority)}
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
          value={`${newTaskDueDate.year.toString().padStart(4, '0')}-${(newTaskDueDate.month + 1).toString().padStart(2, '0')}-${newTaskDueDate.day.toString().padStart(2, '0')}T${newTaskDueDate.hour}:${newTaskDueDate.minute}`}
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
      <button onClick={saveTask}>{editingTaskId ? "Update Task" : "Add Task"}</button>
      <button onClick={resetForm} className="cancel">Cancel</button>

      <hr />

      <h3>Tasks</h3>
      <ToDoList 
        tasks={tasks} 
        onEdit={startEditingTask} 
        updateTask={updateTask}
        deleteTask={deleteTask} 
      />
    </div>
  );
};

export default ToDoManager;
