# QA-301: Overtime Entry — Acceptance Criteria

## Original Requirement (PM Slack Message)
"We need an overtime entry screen. Site managers should be able to log overtime 
for their workers at the end of each day — which worker, how many hours, what date, 
and a reason. This needs to work on mobile too since they'll enter it at the 
construction site."

---

## Acceptance Criteria

### Core Functionality
- Site manager can select a worker from a dropdown of active employees only
- Site manager can enter number of overtime hours (numeric, max 2 decimal places)
- Site manager can select date (default: today)
- Site manager can enter a reason (text, required)
- Submitted overtime entry appears in Data Absensi for that worker

### Validation Rules
- Hours must be greater than 0
- Hours cannot exceed 12 per day (construction regulation)
- Date cannot be in the future
- Date cannot be more than 7 days in the past (prevents backdating abuse)
- Worker field is required
- Reason field is required (min 5 characters)

### Monthly Cap Edge Cases
- If worker already has 60 overtime hours this month, system must BLOCK entry
- If entry would bring worker to exactly 60 hours, allow it
- If entry would exceed 60 hours, show exact message: 
  "Worker has X hours remaining this month. Entry exceeds monthly cap."

### Duplicate Entry Edge Cases
- If two site managers submit overtime for same worker on same day:
  - System must detect duplicate and show warning
  - Second submission requires explicit confirmation
  - Both entries are logged with submitter name for audit

### Mobile/Offline Edge Cases
- Form must be usable on screens 375px wide and above
- If connection lost during submission, form data must be preserved
- On reconnection, user must be able to resubmit without re-entering data
- Show clear "Offline - will submit when connected" message

### Salary Pipeline Impact
- Overtime hours must flow to Data Gaji calculation automatically
- Overtime rate = basic salary / 173 * 1.5 (Indonesian labor law)
- Payslip must show overtime hours and amount separately

---

## Questions Before Dev Starts
1. What is the overtime multiplier — 1.5x or 2x for weekends?
2. Is the 60-hour monthly cap configurable per site or fixed system-wide?
3. Can a site manager edit a submitted entry, or only HR?
4. What happens to overtime if a worker is terminated mid-month?
5. Does the system need to distinguish between weekday and weekend overtime?

---

## Test Scenarios (Given/When/Then)

**Scenario 1: Valid overtime entry**
- Given a site manager is logged in
- When they submit 3 hours overtime for worker on today's date with reason
- Then the entry appears in Data Absensi and flows to salary calculation

**Scenario 2: Monthly cap exceeded**
- Given a worker has 58 overtime hours this month
- When site manager submits 5 hours overtime
- Then system blocks submission with message showing 2 hours remaining

**Scenario 3: Duplicate submission**
- Given worker already has overtime logged for today
- When a second site manager submits overtime for same worker same day
- Then system shows warning and requires confirmation before saving

**Scenario 4: Mobile offline submission**
- Given site manager is on mobile with no connection
- When they fill and submit the overtime form
- Then data is preserved and auto-submitted when connection returns

---

## Launch Blockers vs V2

### Launch Blockers
- Hours validation (0, negative, >12)
- Monthly cap enforcement
- Mobile responsive layout
- Salary pipeline integration

### V2 (Post-Launch)
- Offline mode with auto-sync
- Duplicate detection across managers
- Weekend/holiday overtime rate differentiation
- Audit trail for edits