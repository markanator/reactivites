using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseAPIController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResults(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResults(await Mediator.Send(command));
        }
        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username, string predicate)
        {
            return HandleResults(await Mediator.Send(new ListProfileActivities.Query
            { Username = username, Predicate = predicate }));
        }
    }
}
