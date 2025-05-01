# OSBB Requests – Frontend

The frontend of the **OSBB Requests** system — a web interface for residents and administrators of residential buildings (OSBB) to send and process service requests. 
Built with **Vite**, **TypeScript**, and plain JS/HTML/CSS.


## 🔧 Functionality

- User login and registration
- Role-based system: regular user / administrator
- Request creation with optional AI-based text improvement
- Request filtering by section (for admins)
- Modal windows and loading indicators
- JWT-based authentication (token stored in `localStorage`)

## ▶️ Getting Started

1. Clone the repository:

    ```bash
    git clone 
    cd osbb-requests-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:5173`.

### API Endpoints:

- `POST /api/auth/login` — user login  
- `POST /api/auth/register` — user registration  
- `POST /api/messages` — improve request message via AI  
- `POST /api/send-messages` — send a new request  

## 👥 Roles

- **User**:
  - Register and log in
  - Submit service requests

- **Administrator (isSuperAdmin)**:
  - View and filter requests
 

# OSBB Backend API

This is the backend API for the OSBB application, designed to manage users, messages, and message beautification using OpenAI's API. It provides functionalities for user authentication, message creation, retrieval, and formatting.

## Features

- User Registration & Login
- Create and Retrieve Messages
- Beautify Messages using OpenAI API

## Project Overview

## Installation

Follow these steps to set up the project locally.

1. **Clone the repository**:
    ```bash
    git clone 
    ```

2. **Navigate to the project directory**:
    ```bash
    cd osbb-be
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Create a `.env` file** in the root directory and add the following environment variables:
    ```dotenv
    OPENAI_API_KEY=your-openai-api-key
    PORT=3000
    ```

## Usage

### Development Mode

To run the project in development mode with hot-reloading, use the following command:

```bash
npm run dev


