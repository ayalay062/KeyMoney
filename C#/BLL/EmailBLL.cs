using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;


using DAL;
using DTO;
namespace BLL
{
    public class EmailModel
    {
        public bool isResetPassword { get; set; }
        public string toname { get; set; }
        public string toemail { get; set; }
        public string subject { get; set; }
        public string message { get; set; }
    }
    public class EmailBLL
    {
        public static bool SendEmail(EmailModel objData)
        {
            MailMessage mail = new MailMessage();
            if (objData.isResetPassword)
            {
                var pass = "";
                using (var db = new KeyMoneyEntities())
                {
                    var user = db.User.FirstOrDefault(d => d.email == objData.toemail);
                    if (user != null)
                        pass = user.id_user;
                }
                if (pass == "")
                {
                    return false;
                }
      
                mail.Body = createEmailPassBody(pass, objData.message);

            }
            else
            {

                mail.Body = createEmailBody(objData.toname, objData.message);
                
            }
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("statist.project.it@gmail.com");
            mail.To.Add(objData.toemail);
            mail.Subject = objData.subject;
            mail.IsBodyHtml = true;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("statist.project.it@gmail.com", "p1stat1r");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
            return true;
        }





        private static string createEmailBody(string userName, string message)
        {
            var body = "<div>";
            if (userName != null)
                body += "<h3>הי  " + userName + "</h3>";
            body += "<span>" + message + "</span>";
            body += "</div>";
            return body;
        }

        private static string createEmailPassBody(string pass, string message)
        {
            var body = "<div>";

            body += "<span>" + message + "<strong>" + pass + "</strong></span>";
            body += "</div>";
            return body;
        }
    }

}
