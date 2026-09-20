# Proyecto Integrador M2 - API REST de Autores y Publicaciones

API backend desarrollada con Node.js, Express y PostgreSQL. Administra autores y publicaciones mediante endpoints REST y usa un repositorio en memoria para las pruebas automatizadas.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- `pg` con connection pooling
- Vitest y Supertest
- Swagger UI y OpenAPI
- Railway

## Requisitos

- Node.js 18 o superior
- npm
- PostgreSQL para ejecutar la aplicación con persistencia real

## Instalación

```bash
npm install
```

Copia `.env.example` como `.env` y configura la conexión a PostgreSQL:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/proyecto_integrador_m2
NODE_ENV=development
```

Ejecuta el script de creación y seed en la base de datos configurada:

```bash
psql "$DATABASE_URL" -f sql/setup.sql
```

## Ejecución

```bash
npm start
```

Para desarrollo con reinicio automático:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`.

## Tests

Los tests usan Vitest como runner y Supertest para enviar solicitudes HTTP a la aplicación Express sin levantar un servidor real.

```bash
npm test
npm run test:watch
npm run test:ui
npm run lint
```

## Endpoints principales

### Authors

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/authors` | Lista todos los autores |
| GET | `/api/authors/:id` | Obtiene un autor |
| POST | `/api/authors` | Crea un autor |
| PUT | `/api/authors/:id` | Actualiza un autor |
| DELETE | `/api/authors/:id` | Elimina un autor y sus posts |

### Posts

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/posts` | Lista todos los posts |
| GET | `/api/posts/:id` | Obtiene un post |
| GET | `/api/posts/author/:authorId` | Lista los posts de un autor |
| POST | `/api/posts` | Crea un post |
| PUT | `/api/posts/:id` | Actualiza un post |
| DELETE | `/api/posts/:id` | Elimina un post |

### Documentación y salud

- `GET /health` comprueba que la API esté disponible.
- `GET /openapi.yaml` devuelve la especificación OpenAPI.
- `GET /api-docs/` abre Swagger UI.

## Validaciones y errores

- Los autores requieren `name` y un email válido.
- Los posts requieren `title`, `content` y un `author_id` entero positivo.
- `published`, cuando se envía, debe ser booleano.
- Los errores de validación responden con `400`.
- Los recursos inexistentes responden con `404`.
- Los emails duplicados responden con `409` en PostgreSQL.
- Los errores de clave foránea responden con `400`.
- Los errores no controlados responden con `500` mediante el middleware global.

## Estructura

```text
Proyecto_integradorM2/
├── openapi/openapi.yaml
├── sql/setup.sql
├── src/
│   ├── app.js
│   ├── db.js
│   ├── server.js
│   ├── validation.js
│   ├── repositories/
│   │   ├── memoryRepository.js
│   │   └── postgresRepository.js
│   └── routes/
│       ├── authors.js
│       └── posts.js
├── tests/api.test.js
├── .env.example
├── package.json
├── railway.toml
└── vitest.config.js
```

## OpenAPI y Swagger

La especificación está en `openapi/openapi.yaml`.

- Local: `http://localhost:3000/api-docs/`
- Archivo: `http://localhost:3000/openapi.yaml`

## Deployment en Railway

El archivo `railway.toml` configura Railway para iniciar la aplicación con `npm start` y comprobar `/health`.

En Railway se debe configurar `DATABASE_URL` con la conexión de PostgreSQL y `PORT` si el proveedor la requiere.

- Base URL: `https://api-production-83b2.up.railway.app`
- Health check: `https://api-production-83b2.up.railway.app/health`
