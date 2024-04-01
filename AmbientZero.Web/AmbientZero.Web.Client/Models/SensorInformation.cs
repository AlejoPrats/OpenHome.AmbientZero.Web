namespace AmbientZero.Web.Client.Models
{
    public class SensorInformation
    {
        public int Id { get; set; }
        public string DeviceId { get; set; }
        public string? DeviceVirtualName { get; set; }
        public int? ADCReading { get; set; }
        public bool? IsSignaling { get; set; }
        public DateTime LastReadingTime { get; set; }
        public float? LastReadingValue { get; set; }
        public string TemperatureTendency { get; set; }
        public SensorSettings SensorSetting { get; set; }
        public string DisplayName => string.IsNullOrEmpty(DeviceVirtualName) ? $"{DeviceId}*" : DeviceVirtualName;
        public double CleanTemperature => LastReadingValue.HasValue ? Math.Round(LastReadingValue!.Value, 1) : 0;
    }
}
