using ContosoUniversity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
var CorsPolicy = "_CorsPolicy";
// Add services to the container.
//add new line
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<ContosoUniversityContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("ContosoUniversityContextString")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: CorsPolicy,
                policy =>
                {
                    policy.WithOrigins("*") //is that 3000?
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
});


//end

var app = builder.Build();



// newly Added { } 

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
//add new line
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
//end



using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ContosoUniversityContext>();
        context.Database.EnsureCreated();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}
//end





app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(CorsPolicy);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

/*app.UseCors();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints();
app.UseStaticFiles();*/