using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator mediator;

        public ChatHub(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            // create group for activty
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            // fetch list of comments for given activity
            var result = await mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
            // return that list to the connected user
            await Clients.Caller.SendAsync("LoadComments", result.Data);
        }

        // send a comment
        public async Task SendComment(Create.Command command)
        {
            var comment = await mediator.Send(command);

            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Data);
        }
    }
}
