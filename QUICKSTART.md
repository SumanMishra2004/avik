# Quick Start Checklist

Follow these steps to get your portfolio backend up and running:

## ✅ Step-by-Step Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Supabase Project
- [ ] Go to https://supabase.com and create account
- [ ] Create new project
- [ ] Save your database password!
- [ ] Wait for project to initialize (~2 minutes)

### 3. Get Supabase Credentials
- [ ] Go to Settings > API
- [ ] Copy Project URL
- [ ] Copy anon/public key
- [ ] Go to Settings > Database
- [ ] Copy Connection String (URI format)

### 4. Configure Environment
- [ ] Copy `.env.example` to `.env`
- [ ] Add your Supabase URL
- [ ] Add your Supabase anon key
- [ ] Add your database URL (replace [YOUR-PASSWORD])

Your `.env` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

### 5. Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push
```

### 6. Create Storage Bucket
- [ ] In Supabase dashboard, go to Storage
- [ ] Click "New bucket"
- [ ] Name it `research-files`
- [ ] Make it **Public**
- [ ] Click Create

### 7. Seed Initial Data (Optional)
```bash
npm run db:seed
```

This adds sample research areas, funding, and awards.

### 8. Start Development Server
```bash
npm run dev
```

### 9. Test Your Setup
- [ ] Visit http://localhost:3000 - Homepage should load
- [ ] Visit http://localhost:3000/admin - Admin panel should load
- [ ] Try uploading a research work item
- [ ] Check if it appears in the database

### 10. View Your Database
```bash
npm run db:studio
```

Opens Prisma Studio at http://localhost:5555 to view/edit data visually.

## 🎉 You're Done!

Your backend is now ready. You can:

1. **Add Content**: Go to `/admin` and start uploading research work
2. **View Data**: Use Prisma Studio to see your database
3. **Test APIs**: Check API_REFERENCE.md for all endpoints
4. **Update Frontend**: Replace static data with API calls (see examples in `*-dynamic.tsx` files)

## 🔧 Troubleshooting

### Can't connect to database?
- Check your DATABASE_URL in `.env`
- Ensure password is correct
- Verify your IP is allowed in Supabase (Settings > Database)

### File upload fails?
- Check storage bucket exists and is named `research-files`
- Verify bucket is set to **Public**
- Check SUPABASE_URL and SUPABASE_ANON_KEY are correct

### "Module not found: @prisma/client"?
```bash
npx prisma generate
```

### Need to reset database?
```bash
npx prisma db push --force-reset
npm run db:seed
```

## 📚 Next Steps

1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed information
2. Check [API_REFERENCE.md](./API_REFERENCE.md) for API documentation
3. Look at `src/app/research/page-dynamic.tsx` for frontend integration example
4. Customize the admin panel in `src/app/admin/page.tsx`

## 🚀 Ready to Deploy?

When you're ready to deploy:
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Need help? Check the documentation or open an issue!
