
namespace DTO
{
    using System;
    using System.Collections.Generic;
    
    public  class User_expenseDto
    {
        public int id { get; set; }
        public int id_expense { get; set; }
        public int id_kind { get; set; }
        public string id_user { get; set; }
        public int sum { get; set; }
        public DateTime expense_date { get; set; }
        public string expense_info { get; set; }
        public ExpensesDto Expenses { get; set; }
        public KindsDto Kinds { get; set; }
        public UserDto User { get; set; }
    }
}
