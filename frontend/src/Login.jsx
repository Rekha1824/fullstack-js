// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        username: user,
        password: pass
      });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
      window.location.reload(); // Ensures fresh task data
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container maxWidth="xs" align="center">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => navigate('/register')}
          >
            Don't have an account? Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
