using AmbientZero.Web.Client.Interfaces;
using AmbientZero.Web.Client.Services;
using AmbientZero.Web.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(
    options => options.AddDefaultPolicy(
        policy => policy.WithOrigins([builder.Configuration["BackendUrl"] ?? "https://localhost:5001",
            builder.Configuration["FrontendUrl"] ?? "https://localhost:5002"])
            .AllowAnyMethod()
            .AllowAnyHeader()));

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

builder.Services.AddBlazorBootstrap();

// Add HttpClient for making external web API calls to the Backend server API
builder.Services.AddHttpClient();

// For prerendering purposes, register a named HttpClient for the app's
// named client component example.
builder.Services.AddHttpClient("WebAPI", client =>
    client.BaseAddress = new Uri(builder.Configuration["BackendUrl"] ?? "https://localhost:5000"));

// Add Todo service for components adopting SSR
builder.Services.AddScoped<IClientTemperatureService, ClientTemperatureService>();
builder.Services.AddScoped<IClientSensorService, ClientSensorService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
}

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(AmbientZero.Web.Client._Imports).Assembly);

app.Run();
