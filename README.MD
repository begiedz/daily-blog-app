# Daily Blog

The **Daily Blog** is a full-stack blogging platform that empowers users to create, manage, and share blog posts effortlessly. It features a secure backend for user authentication, post management, and image uploads, paired with a modern, responsive frontend for an intuitive user experience. The app supports role-based access control, enabling administrators to manage users and posts efficiently.

## 🎯 Key Features

- **User Authentication**: Secure login and registration using JWT.
- **Role-Based Access Control**: Admins can manage users and their roles.
- **Post Management**: Create, update, delete, and view posts with tags and images.
- **Pagination**: Efficiently handle large datasets with paginated post listings.
- **Image Uploads**: Store and access images via Azure Blob Storage links.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Error Handling**: Centralized exception handling for consistent error responses.
- **SEO-Friendly Slugs**: Automatically generate slugs for better search engine visibility.

## 🛠️ Technologies Used

### Backend

- **C#**: Core programming language.
- **ASP.NET Core**: Framework for building the web API.
- **Entity Framework Core**: ORM for database interactions.
- **Azure SQL Database**: Cloud-hosted relational database for storing user and post data.
- **Azure Blob Storage**: Cloud storage for managing and serving images via public URLs.
- **FluentValidation**: Library for validating user inputs.
- **JWT (JSON Web Tokens)**: Secure authentication mechanism.
- **Custom Middleware**: For centralized exception handling.

### Frontend

- **React**: JavaScript library for building the user interface.
- **TypeScript**: Strongly typed superset of JavaScript for better code quality.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Library for handling client-side routing.
- **TanStack Store**: Library for managing auth and errors state.
- **Motion**: Library for animations and transitions.
- **Axios**: HTTP client for making API requests.
- **jwt-decode**: Utility for decoding JSON Web Tokens.

### DevOps & Tools

- **Azure**: Cloud platform for hosting the database and image storage.
- **Swagger**: API documentation and testing tool.
- **Git**: Version control system.
- **Visual Studio**: IDE for backend development.
- **Visual Studio Code**: Editor for frontend development.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: For running the frontend.
- **.NET SDK**: For running the backend.
- **Azure Account**: For hosting the SQL database and Blob Storage.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/begiedz/daily-blog-app.git
   ```

2. **Backend Setup**:

   - Navigate to the backend directory:
     ```bash
     cd server
     ```
   - Apply database migrations:
     ```bash
     dotnet ef database update
     ```
   - Configure `appsettings.json` with your Azure SQL connection string and Blob Storage credentials.
   - Start the backend server:
     ```bash
     dotnet run
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

### Usage

- Access the frontend at `http://localhost:5173`.
- API documentation is available at `http://localhost:5017/swagger`.

## 📂 Project Structure

### Server (Backend)

```
server/
├── Controllers/            # API controllers
├── Data/                   # Database context
├── Exceptions/             # Custom exception classes
├── Helpers/                # Utility and helper functions
├── Interfaces/             # Service interfaces
├── Middleware/             # Custom middleware
├── Migrations/             # Database schema migrations
├── Models/                 # Database entities and DTOs
├── Properties/             # Application properties and resources
├── Services/               # Business logic
├── Validators/             # Input validation logic
├── Program.cs              # Application entry point
└── appsettings.json        # Configuration file
```

### Client (Frontend)

```
client/
├── src/                    # Source code
│   ├── api/                # API interaction functions
│   ├── auth/               # Authentication logic
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   ├── routes/             # Application routes
│   ├── store/              # State management
│   ├── types/              # TypeScript types and interfaces
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── main.css            # Global styles
├── public/                 # Static assets
├── appconfig.json          # Application configuration
├── package.json            # JavaScript dependencies
└── tsconfig.json           # TypeScript configuration
```
