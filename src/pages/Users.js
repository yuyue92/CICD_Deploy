import React, { useState } from 'react';
import {
  Typography, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useUserStore from '../userStore';

export default function Users() {
    const {users, addUser, updateUser, deleteUser } = useUserStore()

    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [form, setForm] = useState({ name: '', email: '' });

    const handleOpen = (user = null) => {
        console.log(user, 9999999)
        setEditUser(user);
        setForm(user ? { id: user.id, name: user.name, email: user.email } : { name: '', email: '' });
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = () => {
        if (!form.name.trim() || !form.email.trim()) return;
        console.log( 'from_: ', form )
        if (editUser) {
            updateUser(form);
        } else {
            addUser(form)
        }
        handleClose();
    };

    const handleDelete = (did) => {
        deleteUser(did)
    };

  return (
    <div>
      <Typography variant="h5" gutterBottom>用户管理</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        添加用户
      </Button>

      <TableContainer
        component={Paper}
        sx={{
            maxHeight: 480, // 固定高度
            overflow: 'auto'
        }}
        >
        <Table
            size="small"
            stickyHeader // 表头固定
            sx={{
            '& tbody tr:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
            },
            '& tbody tr:nth-of-type(odd)': {
                backgroundColor: '#fafafa'
            }
            }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell>index</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow
                key={user.id}
                sx={{
                    height: 36, // 进一步缩小行高
                }}
                >
                <TableCell style={{ width: '60px' }}>{i}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" size="small" onClick={() => handleOpen(user)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={() => handleDelete(user.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>

      {/* 弹窗表单 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editUser ? '编辑用户' : '添加用户'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="姓名"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave} variant="contained">保存</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
