# BUG-003: CORS Origin Mismatch Between Backend Config and Frontend Port

**Severity:** High  
**Found in:** Backend/index.js  
**Affects:** Production deployment, any environment where ports differ

## Description
Backend CORS configuration allows only `http://localhost:3000` but the 
frontend runs on `http://localhost:5173` (Vite default port). This works 
locally only because of browser security settings but will fail in production.

## Steps to Reproduce
1. Open Backend/index.js
2. Find: `origin: 'http://localhost:3000'`
3. Note frontend runs on port 5173
4. Open browser DevTools → Network tab
5. Make any API call from frontend
6. Observe CORS headers in response

## Expected Behavior
CORS origin should match the actual frontend URL.
In production, should be configured via environment variable.

## Actual Behavior
Backend hardcodes `http://localhost:3000` as allowed origin.
Frontend runs on `http://localhost:5173`.
Any deployment to a different domain will cause all API calls to fail 
with CORS errors.

## Root Cause
In `Backend/index.js`:
app.use(cors({

credentials: true,

origin: 'http://localhost:3000'

}));
Origin is hardcoded instead of using `process.env.FRONTEND_URL`.

## Impact
When this HRMS scales to 8 construction sites with a real domain, 
all frontend API calls will be blocked by CORS. Payroll operators 
will be unable to submit attendance or generate payslips.
200+ workers' salaries could fail to process on payday.

## Fix Required
```javascript
origin: process.env.FRONTEND_URL || 'http://localhost:5173'
```
And add FRONTEND_URL to .env file.