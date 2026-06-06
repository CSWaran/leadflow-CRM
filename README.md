# CRM Application

A full-stack Customer Relationship Management (CRM) application built with Spring Boot backend and React frontend.

## Project Structure

```
crm/
├── src/                    # Backend source code (Spring Boot)
│   └── main/java/com/crm/
│       ├── controller/     # REST API controllers
│       ├── service/        # Business logic services
│       ├── repository/     # Data access layer
│       ├── entity/         # JPA entities
│       ├── dto/            # Data Transfer Objects
│       └── exception/      # Custom exceptions & handlers
├── crm-frontend/           # Frontend source code (React + Vite)
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── services/       # API service layer
│       ├── context/        # React context providers
│       ├── layouts/        # Layout components
│       └── utils/          # Utility functions
└── pom.xml                 # Maven build configuration
```

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.3.2
- **Language**: Java 17
- **Database**: MariaDB
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security with JWT authentication
- **API Documentation**: SpringDoc OpenAPI (Swagger UI)
- **Object Mapping**: MapStruct
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v9
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6
- **Notifications**: React Toastify
- **Linting**: ESLint

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Auto-provisioned admin user on startup
  
- **User Management**
  - Create, read, update users
  - User roles and permissions

- **Customer Management**
  - CRUD operations for customers
  - Customer data tracking

- **Lead Management**
  - Lead creation and tracking
  - Lead status management
  - Lead source tracking

- **Dashboard**
  - Overview statistics
  - Key metrics display

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 18+ and npm
- MariaDB/MySQL server
- Maven 3.6+

### Database Setup

1. Ensure MariaDB is running
2. The application will auto-create the database if it doesn't exist
3. Update database credentials in `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:mariadb://localhost:3306/crm
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

### Backend Setup

1. Navigate to the project root:
   ```bash
   cd /workspace
   ```

2. Build and run the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

3. The API will be available at `http://localhost:8080`
4. Swagger UI documentation: `http://localhost:8080/swagger-ui.html`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd crm-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

## Default Credentials

On first startup, an admin user is automatically created:

- **Email**: `admin@crm.local`
- **Password**: `ChangeMe123!`

> ⚠️ **Important**: Change the default password in production!

## Configuration

### Backend Configuration

Key configuration options in `application.properties`:

- **JWT Settings**: Secret key, expiration time, issuer
- **Database**: Connection URL, credentials, DDL mode
- **Admin Bootstrap**: Enable/disable auto-admin creation

### Frontend Configuration

Update API base URL in `crm-frontend/src/utils/constants.js` if your backend runs on a different host/port.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/users` | Get all users |
| GET | `/api/users/{id}` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/{id}` | Update user |
| DELETE | `/api/users/{id}` | Delete user |
| GET | `/api/customers` | Get all customers |
| GET | `/api/customers/{id}` | Get customer by ID |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/{id}` | Update customer |
| DELETE | `/api/customers/{id}` | Delete customer |
| GET | `/api/leads` | Get all leads |
| GET | `/api/leads/{id}` | Get lead by ID |
| POST | `/api/leads` | Create lead |
| PUT | `/api/leads/{id}` | Update lead |
| DELETE | `/api/leads/{id}` | Delete lead |

## Development

### Running Tests

```bash
# Backend tests
./mvnw test

# Frontend linting
cd crm-frontend && npm run lint
```

### Building for Production

```bash
# Backend
./mvnw clean package

# Frontend
cd crm-frontend && npm run build
```

## Security Notes

- The JWT secret key should be changed in production
- Use HTTPS in production environments
- Keep the admin password secure and change defaults

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For issues or questions, please check the Spring Boot and React documentation or open an issue in the repository.
