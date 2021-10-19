
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class ExpensesConvertion
    {
        public static ExpensesDto convertToDto(Expenses expenses)
        {
            ExpensesDto newExpenses = new ExpensesDto();
            newExpenses.id_expense = expenses.id_expense;
            newExpenses.name_expense = expenses.name_expense;
        

            return newExpenses;
        }

        public static List<ExpensesDto> convertToListDto(List<Expenses> expenses)
        {

            List<ExpensesDto> newExpenses = new List<ExpensesDto>();
            expenses.ForEach(x =>
            {
                newExpenses.Add(convertToDto(x));
            });
            return newExpenses;
        }

        public static Expenses convertToExpenses(ExpensesDto expenses)
        {
            Expenses newExpenses = new Expenses();
            newExpenses.id_expense = expenses.id_expense;
            newExpenses.name_expense = expenses.name_expense;
       

            return newExpenses;

        }

    }

}
