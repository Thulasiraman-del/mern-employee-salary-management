# Test Strategy — HRMS Construction Payroll

## What This System Exists To Do
Every feature in this HRMS exists for one purpose: generating an accurate payslip 
for a daily wage construction worker. If that number is wrong, a worker's family 
doesn't have what they earned this month.

## 5 Critical Flows (Ranked by Worker Impact)

### 1. Salary → Payslip Calculation
**Worst case if broken:** Worker receives wrong salary. 
A daily wage worker with no savings buffer cannot absorb even a small error.
**Tests:** regression/salary-payslip.spec.js

### 2. Attendance Submission
**Worst case if broken:** Days worked are not recorded. 
Worker is not paid for time they actually worked.
**Tests:** e2e/employee.spec.js (attendance page loads)

### 3. API Authentication
**Worst case if broken:** Unauthorized access to payroll data. 
Any employee's salary data could be exposed or tampered with.
**Tests:** tests/api/salary.test.mjs

### 4. Employee Onboarding
**Worst case if broken:** New worker not added to system. 
Worker works but has no record — invisible to payroll.
**Tests:** e2e/employee.spec.js (employee list)

### 5. Login/Access Control
**Worst case if broken:** Anyone can access admin dashboard.
**Tests:** e2e/auth.spec.js

## What We Automate vs. Manual

| Flow | Decision | Reason |
|------|----------|--------|
| Salary calculation | Automate | High risk, runs every month |
| API auth | Automate | Fast, catches incidents like Incident 2 |
| Attendance submission | Automate | Direct worker impact |
| UI styling/layout | Manual | Doesn't affect payroll accuracy |
| Print/PDF output | Manual | Hard to automate, low worker risk |

## What We Deliberately Don't Test
- **UI pixel alignment** — a misaligned button doesn't stop a worker getting paid
- **Admin dashboard charts** — decorative, no payroll impact
- **Password change flow** — low frequency, manual spot check sufficient

## Team Dynamics Considered
- Dev Lead doesn't want 20-minute CI — our API test suite runs in under 30 seconds
- New developer needs safety net — regression tests document the salary→payslip dependency
- Senior dev's knowledge is encoded in regression tests — bus factor reduced