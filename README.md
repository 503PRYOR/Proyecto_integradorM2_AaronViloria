# Proyecto Integrador M2 - API REST

API desarrollada con Node.js y Express para gestionar autores y publicaciones. El proyecto incluye validación de datos, manejo de errores, documentación OpenAPI y pruebas automatizadas con Vitest y Supertest.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pg
- Swagger UI
- OpenAPI 3.0
- Vitest + Supertest

## Descripción del proyecto

La aplicación expone endpoints para administrar:

- autores
- posts
- relaciones entre autores y publicaciones

Además, cuenta con un sistema de validación para asegurar que los datos requeridos sean correctos antes de guardar o actualizar información.

## Requisitos

- Node.js 18 o superior
- npm
- PostgreSQL

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

4. Configura la conexión a PostgreSQL en `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/proyecto_integrador_m2
NODE_ENV=development
```

5. Ejecuta el script SQL para crear la estructura de la base de datos:

```bash
psql "$DATABASE_URL" -f sql/setup.sql
```

## Ejecución

Para iniciar la API:

```bash
npm start
```

Para desarrollo con reinicio automático:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:3000
```

## Verificación de salud

La API incluye un endpoint de comprobación:

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "ok"
}
```

## Endpoints principales

### Autores

| Método | Ruta | Link | Descripción |
| --- | --- | --- | --- |
| GET | `/api/authors` | [http://localhost:3000/api/authors](http://localhost:3000/api/authors) | Lista todos los autores |
| GET | `/api/authors/:id` | [http://localhost:3000/api/authors/:id](http://localhost:3000/api/authors/:id) | Obtiene un autor por ID |
| POST | `/api/authors` | [http://localhost:3000/api/authors](http://localhost:3000/api/authors) | Crea un nuevo autor |
| PUT | `/api/authors/:id` | [http://localhost:3000/api/authors/:id](http://localhost:3000/api/authors/:id) | Actualiza un autor |
| DELETE | `/api/authors/:id` | [http://localhost:3000/api/authors/:id](http://localhost:3000/api/authors/:id) | Elimina un autor y sus posts |

#### Crear autor (`POST /api/authors`)

Ejemplo de request:

```http
POST /api/authors
Content-Type: application/json
```

```json
{
  "name": "Ana García",
  "email": "ana@example.com"
}
```

Validaciones:

- `name`: obligatorio y debe ser texto
- `email`: obligatorio, texto válido y con formato de email

Ejemplo de respuesta exitosa (`201 Created`):

```json
{
  "id": 1,
  "name": "Ana García",
  "email": "ana@example.com"
}
```

Ejemplo de error de validación (`400 Bad Request`):

```json
{
  "error": "Datos inválidos",
  "details": [
    "name es obligatorio",
    "email debe ser válido"
  ]
}
```

### Posts

| Método | Ruta | Link | Descripción |
| --- | --- | --- | --- |
| GET | `/api/posts` | [http://localhost:3000/api/posts](http://localhost:3000/api/posts) | Lista todos los posts |
| GET | `/api/posts/:id` | [http://localhost:3000/api/posts/:id](http://localhost:3000/api/posts/:id) | Obtiene un post por ID |
| GET | `/api/posts/author/:authorId` | [http://localhost:3000/api/posts/author/:authorId](http://localhost:3000/api/posts/author/:authorId) | Lista los posts de un autor |
| POST | `/api/posts` | [http://localhost:3000/api/posts](http://localhost:3000/api/posts) | Crea un post |
| PUT | `/api/posts/:id` | [http://localhost:3000/api/posts/:id](http://localhost:3000/api/posts/:id) | Actualiza un post |
| DELETE | `/api/posts/:id` | [http://localhost:3000/api/posts/:id](http://localhost:3000/api/posts/:id) | Elimina un post |

### Documentación

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/openapi.yaml` | Devuelve la especificación OpenAPI |
| GET | `/api-docs/` | Interfaz Swagger UI |

## Validaciones

La API valida los siguientes datos:

- autores: nombre y email válido
- posts: título, contenido y author_id válido
- campo `published`: booleano cuando se envía
- id numérico positivo en rutas parametrizadas

### Códigos de respuesta

- `200` OK
- `201` Created
- `204` No Content
- `400` Datos inválidos
- `404` Recurso no encontrado
- `409` Email duplicado
- `500` Error interno del servidor

## Tests

Se utilizan pruebas automatizadas para validar la API sin levantar un servidor real externo.

Comandos disponibles:

```bash
npm test
npm run test:watch
npm run test:ui
```

## Estructura del proyecto

```text
Proyecto_integradorM2/
├── openapi/
│   └── openapi.yaml
├── sql/
│   └── setup.sql
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
├── tests/
│   └── api.test.js
├── .env.example
├── package.json
├── railway.toml
├── vitest.config.js
└── README.md
```

## Documentación OpenAPI

La especificación OpenAPI se encuentra en:

```text
openapi/openapi.yaml
```

### URLs disponibles

#### Local

```text
http://localhost:3000/health
http://localhost:3000/openapi.yaml
http://localhost:3000/api-docs/
```

#### Producción (Railway)

```text
https://api-production-83b2.up.railway.app/
https://api-production-83b2.up.railway.app/health
https://api-production-83b2.up.railway.app/openapi.yaml
https://api-production-83b2.up.railway.app/api-docs/
```

## Deployment

El proyecto está preparado para desplegarse con Railway. El archivo `railway.toml` define el inicio de la aplicación y la comprobación del health check.

### Enlace de producción

- Base URL: https://api-production-83b2.up.railway.app/
- Health check: https://api-production-83b2.up.railway.app/health
- OpenAPI: https://api-production-83b2.up.railway.app/openapi.yaml
- Swagger UI: https://api-production-83b2.up.railway.app/api-docs/



### Link directo para abrir desde GitHub

https://api-production-83b2.up.railway.app/
- Swagger UI: https://api-production-83b2.up.railway.app/api-docs/

## Notas finales

Este backend sirve como API REST funcional con persistencia en PostgreSQL y simulación en memoria para pruebas, lo que permite validar comportamiento real del proyecto tanto en desarrollo como en testing.
