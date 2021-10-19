
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
    
        public  UserDto User { get; set; }
    }
}
