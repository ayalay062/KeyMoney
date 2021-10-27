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
    [RoutePrefix("api/Loans")]
    public class LoansController : ApiController
    {


     
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(LoansBLL.GetAll());

        }
        [Route("GetByUserId/{id}")]

        public IHttpActionResult GetByUserId(string id)
        {
            var ad = LoansBLL.GetByUserId(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Loans aren't defined"));
        }
        [HttpGet]
        [Route("CalculateLoanByMonth/{id}/{month}/{year}")]
        public IHttpActionResult CalculateLoanByMonth(string id, int month, int year)
        {
            var ad = LoansBLL.CalculateLoanByMonth(id, month, year);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Loans aren't defined"));
        }
        [Route("GetById/{id}")]

        public IHttpActionResult GetById(int id)
        {
            var ad = LoansBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Loans aren't defined"));
        }
        [HttpPost]
        [Route("AddLoans")]
        public IHttpActionResult AddLoans(LoansDto ad)
        {
            var addedValue = LoansBLL.AddLoans(ad);
            return Ok(addedValue);
        }
       [HttpPost]
        [Route("UpdateLoans")]
        public IHttpActionResult UpdateLoans(LoansDto ad)
        {
            var addedValue = LoansBLL.UpdateLoans(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteLoans/{id}")]
        public IHttpActionResult DeleteLoans(int id)
        {
            var res = LoansBLL.DeleteLoans(id);
            return Ok(res);
        }
    }
}
