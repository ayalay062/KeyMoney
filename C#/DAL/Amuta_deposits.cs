//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Amuta_deposits
    {
        public int id_deposit { get; set; }
        public int id_amuta { get; set; }
        public string id_user { get; set; }
        public int sum { get; set; }
        public System.DateTime dateOfDeposit { get; set; }
    
        public virtual Amuta Amuta { get; set; }
        public virtual User User { get; set; }
    }
}
