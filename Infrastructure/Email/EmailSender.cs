using Mailjet.Client;
using Mailjet.Client.Resources;
using Mailjet.Client.TransactionalEmails;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Email
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration config;
        private readonly ILogger<EmailSender> logger;

        public EmailSender(IConfiguration config, ILogger<EmailSender> _logger)
        {
            this.config = config;
            logger = _logger;
        }

        public async Task SendEmailAsync(string userEmail, string subject, string emailMessage)
        {
            var client = new MailjetClient(config["EmailService:ApiKey"], config["EmailService:Secret"]);
            var request = new MailjetRequest
            {
                Resource = Send.Resource,
            };

            // construct your email with builder
            var email = new TransactionalEmailBuilder()
                   .WithFrom(new SendContact(config["EmailService:FromEmail"], config["EmailService:FromName"]))
                   .WithSubject(subject)
                   .WithTextPart(emailMessage)
                   .WithHtmlPart(emailMessage)
                   .WithTo(new SendContact(userEmail))
                   .Build();

            // invoke API to send email
            var response = await client.SendTransactionalEmailAsync(email);
            if (response.Messages.Length > 0)
            {
                logger.LogInformation(response.Messages[0].Status);//.GetData().ToString());
            }
        }
    }
}
