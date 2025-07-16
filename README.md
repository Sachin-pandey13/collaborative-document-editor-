# 📝 Collaborative Editor

A real-time collaborative document editor built using **React**, **Socket.IO**, and **MongoDB**. This project allows multiple users to edit the same document simultaneously with live updates and autosaving.

---

## 🖼️ Demo

![Editor Demo](https://raw.githubusercontent.com/Sachin-pandey13/collaborative-document-editor-/main/editor.png)

---

## 🚀 Features

- 🔐 Google OAuth 2.0 authentication  
- 🧠 Real-time collaborative editing via WebSockets  
- 💾 Autosave every 2 seconds to MongoDB  
- ✍️ Rich-text editing using React Quill  
- 💻 Modern UI with gradients, hover animations & dynamic buttons  

---

## 📁 Project Structure

collab-editor/
├── client/ # Frontend (React)
│ ├── public/
│ └── src/
│ ├── components/ # Editor, Login, Signup
│ ├── pages/ # Home, Dashboard
│ ├── utils/ # auth.js, apis.js
│ ├── App.js
│ ├── index.css
│ └── App.css
├── server/ # Backend (Node.js, Express)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Auth, Document routes
│ ├── middleware/ # JWT auth
│ ├── socket/ # Socket collaboration logic
│ └── index.js
├── .env
├── README.md
└── package.json

yaml
Copy
Edit

---

## 🔧 Tech Stack

- **Frontend:** React, React Router, React Quill  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas with Mongoose  
- **Authentication:** Google OAuth  
- **Real-time Sync:** Socket.IO  
- **Styling:** CSS3 with animations & effects  

---

## 🛠️ Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/Sachin-pandey13/collaborative-document-editor-.git
cd collaborative-document-editor-
2. Set up Backend
bash
Copy
Edit
cd server
npm install
Create a .env file in the server/ folder:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Then run:

bash
Copy
Edit
npm start
3. Set up Frontend
bash
Copy
Edit
cd ../client
npm install
Create a .env file in the client/ folder:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:5000
Then run:

bash
Copy
Edit
npm start
✅ How It Works
User logs in using Google OAuth

Socket.IO connects user to shared document room

Changes made by any user are broadcast in real-time

Document is saved every 2 seconds to MongoDB

💻 Deployment (Free)
You can deploy this project for free (without credit card) using:

Deta Space

⚠️ Frontend and backend should be deployed separately.

🙋‍♂️ Author
Sachin Kumar 
"I believe good work shouldn't scream — it should resonate."

📄 License
This project is licensed under the MIT License.
