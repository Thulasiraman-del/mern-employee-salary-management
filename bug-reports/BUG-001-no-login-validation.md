# BUG-001: Login Form Accepts Empty Credentials

**Severity:** Critical  
**Found in:** LoginAdmin/index.jsx  
**Affects:** All users, system security

## Description
The login form allows submission with empty username and password fields 
and redirects directly to the admin dashboard without any authentication check.

## Steps to Reproduce
1. Go to http://localhost:5173
2. Leave username and password fields empty
3. Click the Login button
4. Observe: user is redirected to /admin/dashboard

## Expected Behavior
System should validate that username and password are not empty before 
allowing login. Empty submission should show validation error.

## Actual Behavior
Empty form submission redirects to dashboard. No authentication occurs.
The Login button is wrapped in a React Router `<Link>` component pointing 
directly to `/admin/dashboard`, bypassing any auth check entirely.

## Root Cause
In `Frontend/src/pages/Admin/LoginAdmin/index.jsx`, the submit button is 
wrapped in `<Link to='/admin/dashboard'>` which navigates on click without 
calling any authentication API. There is no form onSubmit handler.

## Impact
Any person who visits the login page can access the admin dashboard by 
clicking Login with empty fields. All employee salary data, attendance 
records, and payslips are exposed. A payroll operator or malicious actor 
could view or manipulate salary data for 200+ workers.

## Screenshot
[Tested and reproduced — empty form click navigates to dashboard]

## Automated Test
See: tests/e2e/auth.spec.js — 
"empty login still redirects - no auth validation bug"
This test currently PASSES (documents the bug exists).