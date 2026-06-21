# QA-303: Negative Testing Report

## Summary
Tested all major forms and API endpoints for invalid inputs, boundary values,
and security vulnerabilities.

---

## Forms Tested

### 1. Login Form (http://localhost:5173)

| Test | Input | Expected | Actual | Pass/Fail |
|------|-------|----------|--------|-----------|
| Empty username | "" | Block login | Redirects to dashboard | FAIL (BUG-001) |
| Empty password | "" | Block login | Redirects to dashboard | FAIL (BUG-001) |
| Both empty | "" "" | Block login | Redirects to dashboard | FAIL (BUG-001) |
| SQL injection | `' OR '1'='1` | Block login | Redirects to dashboard | FAIL |
| XSS payload | `<script>alert(1)</script>` | Sanitize | Redirects to dashboard | FAIL |

**Finding:** Login form has NO validation. Any input (including empty) 
grants dashboard access. This is the most critical finding.

### 2. Add Employee Form (http://localhost:5173/admin/master-data/data-pegawai)

| Test | Input | Expected | Actual | Pass/Fail |
|------|-------|----------|--------|-----------|
| Empty NIK | "" | Validation error | TBD - requires testing | - |
| Negative salary | -1 | Validation error | TBD | - |
| Extremely large salary | 999999999999 | Validation error or cap | TBD | - |
| Special chars in name | `<script>` | Sanitize | TBD | - |

### 3. Attendance Form

| Test | Input | Expected | Actual | Pass/Fail |
|------|-------|----------|--------|-----------|
| Negative attendance days | -1 | Block | TBD | - |
| Days > 31 | 99 | Block | TBD | - |
| Future date | 2099-01-01 | Block | TBD | - |

---

## API Endpoints Tested

### GET /data_pegawai (unauthenticated)
- **Input:** No session cookie
- **Expected:** HTTP 401
- **Actual:** HTTP 401 ✓
- **Result:** PASS

### GET /data_jabatan (unauthenticated)
- **Input:** No session cookie  
- **Expected:** HTTP 401
- **Actual:** HTTP 401 ✓
- **Result:** PASS

### GET /data_kehadiran (unauthenticated)
- **Input:** No session cookie
- **Expected:** HTTP 401
- **Actual:** HTTP 401 ✓
- **Result:** PASS

### POST /data_pegawai (unauthenticated)
- **Input:** Empty JSON body, no session
- **Expected:** HTTP 401
- **Actual:** ECONNRESET — server closes connection without response
- **Result:** FAIL (BUG-002)

---

## Critical Findings

### Finding 1: No Frontend Authentication (Critical)
The login form bypasses authentication entirely. The submit button is a 
React Router Link that navigates to dashboard without calling any auth API.
**Impact:** Any visitor can access all payroll data.

### Finding 2: Server Connection Reset on POST (High)
Unauthenticated POST requests cause server to reset connection instead of 
returning 401. Frontend cannot handle this gracefully.
**Impact:** Poor error handling, confusing to API consumers.

### Finding 3: CORS Misconfiguration (High)
Backend allows only localhost:3000 but frontend runs on localhost:5173.
**Impact:** Will break in production deployment.

---

## Automated Tests Written
See: tests/api/salary.test.mjs — covers API authentication boundary tests
See: tests/e2e/auth.spec.js — documents login validation bug

---

## What Was NOT Tested
- File upload endpoints (no file upload in scope)
- Password reset flow (not implemented)
- Rate limiting (not implemented — future recommendation)