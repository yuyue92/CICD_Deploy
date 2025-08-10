import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';

export default function Login() {
  const { setUser } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = () => {
    if (form.username && form.password) {
      // 模拟登录成功
      setUser({ username: form.username });
      navigate('/');
    }
  };

  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', background: '#f0f0f0'
    }}>
      <Paper sx={{ p: 4, width: 300 }}>
        <Typography variant="h5" gutterBottom>用户登录</Typography>
        <TextField
          fullWidth label="用户名" margin="normal"
          value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <TextField
          fullWidth label="密码" type="password" margin="normal"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
          登录
        </Button>
      </Paper>
    </Box>
  );
}
