﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class KeyMoneyEntities : DbContext
    {
        public KeyMoneyEntities()
            : base("name=KeyMoneyEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Amuta> Amuta { get; set; }
        public virtual DbSet<Amuta_deposits> Amuta_deposits { get; set; }
        public virtual DbSet<Expenses> Expenses { get; set; }
        public virtual DbSet<Income> Income { get; set; }
        public virtual DbSet<Kinds> Kinds { get; set; }
        public virtual DbSet<Loans> Loans { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<User_expense> User_expense { get; set; }
        public virtual DbSet<User_income> User_income { get; set; }
    }
}
