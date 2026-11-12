## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- npm
- Express.js
- MySQL

### AI Service
- Python
- FastAPI
- Groq API

### Others
- Docker
- Docker Compose

# Clone Repository
```
git clone https://github.com/LepharamRamchiary/demo_naga_ed.git
```
or
```
git clone git@github.com:LepharamRamchiary/demo_naga_ed.git
```

## Client
- Step 1 Installation
  - `cd client` 
  - `npm install`
- Step 2 Environment Variables
  - Copy the `.env.example` file to `.env` and fill in the required environment variables.
    
  ```
  cp .env.example .env
  ```

  ```
  # .env
  VITE_API_URL=your backend URL
  VITE_AI_API_URL=http://localhost:8000
  ```
- Step 3 Start the Application
    - `npm run dev`
    - After starting the application, open the following URL in your browser:
      `http://localhost:5173/`



## Server
- Step 1 Installation
  - `cd server`
  - `npm install`
  - `npm install -D nodemon`
- Step 2 Environment Variables
  - Copy the `.env.example` file to `.env` and fill in the required environment variables.
    
  ```
  cp .env.example .env
  ```

  ```
  # .env
  PORT=your port
  NODE_ENV=development
  ALLOWED_ORIGINS=your frontend URL

  # Db
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=your password
  DB_NAME=your db name

  # JWT
  JWT_SECRET=your secret
  JWT_EXPIRES_IN=1d
  ```
- Step 3 Start the Application
  - If nodemon is installed, `npm run dev`. Otherwise, run `npm start`.
  - After executing the command, the server will be available at `http://localhost:5000`
  - After starting the server, you can verify that the API is running by opening the following endpoint in your browser or testing it with Postman:
    ```
    http://localhost:5000/api/v1/health
    ```
  - If the API is running successfully, you should receive the following response:
    ```
    {
      "success": true,
      "message": "API is running"
    }
    ```


## Fast API(AI Agent)
- Step 1 - Verify that Python 3.14 is installed on your system. 
- Step 2 - Create Virtual Environment
  ```
  # command
  python -m venv venv
  ```
- Step 3 Activate the Virtual Environment
  ```
  # command
  venv\Scripts\activate.bat

  # command
  venv\Scripts\Activate.ps1
  ```
- Step 4 Install Dependencies
  - `pip install -r requirements.txt`
- Step 5 Setup Environment Variable
  ```
  GROQ_API_KEY=your api key
  ```
- The dashboard's **AI Username** page sends interests to the FastAPI
  service and displays its three suggestions and response message. For local
  development, set `VITE_AI_API_URL=http://localhost:8000` in `client/.env`.
  The Docker build uses the existing `/ai` reverse proxy automatically.
- Step 6 Start the FastAPI Server
  - `uvicorn main:app --reload --port 8000`
##### After starting the server, you can access the Swagger UI at: `http://127.0.0.1:8000/docs`


## Docker
- Step 1: Build and Start the Containers
  ```
  docker compose up --build
  ```
- Step 2: Verify the Containers
  ```
  docker compose ps
  ```
- Step 3: Optional
  - Stop all running Docker containers: `docker compose down`
  - Start the existing Docker containers: `docker compose up`

- Step4: Once the containers are running, you can access:
  ```
  React (Client): http://localhost:8080
  Server (Backend): http://localhost:8080/api/v1/health
  FastAPI Swagger UI: http://localhost:8080/ai/docs
  ```


  
