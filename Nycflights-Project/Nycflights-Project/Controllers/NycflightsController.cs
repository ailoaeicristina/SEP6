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

            return context.Flights.Select(f => f.Month).ToList().GroupBy(m => m).OrderBy(g => g.Key).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        //2.1. GET: api/Nycflights/FlightsPerMonthForJFK
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForJFK()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Month).ToList()
                .GroupBy(m => m).OrderBy(g => g.Key).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        //2.2. GET: api/Nycflights/FlightsPerMonthForEWR
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForEWR()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Month).ToList()
                .GroupBy(m => m).OrderBy(g => g.Key).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        //2.3. GET: api/Nycflights/FlightsPerMonthForLGA
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForLGA()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Month).ToList()
                .GroupBy(m => m).OrderBy(g => g.Key).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
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
                .Select(w => new { w.Time_hour, w.Temp }).ToDictionary(g => g.Time_hour, g => (g.Temp - 32) * 5 / 9);
        }

        //6.2. GET: api/Nycflights/TemperatureInCelsiusForLGA
        [HttpGet("[action]")]
        public Dictionary<DateTime, float> TemperatureInCelsiusForLGA()
        {
            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("LGA"))
                .Select(w => new { w.Time_hour, w.Temp }).ToDictionary(g => g.Time_hour, g => (g.Temp - 32) * 5 / 9);
        }

        //7. GET: api/Nycflights/TemperatureInCelsiusForJFK
        [HttpGet("[action]")]
        public Dictionary<DateTime,float> TemperatureInCelsiusForJFK()
        {
            var context = new Nycflights13DBContext();  
            
            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("JFK"))
                .Select(w => new { w.Time_hour, w.Temp}).ToDictionary(g => g.Time_hour, g=> (g.Temp - 32) * 5 / 9);
        }

        //8. GET: api/Nycflights/DailyMeanTempInCelsiusForJFK
        [HttpGet("[action]")]
        public Dictionary<string, float> DailyMeanTempInCelsiusForJFK()
        {
            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("JFK"))
                .GroupBy(g => g.Time_hour.Date.ToShortDateString()).ToDictionary(p => p.Key, p => (p.Average(g => g.Temp) - 32) * 5 / 9);
        }

        //9.1. GET: api/Nycflights/DailyMeanTempInCelsiusForEWR
        [HttpGet("[action]")]
        public Dictionary<string, float> DailyMeanTempInCelsiusForEWR()
        {
            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("EWR") && w.Temp != null)
                .GroupBy(g => g.Time_hour.Date.ToShortDateString()).ToDictionary(p => p.Key, p => (p.Average(g => g.Temp) - 32) * 5 / 9);
        }

        //9.2. GET: api/Nycflights/DailyMeanTempInCelsiusForLGA
        [HttpGet("[action]")]
        public Dictionary<string, float> DailyMeanTempInCelsiusForLGA()
        {
            var context = new Nycflights13DBContext();

            return context.Weather.Where(w => !string.IsNullOrEmpty(w.Origin) && w.Origin.Equals("LGA"))
                .GroupBy(g => g.Time_hour.Date.ToShortDateString()).ToDictionary(p => p.Key, p => (p.Average(g => g.Temp) - 32) * 5 / 9);
        }

        //10.1. GET: api/Nycflights/MeanDepartureAndArrivalDelayForJFK
        [HttpGet("[action]")]
        public Dictionary<string, string> MeanDepartureAndArrivalDelayForJFK()
        {
            var context = new Nycflights13DBContext();

            double? averageDepDelayJFK = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Dep_delay).ToList().Average();
            double? averageArrDelayJFK = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Arr_delay).ToList().Average();

            TimeSpan tavgDepDelayJFK = new TimeSpan();
            TimeSpan tavgArrDelayJFK = new TimeSpan();

            if (averageDepDelayJFK != null)
                tavgDepDelayJFK = TimeSpan.FromMinutes((double)averageDepDelayJFK);

            if (averageArrDelayJFK != null)
                tavgArrDelayJFK = TimeSpan.FromMinutes((double)averageArrDelayJFK);

            return new Dictionary<string, string>() { { tavgDepDelayJFK.TotalSeconds >= 0 ? tavgDepDelayJFK.ToString("hh\\:mm\\:ss") : "-" + tavgDepDelayJFK.ToString("hh\\:mm\\:ss"),
                tavgArrDelayJFK.TotalSeconds >= 0 ? tavgArrDelayJFK.ToString("hh\\:mm\\:ss") : "-" + tavgArrDelayJFK.ToString("hh\\:mm\\:ss") }  };
        }

        //10.2. GET: api/Nycflights/MeanDepartureAndArrivalDelayForEWR
        [HttpGet("[action]")]
        public Dictionary<string, string> MeanDepartureAndArrivalDelayForEWR()
        {
            var context = new Nycflights13DBContext();

            double? averageDepDelayEWR = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Dep_delay).ToList().Average();
            double? averageArrDelayEWR = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Arr_delay).ToList().Average();

            TimeSpan tavgDepDelayEWR = new TimeSpan();
            TimeSpan tavgArrDelayEWR = new TimeSpan();

            if (averageDepDelayEWR != null)
                tavgDepDelayEWR = TimeSpan.FromMinutes((double)averageDepDelayEWR);

            if (averageArrDelayEWR != null)
                tavgArrDelayEWR = TimeSpan.FromMinutes((double)averageArrDelayEWR);

            return new Dictionary<string, string>() { { tavgDepDelayEWR.TotalSeconds >= 0 ? tavgDepDelayEWR.ToString("hh\\:mm\\:ss") : "-" + tavgDepDelayEWR.ToString("hh\\:mm\\:ss"),
                tavgArrDelayEWR.TotalSeconds >= 0 ? tavgArrDelayEWR.ToString("hh\\:mm\\:ss") : "-" + tavgArrDelayEWR.ToString("hh\\:mm\\:ss") }  };
        }

        //10.3. GET: api/Nycflights/MeanDepartureAndArrivalDelayForLGA
        [HttpGet("[action]")]
        public Dictionary<string, string> MeanDepartureAndArrivalDelayForLGA()
        {
            var context = new Nycflights13DBContext();

            double? averageDepDelayLGA = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Dep_delay).ToList().Average();
            double? averageArrDelayLGA = context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Arr_delay).ToList().Average();

            TimeSpan tavgDepDelayLGA = new TimeSpan();
            TimeSpan tavgArrDelayLGA = new TimeSpan();

            if (averageDepDelayLGA != null)
                tavgDepDelayLGA = TimeSpan.FromMinutes((double)averageDepDelayLGA);

            if (averageArrDelayLGA != null)
                tavgArrDelayLGA = TimeSpan.FromMinutes((double)averageArrDelayLGA);

            return new Dictionary<string, string>() { { tavgDepDelayLGA.TotalSeconds >= 0 ? tavgDepDelayLGA.ToString("hh\\:mm\\:ss") : "-" + tavgDepDelayLGA.ToString("hh\\:mm\\:ss"),
                tavgArrDelayLGA.TotalSeconds >= 0 ? tavgArrDelayLGA.ToString("hh\\:mm\\:ss") : "-" + tavgArrDelayLGA.ToString("hh\\:mm\\:ss") }  };
        }

        //11. GET: api/Nycflights/ManufacturersMoreThanTwoHundredPlanes
        [HttpGet("[action]")]
        public Dictionary<string, int> ManufacturersMoreThanTwoHundredPlanes()
        {
            var context = new Nycflights13DBContext();

            return context.Planes.Select(p => p.Manufacturer).ToList()
                .GroupBy(m => m).Where(m => m.Count() >= 200).ToDictionary(g => g.Key, g => g.Count());
        }

        //12. GET: api/Nycflights/FlightsManufacturersMoreThanTwoHundredPlanes
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsManufacturersMoreThanTwoHundredPlanes()
        {
            var context = new Nycflights13DBContext();

            Dictionary<string, int> flightsManufacturersMoreThanTwoHundredPlanes = new Dictionary<string, int>();
            Dictionary<string, int> manufacturersMoreThanTwoHundredPlanes = ManufacturersMoreThanTwoHundredPlanes();

            Dictionary<string, int> countByTailNum = context.Flights.Select(f => f.Tailnum).ToList().GroupBy(m => m).ToDictionary(g => g.Key, g => g.Count());

            foreach (KeyValuePair<string, int> pair in manufacturersMoreThanTwoHundredPlanes)
            { 
                List<string> tailNums = context.Planes.Where(p => p.Manufacturer.Equals(pair.Key)).Select(p => p.Tailnum).ToList();
                int flights = 0;
                int flightsForTailNum = 0;

                foreach (string tailNum in tailNums)
                {
                    countByTailNum.TryGetValue(tailNum, out flightsForTailNum);
                    flights += flightsForTailNum; 
                }

                flightsManufacturersMoreThanTwoHundredPlanes.Add(pair.Key, flights);
            }

            return flightsManufacturersMoreThanTwoHundredPlanes;
        }

        //13. GET: api/Nycflights/PlanesforAirbus
        [HttpGet("[action]")]
        public Dictionary<string, int> PlanesforAirbus()
        {
            var context = new Nycflights13DBContext();

            return context.Planes.Where(p => !string.IsNullOrEmpty(p.Manufacturer) && p.Manufacturer.Contains("AIRBUS"))
                .Select(p => p.Manufacturer).GroupBy(g => g).ToDictionary(g => g.Key, g => context.Planes.Where
                (p => p.Manufacturer.Equals(g.Key)).Select(p => p.Tailnum).Count());
        }

    }
}