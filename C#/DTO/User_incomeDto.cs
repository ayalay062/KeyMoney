
namespace DTO
{
    using System;
    using System.Collections.Generic;
    
    public class User_incomeDto
    {
        public int id { get; set; }
        public int id_income { get; set; }
        public int id_kind { get; set; }
        public string id_user { get; set; }
        public int sum { get; set; }
        public Nullable<System.DateTime> income_date { get; set; }
    
        public  IncomeDto Income { get; set; }
        public  KindsDto Kinds { get; set; }
        public  UserDto User { get; set; }
    }
}
