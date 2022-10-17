namespace Infrastructure.Email
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string userEmail, string EmailSubject, string message);
    }
}
