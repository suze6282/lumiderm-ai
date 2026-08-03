import app from './app.js';
import { initializeDatabase } from './db/database.js';

const PORT = Number(process.env.PORT) || 3001;

const startServer = async () => {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`LumiDerm AI backend is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start LumiDerm AI backend:', error);
  process.exit(1);
});
