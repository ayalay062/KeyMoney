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
    [RoutePrefix("api/User_income")]
    public class User_incomeController : ApiController
    {
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(User_incomeBLL.GetAll());

        }
        [Route("GetByUserId/{id}")]

        public IHttpActionResult GetByUserId(string id)
        {
            var ad = User_incomeBLL.GetByUserId(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The User income isn't defined"));
        }


        [Route("GetById/{id}")]

        public IHttpActionResult GetById(int id)
        {
            var ad = User_incomeBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The User income isn't defined"));
        }

        [Route("GetAllByUserDate/{year}/{month}/{id}")]

        public IHttpActionResult GetAllByUserDate(int year, int month, string id)
        {
            var ad = User_incomeBLL.GetAllByUserDate(year, month, id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Expenses isn't defined"));
        }

        [HttpPost]
        [Route("AddUserIncome")]
        public IHttpActionResult AddUser_income(User_incomeDto ad)
        {
            var addedValue = User_incomeBLL.AddUser_income(ad);
            return Ok(addedValue);
        }
       [HttpPost]
        [Route("UpdateUserIncome")]
        public IHttpActionResult UpdateUser_income(User_incomeDto ad)
        {
            var addedValue = User_incomeBLL.UpdateUser_income(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteUserIncome/{id}")]
        public IHttpActionResult DeleteUser_income(int id)
        {
            var res = User_incomeBLL.DeleteUser_income(id);
            return Ok(res);
        }
    }
}
