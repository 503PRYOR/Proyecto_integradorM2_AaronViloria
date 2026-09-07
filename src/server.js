require('dotenv').config();
const createApp = require('./app');
const pool = require('./db');
const createPostgresRepository = require('./repositories/postgresRepository');

const app = createApp(createPostgresRepository(pool));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API ejecutándose en http://localhost:${port}`);
});