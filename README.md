# Proyecto Integrador M2

API REST para administrar `authors` y `posts`, construida con Node.js, Express y PostgreSQL.

## Requisitos

- Node.js 18 o superior
- PostgreSQL 14 o superior

## Instalación

```bash
npm install
cp .env.example .env
```

En PowerShell puedes usar `Copy-Item .env.example .env`.

Configura `DATABASE_URL` en `.env` y crea la base de datos. Después ejecuta el script:

```bash
psql -U postgres -d proyecto_integrador_m2 -f sql/setup.sql
```

## Ejecución

```bash
npm start
```

La API queda disponible en `http://localhost:3000`.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/health` | Estado de la API |
| GET, POST | `/api/authors` | Listar o crear authors |
| GET, PUT, DELETE | `/api/authors/:id` | Consultar, actualizar o eliminar un author |
| GET, POST | `/api/posts` | Listar o crear posts |
| GET | `/api/posts/author/:authorId` | Listar posts de un author |
| GET, PUT, DELETE | `/api/posts/:id` | Consultar, actualizar o eliminar un post |

Los endpoints de creación y actualización reciben JSON. Un author requiere `name` y `email`; un post requiere `title`, `content` y `author_id`.

La especificación OpenAPI está disponible en [openapi/openapi.yaml](openapi/openapi.yaml), se sirve desde `GET /openapi.yaml` y cuenta con documentación interactiva Swagger UI en `http://localhost:3000/api-docs/`.

## Tests

Los tests usan un repositorio en memoria para validar HTTP sin depender de una instalación local de PostgreSQL:

```bash
npm test
npm run lint
```

## Deployment en Railway

1. Sube este repositorio a GitHub.
2. En Railway selecciona **New Project > Deploy from GitHub Repo**.
3. Agrega una base de datos PostgreSQL desde **New > Database > PostgreSQL**.
4. Configura la variable `DATABASE_URL` usando la referencia de conexión de PostgreSQL.
5. Configura `NODE_ENV=production` y despliega. Railway ejecutará `npm start` según [railway.toml](railway.toml).
6. Verifica la URL pública con `GET /health` y `GET /openapi.yaml`.

El script [sql/setup.sql](sql/setup.sql) debe ejecutarse una vez sobre la base PostgreSQL de Railway para crear las tablas y cargar el seed.

## Uso de IA

La IA se utilizó como apoyo para proponer la estructura inicial, revisar validaciones y generar casos de prueba. La implementación fue revisada y adaptada para cumplir la consigna del Proyecto Integrador M2.