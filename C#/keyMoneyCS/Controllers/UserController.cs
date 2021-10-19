using BLL; using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace keyMoneyCS.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {


        // GET: מציג רשימה של כל ההפקדות של כל המשתמשים לכל העמותות
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(UserBLL.GetAll());

        }
        [Route("GetByUserId/{id}")]

        public IHttpActionResult GetByUserId(string id)
        {
            var ad = UserBLL.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return InternalServerError(new Exception("The User isn't defined"));
        }
        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login(UserDto user)
        {
            var userDB = UserBLL.Login(user);
            if (userDB != null)
                return Ok(userDB);
            return InternalServerError();
        }

        [HttpPost]
        [Route("AddUser")]
        public IHttpActionResult AddUser(UserDto ad)
        {
            var addedValue = UserBLL.AddUser(ad);
            return Ok(addedValue);
        }
        [HttpPut]
        [Route("UpdateUser")]
        public IHttpActionResult UpdateUser(UserDto ad)
        {
            var addedValue = UserBLL.UpdateUser(ad);
            return Ok(addedValue);
        }
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public IHttpActionResult DeleteUser(string id)
        {
            var res = UserBLL.DeleteUser(id);
            return Ok(res);
        }
    }
}






     
     