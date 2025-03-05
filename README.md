# TaskFlow Pro - Advanced Task Management System

Welcome to **TaskFlow Pro**, a comprehensive task management solution designed to help teams stay organized and productive. Built with modern web technologies, this system provides an easy-to-use experience for both administrators and users with enhanced task creation, editing, and viewing capabilities.

---

## Table of Contents

- [Features](#features)
- [Previews](#previews)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Future Plans](#future-plans)
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
  - View task history and details
  - See priority tasks
  - Filter tasks by status, priority, or date
- **Admin Features**:
  - Create, edit, and delete tasks
  - Post new tasks with detailed information
  - Edit existing tasks with full details
  - Reassign tasks
  - View team progress
  - Generate comprehensive reports
  - Task validation and error handling

### 🎛️ System Features

- Theme settings saved in LocalStorage
- Task pagination and sorting
- Real-time task status updates
- Error handling and logging
- Performance optimization
- Form validation for new task creation and editing
- Improved task container UI with detailed view
- Enhanced task filtering capabilities
- Post time and estimated completion time tracking

---

## 🎨 Previews

| Feature                        | Preview                                                   |
| ------------------------------ | --------------------------------------------------------- |
| **Admin Dashboard**            | ![Admin Dark Mode](/public/adminPage.png)                 |
| **Admin Dashboard (Light)**    | ![Admin Light Mode](</public/adminPage(light).png>)       |
| **Employee Dashboard**         | ![Employee Dark Mode](/public/employee.png)               |
| **Employee Dashboard (Light)** | ![Employee Light Mode](</public/employeePage(light).png>) |
| **Login Page**                 | ![Login Dark Mode](/public/loginPage.png)                 |
| **Login Page (Light)**         | ![Login Light Mode](</public/loginPage(light).png>)       |
| **Post New Task**              | ![Post New Task](/public/post-new-task.png)               |
| **Edit Task (Dark)**           | ![Edit Task Dark](</public/edit-task-form(dark).png>)     |
| **Edit Task (Light)**          | ![Edit Task Light](</public/edit-task-form(light).png>)   |
| **Task Validation**            | ![Task Validation](/public/post-new-task-validation.png)  |
| **Task Details View**          | ![Task Details](/public/task-details-view.png)            |
| **Task Filtering**             | ![Task Filtering](/public/task-filtering.png)             |

---

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/asius09/taskflow-pro.git
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
2. **Dashboard**: View your tasks, their statuses, and key metrics.
3. **Task Management**:
   - For Admins:
     - Create new tasks with detailed information including estimated completion time
     - Edit existing tasks, updating any field as needed
     - Delete tasks that are no longer relevant
     - View comprehensive task details and team performance
   - For Users:
     - Accept, reject, complete, or fail tasks
     - View detailed task information
     - Filter tasks based on various criteria
4. **Theme Toggle**: Switch between light and dark modes for comfortable viewing.
5. **New Task Creation**:
   - Navigate to Post New Task
   - Fill in all required fields, including estimated completion time
   - Submit the task for assignment
6. **Task Editing and Viewing**:
   - Click on a task to view its detailed information
   - For editing, click the edit icon and modify fields as necessary
   - Save changes or cancel to revert
7. **Task Filtering**:
   - Use the filter options to sort tasks by status, priority, or date range
   - Combine multiple filters for precise task management

---

## 🧩 Technology Stack

| Category             | Technologies                                     |
| -------------------- | ------------------------------------------------ |
| **Frontend**         | React.js, Tailwind CSS, Remix Icons, Material-UI |
| **State Management** | Context API, useReducer, Redux Toolkit           |
| **Routing**          | React Router v6                                  |
| **Storage**          | LocalStorage, SessionStorage                     |
| **Build Tools**      | Vite, ESLint, Prettier                           |
| **Form Handling**    | React Hook Form, Yup validation                  |
| **Date Management**  | date-fns                                         |

---

## 📂 Project Structure

```
taskflow-pro/
├── public/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── ReportGenerator.jsx
│   │   ├── Employee/
│   │   │   ├── Dashboard.jsx
│   │   │   └── TaskList.jsx
│   │   ├── Common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── TaskDetailView.jsx
│   │   └── Auth/
│   │       └── LoginForm.jsx
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useTheme.js
│   │   └── useTaskFilter.js
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── Login.jsx
│   │   └── NotFound.jsx
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   └── dateUtils.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.json
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Future Plans

### Enhanced Task Management

- Implement advanced task delete options with confirmation dialogs
- Improve task accept/reject functionality with real-time updates
- Develop a more intuitive UI for task status changes

### Reporting and Analytics

- Create comprehensive reporting dashboard for admins
- Implement data visualization for task completion rates and team performance
- Add export functionality for reports in various formats (PDF, CSV)

### User Interface Improvements

- Redesign task container for better visual hierarchy and information display
- Implement drag-and-drop functionality for task prioritization
- Add customizable user dashboards with widgets

### Performance Optimizations

- Implement lazy loading for large data sets
- Optimize API calls with caching strategies
- Improve overall application responsiveness

### Additional Features

- Integrate real-time notifications for task updates
- Implement a chat system for team communication
- Add a calendar view for better task scheduling

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
