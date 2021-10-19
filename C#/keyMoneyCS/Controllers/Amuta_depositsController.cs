using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL;
using DTO;
namespace keyMoneyCS.Controllers
{
    [RoutePrefix("api/Amuta_deposits")]
    public class Amuta_depositsController : ApiController
    {
       

        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(Amuta_depositsBLL.GetAll());

        }
        [Route("GetByUserId/{id}")]

        public IHttpActionResult GetByUserId(string id)
        {
            var ad = Amuta_depositsBLL.GetByUserId(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The person isn't defined"));
        }


        //להציג מתוך טבלת הפקדות של כל המשתמשים, הפקדות של משתמש מסויים
        //public IHttpActionResult allUserDeposits(string userId)
        //{
        //    IEnumerable<Amuta_deposits> allDeposits = db.Amuta_deposits.Where(o => o.id_user == userId);
        //    IEnumerable<User> allUsers = db.User;

        //    var h = from all in allUsers
        //            join deposit in allDeposits
        //            on all.id_user equals deposit.id_user
        //            select new
        //            {
        //                name = all.name_user,

        //            };

        //    return Ok(h);
        //}
        [Route("GetCountByUserId/{id}")]
        public IHttpActionResult GetCountByUserId(string id_user)
        {
            int Count = Amuta_depositsBLL.GetCountAllUserDeposits(id_user);

            return Ok(Count);
        }

        [HttpPost]
        [Route("AddAmutaDeposits")]
        public IHttpActionResult AddAmutaDeposits(Amuta_depositsDto ad)
        {
            var addedValue = Amuta_depositsBLL.AddAmutaDeposits(ad);      
            return Ok(addedValue);
        }

    }
}
