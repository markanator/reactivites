using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseAPIController
    {
        [HttpPost]
        public async Task<IActionResult> AddPhoto([FromForm] Add.Command command)
        {
            return HandleResults(await Mediator.Send(command));
        }
    }
}
