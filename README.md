# Portfolio Website - Dr. Avik Kumar Das

A modern, full-stack portfolio website built with Next.js, Prisma, and Supabase for managing research work, publications, and projects.

## Features

- 🎨 Modern UI with Tailwind CSS and Framer Motion animations
- 📚 Dynamic content management for research work, publications, and projects
- 🗄️ PostgreSQL database with Prisma ORM
- ☁️ Supabase for database and file storage
- 📝 Admin panel for content management (no authentication required)
- 🚀 Built with Next.js 16 and React 19
- 📱 Fully responsive design

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Storage**: Supabase Storage
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-aviksir
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase and configure environment variables:
   - Follow the detailed instructions in [SETUP_GUIDE.md](./SETUP_GUIDE.md)
   - Create a `.env` file based on `.env.example`

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. (Optional) Seed initial data:
```bash
npm run db:seed
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Project Structure

```
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── src/
│   ├── app/
│   │   ├── admin/         # Admin panel
│   │   ├── api/           # API routes
│   │   ├── contact/       # Contact page
│   │   ├── projects/      # Projects page
│   │   ├── publications/  # Publications page
│   │   ├── research/      # Research page
│   │   └── teaching/      # Teaching page
│   ├── components/        # React components
│   └── lib/               # Utilities (Prisma, Supabase)
├── SETUP_GUIDE.md         # Detailed setup instructions
└── API_REFERENCE.md       # API documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (visual database editor)

## Admin Panel

Access the admin panel at `/admin` to:
- Upload research work with files
- Manage publications (patents, journals, conferences)
- Add and edit projects
- Update profile information

**Note**: No authentication is implemented. Consider adding basic auth for production.

## API Endpoints

See [API_REFERENCE.md](./API_REFERENCE.md) for complete API documentation.

Key endpoints:
- `/api/research-work` - Research work CRUD
- `/api/publications/*` - Publications management
- `/api/projects` - Projects management
- `/api/upload` - File upload to Supabase

## Database Schema

The database includes models for:
- Research Work
- Patents, Journals, Conferences, Books
- Projects
- Research Areas, Funding, Awards, Memberships

See `prisma/schema.prisma` for the complete schema.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

## Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Complete setup instructions
- [API Reference](./API_REFERENCE.md) - API documentation

## Support

For issues or questions:
- Check the [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- Review [API_REFERENCE.md](./API_REFERENCE.md)
- Open an issue on GitHub

## License

MIT License - feel free to use this for your own portfolio!
