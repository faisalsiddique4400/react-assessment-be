# Node.js and Express Backend

This is a simple Node.js and Express backend for your application. It uses MongoDB for data storage and JWT for authentication.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/faisalsiddique4400/react-assessment-be
2. Navigate to the project directory:
   ```bash
   cd react-assessment-be
3. Install dependencies:
   ```bash
   npm install
# Development
1. Run the development server:
   ```bash
   npm run dev
  The server will be running at http://localhost:3000 (or the port specified in .env.example).

# Production
1. Create a copy of .env.example and name it .env:
2. Open the .env file and set the following variables:
   ```
    MONGO_URL: Your MongoDB connection URL
    PORT: Port for the production server
    JWT_SECRET: Secret key for JWT authentication
   ```
3. Build and run the production server:
   ```bash
   npm start
  The server will be running at http://localhost:3000 (or the port specified in .env).


