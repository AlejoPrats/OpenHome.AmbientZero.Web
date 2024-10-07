using AmbientZero.Web.Client.Interfaces;
using AmbientZero.Web.Client.Models;
using System.Net.Http.Json;

namespace AmbientZero.Web.Client.Services
{
    public class ClientSensorService(IHttpClientFactory ClientFactory) : IClientSensorService
    {
        public async Task<List<SensorInformation>> GetSensorInformation(DateTime? dateTime = null)
        {
            var client = ClientFactory.CreateClient("WebAPI");
            dateTime ??= DateTime.Now;
            var requestUri = $"/Sensor/GetSensorData";
            return await client.GetFromJsonAsync<List<SensorInformation>>(requestUri) ?? [];
        }

        public async Task<HttpResponseMessage> UpdateSensorName(string deviceId, string sensorVirtualName)
        {
            var client = ClientFactory.CreateClient("WebAPI");
            var requestUri = "/Sensor/UpdateSensorName";
            var requestObject = new UpdateNameRequest { DeviceId = deviceId, VirtualName = sensorVirtualName };
            return await client.PatchAsJsonAsync(requestUri, requestObject);
        }

        public async Task<HttpResponseMessage> UpdateSensorSetting(SensorSettings sensorSettings)
        {
            var client = ClientFactory.CreateClient("WebAPI");
            var requestUri = "/Sensor/UpdateSensorSettings";
            return await client.PatchAsJsonAsync(requestUri, sensorSettings);
        }

        public IEnumerable<TimeZoneInfo> timezone()
        {
            return TimeZoneInfo.GetSystemTimeZones();
        }
    }
}
