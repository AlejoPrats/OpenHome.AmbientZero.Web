using AmbientZero.Web.Client.Models;

namespace AmbientZero.Web.Client.Interfaces
{
    public interface IClientSensorService
    {
        Task<List<SensorInformation>> GetSensorInformation(DateTime? dateTime = null);
        Task<HttpResponseMessage> UpdateSensorName(string deviceId, string sensorVirtualName);
        Task<HttpResponseMessage> UpdateSensorSetting(SensorSettings sensorSettings);
    }
}
