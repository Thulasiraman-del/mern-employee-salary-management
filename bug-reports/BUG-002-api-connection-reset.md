# BUG-002: POST /data_pegawai Resets Connection Instead of Returning 401

**Severity:** High  
**Found in:** Backend — UserRoute.js / AuthUser middleware  
**Affects:** API consumers, frontend error handling

## Description
When an unauthenticated POST request is made to /data_pegawai, the server 
closes the connection (ECONNRESET) instead of returning a proper 401 response.

## Steps to Reproduce
1. Ensure backend is running on port 5000
2. Send POST request to http://localhost:5000/data_pegawai with empty JSON body
3. Observe: connection is reset, no HTTP response received

## Expected Behavior
Server should return HTTP 401 Unauthorized with JSON body:
`{"message": "Unauthorized"}`

## Actual Behavior
Server resets the TCP connection. Client receives ECONNRESET error.
No HTTP status code is returned.

## Root Cause
The authentication middleware in `Backend/middleware/AuthUser.js` likely 
calls `res.end()` or closes the socket without sending a response when 
session is not found, instead of calling `res.status(401).json(...)`.

## Impact
Frontend cannot distinguish between server crash and unauthorized access.
Error handling cannot show users a meaningful message.
API clients receive unhelpful errors instead of actionable responses.

## Automated Test
See: tests/api/salary.test.mjs —
"POST /data_pegawai without session closes connection (bug)"
Test documents this behavior with comment noting it should return 401.