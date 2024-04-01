using AmbientZero.Web.Client.Models;

namespace AmbientZero.Web.Client.Interfaces
{
    public interface IClientTemperatureService
    {
        Task<List<MeasurementLog>> GetDailyMeasurements(DateTime? dateTime = null);
    }
}