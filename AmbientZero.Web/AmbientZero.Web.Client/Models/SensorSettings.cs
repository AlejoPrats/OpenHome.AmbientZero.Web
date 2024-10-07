namespace AmbientZero.Web.Client.Models
{
    public class SensorSettings
    {
        public string DeviceId { get; set; }
        public bool IsLightEnabled { get; set; }
        public bool IsScheduled { get; set; }
        public TimeOnly? DisableStartTime { get; set; }
        public TimeOnly? DisableEndTime { get; set; }
    }
}
