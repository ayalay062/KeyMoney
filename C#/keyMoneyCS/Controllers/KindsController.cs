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
    [RoutePrefix("api/Kinds")]
    public class KindsController : ApiController
    {


        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(KindsBLL.GetAll());

        }
        [Route("GetById/{id}")]

        public IHttpActionResult GetById(int id)
        {
            var ad = KindsBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Kinds isn't defined"));
        }
        [Route("GetByName/{name}")]

        public IHttpActionResult GetByName(string name)
        {
            var ad = KindsBLL.GetByName(name);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The Kinds isn't defined"));
        }
        [HttpPost]
        [Route("AddKinds")]
        public IHttpActionResult AddKinds(KindsDto ad)
        {
            var addedValue = KindsBLL.AddKinds(ad);
            return Ok(addedValue);
        }
        [HttpPut]
        [Route("UpdateKinds")]
        public IHttpActionResult UpdateKinds(KindsDto ad)
        {
            var addedValue = KindsBLL.UpdateKinds(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteKinds/{id}")]
        public IHttpActionResult DeleteKinds(int id)
        {
            var res = KindsBLL.DeleteKinds(id);
            return Ok(res);
        }
    }
}
