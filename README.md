# JWT Authentication API

A secure Node.js REST API with JWT authentication, user management, and refresh token functionality built with Express and MongoDB.

## Features

- **User Authentication**: Secure login with JWT tokens
- **Password Security**: Bcrypt password hashing with salt rounds
- **Token Management**: Short-lived access tokens with refresh token mechanism
- **User CRUD Operations**: Complete user management with audit trail
- **Input Validation**: Email validation using validator.js
- **Soft Delete**: Users are deactivated with record status tracking
- **CORS Support**: Cross-origin resource sharing enabled
- **Base Model**: Extensible base schema with audit fields and record status

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Validation**: Validator.js
- **Environment**: dotenv for configuration

## API Endpoints

### Authentication
- `POST /Login` - User login
- `POST /refreshToken` - Refresh access token

### User Management
- `POST /add` - Create new user (requires authentication)
- `GET /get/:id` - Get user by ID
- `POST /update/:id` - Update user
- `DELETE /delete/:id` - Soft delete user
- `GET /Lists` - Get all users

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jwt-auth-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
Mongo_url=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
MY_SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=1d
PAGINATION_LIMIT=5
```

4. Start the server:
```bash
npm run dev
```

## Usage

### Register a User
```bash
curl -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access-token>" \
  -d '{
    "fullName": "John Doe",
    "gender": "male",
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/Login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/refreshToken \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your-refresh-token"
  }'
```

## Project Structure

```
jwt-auth-api/
├── config/
│   ├── db.config.js      # Database configuration
│   ├── env.config.js     # Environment variables
│   └── index.js          # Config exports
├── constants/
│   └── index.js          # Application constants
├── controller/
│   └── user.controller.js # User business logic
├── middleware/
│   └── auth.middleware.js # JWT authentication middleware
├── model/
│   ├── base.model.js     # Base model schema with audit fields
│   ├── user.model.js     # User model
│   ├── wallet.model.js   # Wallet model
│   └── transaction.model.js # Transaction model
├── router/
│   ├── base.router.js    # Route setup
│   └── user.router.js    # User routes
├── .env                  # Environment variables
├── app.js               # Application entry point
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Tokens**: Secure authentication with very short-lived access tokens (1h)
- **Refresh Tokens**: Medium-lived tokens (1d) for token renewal
- **Input Validation**: Email format validation using validator.js
- **CORS Protection**: Configured for cross-origin requests
- **Audit Trail**: Base model includes createdBy, createdAt, updatedBy, updatedAt fields
- **Record Status**: Soft delete implementation with ACTIVE/DEACTIVE status

## Token Configuration

- **Access Token**: Expires in 1h hour (configurable via ACCESS_TOKEN_EXPIRES_IN)
- **Refresh Token**: Expires in 1 dy (configurable via REFRESH_TOKEN_EXPIRES_IN)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
