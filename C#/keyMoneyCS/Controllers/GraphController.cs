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
    [RoutePrefix("api/Graph")]
    public class GraphController : ApiController
    {


        [Route("GetMonthsByYear/{id_user}/{year}")]
        // הוצאות של משתמש לפי חודשים
        public IHttpActionResult GetMonthsByYear(string id_user, int year)
        {
         
            return Ok(GraphBLL.GetMonthsByYear(id_user, year));
        }

        [Route("GetCategory/{id_user}/{p}")]
        public IHttpActionResult GetCategory(string id_user, bool p)
        {
            return Ok(GraphBLL.GetCategory(id_user, p));
        }


        [Route("GetYears/{id_user}/{p}")]
        public IHttpActionResult GetYears(string id_user, bool p)
        {
            return Ok(GraphBLL.GetYears(id_user, p));
        }


    }
}
