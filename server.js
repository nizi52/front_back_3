require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Подключение к PostgreSQL установлено');

    // sync() создаёт таблицу если её нет, без удаления данных
    await sequelize.sync({ alter: true });
    console.log('✅ Таблицы синхронизированы');

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Ошибка запуска:', err);
    process.exit(1);
  }
};

start();