import { useEffect, useState } from 'react';
import {
  Container, Typography, TextField, Button,
  List, ListItem, ListItemText, IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function About() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', email: '' });
  const [errInfo, setErrInfo] = useState(null);

  // 获取用户数据
  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setErrInfo(null);
      })
      .catch(err => {
        console.error(err);
        setErrInfo(String(err));
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 提交表单（新增或更新）
  const handleSubmit = () => {
    if (form.id) {
      // 更新
      fetch(`/api/users/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      })
        .then(() => {
          setForm({ id: null, name: '', email: '' });
          fetchUsers();
        });
    } else {
      // 新增
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email }),
      })
        .then(() => {
          setForm({ id: null, name: '', email: '' });
          fetchUsers();
        });
    }
  };

  // 删除用户
  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => fetchUsers());
  };

  // 编辑用户
  const handleEdit = (user) => {
    setForm(user);
  };

  return (
    <Container>
      {errInfo && <Typography variant="h3" color='error.main'>{errInfo}</Typography>}
      <Typography variant="h4" gutterBottom>用户管理</Typography>

      <TextField
        label="姓名"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        sx={{ mr: 2 }}
      />
      <TextField
        label="邮箱"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {form.id ? '更新用户' : '添加用户'}
      </Button>

      <List sx={{ mt: 3 }}>
        {users.map(user => (
          <ListItem
            key={user.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(user)}><Edit /></IconButton>
                <IconButton onClick={() => handleDelete(user.id)}><Delete /></IconButton>
              </>
            }
          >
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
