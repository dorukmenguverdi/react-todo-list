import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTaskText(event.target.value);
  }

  function addTask() {
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: crypto.randomUUID(),
      text: newTaskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function moveTask(id, direction) {
    const index = tasks.findIndex((task) => task.id === id);
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= tasks.length) return;

    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[newIndex]] = [
      updatedTasks[newIndex],
      updatedTasks[index],
    ];

    setTasks(updatedTasks);
  }

  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className='to-do-list'>
      <h1>To-Do-List</h1>

      <div className='form-group'>
        <input
          type='text'
          placeholder='Enter a task...'
          value={newTaskText}
          onChange={handleInputChange}
        />
        <button className='add-button' onClick={addTask}>
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className='empty-list-message'>No tasks yet.</p>
      ) : (
        <ol>
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onDelete={deleteTask}
              onMove={moveTask}
              onToggleComplete={toggleTaskCompletion}
            />
          ))}
        </ol>
      )}
    </div>
  );
}

export default ToDoList;