// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// 数据库文件路径
const dbPath = path.resolve(__dirname, 'data.db');
const db = new sqlite3.Database(dbPath);

// 初始化数据库
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);

  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
      stmt.run('Alice', 'alice@example.com');
      stmt.run('Bob', 'bob@example.com');
      stmt.finalize();
    }
  });
});

// 获取所有用户
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).send('数据库查询失败');
    res.json(rows);
  });
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).send('数据库查询失败');
    res.json(row);
  });
});

// 新增用户
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) return res.status(500).send('插入数据失败');
    res.json({ id: this.lastID, name, email });
  });
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], function (err) {
    if (err) return res.status(500).send('更新数据失败');
    res.json({ updated: this.changes });
  });
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).send('删除数据失败');
    res.json({ deleted: this.changes });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
