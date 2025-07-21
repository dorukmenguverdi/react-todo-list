function TaskItem({ task, index, onDelete, onMove, onToggleComplete }) {
  return (
    <li className='task-item'>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />

      <span
        className='text'
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : 'black',
        }}
      >
        {task.text}
      </span>

      <button className='delete-button' onClick={() => onDelete(task.id)}>
        Delete
      </button>

      <button className='move-button' onClick={() => onMove(task.id, -1)} disabled={index === 0}>
        👆
      </button>
      <button className='move-button' onClick={() => onMove(task.id, 1)}>
        👇
      </button>
    </li>
  );
}

export default TaskItem;