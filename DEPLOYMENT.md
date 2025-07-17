# AssignmentAI - Production Deployment Guide

## 🚀 Pre-Launch Checklist

### 1. Environment Configuration

1. **Create Production Environment File**
   ```bash
   cp env.example .env.production
   ```

2. **Configure Required Environment Variables**
   - Database: MongoDB Atlas production cluster
   - Email: SendGrid API key and verified sender
   - Payment: PayPal/Stripe production credentials
   - File Storage: Firebase/AWS S3 production bucket
   - Rate Limiting: Upstash Redis production instance

3. **Security Variables**
   - Generate new `NEXTAUTH_SECRET` (32+ characters)
   - Set `NEXTAUTH_URL` to production domain
   - Configure CORS origins

### 2. Database Setup

1. **MongoDB Atlas Production Cluster**
   - Create production cluster
   - Set up database user with appropriate permissions
   - Configure network access (IP whitelist)
   - Enable backup and monitoring

2. **Database Migration**
   ```bash
   # Run database migration for new fields
   npm run db:migrate
   ```

3. **Index Optimization**
   - Create indexes for frequently queried fields
   - Monitor query performance

### 3. Email Service Setup

1. **SendGrid Configuration**
   - Create SendGrid account
   - Verify sender domain
   - Generate API key
   - Set up webhook for delivery tracking

2. **Email Templates**
   - Customize email templates in `src/lib/email.js`
   - Test all email flows (welcome, password reset, subscription)

### 4. Payment Processing

1. **PayPal Production Setup**
   - Create PayPal Business account
   - Configure webhooks for subscription events
   - Test payment flows in sandbox first

2. **Alternative: Stripe Setup**
   - Create Stripe account
   - Configure webhook endpoints
   - Set up subscription products

### 5. File Storage

1. **Firebase Storage**
   - Create production Firebase project
   - Configure storage rules
   - Set up CORS for file uploads

2. **Security Rules**
   ```javascript
   // Firebase storage rules
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /assignments/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### 6. Rate Limiting & Caching

1. **Upstash Redis**
   - Create production Redis instance
   - Configure connection pooling
   - Set up monitoring and alerts

2. **Rate Limit Configuration**
   - Review rate limits in `src/lib/rateLimit.js`
   - Adjust based on expected traffic

### 7. Security Hardening

1. **HTTPS Configuration**
   - SSL certificate setup
   - HSTS headers
   - CSP (Content Security Policy)

2. **API Security**
   - Implement API key authentication for external services
   - Set up request signing
   - Configure CORS properly

3. **Input Validation**
   - Review all API endpoints for proper validation
   - Test for SQL injection, XSS, CSRF vulnerabilities

### 8. Monitoring & Logging

1. **Error Tracking**
   - Set up Sentry for error monitoring
   - Configure alerting rules
   - Monitor performance metrics

2. **Application Logs**
   - Configure log aggregation (e.g., LogRocket, DataDog)
   - Set up log retention policies
   - Monitor for security events

### 9. Performance Optimization

1. **Build Optimization**
   ```bash
   npm run build
   npm run start
   ```

2. **CDN Setup**
   - Configure CDN for static assets
   - Set up image optimization
   - Enable compression

3. **Database Optimization**
   - Monitor slow queries
   - Optimize indexes
   - Set up connection pooling

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   - Add all production environment variables in Vercel dashboard
   - Configure build settings

3. **Domain Configuration**
   - Add custom domain
   - Configure DNS records
   - Set up SSL certificate

### Option 2: AWS Deployment

1. **EC2 Setup**
   ```bash
   # Install Node.js and PM2
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

2. **Application Deployment**
   ```bash
   git clone <repository>
   cd assignment-ai
   npm install
   npm run build
   pm2 start npm --name "assignment-ai" -- start
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 3: Docker Deployment

1. **Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
       env_file:
         - .env.production
   ```

## 🔧 Post-Deployment

### 1. Health Checks

1. **Application Health**
   - Test all major user flows
   - Verify email delivery
   - Test payment processing
   - Check file uploads

2. **Performance Monitoring**
   - Monitor response times
   - Check error rates
   - Monitor resource usage

### 2. Security Testing

1. **Penetration Testing**
   - Run security scans
   - Test authentication flows
   - Verify input validation

2. **Compliance**
   - GDPR compliance check
   - Data protection measures
   - Privacy policy updates

### 3. Backup Strategy

1. **Database Backups**
   - Set up automated backups
   - Test restore procedures
   - Document backup schedule

2. **File Backups**
   - Backup uploaded files
   - Test file recovery
   - Monitor storage usage

## 📊 Monitoring & Analytics

### 1. Application Monitoring

1. **Uptime Monitoring**
   - Set up uptime monitoring (e.g., UptimeRobot)
   - Configure alerting
   - Monitor response times

2. **Error Tracking**
   - Sentry integration
   - Error alerting
   - Performance monitoring

### 2. Business Analytics

1. **User Analytics**
   - Google Analytics setup
   - Conversion tracking
   - User behavior analysis

2. **Business Metrics**
   - Subscription tracking
   - Revenue monitoring
   - User engagement metrics

## 🚨 Emergency Procedures

### 1. Rollback Plan

1. **Database Rollback**
   ```bash
   # Restore from backup
   mongorestore --uri="mongodb://..." backup/
   ```

2. **Application Rollback**
   ```bash
   # Revert to previous deployment
   vercel rollback
   # or
   git checkout <previous-commit>
   npm run build && pm2 restart
   ```

### 2. Incident Response

1. **Security Incidents**
   - Immediate response procedures
   - Communication plan
   - Legal considerations

2. **Performance Issues**
   - Scaling procedures
   - Resource allocation
   - User communication

## 📞 Support & Maintenance

### 1. Support System

1. **User Support**
   - Help desk setup
   - FAQ documentation
   - Support ticket system

2. **Technical Support**
   - Monitoring alerts
   - On-call procedures
   - Escalation matrix

### 2. Maintenance Schedule

1. **Regular Updates**
   - Security patches
   - Dependency updates
   - Performance optimizations

2. **Backup Verification**
   - Monthly backup tests
   - Disaster recovery drills
   - Documentation updates

## 🎯 Launch Checklist

- [ ] Environment variables configured
- [ ] Database migrated and tested
- [ ] Email service working
- [ ] Payment processing tested
- [ ] File uploads working
- [ ] Rate limiting configured
- [ ] Security measures implemented
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Support system ready
- [ ] Documentation updated
- [ ] Legal compliance verified
- [ ] Performance tested
- [ ] Security tested
- [ ] Rollback plan ready

## 📈 Post-Launch Optimization

1. **Performance Tuning**
   - Monitor and optimize slow queries
   - Implement caching strategies
   - Optimize bundle size

2. **Feature Iteration**
   - User feedback collection
   - A/B testing setup
   - Feature prioritization

3. **Scaling Preparation**
   - Load testing
   - Auto-scaling configuration
   - CDN optimization

---

**Remember**: Always test thoroughly in staging environment before deploying to production! 