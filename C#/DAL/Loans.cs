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
    
    public partial class Loans
    {
        public int id_loan { get; set; }
        public string id_user { get; set; }
        public System.DateTime date_ofLoan { get; set; }
        public int sum { get; set; }
        public int prisa { get; set; }
        public double ribit { get; set; }
        public int days_toGetMailAlert { get; set; }
    
        public virtual User User { get; set; }
    }
}
