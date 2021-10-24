﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using DAL;
using DTO;
namespace BLL
{
    public static class GraphBLL
    {


        // הוצאות של משתמש לפי חודשים
        public static List<string> GetMonthsByYear(string id_user, int year)
        {
            //מטבלת ההוצאות של כל המשתמשים, מבקשים לשלוף רק את ההוצאות של המשתמש עם הסיסמה שהתקבלה
            using (var db = new KeyMoneyEntities())
            {
                var allUExpenses = db.User_expense
                      .Where(o => o.id_user == id_user &&
                      o.expense_date.HasValue && o.expense_date.Value.Year == year);

                var m = from allUexp in allUExpenses
                        group allUexp by allUexp.expense_date.Value.Month;

                var allIncomes = db.User_income
               .Where(o => o.id_user == id_user &&
               o.income_date.HasValue && o.income_date.Value.Year == year);


                var n = from alInc in allIncomes
                        group alInc by alInc.income_date.Value.Month;

                string[] months = new string[13];

                for (int i = 1; i < 13; i++)
                {
                    var e_count = m.FirstOrDefault(allExp => allExp.Key == i);
                    var ex = e_count != null ? e_count.Sum(y => y.sum) : 0;
                    var inc_count = n.FirstOrDefault(a => a.Key == i);
                    var inc = inc_count != null ? inc_count.Sum(y => y.sum) : 0;
                    months[i - 1] = ex + "," + inc;
                }


                return months.ToList();
            }
        }

        // מיון הכנסות/ הוצאות לפי קטגוריה
        public static List<int> GetCategory(string id_user, bool ctgry)
        {
            using (var db = new KeyMoneyEntities())
            {
                var allUExpenses = db.User_expense.Where(o => o.id_user == id_user);


                var e = from allUExp in allUExpenses
                        group allUExp by allUExp.id_expense;

                var cat = db.Expenses.Count();
                int[] expenses = new int[cat];

                for (int i = 0; i < cat; i++)
                {
                    var id_expense = db.Expenses.ToList()[i].id_expense;
                    var e_count = e.FirstOrDefault(allExp => allExp.Key == id_expense);
                    expenses[i] = e_count != null ? e_count.Sum(x => x.sum) : 0;
                }
                return expenses.ToList();
            }
        }

        // הוצאות של משתמש לפי שנות פעילות
        public static List<int> GetYears(string id_user, bool p)
        {
            //מטבלת ההוצאות של כל המשתמשים, מבקשים לשלוף רק את ההוצאות של המשתמש עם הסיסמה שהתקבלה
            using (var db = new KeyMoneyEntities())
            {
                var allUExpenses = db.User_expense.Where(o => o.id_user == id_user);

                //קיבוץ הוצאות לפי שנים
                var y = from allUexp in allUExpenses
                        group allUexp by allUexp.expense_date.Value.Year;

                //למצוא את השנה המינימלית והמקסימלית של המשתמש, בשביל טווח
                int maxYear = y.Max(m => m.Key);
                int minYear = y.Min(m => m.Key);

                int size = maxYear - minYear;
                int[] years = new int[size];

                foreach (var item in y)
                {
                    years[minYear] = item.Count();
                    minYear++;
                }

                return years.ToList();
            }
        }


    }
}
