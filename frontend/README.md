# Around the U.S. – React con Autenticación

Sitio web responsive para compartir lugares emblemáticos. Construido con React, Vite y conectado a una API real con sistema de registro e inicio de sesión.

## 🚀 Demo en vivo

🔗 [Ver demo](https://darkdieval.github.io/web_project_around_auth/)

## ✨ Funcionalidades

- Registro e inicio de sesión de usuarios.
- Ver tarjetas con imágenes de lugares.
- Dar "me gusta" a las tarjetas.
- Eliminar tarjetas propias.
- Editar perfil (nombre y descripción).
- Cambiar foto de perfil.
- Agregar nuevas tarjetas.
- Persistencia de sesión con JWT en localStorage.

## 🛠️ Tecnologías

- React 19
- React Router v6
- Vite
- CSS (BEM)
- API REST (autenticación JWT)

## 📦 Instalación

```bash
git clone https://github.com/DarkDieval/web_project_around_auth.git
cd web_project_around_auth
npm install
npm run dev
```

🔐 Endpoints de autenticación
POST /signup – Registro de usuarios

POST /signin – Inicio de sesión

GET /users/me – Obtener datos del usuario autenticado
