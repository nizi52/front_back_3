const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

// Базовый маршрут — проверка работы API
app.get('/', (req, res) => {
    res.json({ message: 'User API работает' });
});

module.exports = app;