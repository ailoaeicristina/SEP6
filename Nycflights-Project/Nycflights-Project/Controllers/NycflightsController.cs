using Microsoft.AspNetCore.Mvc;
using Nycflights_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Nycflights_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NycflightsController : Controller
    {
        private Dictionary<int, string> monthsByNumber = new Dictionary<int, string>()
            { {1, "Jan" }, {2, "Feb"}, {3, "Mar"},  {4, "Apr"},  {5, "May"},  {6, "Jun"},
                {7, "Jul"},  {8, "Aug"},  {9, "Sep"},  {10, "Oct"},  {11, "Nov"},  {12, "Dec"}};
       
        #region Flights per month
        //1. GET: api/Nycflights/FlightsPerMonth
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonth()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Select(f => f.Month).ToList().GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        //2.1. GET: api/Nycflights/FlightsPerMonthForJFK
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForJFK()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        //2.2. GET: api/Nycflights/FlightsPerMonthForEWR
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForEWR()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        //2.3. GET: api/Nycflights/FlightsPerMonthForLGA
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForLGA()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }
        #endregion

        #region Top ten destinations
        //3.1. GET: api/Nycflights/FlightsToTopTenDestinations
        [HttpGet("[action]")]
        public Dictionary<string?, int> FlightsToTopTenDestinations()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Select(f => f.Dest).ToList().GroupBy(d => d).ToDictionary(g => g.Key, g => g.Count())
                .OrderByDescending(val => val.Value).Take(10).ToDictionary(g => g.Key, g => g.Value);
        }

        //3.2. GET: api/Nycflights/FlightsToTopTenDestinationsFromJFK
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsToTopTenDestinationsFromJFK()
        {
            var context = new Nycflights13DBContext();

            List<string?> topTenDestinations = context.Flights.Select(f => f.Dest).ToList().GroupBy(d => d).ToDictionary(g => g.Key, g => g.Count())
                .OrderByDescending(val => val.Value).Take(10).ToDictionary(g => g.Key, g => g.Value).Keys.ToList();

            Dictionary<string, int> flightsToTopTenDestinationsFromJFK = new Dictionary<string, int>();
            foreach (string? dest in topTenDestinations)
            {
                flightsToTopTenDestinationsFromJFK.Add(dest, context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK") &&
                    !string.IsNullOrEmpty(f.Dest) && f.Dest.Equals(dest)).Count());
            }

            return flightsToTopTenDestinationsFromJFK;
        }

        //3.3. GET: api/Nycflights/FlightsToTopTenDestinationsFromEWR
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsToTopTenDestinationsFromEWR()
        {
            var context = new Nycflights13DBContext();

            List<string?> topTenDestinations = context.Flights.Select(f => f.Dest).ToList().GroupBy(d => d).ToDictionary(g => g.Key, g => g.Count())
                .OrderByDescending(val => val.Value).Take(10).ToDictionary(g => g.Key, g => g.Value).Keys.ToList();

            Dictionary<string, int> flightsToTopTenDestinationsFromEWR = new Dictionary<string, int>();
            foreach (string? dest in topTenDestinations)
            {
                flightsToTopTenDestinationsFromEWR.Add(dest, context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR") &&
                    !string.IsNullOrEmpty(f.Dest) && f.Dest.Equals(dest)).Count());
            }

            return flightsToTopTenDestinationsFromEWR;
        }

        //3.4. GET: api/Nycflights/FlightsToTopTenDestinationsFromLGA
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsToTopTenDestinationsFromLGA()
        {
            var context = new Nycflights13DBContext();

            List<string?> topTenDestinations = context.Flights.Select(f => f.Dest).ToList().GroupBy(d => d).ToDictionary(g => g.Key, g => g.Count())
                .OrderByDescending(val => val.Value).Take(10).ToDictionary(g => g.Key, g => g.Value).Keys.ToList();

            Dictionary<string, int> flightsToTopTenDestinationsFromLGA = new Dictionary<string, int>();
            foreach (string? dest in topTenDestinations)
            {
                flightsToTopTenDestinationsFromLGA.Add(dest, context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA") &&
                    !string.IsNullOrEmpty(f.Dest) && f.Dest.Equals(dest)).Count());
            }

            return flightsToTopTenDestinationsFromLGA;
        }
        #endregion

        //4. GET: api/Nycflights/MeanAirtimeForOrigins
        [HttpGet("[action]")]
        public Dictionary<string, string> MeanAirtimeForOrigins()
        {
            var context = new Nycflights13DBContext();

            double? averageAirtimeJFK = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Air_time).ToList().Average();
            double? averageAirtimeEWR = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Air_time).ToList().Average();
            double? averageAirtimeLGA = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Air_time).ToList().Average();

            TimeSpan tavgAirtimeJFK = new TimeSpan(), tavgAirtimeEWR = new TimeSpan(), tavgAirtimeLGA = new TimeSpan();

            if (averageAirtimeJFK != null)
                tavgAirtimeJFK = TimeSpan.FromMinutes((double)averageAirtimeJFK);

            if (averageAirtimeEWR != null)
                tavgAirtimeEWR = TimeSpan.FromMinutes((double)averageAirtimeEWR);

            if (averageAirtimeLGA != null)
                tavgAirtimeLGA = TimeSpan.FromMinutes((double)averageAirtimeLGA);

            return new Dictionary<string, string>() { { "JFK", tavgAirtimeJFK.ToString("hh\\:mm\\:ss") },
                { "EWR", tavgAirtimeEWR.ToString("hh\\:mm\\:ss") },
                { "LGA", tavgAirtimeLGA.ToString("hh\\:mm\\:ss") } };
        }

        //5. GET: api/Nycflights/WeatherObservationsForOrigins
        [HttpGet("[action]")]
        public Dictionary<string?, int> WeatherObservationsForOrigins()
        {
            var context = new Nycflights13DBContext();

            return context.Weather.Select(w => w.Origin).ToList().GroupBy(o => o).ToDictionary(g => g.Key, g => g.Count());
        }



        //6.1. GET: api/Nycflights/TemperatureInCelsiusForEWR
        [HttpGet("[action]")]
        public Dictionary<DateTime, float> TemperatureInCelsiusForEWR()
        {

            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("EWR") && w.Temp >= 0)
                .Select(w => new { w.Time_hour, w.Temp }).ToList().ToDictionary(g => g.Time_hour, g => (g.Temp - 32) * 5 / 9);
        }




        //6.2. GET: api/Nycflights/TemperatureInCelsiusForLGA
        [HttpGet("[action]")]
        public Dictionary<DateTime, float> TemperatureInCelsiusForLGA()
        {

            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("LGA"))
                .Select(w => new { w.Time_hour, w.Temp }).ToList().ToDictionary(g => g.Time_hour, g => (g.Temp - 32) * 5 / 9);
        }




        //7. GET: api/Nycflights/TemperatureInCelsiusForJFK
        [HttpGet("[action]")]
        public Dictionary<DateTime,float> TemperatureInCelsiusForJFK()
        {
            var context = new Nycflights13DBContext();  
            
            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("JFK"))
                .Select(w => new { w.Time_hour, w.Temp}).ToDictionary(g => g.Time_hour, g=> (g.Temp-32)*5/9);
        }

        //8. GET: api/Nycflights/DailyMeanTempInCelsiusForJFK
        [HttpGet("[action]")]
        public Dictionary<string, float> DailyMeanTempInCelsiusForJFK()
        {
            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("JFK"))
                .GroupBy(g => g.Time_hour.Date.ToShortDateString()).ToDictionary(p => p.Key, p => (p.Average(g => g.Temp)-32)*5/9);
        }

    }
}