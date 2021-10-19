using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using DAL;using DTO;
namespace BLL
{
   public static class GraphBLL
    {
     

        // הוצאות של משתמש לפי חודשים
       public static List<int> GetMonths(string id_user, bool p)
        {
            //מטבלת ההוצאות של כל המשתמשים, מבקשים לשלוף רק את ההוצאות של המשתמש עם הסיסמה שהתקבלה
            using (var db = new KeyMoneyEntities())
            {
                IEnumerable<User_expense> allUExpenses = db.User_expense.Where(o => o.id_user == id_user);

                var m = from allUexp in allUExpenses
                        group allUexp by allUexp.expense_date.Value.Month;

                int[] months = new int[13];
                int x = 1;
                foreach (var item in m)
                {
                    months[x] = item.Count();
                    x++;
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
                    expenses[i] = e_count != null ? e_count.Count() : 0;
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
