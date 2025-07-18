# Trial & Paywall Troubleshooting Guide

## Issue: Users See Paywall Despite Being on 7-Day Trial

### Quick Diagnosis Steps

1. **Check Browser Console** (F12) for debug logs:
   - Look for "Dashboard Paywall Debug:" log
   - This will show the user's subscription status and trial dates

2. **Verify User Data**:
   - Check if `subscription` is set to "trial"
   - Check if `trialEndDate` exists and is in the future
   - Check if user role is correct (student vs admin/professor)

### Common Issues & Solutions

#### 1. API 500 Errors
If you see errors like:
- `/api/institution/subscription-status` - 500 error
- `/api/assignments` - 500 error

**Causes:**
- Missing environment variables on Vercel
- Database connection issues
- Wrong user role causing incorrect API calls

**Solutions:**
- Verify all environment variables are set in Vercel dashboard
- Check MongoDB connection string is correct
- Ensure NEXTAUTH_SECRET is set properly

#### 2. User Has Wrong Role
If a student user is being redirected to institution dashboard:

**Solution:**
- Use the new `/dashboard/redirect` page which automatically sends users to the correct dashboard
- Update login redirects to use `/dashboard/redirect` instead of `/dashboard`

#### 3. Trial Not Applied to Existing Users
Users who signed up before the fix might have:
- `subscription: 'free'` instead of `subscription: 'trial'`
- Missing `trialEndDate`

**Solution:**
The NextAuth configuration already has code to grant trials on sign-in, but you can manually update users in MongoDB:

```javascript
// MongoDB update query
db.users.updateMany(
  { subscription: 'free', trialEndDate: { $exists: false } },
  { 
    $set: { 
      subscription: 'trial',
      trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      assignmentsLimit: 100
    }
  }
)
```

#### 4. Session Not Updating
If changes aren't reflected after user updates:

**Solution:**
- Have users sign out and sign back in
- This forces the session to refresh with latest user data

### Deployment Checklist

1. **Environment Variables** (Vercel Dashboard):
   - [ ] MONGODB_URI
   - [ ] NEXTAUTH_SECRET
   - [ ] NEXTAUTH_URL
   - [ ] NEXT_PUBLIC_PAYPAL_CLIENT_ID (if using PayPal)

2. **Database Connection**:
   - [ ] MongoDB Atlas IP whitelist includes 0.0.0.0/0 for Vercel
   - [ ] Connection string includes proper database name
   - [ ] User has read/write permissions

3. **Build & Deploy**:
   - [ ] Latest code is pushed to GitHub
   - [ ] Vercel has deployed the latest commit
   - [ ] No build errors in Vercel logs

### Testing Procedure

1. **Create New Test Account**:
   - Sign up with new email
   - Check console for debug logs
   - Verify trial is active

2. **Check Database**:
   - User document should have:
     - `subscription: 'trial'`
     - `trialEndDate: [7 days from signup]`
     - `assignmentsLimit: 100`

3. **Test Dashboard Access**:
   - Students should access `/dashboard` without paywall
   - Should see trial banner with days remaining

### Emergency Fix

If users need immediate access while troubleshooting:

1. Temporarily modify the paywall check in `src/app/dashboard/page.js`:
```javascript
const showPaywall = false; // Temporarily disable paywall
```

2. Deploy and investigate the root cause

### Support Information

For users experiencing issues:
1. Ask them to clear browser cache
2. Try incognito/private browsing mode
3. Check which dashboard URL they're accessing
4. Have them sign out and sign back in

Remember to remove debug logs and temporary fixes before final production deployment!