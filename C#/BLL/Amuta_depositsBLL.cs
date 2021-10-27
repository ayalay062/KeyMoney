using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using DAL;
using DTO;
namespace BLL
{
    public static class Amuta_depositsBLL
    {

        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        public static List<Amuta_depositsDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta_deposits.ToList();
                return Amuta_depositsConvertion.convertToListDto(ads);

            }
        }
        public static Amuta_depositsDto GetByUserId(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta_deposits.FirstOrDefault(r => r.id_user == id);
                return Amuta_depositsConvertion.convertToDto(ads);

            }
        }
        public static Amuta_depositsDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta_deposits.Include("Amuta").FirstOrDefault(r => r.id_deposit == id);
                return Amuta_depositsConvertion.convertToDto(ads);

            }
        }
        public static List<Amuta_depositsDto> GetAllByUserDate(string id, int month, int year)
        {

            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta_deposits.Include("Amuta").Where(r => r.id_user == id && r.dateOfDeposit.Year == year && r.dateOfDeposit.Month == month)
                   .OrderBy(x => x.dateOfDeposit).ToList();
                if (ads == null)
                {
                    return null;
                }
                return Amuta_depositsConvertion.convertToListDto(ads);

            }
        }

        public static int GetCountAllUserDeposits(string id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var c = db.Amuta_deposits.Where(r => r.id_user == id).Count();
                return c;

            }
        }

        public static Amuta_depositsDto AddAmutaDeposits(Amuta_depositsDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = Amuta_depositsConvertion.convertToAmuta_deposits(a);
                var ads = db.Amuta_deposits.Add(ad);
                db.SaveChanges();
                return Amuta_depositsConvertion.convertToDto(ads);

            }
        }
        public static Amuta_depositsDto updateAmuta_deposits(Amuta_depositsDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                Amuta_deposits a = db.Amuta_deposits.FirstOrDefault(u => u.id_deposit == aa.id_deposit);
                if (a != null)
                {
                    a.sum = aa.sum;
                    a.dateOfDeposit = aa.dateOfDeposit;
                    a.id_amuta = aa.id_amuta;
                    db.SaveChanges();
                    return Amuta_depositsConvertion.convertToDto(a);
                }

                return null;
            }
        }
        public static bool DeleteAmuta_deposits(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Amuta_deposits a = db.Amuta_deposits.FirstOrDefault(u => u.id_deposit == id);
                if (a != null)
                {
                    db.Amuta_deposits.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }
}
