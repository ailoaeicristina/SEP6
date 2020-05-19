using Microsoft.AspNetCore.Mvc;
using Nycflights_Project.Models;
using System.Collections.Generic;
using System.Linq;

namespace Nycflights_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NycflightsController : Controller
    {
        // GET: api/Nycflights/FlightsPerMonth
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonth()
        {
            var context = new Nycflights13DBContext();

            Dictionary<int, string> monthsByNumber = new Dictionary<int, string>()
            { {1, "Jan" }, {2, "Feb"}, {3, "Mar"},  {4, "Apr"},  {5, "May"},  {6, "Jun"},
                {7, "Jul"},  {8, "Aug"},  {9, "Sep"},  {10, "Oct"},  {11, "Nov"},  {12, "Dec"}};

            return context.Flights.Select(f => f.Month).ToList().GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsPerMonthForJFK
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForJFK()
        {
            var context = new Nycflights13DBContext();

            Dictionary<int, string> monthsByNumber = new Dictionary<int, string>()
            { {1, "Jan" }, {2, "Feb"}, {3, "Mar"},  {4, "Apr"},  {5, "May"},  {6, "Jun"},
                {7, "Jul"},  {8, "Aug"},  {9, "Sep"},  {10, "Oct"},  {11, "Nov"},  {12, "Dec"}};

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsPerMonthForEWR
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForEWR()
        {
            var context = new Nycflights13DBContext();

            Dictionary<int, string> monthsByNumber = new Dictionary<int, string>()
            { {1, "Jan" }, {2, "Feb"}, {3, "Mar"},  {4, "Apr"},  {5, "May"},  {6, "Jun"},
                {7, "Jul"},  {8, "Aug"},  {9, "Sep"},  {10, "Oct"},  {11, "Nov"},  {12, "Dec"}};

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsPerMonthForLGA
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForLGA()
        {
            var context = new Nycflights13DBContext();

            Dictionary<int, string> monthsByNumber = new Dictionary<int, string>()
            { {1, "Jan" }, {2, "Feb"}, {3, "Mar"},  {4, "Apr"},  {5, "May"},  {6, "Jun"},
                {7, "Jul"},  {8, "Aug"},  {9, "Sep"},  {10, "Oct"},  {11, "Nov"},  {12, "Dec"}};

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

    }
}