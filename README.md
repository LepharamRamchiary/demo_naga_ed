# Demo Naga Ed

Demo Naga Ed is a learning dashboard with account registration and login, a
Node.js/Express API, and an AI username generator. The AI service uses FastAPI
and Groq to suggest three usernames based on a user's interests.

## Technology

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Sequelize, MySQL
- **AI service:** Python, FastAPI, Groq API
- **Deployment:** Docker Compose and Nginx

## Requirements

For local development:

- Node.js and npm
- Python 3.12 or later
- MySQL 8.x
- A Groq API key (needed for AI username generation)

Alternatively, install Docker Desktop and use the Docker Compose instructions
below.

## Run locally

Run each service in its own terminal. Create the environment files described
below before starting the services.

### 1. Configure MySQL and the backend

Create a MySQL database, then create `server/.env` with your local database
credentials:

```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=demo_naga_ed

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
```

In a terminal:

```powershell
cd server
npm install
npm run dev
```

The backend connects to MySQL and syncs its Sequelize models when it starts.
Check that it is running at <http://localhost:5000/api/v1/health>.

### 2. Configure and run the AI service

Create `fast_api/.env`:

```env
GROQ_API_KEY=your_groq_api_key
ALLOWED_ORIGINS=http://localhost:5173
```

Keep the API key private. Do not put it in a `VITE_` variable or commit it to
Git.

In a second terminal:

```powershell
cd fast_api
python -m venv .venv
venv\Scripts\activate.bat
venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The service health check is at <http://localhost:8000/> and its interactive API
documentation is at <http://localhost:8000/docs>.

### 3. Configure and run the frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_AI_API_URL=http://localhost:8000
```

In a third terminal:

```powershell
cd client
npm install
npm run dev
```

Open <http://localhost:5173>, register or log in, then open **AI Username** in
the dashboard to generate suggestions. Vite reads its environment variables
when it starts, so restart the frontend after changing `client/.env`.

## Run with Docker Compose

Docker Compose starts MySQL, the backend, the AI service, and the frontend.
The frontend is served through Nginx, which proxies `/api/` to Express and
`/ai/` to FastAPI.

1. Copy the root environment template:

   ```powershell
   Copy-Item .env.example .env
   ```

2. Edit the root `.env` and replace the example Groq key, database password,
   and JWT secret. Set `ALLOWED_ORIGINS` to the browser origin used to open the
   app (for local Docker, `http://localhost:8080`):

   ```env
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=openai/gpt-oss-20b
   NODE_ENV=production
   ALLOWED_ORIGINS=http://localhost:8080

   DB_PASSWORD=your_mysql_password
   DB_NAME=naga_ed

   JWT_SECRET=replace_with_a_long_random_secret
   JWT_EXPIRES_IN=1d
   ```

   The Compose file connects the backend to MySQL using the `db` service name.
   It also passes only the required settings to each service and waits for
   service health checks before starting dependents.

3. Docker Commands

Run the following commands from the directory containing your `docker-compose.yml` or `compose.yaml` file.

#### a. Build Images

Build Docker images without starting containers.

```powershell
docker compose build
```

#### b. Rebuild Images

Rebuild Docker images without using the build cache.

```powershell
docker compose build --no-cache
```

#### c. Build and Start Services

Build images (if needed) and start all services in the foreground.

```powershell
docker compose up --build
```

#### d. Start Services in Background

Build images (if needed) and run all services in detached mode.

```powershell
docker compose up -d --build
```

#### e. Start Existing Containers

Start previously created, stopped containers.

```powershell
docker compose start
```

#### f. Stop Running Services

Stop running containers without removing them.

```powershell
docker compose stop
```

#### h. Stop and Remove Containers

Stop and remove containers and the default Compose network. Images and named volumes are preserved.

```powershell
docker compose down
```

4. Open <http://localhost:8080>. The health checks are available at
   <http://localhost:8080/api/v1/health> and <http://localhost:8080/ai/>.
   FastAPI documentation is available at <http://localhost:8080/ai/docs>.

Stop the services with `docker compose down`. To also delete the persisted
database volume, use `docker compose down --volumes`; this permanently deletes
the database data.

To check the Compose configuration without starting containers, run
`docker compose config --quiet`. To see service status, run
`docker compose ps`.

## Environment files

- `server/.env` and `fast_api/.env` are used when running those services
  locally.
- `client/.env` configures the local Vite development server.
- The root `.env` is used by Docker Compose for the backend and AI service.
  Compose sets the frontend's API URLs to `/api/v1` and `/ai` at build time.
- Never commit real environment files, passwords, JWT secrets, or API keys.

## Useful commands

Run frontend checks from `client`:

```powershell
npm run lint
npm run build
```

## API endpoints

- `GET /api/v1/health` — Express API health check
- `GET /` — FastAPI health check
- `POST /api/suggest-username` — generate three suggestions; request body:

  ```json
  {
    "interests": ["gaming", "anime", "cooking"]
  }
  ```
