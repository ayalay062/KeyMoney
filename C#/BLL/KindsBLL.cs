using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;


using DAL;using DTO;
namespace BLL
{
   public static class KindsBLL
    {
       public static List<KindsDto> GetAll()
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Kinds.ToList();
                return KindsConvertion.convertToListDto(ads);

            }
        }

       public static KindsDto GetById(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Kinds.FirstOrDefault(r => r.id_kind == id);
                if (ads == null)
                {
                    return null;
                }
                return KindsConvertion.convertToDto(ads);

            }
        }


       public static KindsDto GetByName(string Kinds_desc)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ads = db.Kinds.FirstOrDefault(d => d.name_kind == Kinds_desc);
                if (ads == null)
                {
                    return null;
                }
                return KindsConvertion.convertToDto(ads);

            }
        }

       public static KindsDto AddKinds(KindsDto a)
        {
            using (var db = new KeyMoneyEntities())
            {
                var ad = KindsConvertion.convertToKinds(a);
                var ads = db.Kinds.Add(ad);
                return KindsConvertion.convertToDto(ads);

            }
        }
       public static KindsDto UpdateKinds(KindsDto aa)
        {
            using (var db = new KeyMoneyEntities())
            {
                Kinds a = db.Kinds.FirstOrDefault(u => u.id_kind == aa.id_kind);
                if (a != null)
                {
                    a.name_kind = aa.name_kind;
                    db.SaveChanges();
                    return KindsConvertion.convertToDto(a);
                }

                return null;
            }
        }
       public static bool DeleteKinds(int id)
        {
            using (var db = new KeyMoneyEntities())
            {
                Kinds a = db.Kinds.FirstOrDefault(u => u.id_kind == id);
                if (a != null)
                {
                    db.Kinds.Remove(a);
                    db.SaveChanges();
                    return true;
                }

                return false;
            }
        }

    }
}