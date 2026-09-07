function createPostgresRepository(pool) {
  return {
    async listAuthors() {
      const result = await pool.query('SELECT * FROM authors ORDER BY id');
      return result.rows;
    },

    async getAuthor(id) {
      const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
      return result.rows[0] || null;
    },

    async createAuthor({ name, email, bio }) {
      const result = await pool.query(
        'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
        [name, email, bio || null]
      );
      return result.rows[0];
    },

    async updateAuthor(id, { name, email, bio }) {
      const result = await pool.query(
        'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
        [name, email, bio || null, id]
      );
      return result.rows[0] || null;
    },

    async deleteAuthor(id) {
      const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    },

    async listPosts() {
      const result = await pool.query(`
        SELECT posts.*, authors.name AS author_name
        FROM posts JOIN authors ON authors.id = posts.author_id
        ORDER BY posts.id
      `);
      return result.rows;
    },

    async listPostsByAuthor(authorId) {
      const result = await pool.query(`
        SELECT posts.*, authors.name AS author_name
        FROM posts JOIN authors ON authors.id = posts.author_id
        WHERE posts.author_id = $1
        ORDER BY posts.id
      `, [authorId]);
      return result.rows;
    },

    async getPost(id) {
      const result = await pool.query(`
        SELECT posts.*, authors.name AS author_name
        FROM posts JOIN authors ON authors.id = posts.author_id
        WHERE posts.id = $1
      `, [id]);
      return result.rows[0] || null;
    },

    async createPost({ title, content, author_id: authorId, published }) {
      const result = await pool.query(
        'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, content, authorId, published ?? false]
      );
      return result.rows[0];
    },

    async updatePost(id, { title, content, author_id: authorId, published }) {
      const result = await pool.query(
        'UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *',
        [title, content, authorId, published ?? false, id]
      );
      return result.rows[0] || null;
    },

    async deletePost(id) {
      const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
      return result.rows[0] || null;
    }
  };
}

module.exports = createPostgresRepository;