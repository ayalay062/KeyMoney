
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL; using DTO;
namespace keyMoneyCS.Controllers
{
    [RoutePrefix("api/email")]
    public class EmailController : ApiController
    {
        [HttpPost]
        [Route("sendEmail")]
        public void SendEmail(BLL.EmailModel objData)
        {

            EmailBLL.SendEmail(objData);

        }

    }
}
