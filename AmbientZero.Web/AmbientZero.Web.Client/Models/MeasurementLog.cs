namespace AmbientZero.Web.Client.Models
{
    public class MeasurementLog
    {
        public int Id { get; set; }
        public string DeviceId { get; set; }
        public decimal Temperature { get; set; }
        public DateTime Date { get; set; }
        public string SensorVirtualName { get; set; }
        public string ShortDateTime => Date.ToString("HH:mm");
        public decimal CleanTemperature => Math.Round(Temperature, 1);
        public string Name => string.IsNullOrEmpty(SensorVirtualName) ? DeviceId : SensorVirtualName;
    }
}
