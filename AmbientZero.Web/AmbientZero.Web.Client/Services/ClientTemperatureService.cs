using AmbientZero.Web.Client.Interfaces;
using AmbientZero.Web.Client.Models;
using System.Net.Http.Json;

namespace AmbientZero.Web.Client.Services
{
    public class ClientTemperatureService(IHttpClientFactory ClientFactory) : IClientTemperatureService
    {
        public async Task<List<MeasurementLog>> GetDailyMeasurements(DateTime? dateTime = null)
        {
            var client = ClientFactory.CreateClient("WebAPI");
            dateTime ??= DateTime.Now;
            var requestUri = $"/AmbientTemperature?dateTime={dateTime.Value.ToShortDateString()}";
            return await client.GetFromJsonAsync<List<MeasurementLog>>(requestUri) ?? [];
        }
    }
}
