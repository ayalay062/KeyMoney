
namespace DTO
{
    using System;
    using System.Collections.Generic;
    
    public  class UserDto
    {
        public UserDto()
        {
          }
    
        public string id_user { get; set; }
        public string name_user { get; set; }
        public string tel { get; set; }
        public int misgeret { get; set; }
        public string email { get; set; }
    
         public List<Amuta_depositsDto> Amuta_deposits { get; set; }
        public List<LoansDto> Loans { get; set; }
        public List<User_expenseDto> User_expense { get; set; }
       public List<User_incomeDto> User_income { get; set; }
    }
}
