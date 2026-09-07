const request = require('supertest');
const createApp = require('../src/app');
const createMemoryRepository = require('../src/repositories/memoryRepository');

describe('API REST', () => {
  const app = createApp(createMemoryRepository());

  it('responde el health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('sirve la especificación OpenAPI', async () => {
    const response = await request(app).get('/openapi.yaml');
    expect(response.status).toBe(200);
    expect(response.text).toContain('openapi: 3.0.3');
  });

  it('sirve la documentación interactiva de Swagger UI', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('swagger-ui');
  });

  it('crea y obtiene un author', async () => {
    const created = await request(app).post('/api/authors').send({
      name: 'Carlos Ruiz', email: 'carlos@example.com', bio: 'Autor técnico'
    });
    expect(created.status).toBe(201);
    const found = await request(app).get(`/api/authors/${created.body.id}`);
    expect(found.status).toBe(200);
    expect(found.body.email).toBe('carlos@example.com');
  });

  it('rechaza un author inválido', async () => {
    const response = await request(app).post('/api/authors').send({ name: 'Sin email' });
    expect(response.status).toBe(400);
    expect(response.body.details).toContain('email debe ser válido');
  });

  it('crea un post y elimina un recurso inexistente correctamente', async () => {
    const created = await request(app).post('/api/posts').send({
      title: 'Post de prueba', content: 'Contenido', author_id: 1, published: false
    });
    expect(created.status).toBe(201);
    const missing = await request(app).delete('/api/posts/999');
    expect(missing.status).toBe(404);
  });

  it('lista los posts de un author', async () => {
    const response = await request(app).get('/api/posts/author/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].author_id).toBe(1);
  });

  it('actualiza y elimina un post existente', async () => {
    const created = await request(app).post('/api/posts').send({
      title: 'Post editable', content: 'Contenido inicial', author_id: 1, published: false
    });
    const updated = await request(app).put(`/api/posts/${created.body.id}`).send({
      title: 'Post actualizado', content: 'Contenido nuevo', author_id: 1, published: true
    });
    expect(updated.status).toBe(200);
    expect(updated.body.title).toBe('Post actualizado');

    const deleted = await request(app).delete(`/api/posts/${created.body.id}`);
    expect(deleted.status).toBe(204);
    const missing = await request(app).get(`/api/posts/${created.body.id}`);
    expect(missing.status).toBe(404);
  });

  it('actualiza y elimina un author existente', async () => {
    const updated = await request(app).put('/api/authors/1').send({
      name: 'Ana actualizada', email: 'ana.updated@example.com', bio: 'Nueva bio'
    });
    expect(updated.status).toBe(200);
    expect(updated.body.name).toBe('Ana actualizada');

    const deleted = await request(app).delete('/api/authors/1');
    expect(deleted.status).toBe(204);
    const missing = await request(app).get('/api/authors/1');
    expect(missing.status).toBe(404);
  });

  it('rechaza un post inválido y un authorId inválido', async () => {
    const invalidPost = await request(app).post('/api/posts').send({ title: 'Sin contenido' });
    expect(invalidPost.status).toBe(400);
    const invalidAuthorId = await request(app).get('/api/posts/author/no-es-un-id');
    expect(invalidAuthorId.status).toBe(400);
  });
});