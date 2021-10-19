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
    [RoutePrefix("api/Amuta")]
    public class AmutaController : ApiController
    {


        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(AmutaBLL.GetAll());

        }
        [Route("GetById/{id}")]

        public IHttpActionResult GetByUserId(int id)
        {
            var ad = AmutaBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Amuta isn't defined"));
        }

        [HttpPost]
        [Route("AddAmuta")]
        public IHttpActionResult AddAmuta(AmutaDto ad)
        {
            var addedValue = AmutaBLL.AddAmuta(ad);
            return Ok(addedValue);
        }
        [HttpPut]
        [Route("UpdateAmuta")]
        public IHttpActionResult UpdateAmuta(AmutaDto ad)
        {
            var addedValue = AmutaBLL.UpdateAmuta(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteAmuta/{id}")]
        public IHttpActionResult DeleteAmuta(int id)
        {
            var res = AmutaBLL.DeleteAmuta(id);
            return Ok(res);
        }
    }
}


  

      

    