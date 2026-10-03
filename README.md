Campus Seat Finder

A React-based campus seat management interface designed to help students find and view available seating spaces on campus.

Features

- Campus seat discovery
- Seat availability interface
- Clean and responsive UI
- Sidebar-based navigation
- Component-based React architecture
- Local JSON data support
- Responsive styling with Tailwind CSS
- Icon-based interface using Lucide React

Tech Stack

- React 19
- Vite
- Tailwind CSS
- Lucide React
- JSON Server
- JavaScript

Project Structure

campus-seat/
├── public/
├── src/
├── DB.json
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js

Getting Started

1. Clone the repository

git clone https://github.com/rajveersinh-jadeja/campus-seat.git
cd campus-seat

2. Install dependencies

npm install

3. Start the development server

npm run dev

The Vite development server will start the application locally.

4. Start the JSON Server

In a separate terminal:

npm run server

The local JSON API runs on port "3001".

Available Scripts

Command| Description
"npm run dev"| Starts the Vite development server
"npm run server"| Starts JSON Server on port 3001
"npm run build"| Creates a production build
"npm run preview"| Previews the production build
"npm run lint"| Runs ESLint

Development

The frontend is built with React and Vite. Tailwind CSS is used for styling, while Lucide React provides interface icons.

The project uses "DB.json" as a local data source during development through JSON Server.

Future Improvements

- User authentication
- Real-time seat availability
- Seat reservation system
- Search and filtering
- Campus/building selection
- Admin dashboard
- Backend API integration
- Database integration
- Mobile optimization

Author

Rajveersinh Jadeja

GitHub: "@rajveersinh-jadeja" (https://github.com/rajveersinh-jadeja)

License

This project is intended for learning and development purposes.
