using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;

namespace API.Middleware
{
  public class ExceptionMiddleware
  {
    private readonly ILogger<ExceptionMiddleware> _logger;
    private RequestDelegate _next { get; }
    private IHostEnvironment _env { get; }
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
      _logger = logger;
      _env = env;
      _next = next;

    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (System.Exception ex)
      {
        // log to terminal
        _logger.LogError(ex, ex.Message);
        // begin formatting for response
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        // add stack trace if in DEV
        var response = _env.IsDevelopment()
              ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
              : new AppException(context.Response.StatusCode, "Server Error");
        // Need to output JSON
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);
        // main output
        await context.Response.WriteAsync(json);
      }
    }
  }
}