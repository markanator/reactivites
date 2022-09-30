using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected ActionResult HandleResults<T>(Results<T> results) {
            if (results == null) return NotFound();
            if (results.IsSuccess && results.Data != null) {
                return Ok(results.Data);
            }
            if (results.IsSuccess && results.Data == null) {
                return NotFound();
            }
            return BadRequest(results.Error);
        }

    }
}
