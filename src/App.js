import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTasks, addTask, deleteTask, editTask, updateTask } from '../src/actions/actions';
import './App.css';

const TodoList = ({ tasks, error, fetchTasks, addTask, deleteTask, editTask, updateTask }) => {
  useEffect(() => {
    fetchTasks();                                                                                                                                         // Fetch tasks when component mounts
  }, [fetchTasks]);

  const [newTaskText, setNewTaskText] = useState('');
  const [editedTask, setEditedTask] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  const handleEdit = (id, text) => {
    editTask(id);
    setEditedTask({ id, text });
  };

  const handleUpdate = (id) => {
    updateTask(id, editedTask.text);
    setEditedTask({ id: null, text: '' });
  };

  return (
    <div className="todo-app-container">
      <h1>Todo App</h1>
      <div className="todo-list-container">
        {error && <p>Error: {error.message}</p>}
        <div className="todo-input-container">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add new task"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <div className="todo-items-container">
          <ul className="todo-list">
            {tasks.map((task) => (
              <li key={task.id} className="todo-item">
                {editedTask.id === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTask.text}
                      onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                    />
                    <button onClick={() => handleUpdate(task.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <div>{task.text}</div>
                    <div>
                      <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  error: state.error,
});

const mapDispatchToProps = {
  fetchTasks,
  addTask,
  deleteTask,
  editTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
