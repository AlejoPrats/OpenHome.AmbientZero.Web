using System.Text.Json.Serialization;

namespace AmbientZero.Web.Client.Models
{
    public class UpdateNameRequest
    {
        [JsonPropertyName("DeviceId")]
        public string DeviceId { get; set; }

        [JsonPropertyName("VirtualName")]
        public string VirtualName { get; set; }
    }
}
