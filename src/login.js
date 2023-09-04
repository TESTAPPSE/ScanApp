// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://10.110.21.216:5000/login', {
          username,
          password,
        });
  
        if (response.data.success) {
          // Authentication successful, you can redirect or perform other actions here
          navigate('/PA1');
        } else {
         navigate('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockIcon sx={{ fontSize: '3rem', marginBottom: '1rem' }} />
        <Typography variant="h5" component="div" sx={{ marginBottom: '1rem' }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
