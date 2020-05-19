using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
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

    }
}