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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(string id)
        {
            return HandleResults(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/setmain")]
        public async Task<IActionResult> SetMainPhoto(string id)
        {
            return HandleResults(await Mediator.Send(new SetMain.Command { Id = id }));
        }
    }
}
