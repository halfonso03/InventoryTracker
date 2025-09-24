using API.Infrastructure;
using API.Persistence;
using API.Persistence.Models.Domain;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddAutoMapper(config => config.AddProfile<MappingProfiles>());

builder.Services.AddTransient<IItemService, ItemService>();
builder.Services.AddTransient<IDataService<Initiative>, DataService<Initiative>>();
builder.Services.AddTransient<IDataService<Person>, DataService<Person>>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(x =>
    x.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));



// app.UseAuthentication();
// app.UseAuthorization();

// app.UseDefaultFiles();
// app.UseStaticFiles();



app.MapControllers();
//app.MapFallbackToController("Index", "Fallback");


using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;


try
{
    var context = services.GetRequiredService<AppDbContext>();
    // var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "migration error");
}


app.Run();