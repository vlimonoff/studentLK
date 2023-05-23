require('dotenv').config();

const express = require('express');
const path = require('path');
const expressConfig = require('./config/express');

// импортируем роутеры
const loginApiRouter = require('./routes/api/login.routes');
const professorApiRouter = require('./routes/api/professor.routes');
const markApiRouter = require('./routes/api/mark.routes');
const adminApiRouter = require('./routes/api/admin.routes');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

const PORT = process.env.PORT ?? 3000;

// функция настройки экспресса
expressConfig(app);

// подключаем роутеры
app.use('/api/auth', loginApiRouter);
app.use('/api/professor', professorApiRouter);
app.use('/api/mark', markApiRouter);
app.use('/api/admin', adminApiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use((error, req, res) => {
  console.error('Произошла ошибка', error);
  res.status(500).json({
    success: false,
    message: 'Непредвиденная ошибка сервера, попробуйте зайти позже',
  });
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
