SELECT user.name, year_id, month_id, expenseType.name, value 
FROM Expense AS expense, User AS user, ExpensiveType AS expenseType  
WHERE user.id=expense.user_id 
AND expense.expenseType_id=expenseType.id 
AND expense.month_id=1 
AND expense.year_id=2015