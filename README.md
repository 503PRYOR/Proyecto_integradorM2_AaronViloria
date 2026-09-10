# Proyecto Integrador M2 - API RESTful de Autores y Publicaciones

API backend desarrollada con **Node.js**, **Express** y **PostgreSQL** (arquitectura en capas con repository pattern), desplegada y alojada en **Railway**.

---

## 🌐 Demo en Vivo
* **Base URL:** `https://api-production-83b2.up.railway.app`
* **Health Check:** `https://api-production-83b2.up.railway.app/health`

---

## 🛠️ Tecnologías y Herramientas
* **Runtime:** Node.js
* **Framework Backend:** Express.js
* **Base de Datos:** PostgreSQL
* **Driver DB:** `pg` (Connection Pooling con soporte SSL)
* **Despliegue:** Railway

---

## 📁 Arquitectura del Proyecto

```text
Proyecto_integradorM2/
├── src/
│   ├── config/          # Configuración de base de datos
│   ├── controllers/     # Controladores de la API
│   ├── repositories/    # Capa de datos (PostgreSQL Repository)
│   ├── routes/          # Rutas HTTP (authors, posts)
│   ├── app.js           # Express App & Middlewares (CORS, JSON)
│   └── server.js        # Punto de entrada / arranque del servidor
├── package.json
└── README.md