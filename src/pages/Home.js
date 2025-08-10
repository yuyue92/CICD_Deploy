import React from 'react';
import { Typography, Paper } from '@mui/material';

export default function Home() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">首页</Typography>
      <Typography>欢迎使用 React + MUI 后台管理系统！</Typography>
    </Paper>
  );
}
