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
    [RoutePrefix("api/Income")]
    public class IncomeController : ApiController
    {


        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(IncomeBLL.GetAll());

        }
        [Route("GetById/{id}")]

        public IHttpActionResult GetById(int id)
        {
            var ad = IncomeBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Income isn't defined"));
        }
        [Route("GetByName/{name}")]

        public IHttpActionResult GetByName(string name)
        {
            var ad = IncomeBLL.GetByName(name);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Income isn't defined"));
        }
        [HttpPost]
        [Route("AddIncome")]
        public IHttpActionResult AddIncome(IncomeDto ad)
        {
            var addedValue = IncomeBLL.AddIncome(ad);
            return Ok(addedValue);
        }
        [HttpPut]
        [Route("UpdateIncome")]
        public IHttpActionResult UpdateIncome(IncomeDto ad)
        {
            var addedValue = IncomeBLL.UpdateIncome(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteIncome/{id}")]
        public IHttpActionResult DeleteIncome(int id)
        {
            var res = IncomeBLL.DeleteIncome(id);
            return Ok(res);
        }
    }
}
