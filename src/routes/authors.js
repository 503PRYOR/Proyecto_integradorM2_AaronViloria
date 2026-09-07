const express = require('express');
const { validateAuthor } = require('../validation');

function createAuthorsRouter(repository) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try { return res.json(await repository.listAuthors()); } catch (error) { return next(error); }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const author = await repository.getAuthor(Number(req.params.id));
      if (!author) return res.status(404).json({ error: 'Author no encontrado' });
      return res.json(author);
    } catch (error) { return next(error); }
  });

  router.post('/', async (req, res, next) => {
    const errors = validateAuthor(req.body);
    if (errors.length) return res.status(400).json({ error: 'Datos inválidos', details: errors });
    try { return res.status(201).json(await repository.createAuthor(req.body)); } catch (error) { return next(error); }
  });

  router.put('/:id', async (req, res, next) => {
    const errors = validateAuthor(req.body);
    if (errors.length) return res.status(400).json({ error: 'Datos inválidos', details: errors });
    try {
      const author = await repository.updateAuthor(Number(req.params.id), req.body);
      if (!author) return res.status(404).json({ error: 'Author no encontrado' });
      return res.json(author);
    } catch (error) { return next(error); }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const author = await repository.deleteAuthor(Number(req.params.id));
      if (!author) return res.status(404).json({ error: 'Author no encontrado' });
      return res.status(204).send();
    } catch (error) { return next(error); }
  });

  return router;
}

module.exports = createAuthorsRouter;
