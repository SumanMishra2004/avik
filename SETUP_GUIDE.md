# Backend Setup Guide - Portfolio Site

This guide will help you set up Supabase and Prisma for your portfolio backend.

## Prerequisites

- Node.js installed
- A Supabase account (free tier works)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `portfolio-backend`
   - Database password: (save this!)
   - Region: Choose closest to you
5. Wait for project to be created (~2 minutes)

## Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

3. Go to **Settings** > **Database**
4. Scroll to **Connection string** > **URI**
5. Copy the connection string (replace `[YOUR-PASSWORD]` with your database password)

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env
```

2. Edit `.env` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

## Step 4: Set Up Database with Prisma

1. Generate Prisma Client:

```bash
npx prisma generate
```

2. Push the schema to your database:

```bash
npx prisma db push
```

This will create all the tables in your Supabase database.

## Step 5: Set Up Storage Buckets in Supabase

1. In Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Create a bucket named `research-files`
4. Make it **Public** (so files can be accessed)
5. Click **Create bucket**

## Step 6: Test the Setup

1. Start your development server:

```bash
npm run dev
```

2. Visit `http://localhost:3000/admin` to access the admin panel
3. Try uploading a research work item

## Step 7: Seed Initial Data (Optional)

You can add initial data through the admin panel or create a seed script.

### Using Prisma Studio (Visual Database Editor)

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can manually add data.

## API Endpoints

Your backend now has these API endpoints:

### Research Work
- `GET /api/research-work` - Get all research work
- `GET /api/research-work?published=true` - Get published only
- `GET /api/research-work/[id]` - Get single item
- `POST /api/research-work` - Create new
- `PUT /api/research-work/[id]` - Update
- `DELETE /api/research-work/[id]` - Delete

### Publications
- `GET /api/publications/patents` - Get all patents
- `POST /api/publications/patents` - Create patent
- `GET /api/publications/journals` - Get all journals
- `POST /api/publications/journals` - Create journal
- `GET /api/publications/conferences` - Get all conferences
- `POST /api/publications/conferences` - Create conference

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=underwater` - Filter by category
- `POST /api/projects` - Create project

### Profile Data
- `GET /api/research-areas` - Get research areas
- `POST /api/research-areas` - Create research area
- `GET /api/funding` - Get funding
- `POST /api/funding` - Create funding
- `GET /api/awards` - Get awards
- `POST /api/awards` - Create award

### File Upload
- `POST /api/upload` - Upload files (PDF, DOC, etc.)

## Database Schema

The Prisma schema includes these models:

- **ResearchWork** - Main research content with files
- **Patent** - Patent information
- **Journal** - Journal publications
- **Transaction** - IEEE Transactions
- **Conference** - Conference papers
- **Book** - Book chapters
- **Project** - Research projects
- **ResearchArea** - Research focus areas
- **Funding** - Grants and funding
- **Award** - Awards and recognition
- **Membership** - Professional memberships

## Updating Frontend to Use Backend

To make your existing pages dynamic:

1. Replace static data with API calls
2. Example for research page - see `src/app/research/page-dynamic.tsx`
3. Use React hooks (`useEffect`, `useState`) to fetch data
4. Handle loading states

## Security Notes

- No authentication is implemented (as requested)
- Anyone can access the admin panel at `/admin`
- Consider adding basic auth or IP restrictions for production
- The `.env` file is gitignored - never commit it!

## Troubleshooting

### "Can't reach database server"
- Check your DATABASE_URL in `.env`
- Ensure your IP is allowed in Supabase (Settings > Database > Connection pooling)

### "Module not found: @prisma/client"
- Run `npx prisma generate`

### File upload fails
- Check Supabase storage bucket exists and is public
- Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

### CORS errors
- Supabase allows all origins by default for public buckets
- Check bucket is set to public in Supabase dashboard

## Next Steps

1. Populate your database with existing data
2. Update frontend pages to fetch from API
3. Add more admin forms for other content types
4. Consider adding image upload for projects
5. Add search and filtering capabilities

## Useful Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (visual database editor)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

## Support

For issues:
- Prisma docs: https://www.prisma.io/docs
- Supabase docs: https://supabase.com/docs
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
