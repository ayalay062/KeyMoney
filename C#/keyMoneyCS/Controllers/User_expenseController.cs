using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL; using DTO;
namespace keyMoneyCS.Controllers
{
    [RoutePrefix("api/User_expense")]
    public class User_expenseController : ApiController
    {
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(User_expenseBLL.GetAll());

        }

        [Route("GetAllByUserDate/{year}/{month}/{id}")]

        public IHttpActionResult GetAllByUserDate(int year, int month, string id)
        {
            var ad = User_expenseBLL.GetAllByUserDate(year, month, id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Expenses isn't defined"));
        }


        [Route("GetByUserId/{id}")]

        public IHttpActionResult GetByUserId(string id)
        {
            var ad = User_expenseBLL.GetByUserId(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The User income isn't defined"));
        }

        [Route("GetById/{id}")]

        public IHttpActionResult GetById(int id)
        {
            var ad = User_expenseBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The User income isn't defined"));
        }
        [HttpPost]
        [Route("AddUserExpense")]
        public IHttpActionResult AddUser_expense(User_expenseDto ad)
        {
            var addedValue = User_expenseBLL.AddUser_expense(ad);
            return Ok(addedValue);
        }
       [HttpPost]
        [Route("UpdateUserExpense")]
        public IHttpActionResult UpdateUser_expense(User_expenseDto ad)
        {
            var addedValue = User_expenseBLL.UpdateUser_expense(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteUserExpense/{id}")]
        public IHttpActionResult DeleteUserExpense(int id)
        {
            var res = User_expenseBLL.DeleteUser_expense(id);
            return Ok(res);
        }
    }

}
