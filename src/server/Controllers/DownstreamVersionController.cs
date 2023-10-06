namespace ExampleReactApp.Server.Controllers
{
    using ExampleReactApp.Server.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Identity.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class DownstreamVersionController : ControllerBase
    {
        [HttpGet]
        public async Task<DownstreamVersionInfo?> Get([FromServices] IDownstreamApi api, CancellationToken token)
        {
            return await api.CallApiForUserAsync<DownstreamVersionInfo>(
                "api",
                options =>
                {
                    options.HttpMethod = HttpMethod.Get.Method;
                    options.RelativePath = $"api/Version/Get";
                },
                cancellationToken: token)
                .ConfigureAwait(false);
        }
    }
}
