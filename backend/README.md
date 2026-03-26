# Career Path AI Backend

Backend for a vocational questionnaire system using Node.js, Express, Prisma, PostgreSQL, JWT, and Google Gemini for AI recommendations.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   - DATABASE_URL
   - JWT_SECRET
   - GEMINI_API_KEY
   - PORT

3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Routes

- `/api/auth/register` - Register a new user
- `/api/auth/login` - Login
- `/api/auth/me` - Get user info
- `/api/questions` - Get all questions
- `/api/questions` (POST) - Create question (admin)
- `/api/results/generate` - Generate career recommendation

## Testing

Run tests with:
```bash
npm test
```

## Docker

Build and run with Docker:
```bash
docker build -t career-path-ai-backend .
docker run -p 3000:3000 career-path-ai-backend
```