namespace ExampleReactApp.Server
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Identity.Abstractions;
    using Microsoft.Identity.Web;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var baseAddress = this.Configuration.GetValue<string>("Api:BaseAddress")
                ?? throw new InvalidOperationException("Base Address not found.");

            var domainHint = this.Configuration.GetValue<string>("Api:DomainHint")
                ?? throw new InvalidOperationException("Domain Hint not found.");

            var clientId = this.Configuration.GetValue<string>("Api:ClientId")
                ?? throw new InvalidOperationException("Client Id not found.");

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddMicrosoftIdentityWebApi(
                        this.Configuration,
                        subscribeToJwtBearerMiddlewareDiagnosticsEvents: true)
                    .EnableTokenAcquisitionToCallDownstreamApi()
                    .AddDownstreamApi("api",
                        options =>
                        {
                            options.AcquireTokenOptions = new AcquireTokenOptions
                            {
                                ExtraQueryParameters = new Dictionary<string, string>
                                {
                                    ["domain_hint"] = domainHint
                                },
                                Tenant = string.Empty
                            };
                            options.BaseUrl = baseAddress;
                            options.Scopes = new string[]
                            {
                                clientId
                            };
                        })
                    .AddInMemoryTokenCaches();

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
