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
    [RoutePrefix("api/Expenses")]
    public class ExpensesController : ApiController
    {


        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(ExpensesBLL.GetAll());

        }
        [Route("GetById/{id}")]

        public IHttpActionResult GetById(int id)
        {
            var ad = ExpensesBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Expenses isn't defined"));
        }
        [Route("GetByName/{name}")]

        public IHttpActionResult GetByName(string name)
        {
            var ad = ExpensesBLL.GetByName(name);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Expenses isn't defined"));
        }
        [HttpPost]
        [Route("AddExpenses")]
        public IHttpActionResult AddExpenses(ExpensesDto ad)
        {
            var addedValue = ExpensesBLL.AddExpenses(ad);
            return Ok(addedValue);
        }
        [HttpPut]
        [Route("UpdateExpenses")]
        public IHttpActionResult UpdateExpenses(ExpensesDto ad)
        {
            var addedValue = ExpensesBLL.UpdateExpenses(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteExpenses/{id}")]
        public IHttpActionResult DeleteExpenses(int id)
        {
            var res = ExpensesBLL.DeleteExpenses(id);
            return Ok(res);
        }
    }
}



       