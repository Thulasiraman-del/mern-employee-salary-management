# Quality Reflection

## Q1: Do you write tests in your own projects?
Honestly, no — not consistently. When I'm building something for myself 
I usually just run it and see if it works. I tell myself I'll add tests 
later and I rarely do. What would make me start is exactly what this 
assignment showed me: seeing a real bug that a simple test would have 
caught. The login form bug here — anyone can access the dashboard — 
that's the kind of thing I would have shipped without noticing. That 
changes how I think about it.
## Q2: Describe a time you shipped something untested and what happened.
During a college project I pushed a fix to our group's submission portal 
the night before the deadline. I changed how student IDs were validated 
because one edge case wasn't working. What I didn't know was that another 
teammate's code depended on the old format. By the time we noticed, half 
the submissions had failed silently — no error, just missing records. 
We spent two hours manually recovering data at midnight. Nobody got hurt 
badly but I still remember the feeling of not knowing what else I'd broken. 
That's exactly what the new developer in this scenario describes — being 
afraid to touch things because you don't know what will break.
## Q3: What does this team need MOST right now? Pick ONE thing.
Tests as living documentation. Not a comprehensive test suite — 
just enough tests that the new developer can touch the payroll module 
without calling the senior dev every time. The senior dev's knowledge 
needs to live in code, not in his head. One well-written regression 
test that explains what salary→payslip depends on is worth more than 
twenty UI tests that check page titles.

## Q4: How do you get the senior dev to care about quality?
I wouldn't try to convince him. In my first week I'd ask him to walk 
me through the payroll module — not to audit it, but because I genuinely 
need to understand it. While he explains, I'd write down the dependencies 
he describes. Then I'd write one test that captures exactly what he just 
told me, show it to him, and say "does this match what you meant?" 

That test is now his knowledge, not just his memory. The next time 
something breaks in that module, the test catches it before he has to. 
He doesn't need to believe in QA — he just needs to see that the test 
saved him 20 minutes of debugging.

## Q5: Connect your test strategy to something personal.
When I was preparing for exams I tried following a strict study schedule 
once — specific topics at specific times, very organized on paper. I 
abandoned it in three days because it didn't match how I actually study. 
What worked was simpler: I kept a single list of things I didn't understand 
yet, and every day I picked from that list based on what I felt ready for. 
No rigid structure, just a clear signal of what needed attention.

That's how I think about quality systems too. A 200-test suite that 
nobody runs is worse than 10 tests that everyone trusts. The regression 
suite I built here isn't comprehensive — it covers the paths that matter 
most and that developers will actually look at when something breaks. 
A quality system that fits how the team works will outlast a perfect 
system that doesn't.