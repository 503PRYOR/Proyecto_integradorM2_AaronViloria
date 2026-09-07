const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const createAuthorsRouter = require('./routes/authors');
const createPostsRouter = require('./routes/posts');

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi/openapi.yaml'));

function createApp(repository) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ status: 'ok' }));
  app.get('/openapi.yaml', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../openapi/openapi.yaml'), (error) => {
      if (error) next(error);
    });
  });
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/api/authors', createAuthorsRouter(repository));
  app.use('/api/posts', createPostsRouter(repository));

  app.use((error, req, res, _next) => {
    if (error.code === '23505') return res.status(409).json({ error: 'El email ya está registrado' });
    if (error.code === '23503') return res.status(400).json({ error: 'El author_id no existe' });
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  });

  return app;
}

module.exports = createApp;