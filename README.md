A modern Blogging Application frontend built with React, Vite, TypeScript, and Tailwind CSS.
This application provides authentication, protected routes, and full CRUD functionality for blog posts with a responsive user interface.

🚀 Tech Stack

React (Functional Components)

Vite

TypeScript

React Router DOM

Axios

Tailwind CSS

Lucide React (Icons)

✨ Features
🔐 Authentication

Signup

Login

Logout

Access token & refresh token handling

No cookies used

🛡 Protected Routes

Secure routes accessible only to authenticated users

Automatic redirection for unauthorized access

✍️ Blog Management

View My Posts

Create New Post

Edit Existing Post

Delete Post

⚙️ App Behavior

Token lifecycle handling

Loading indicators

Error handling

Fully responsive design (mobile, tablet, desktop)

📁 Project Structure
src/
│
├── components/        # Reusable UI components
├── pages/             # Login, Signup, Posts pages
├── routes/            # App routes & protected routing
├── services/          # API integration
├── context/           # Authentication context
├── utils/             # Utility functions
├── styles/            # Global styles
├── index.css
├── main.tsx
└── vite-env.d.ts

🔑 Environment Variables

Create a .env file in the root directory:

VITE_API_BASE_URL=http://localhost:5000


⚠️ Notes:

Environment variables must start with VITE_

Restart the development server after changing .env

🔄 Token Handling

Access token used for API requests

Refresh token used to generate new access token

Automatic handling of expired tokens

Logout on unauthorized access

🎨 Styling

Tailwind CSS for styling

Fully responsive layout

Utility-first CSS approach

📦 Installation & Setup
1️⃣ Clone the repository
git clone <repository-url>
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev
