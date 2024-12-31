import React from 'react';
import logo from './logo.svg';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Add a new task
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: uuidv4(),
        text: taskInput,
        completed: false,
        priority: 'medium',
        dueDate: ''
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Update a task's priority or due date
  const updateTask = (id, key, value) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, [key]: value } : task));
  };

  // Filter tasks based on user selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-details">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span>{task.text}</span>
            </div>
            <div className="task-actions">
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, 'priority', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => updateTask(task.id, 'dueDate', e.target.value)}
              />
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

