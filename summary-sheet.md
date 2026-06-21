# Summary Sheet

## Q1: What does this HRMS exist to deliver, and to whom?
This HRMS exists to deliver one thing: an accurate payslip to a daily wage 
construction worker. Every feature — attendance tracking, overtime logging, 
deduction settings — only matters if it makes that final number correct. 
The worker who depends on it most has no salary buffer; this month's pay 
is this month's rent.

## Q2: Most dangerous bug pattern found?
Silent data propagation failure — when an upstream entity changes and the 
downstream calculation doesn't update, with no error surfaced to anyone. 
I found this pattern in three places: the login form bypasses auth entirely 
(BUG-001), the POST endpoint resets connection instead of returning 401 
(BUG-002), and the CORS origin is hardcoded to the wrong port (BUG-003). 
Each is a different surface of the same problem: the system assumes things 
are connected when they aren't actually verified.

## Q3: Test most proud of?
The "empty login still redirects - no auth validation bug" test in 
auth.spec.js. It deliberately passes to document a real production-class 
bug: anyone can access the admin dashboard without credentials. Without 
this test, the bug is invisible. With it, every future developer knows 
the frontend has no auth guard — and the payroll data for 200 workers 
is exposed to anyone who clicks Login.

## Q4: What did you choose NOT to automate?
UI styling, chart rendering on the dashboard, and the print/PDF output 
for payslips. A misaligned button or a missing chart doesn't stop a 
worker getting paid. Automating these would slow CI and protect nobody. 
Manual spot checks on release are sufficient for visual elements.

## Q5: What are you not fully confident about?
I'm not fully confident about the regression tests I wrote for the 
salary pipeline. I mapped the dependencies by reading the source code 
myself since there's no documentation — so there's a real chance I 
missed some connections the senior dev would know about. I included 
them anyway because even partial coverage is better than none, and 
they give the new developer something to build on.

## Q6: What changed between first approach and final submission?
Honestly, my first instinct was to write as many tests as possible to 
look thorough. Then I reread the assignment and realized that's exactly 
what they didn't want. I scrapped the first batch and asked myself for 
each test: which specific person does this protect and from what? 
That question changed everything — I ended up with fewer tests but 
each one has a reason that connects to a real person.

## Q7: What don't you know yet?
1. How Indonesian labor law overtime calculation varies by worker 
   classification — the system uses one rate but construction sites 
   have different categories
2. How payroll operators actually reconcile when system and paper 
   records conflict — what the real fallback workflow looks like
3. How the system behaves under concurrent attendance submissions 
   from multiple site managers for the same worker

## Q8: One more day — what would you test?
Concurrent overtime submissions — two site managers logging hours for 
the same worker at exactly the same time. A race condition there means 
one entry silently overwrites the other with no audit trail. The worker 
loses hours they worked and nobody knows why. This is the highest-risk 
untested scenario given the construction site context.