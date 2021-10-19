

namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class IncomeConvertion
    {
        public static IncomeDto convertToDto(Income income)
        {
            IncomeDto newIncome = new IncomeDto();
            newIncome.id_income = income.id_income;
            newIncome.name_income = income.name_income;
            return newIncome;
        }

        public static List<IncomeDto> convertToListDto(List<Income> income)
        {

            List<IncomeDto> newIncome = new List<IncomeDto>();
            income.ForEach(x =>
            {
                newIncome.Add(convertToDto(x));
            });
            return newIncome;
        }

        public static Income convertToIncome(IncomeDto income)
        {
            Income newIncome = new Income();
            newIncome.id_income = income.id_income;
            newIncome.name_income = income.name_income;
            return newIncome;

        }

    }
}
