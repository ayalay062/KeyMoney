using BLL;
using DTO;
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

        // שליפת כל המשתמשים
        [Route("GetAll")]
        public IHttpActionResult Get()
        {
            return Ok(UserBLL.GetAll());

        }
        // שליפת משתמש עי המזהה
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
        //התחברות
        [Route("login")]
        [HttpPost]
        public IHttpActionResult Login(UserDto user)
        {
            var userDB = UserBLL.Login(user);
            if (userDB != null)
                return Ok(userDB);
            return BadRequest("שם משתמש או סיסמא לא תקינים");
        }
        //שינוי סטטוס
        [Route("SetStatusUser/{userId}/{isEnable}")]
        [HttpPost]
        public IHttpActionResult SetStatusUser(string userId, bool isEnable)
        {
            var userDB = UserBLL.SetStatusUser(userId, isEnable);
            if (userDB != null)
                return Ok(userDB);
            return BadRequest("המשתמש לא נמצא");
        }
        //חישוב יתרה על פי חודש ושנה
        [Route("calculateSum/{year}/{month}/{id}")]
        [HttpGet]
        public IHttpActionResult CalculateSum(int year, int month, string id)
        {
            var ad = UserBLL.CalculateSum(year, month, id);
            return Ok(ad);
        }

        //הוספת משתמש
        [HttpPost]
        [Route("AddUser")]
        public IHttpActionResult AddUser(UserDto ad)
        {
            var addedValue = UserBLL.AddUser(ad);
            if (addedValue == null) return BadRequest("משתמש קיים במערכת");
            return Ok(addedValue);
        }
        //עדכון משתמש
        [HttpPost]
        [Route("UpdateUser")]
        public IHttpActionResult UpdateUser(UserDto ad)
        {
            var addedValue = UserBLL.UpdateUser(ad);
            return Ok(addedValue);
        }
        //מחיקת משתמש
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public IHttpActionResult DeleteUser(string id)
        {
            var res = UserBLL.DeleteUser(id);
            return Ok(res);
        }
    }
}







