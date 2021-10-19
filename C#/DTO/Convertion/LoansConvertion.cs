
namespace DTO
{
    using System;
    using System.Collections.Generic;
    using DAL;
    public class LoansConvertion
    {
        public static LoansDto convertToDto(Loans loan)
        {
            LoansDto newLoans = new LoansDto();
            newLoans.id_loan = loan.id_loan;
            newLoans.id_user = loan.id_user;
            newLoans.prisa = loan.prisa;
            newLoans.ribit = loan.ribit;
            newLoans.sum = loan.sum;
            return newLoans;
        }

        public static List<LoansDto> convertToListDto(List<Loans> loan)
        {

            List<LoansDto> newLoans = new List<LoansDto>();
            loan.ForEach(x =>
            {
                newLoans.Add(convertToDto(x));
            });
            return newLoans;
        }

        public static Loans convertToLoans(LoansDto loan)
        {
            Loans newLoans = new Loans();
            newLoans.id_loan = loan.id_loan;
            newLoans.id_user = loan.id_user;
            newLoans.prisa = loan.prisa;
            newLoans.ribit = loan.ribit;
            newLoans.sum = loan.sum;
            return newLoans;

        }

    }

}
