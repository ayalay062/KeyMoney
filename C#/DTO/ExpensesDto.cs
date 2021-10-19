
namespace DTO
{
    using System;
    using System.Collections.Generic;
    
    public  class ExpensesDto
    {
        public ExpensesDto()
        {
            
        }
    
        public int id_expense { get; set; }
        public string name_expense { get; set; }
   
        public List<User_expenseDto> User_expense { get; set; }
    }
}
