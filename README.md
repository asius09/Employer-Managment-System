# TaskFlow Pro - Advanced Task Management System

Welcome to **TaskFlow Pro**, a comprehensive task management solution designed to help teams stay organized and productive. Built with modern web technologies, this system provides an easy-to-use experience for both administrators and users with enhanced task creation capabilities.

---

## Table of Contents

- [Features](#features)
- [Previews](#previews)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Features

### 🔐 Authentication

- Secure login with token management
- Role-based access control
- Protected routes
- Remember me option

### 📊 Task Management

- **User Features**:
  - Accept or reject tasks
  - Mark tasks as complete or failed
  - View task history
  - See priority tasks
- **Admin Features**:
  - Create, edit, and delete tasks
  - Post new tasks with detailed information
  - Reassign tasks
  - View team progress
  - Generate basic reports
  - Task validation and error handling

### 🎛️ System Features

- Theme settings saved in LocalStorage
- Task pagination
- Task status updates
- Error handling
- Performance optimization
- Form validation for new task creation

---

## 🎨 Previews

| Feature                        | Preview                                                   |
| ------------------------------ | --------------------------------------------------------- |
| **Admin Dashboard**            | ![Admin Dark Mode](/public/adminPage.png)                 |
| **Admin Dashboard (Light)**    | ![Admin Light Mode](</public/adminPage(ligth).png>)       |
| **Employee Dashboard**         | ![Employee Dark Mode](/public/employee.png)               |
| **Employee Dashboard (Light)** | ![Employee Light Mode](</public/employeePage(ligth).png>) |
| **Login Page**                 | ![Login Dark Mode](/public/loginPage.png)                 |
| **Login Page (Light)**         | ![Login Light Mode](</public/loginPage(ligth).png>)       |
| **Post New Task**              | ![Post New Task](/public/post-new-task.png)               |
| **Task Validation**            | ![Task Validation](/public/post-new-task-validation.png)  |

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskflow-pro.git
   ```
2. Navigate to the project directory:
   ```bash
   cd taskflow-pro
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🚀 Usage

1. **Login**: Use your credentials to log in as an admin or employee.
2. **Dashboard**: View your tasks and their statuses.
3. **Task Management**:
   - For Admins: Create new tasks with detailed information
   - For Users: Accept, reject, complete, or fail tasks
4. **Theme Toggle**: Switch between light and dark modes.
5. **New Task Creation**:
   - Navigate to Post New Task
   - Fill in all required fields
   - Submit the task for assignment

---

## 🧩 Technology Stack

| Category             | Technologies                        |
| -------------------- | ----------------------------------- |
| **Frontend**         | React.js, Tailwind CSS, Remix Icons |
| **State Management** | Context API, useReducer             |
| **Routing**          | React Router v6                     |
| **Storage**          | LocalStorage, SessionStorage        |
| **Build Tools**      | Vite, ESLint, Prettier              |
| **Form Handling**    | Custom validation, useLocalStorage  |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📂 Project Structure
