
namespace DTO
{
    using System;
    using System.Collections.Generic;
    
    public  class Amuta_depositsDto
    {
        public int id_deposit { get; set; }
        public int id_amuta { get; set; }
        public string id_user { get; set; }
        public int sum { get; set; }
        public Nullable<System.DateTime> dateOfDeposit { get; set; }
    
        public  AmutaDto Amuta { get; set; }
        public UserDto User { get; set; }
    }
}
