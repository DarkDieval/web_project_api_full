# Around the U.S. – Full Stack Project

¡Bienvenido a **Around the U.S.**! Esta es una aplicación web full-stack que permite a los usuarios compartir lugares emblemáticos de Estados Unidos. Puedes crear una cuenta, iniciar sesión, añadir tarjetas con imágenes, dar "me gusta" y eliminar tus propias tarjetas.

## 🌐 Demo en vivo

- **Frontend:** [https://www.around.mooo.com](https://www.around.mooo.com)
- **Backend API:** [https://api.around.mooo.com](https://api.around.mooo.com)

## 🛠️ Tecnologías utilizadas

### Frontend

- React (con Vite)
- React Router (enrutamiento)
- Context API (gestión de estado)
- CSS Modules (estilos modulares)

### Backend

- Node.js
- Express.js
- MongoDB (base de datos NoSQL)
- Mongoose (ODM)
- JWT (autenticación)
- bcryptjs (hash de contraseñas)
- Celebrate + Joi (validación)
- Winston (logs)
- PM2 (gestor de procesos)

### Infraestructura

- NGINX (proxy inverso y servidor estático)
- Let's Encrypt (certificado SSL/HTTPS)
- Google Cloud Platform (VM)

## 🚀 Funcionalidades principales

- **Registro de usuario:** Crea una cuenta con correo electrónico y contraseña.
- **Inicio de sesión:** Autenticación con JWT (token de 7 días).
- **Perfil de usuario:** Edita tu nombre, descripción y avatar.
- **Tarjetas:** Añade nuevas tarjetas con un nombre y una imagen URL.
- **Me gusta:** Da "me gusta" a las tarjetas de otros usuarios.
- **Eliminar:** Elimina tus propias tarjetas (solo las que creaste).
- **Seguridad:** Todas las rutas protegidas (excepto registro e inicio de sesión).

## 🧪 Pruebas

Puedes probar la API con Postman o con el frontend desplegado. Los endpoints principales son:

- `POST /signup` – Registro
- `POST /signin` – Inicio de sesión
- `GET /users/me` – Perfil del usuario autenticado
- `GET /cards` – Obtener todas las tarjetas
- `POST /cards` – Crear una nueva tarjeta
- `DELETE /cards/:cardId` – Eliminar una tarjeta

## 📦 Instalación local

Si deseas ejecutar el proyecto en tu máquina local:

```bash
git clone https://github.com/DarkDieval/web_project_api_full.git
cd web_project_api_full

cd backend
npm install
cp .env.example .env
npm run dev

cd ../frontend
npm install
npm run dev
🗂️ Estructura del repositorio
text
web_project_api_full/
├── backend/
│   ├── controllers/
│   ├── errors/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── dist/
│   └── package.json
├── .gitignore
└── README.md
📄 Licencia
Este proyecto fue desarrollado como parte del bootcamp de TripleTen y es de uso educativo.

¡Gracias por visitar mi proyecto! 🚀
```
