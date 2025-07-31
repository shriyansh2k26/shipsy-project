Project Expense Calculator


                                    Description


Link: https://shipsy-project-2k3h.vercel.app/
GitHub :https://github.com/shriyansh2k26/shipsy-project


AI prompt used 
Asked for CSS for my form:for good ui.
How to use localstorage at browser to store the data such that after refreshing the data is not lost. 
Date function in react to know the current date.






Quality assurance test cases 
Positive Test Cases




Scenario


Expected Result
1
Add valid expense


Expense is added, success message shown, balance updated
2
Default today’s date is set


Expense form and filter should show today’s date
3
Filter by date


Only expenses for that date should show
4
Filter by category


Only matching category expenses show
5
Clear filters


All filters reset, and full expense list shown
6
Delete expense


Expense is removed, message shows "Expense deleted."
7
LocalStorage persistence


Expenses should persist and reload from localStorage
8
Amount totals correctly


Balance should be the correct sum of visible (filtered) expenses


Negative Test Cases




Scenario


Expected Result
1
Missing fields


Message: "Please fill in all fields."
2
Invalid amount (negative)


Message: "Enter a valid positive amount."
3
Invalid amount (non-numeric)


Message: "Enter a valid positive amount."
4
Future date


Message: "Future date not allowed."
5
Delete cancellation


No deletion should occur
6
Invalid localStorage data


Console logs error, app does not crash, empty list shown



Edge Cases




Scenario


Expected Result
1
Add expense with same description/category/date multiple times


All entries added and shown separately
2
Add expense with decimal amount


Amount is accepted and total reflects decimal
3
Rapid addition/deletion


State updates without crashing or incorrect total
4
Filter with no match


Table is empty, total = ₹0.00


