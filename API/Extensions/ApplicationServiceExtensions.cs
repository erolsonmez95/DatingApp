using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){
             //when service created then it's after usage auto destroyed.
            // if we need ITokenService, it will created from TokenService iff needed
            services.AddScoped<ITokenService, TokenService>();
    
            
            // using lambda expressions to pass expression
            // our expression is connection string
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            // in our config(appsettings.Development.json) file we only get default connection 

           return services; 

        }
    }
}