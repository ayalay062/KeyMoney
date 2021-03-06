
namespace DTO
{
    using System;
    using System.Collections.Generic;
    
    public  class LoansDto
    {
        public int id_loan { get; set; }
        public string id_user { get; set; }
        public System.DateTime date_ofLoan { get; set; }
        public int sum { get; set; }
        public int prisa { get; set; }
        public double ribit { get; set; }
        public int days_toGetMailAlert { get; set; }
        public int id_expense { get; set; }
        public string loan_info { get; set; }

        public  UserDto User { get; set; }
        public  ExpensesDto Expenses { get; set; }

        

        public double sum_month { get; set; }
    }
}
