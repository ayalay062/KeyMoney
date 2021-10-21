
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class User_expenseConvertion
    {
        public static User_expenseDto convertToDto(User_expense user_expense)
        {
            User_expenseDto newUser_expense = new User_expenseDto();
            newUser_expense.id = user_expense.id;
            newUser_expense.id_expense = user_expense.id_expense;
            newUser_expense.id_kind = user_expense.id_kind;
            newUser_expense.id_user = user_expense.id_user;
            newUser_expense.sum = user_expense.sum;
            newUser_expense.expense_date = user_expense.expense_date;
           // newUser_expense.User = user_expense.User;
           // newUser_expense.Kinds = user_expense.Kinds;
            return newUser_expense;
        }

        public static List<User_expenseDto> convertToListDto(List<User_expense> user_expense)
        {

            List<User_expenseDto> newUser_expense = new List<User_expenseDto>();
            user_expense.ForEach(x =>
            {
                newUser_expense.Add(convertToDto(x));
            });
            return newUser_expense;
        }

        public static User_expense convertToUser_expense(User_expenseDto user_expense)
        {
            User_expense newUser_expense = new User_expense();
            newUser_expense.id = user_expense.id;
            newUser_expense.id_expense = user_expense.id_expense;
            newUser_expense.id_kind = user_expense.id_kind;
            newUser_expense.id_user = user_expense.id_user;
            newUser_expense.sum = user_expense.sum;
            newUser_expense.expense_date = user_expense.expense_date;

            //  newUser_expense.User = user_expense.User;
            // newUser_expense.Kinds = user_expense.Kinds;
            return newUser_expense;

        }

    }

}
