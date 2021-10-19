
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class User_incomeConvertion
    {
        public static User_incomeDto convertToDto(User_income user_income)
        {
            User_incomeDto newUser_income = new User_incomeDto();
            newUser_income.id = user_income.id;
            newUser_income.income_date = user_income.income_date;
            newUser_income.id_kind = user_income.id_kind;
            newUser_income.id_user = user_income.id_user;
            newUser_income.id_income = user_income.id_income;
            newUser_income.sum = user_income.sum;
          //  newUser_income.User = user_income.User;
         //   newUser_income.Kinds = user_income.Kinds;
          //  newUser_income.Income = user_income.Income;
            return newUser_income;
        }

        public static List<User_incomeDto> convertToListDto(List<User_income> user_income)
        {

            List<User_incomeDto> newUser_income = new List<User_incomeDto>();
            user_income.ForEach(x =>
            {
                newUser_income.Add(convertToDto(x));
            });
            return newUser_income;
        }

        public static User_income convertToUser_income(User_incomeDto user_income)
        {
            User_income newUser_income = new User_income();
            newUser_income.id = user_income.id;
            newUser_income.income_date = user_income.income_date;
            newUser_income.id_kind = user_income.id_kind;
            newUser_income.id_user = user_income.id_user;
            newUser_income.id_income = user_income.id_income;
            newUser_income.sum = user_income.sum;
        //    newUser_income.User = user_income.User;
       //     newUser_income.Kinds = user_income.Kinds;
        //    newUser_income.Income = user_income.Income;
            return newUser_income;

        }

    }
}
