function validateAuthor(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string') errors.push('name es obligatorio');
  if (!body.email || typeof body.email !== 'string' || !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.push('email debe ser válido');
  }
  return errors;
}

function validatePost(body) {
  const errors = [];
  if (!body.title || typeof body.title !== 'string') errors.push('title es obligatorio');
  if (!body.content || typeof body.content !== 'string') errors.push('content es obligatorio');
  if (!Number.isInteger(body.author_id) || body.author_id < 1) errors.push('author_id debe ser un entero positivo');
  if (body.published !== undefined && typeof body.published !== 'boolean') errors.push('published debe ser booleano');
  return errors;
}

module.exports = { validateAuthor, validatePost };