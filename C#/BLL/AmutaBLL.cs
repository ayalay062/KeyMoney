using System;
using System.Collections.Generic;
using System.Linq;
using DAL;using DTO;

namespace BLL
{
   public static class AmutaBLL
    {
       public static List<AmutaDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta.ToList();
                return AmutaConvertion.convertToListDto(ads);

            }
        }

       public static AmutaDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta.FirstOrDefault(r => r.id_amuta == id);
                if (ads == null)
                {
                    return null;
                }
                return AmutaConvertion.convertToDto(ads);

            }
        }


       public static AmutaDto GetByName(string amuta_desc)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Amuta.FirstOrDefault(d => d.name_amuta == amuta_desc);
                if (ads == null)
                {
                    return null;
                }
                return AmutaConvertion.convertToDto(ads);

            }
        }

       public static AmutaDto AddAmuta(AmutaDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = AmutaConvertion.convertToAmuta(a);
                var ads = db.Amuta.Add(ad);
                db.SaveChanges();
                return AmutaConvertion.convertToDto(ads);

            }
        }
       public static AmutaDto UpdateAmuta(AmutaDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                Amuta a = db.Amuta.FirstOrDefault(u => u.id_amuta == aa.id_amuta);
                if (a != null)
                {
                    a.name_amuta = aa.name_amuta;
                    db.SaveChanges();
                    return AmutaConvertion.convertToDto(a);
                }

                return null;
            }
        }
       public static bool DeleteAmuta(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Amuta a = db.Amuta.FirstOrDefault(u => u.id_amuta == id);
                if (a != null)
                {
                    db.Amuta.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }
    
    }
}
