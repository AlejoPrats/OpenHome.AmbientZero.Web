using AmbientZero.Web.Client.Interfaces;
using AmbientZero.Web.Client.Services;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Add Todo service for components adopting CSR
builder.Services.AddScoped<IClientTemperatureService, ClientTemperatureService>();
builder.Services.AddScoped<IClientSensorService, ClientSensorService>();

// Create a preconfigured named HttpClient with base address for named client component example
builder.Services.AddHttpClient("WebAPI", client => client.BaseAddress = new Uri(builder.Configuration["BackendUrl"] ?? "localhost:5000"));

builder.Services.AddBlazorBootstrap();

await builder.Build().RunAsync();
