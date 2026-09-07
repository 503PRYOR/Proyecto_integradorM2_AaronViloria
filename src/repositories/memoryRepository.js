function createMemoryRepository() {
  let authors = [
    { id: 1, name: 'Ana García', email: 'ana@example.com', bio: 'Desarrolladora full-stack apasionada por Node.js' }
  ];
  let posts = [];
  let nextAuthorId = 2;
  let nextPostId = 1;

  return {
    async listAuthors() { return authors; },
    async getAuthor(id) { return authors.find((author) => author.id === id) || null; },
    async createAuthor(data) {
      const author = { id: nextAuthorId++, ...data };
      authors.push(author);
      return author;
    },
    async updateAuthor(id, data) {
      const index = authors.findIndex((author) => author.id === id);
      if (index === -1) return null;
      authors[index] = { id, ...data };
      return authors[index];
    },
    async deleteAuthor(id) {
      const author = await this.getAuthor(id);
      if (!author) return null;
      authors = authors.filter((item) => item.id !== id);
      posts = posts.filter((post) => post.author_id !== id);
      return author;
    },
    async listPosts() { return posts; },
    async listPostsByAuthor(authorId) { return posts.filter((post) => post.author_id === authorId); },
    async getPost(id) { return posts.find((post) => post.id === id) || null; },
    async createPost(data) {
      const post = { id: nextPostId++, ...data };
      posts.push(post);
      return post;
    },
    async updatePost(id, data) {
      const index = posts.findIndex((post) => post.id === id);
      if (index === -1) return null;
      posts[index] = { id, ...data };
      return posts[index];
    },
    async deletePost(id) {
      const post = await this.getPost(id);
      posts = posts.filter((item) => item.id !== id);
      return post;
    }
  };
}

module.exports = createMemoryRepository;