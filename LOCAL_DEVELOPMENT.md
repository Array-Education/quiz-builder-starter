# Local Development Guide

## Quick Start with Supabase CLI

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Add your OpenAI API key to .env.local
```

### 3. Start Supabase Services
```bash
npm run supabase:start
```

This command will:
- Download and start Docker containers for Supabase services
- Run database migrations automatically
- Seed the database with sample questions
- Display local service URLs

### 4. Access Your Local Environment

| Service | URL | Description |
|---------|-----|-------------|
| **Your App** | http://localhost:3000 | Next.js application |
| **Supabase Studio** | http://127.0.0.1:54323 | Database admin interface |
| **Database** | postgresql://postgres:postgres@127.0.0.1:54322/postgres | Direct database access |
| **API Gateway** | http://127.0.0.1:54321 | Supabase API endpoint |
| **Email Testing** | http://127.0.0.1:54324 | Inbucket email interface |

### 5. Environment Variables for Local Development

Update your `.env.local` for local development:

```bash
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Local Supabase (uncomment these lines)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

### 6. Start Development Server
```bash
npm run dev
```

Your app will be available at http://localhost:3000

## Useful Commands

```bash
# Check status of running services
npm run supabase:status

# Open Supabase Studio in browser
npm run supabase:studio

# Reset database (re-run migrations and seed)
npm run supabase:reset

# Stop all services
npm run supabase:stop
```

## Development Workflow

1. **Make database changes**: Edit files in `supabase/migrations/`
2. **Update seed data**: Edit `supabase/seed.sql`
3. **Apply changes**: Run `npm run supabase:reset`
4. **View data**: Use Supabase Studio at http://127.0.0.1:54323

## Troubleshooting

### Services Won't Start
- Ensure Docker is running
- Check if ports are available (54321-54324)
- Try `npm run supabase:stop` then `npm run supabase:start`

### Can't Connect to Database
- Verify environment variables in `.env.local`
- Check if Supabase is running: `npm run supabase:status`
- Look for the correct URL: http://127.0.0.1:54321 (not localhost)

### No Sample Data
- Run `npm run supabase:reset` to re-seed the database
- Check Supabase Studio to verify data was inserted

### Docker Issues
- Make sure Docker Desktop is running
- Try `docker system prune` if you have old containers
- Check Docker logs: `docker logs <container-name>`

## Development Tips

- Use Supabase Studio at http://127.0.0.1:54323 to view and manage your database
- The local environment provides the same features as the cloud version
- All changes to the database are local and can be reset with `npm run supabase:reset`

## Benefits of Local Development

- **Fast iteration**: No network latency to cloud services
- **Offline work**: No internet required after initial setup
- **Cost-effective**: No charges for development usage
- **Full feature parity**: All Supabase features available locally
- **Easy debugging**: Direct access to database and logs