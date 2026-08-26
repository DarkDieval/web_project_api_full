# Around the US API

API RESTful para el proyecto "Around the US" desarrollada con **Node.js**, **Express.js** y **MongoDB**. Esta API maneja las operaciones CRUD de usuarios y tarjetas, incluyendo likes y actualización de perfiles.

## 🚀 Tecnologías y herramientas utilizadas

- **Node.js** (v18+)
- **Express.js** (v5.2.1)
- **MongoDB** (v8.3.7)
- **Mongoose** (v9.9.1) → ODM para modelar los datos.
- **ESLint** + **Airbnb Base** → Para mantener la calidad del código.
- **Nodemon** → Para recarga automática en desarrollo.

## 📋 Funcionalidades (Endpoints)

### Usuarios

| Método  | Ruta               | Descripción                                  | Código de éxito | Código de error     |
| ------- | ------------------ | -------------------------------------------- | --------------- | ------------------- |
| `GET`   | `/users`           | Devuelve todos los usuarios.                 | `200 OK`        | `500`               |
| `GET`   | `/users/:userId`   | Devuelve un usuario por su `_id`.            | `200 OK`        | `404`, `400`, `500` |
| `POST`  | `/users`           | Crea un nuevo usuario.                       | `201 Created`   | `400`, `409`, `500` |
| `PATCH` | `/users/me`        | Actualiza el perfil del usuario autenticado. | `200 OK`        | `400`, `404`, `500` |
| `PATCH` | `/users/me/avatar` | Actualiza el avatar del usuario autenticado. | `200 OK`        | `400`, `404`, `500` |

### Tarjetas

| Método   | Ruta                   | Descripción                                                 | Código de éxito | Código de error     |
| -------- | ---------------------- | ----------------------------------------------------------- | --------------- | ------------------- |
| `GET`    | `/cards`               | Devuelve todas las tarjetas.                                | `200 OK`        | `500`               |
| `POST`   | `/cards`               | Crea una nueva tarjeta (el `owner` se toma del middleware). | `201 Created`   | `400`, `500`        |
| `PUT`    | `/cards/:cardId/likes` | Agrega el like del usuario autenticado a la tarjeta.        | `200 OK`        | `400`, `404`, `500` |
| `DELETE` | `/cards/:cardId/likes` | Quita el like del usuario autenticado de la tarjeta.        | `200 OK`        | `400`, `404`, `500` |
| `DELETE` | `/cards/:cardId`       | Elimina una tarjeta por su `_id`.                           | `200 OK`        | `400`, `404`, `500` |

### 💡 Ejemplo de respuesta (GET /users/6a7323151211b9dc47648d61)

```json
{
  "data": {
    "_id": "6a7323151211b9dc47648d61",
    "name": "Usuario Prueba",
    "about": "Desarrollador",
    "avatar": "https://example.com/avatar.jpg",
    "__v": 0
  }
}
```
