using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;


using DAL;using DTO;
namespace BLL
{
   public  class EmailModel
    {
       public  string toname { get; set; }
       public  string toemail { get; set; }
       public  string subject { get; set; }
       public  string message { get; set; }
    }
   public  class EmailBLL
    {
       public static bool SendEmail(EmailModel objData)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("statist.project.it@gmail.com");
            mail.To.Add(objData.toemail);
            mail.Subject = objData.subject;
            mail.IsBodyHtml = true;
            mail.Body = createEmailBody(objData.toname, objData.message);
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
                body += "<h1>Dear " + userName + "</h1>";
            body += "<span>" + message + "</span>";
            body += "</div>";
            return body;
        }
    }

}
