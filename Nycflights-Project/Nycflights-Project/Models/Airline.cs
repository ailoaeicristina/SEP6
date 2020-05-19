using System.ComponentModel.DataAnnotations;

namespace Nycflights_Project.Models
{
    public class Airline
    {
        [Key]
        public string Carrier { get; set; }
        public string Name { get; set; }
    }
}
