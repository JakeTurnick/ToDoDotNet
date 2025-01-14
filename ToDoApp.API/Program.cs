using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ToDoApp.API.Data;
using ToDoApp.API.Extensions;
using ToDoApp.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwagger(); // From extension
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppIdentityDbContext>(options =>
    options.UseInMemoryDatabase("InMemDB"));
builder.RegisterAuthentication();
builder.Services.AddScoped<IdentityService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevOrigin", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("DevOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
