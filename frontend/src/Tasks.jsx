
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Logout as LogoutIcon,
  AlignHorizontalCenter
} from '@mui/icons-material';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
    const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    };

  const loadTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return;
    await api.post('/tasks', { title: newTitle });
    setNewTitle('');
    loadTasks();
  };

  const toggleTask = async (task) => {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      completed: !task.completed,
    });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };

  const saveEdit = async (task) => {
    if (!editedTitle.trim()) return;
    await api.put(`/tasks/${task.id}`, {
      title: editedTitle,
      completed: task.completed,
    });
    setEditingId(null);
    loadTasks();
  };


  return (

    <div>
      <h2>Your Tasks</h2>
      <button onClick={logout} style={{ float: 'right' }}>
        Logout
    </button>

      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            {editingId === task.id ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={() => saveEdit(task)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.title}
                </span>
                <button onClick={() => startEditing(task)}>Edit</button>
              </>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>

  );
}
