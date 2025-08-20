# 🎬 Deepfake Detection Frontend

![React](https://img.shields.io/badge/React-18.x-blue?style=flat\&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-ff69b4?style=flat\&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat\&logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-1.x-informational?style=flat\&logo=axios)
![Deployed](https://img.shields.io/badge/Deployment-Docker-blueviolet?style=flat\&logo=docker)



## 📌 About

This is the **user interface** for the Deepfake Detection System. It allows users to:

* Upload videos or images
* Authenticate (login/signup)
* View detection results
* Review historical classifications
* Receive real-time notifications

> This frontend communicates with the backend via an **API Gateway**, powered by Spring Cloud.


## 🧱 Tech Stack

| Feature          | Tech Used             |
| ---------------- | --------------------- |
| Framework        | React.js (Vite)       |
| Styling          | Tailwind CSS          |
| HTTP Requests    | Axios                 |
| Icons            | React Icons           |
| Form Validation  | Formik + Yup |
| Routing          | React Router DOM      |
| State Management | React Context API     |
| Notifications    | Toastify / Push API   |
| Deployment       | Docker                |


## 🖼️ UI Features

* 🌐 Modern single-page app with route-based navigation
* 🔐 Login/Signup with JWT support
* 📤 Upload component for image/video with drag & drop
* 🧠 Visual classification results (Real or Fake)
* 🕒 History page listing past uploads and their statuses
* 🔔 Real-time alerts when classification is complete


## ⚙️ Environment Variables

All required environment variables are defined in the `.env.example` file.
To get started:

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and update the following value:

   ```
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```

   Replace it with your actual **API Gateway** URL if different (e.g. for Docker, cloud deployment, etc.).

> ⚠️ Never commit your `.env` file to version control. It contains environment-specific configurations.



## 📂 Project Structure

```
src/
├── assets/          → Static files
├── components/      → UI building blocks
├── pages/           → Route-level components (Login, Upload, History)
├── context/         → Global context providers (Auth, API)
├── hooks/           → Custom hooks
├── services/        → Axios API calls
├── utils/           → Formatters, constants, etc.
└── App.jsx          → Root component
```


## 🔗 Backend Integration

* Uses **API Gateway** to route requests to:

  * `/auth` → Authentication Service
  * `/classify` → ClassifyHandler Service
  * `/history` → History Service
* Listens for **notification events** pushed from Kafka via Notification Service (polling or WebSocket based)

<!-- ---

## 📎 Screenshots

<details>
<summary>🖥️ Login Page</summary>
<img src="./screenshots/login.png" />
</details>

<details>
<summary>📤 Upload & Results</summary>
<img src="./screenshots/upload.png" />
</details>

<details>
<summary>🕒 History Page</summary>
<img src="./screenshots/history.png" />
</details>

---

## 👥 Contributors

| GitHub Handle                                      | Role                           |
| -------------------------------------------------- | ------------------------------ |
| [@your-username](https://github.com/your-username) | 👨‍💻 Developer & UI/UX Design |

--- -->