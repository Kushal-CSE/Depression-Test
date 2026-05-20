# Deployment Guide - Depression Assessment Platform

## Quick Start Deployment

### 1. Deploy to Vercel (Recommended)

Vercel provides the easiest deployment with automatic environment variable management.

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the project root directory

3. **Add Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - From Supabase dashboard
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase dashboard
   - `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - Your Vercel URL + `/auth/callback`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

### 2. Self-Hosted Deployment

#### Node.js Server

**Build the application:**
```bash
npm run build
# or
pnpm build
```

**Start the server:**
```bash
npm start
# or
pnpm start
```

**Using PM2 (recommended for production):**
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "mindwell" -- start

# View logs
pm2 logs mindwell

# Restart on server reboot
pm2 startup
pm2 save
```

#### Docker Deployment

**Create Dockerfile:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t mindwell .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  mindwell
```

### 3. Railway, Render, or Heroku

These platforms offer git-based deployments similar to Vercel.

**Environment Variables to Configure:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`

## Database Setup

### Supabase Project Setup

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Click "Start your project"

2. **Create New Project**
   - Name: "Depression Assessment Platform"
   - Region: Choose closest to your users
   - Password: Create secure password

3. **Get API Keys**
   - Go to Settings → API
   - Copy `Project URL`
   - Copy `anon public` key
   - These are your environment variables

4. **Verify Database Schema**
   - Tables `profiles` and `test_results` should already be created
   - Check SQL Editor to verify schema
   - Enable RLS policies

## Production Checklist

### Security
- [ ] Enable RLS on all tables
- [ ] Set up CORS restrictions
- [ ] Configure email verification requirements
- [ ] Review Supabase security settings
- [ ] Set up rate limiting
- [ ] Enable HTTPS (automatic on Vercel)

### Performance
- [ ] Enable database indexes (already configured)
- [ ] Set up CDN for static assets
- [ ] Configure image optimization
- [ ] Enable API caching where appropriate

### Monitoring
- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Create alerts for database issues

### Compliance
- [ ] Review privacy policy
- [ ] Add terms of service
- [ ] Comply with data protection regulations (GDPR, HIPAA)
- [ ] Set up data retention policies
- [ ] Document data handling procedures

## Environment Variables Reference

### Required Variables
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Development Only
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

### Production Example
```
# Deployed to: https://mindwell.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://mindwell.vercel.app/auth/callback
```

## Post-Deployment Steps

### 1. Test Authentication
- [ ] Sign up with test account
- [ ] Verify email confirmation works
- [ ] Log in with credentials
- [ ] Check profile is created

### 2. Test Features
- [ ] Complete a test (PHQ-9, BDI-II, CES-D, AI)
- [ ] Verify results are saved
- [ ] Check history retrieval
- [ ] Test profile update

### 3. Database Verification
- [ ] Check data in Supabase dashboard
- [ ] Verify RLS is protecting data
- [ ] Test user isolation (users can't see others' data)

### 4. Performance Testing
- [ ] Check page load times
- [ ] Test on slow connections
- [ ] Monitor database performance

## Monitoring and Maintenance

### Daily Tasks
- Monitor error logs
- Check uptime status
- Review performance metrics

### Weekly Tasks
- Review database usage
- Check backup status
- Monitor for security issues

### Monthly Tasks
- Review analytics
- Update dependencies (with testing)
- Audit access logs
- Plan performance improvements

## Scaling Considerations

As the application grows:

1. **Database**
   - Monitor query performance
   - Add indexes for frequently accessed data
   - Consider read replicas for scaling
   - Plan for data archival strategy

2. **Backend**
   - Use edge functions for lower latency
   - Implement caching strategies
   - Load balance across multiple instances

3. **Frontend**
   - Optimize bundle size
   - Use code splitting
   - Implement lazy loading
   - Use service workers for offline support

## Rollback Procedure

If deployment causes issues:

### Vercel
1. Go to Deployments
2. Find previous stable deployment
3. Click "Promote to Production"
4. Verify application works

### Manual Deployment
```bash
# Revert to previous commit
git revert HEAD
git push

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force

# Redeploy
npm run build && npm start
```

## Support & Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Deployment:** https://vercel.com/docs
- **Status Page:** Check deployment provider's status page

## Troubleshooting Deployments

### Build Failures
- Check build logs
- Verify environment variables
- Clear cache and rebuild
- Check Node.js version compatibility

### Runtime Errors
- Check server logs
- Verify database connection
- Check environment variables
- Review error tracking tools

### Performance Issues
- Monitor database queries
- Check API response times
- Review server resource usage
- Analyze bundle size

## Backup Strategy

### Database Backups
- Supabase provides daily backups (free plan)
- Pro plan offers hourly backups
- Manually export important data regularly

### Application Backups
- Keep GitHub repository up to date
- Tag production releases
- Document deployment procedures
- Maintain deployment logs
