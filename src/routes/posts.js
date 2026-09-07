const express = require('express');
const { validatePost } = require('../validation');

function createPostsRouter(repository) {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try { return res.json(await repository.listPosts()); } catch (error) { return next(error); }
  });

  router.get('/author/:authorId', async (req, res, next) => {
    const authorId = Number(req.params.authorId);
    if (!Number.isInteger(authorId) || authorId < 1) {
      return res.status(400).json({ error: 'authorId debe ser un entero positivo' });
    }
    try { return res.json(await repository.listPostsByAuthor(authorId)); } catch (error) { return next(error); }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const post = await repository.getPost(Number(req.params.id));
      if (!post) return res.status(404).json({ error: 'Post no encontrado' });
      return res.json(post);
    } catch (error) { return next(error); }
  });

  router.post('/', async (req, res, next) => {
    const errors = validatePost(req.body);
    if (errors.length) return res.status(400).json({ error: 'Datos inválidos', details: errors });
    try { return res.status(201).json(await repository.createPost(req.body)); } catch (error) { return next(error); }
  });

  router.put('/:id', async (req, res, next) => {
    const errors = validatePost(req.body);
    if (errors.length) return res.status(400).json({ error: 'Datos inválidos', details: errors });
    try {
      const post = await repository.updatePost(Number(req.params.id), req.body);
      if (!post) return res.status(404).json({ error: 'Post no encontrado' });
      return res.json(post);
    } catch (error) { return next(error); }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const post = await repository.deletePost(Number(req.params.id));
      if (!post) return res.status(404).json({ error: 'Post no encontrado' });
      return res.status(204).send();
    } catch (error) { return next(error); }
  });

  return router;
}

module.exports = createPostsRouter;
