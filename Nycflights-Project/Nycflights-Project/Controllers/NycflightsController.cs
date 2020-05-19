﻿using Microsoft.AspNetCore.Mvc;
using Nycflights_Project.Models;
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

        // GET: api/Nycflights/FlightsPerMonth
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonth()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Select(f => f.Month).ToList().GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsPerMonthForJFK
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForJFK()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("JFK")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsPerMonthForEWR
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForEWR()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("EWR")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsPerMonthForLGA
        [HttpGet("[action]")]
        public Dictionary<string, int> FlightsPerMonthForLGA()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Where(f => !string.IsNullOrEmpty(f.Origin) && f.Origin.Equals("LGA")).Select(f => f.Month).ToList()
                .GroupBy(m => m).ToDictionary(g => monthsByNumber[g.Key], g => g.Count());
        }

        // GET: api/Nycflights/FlightsToTopTenDestinations
        [HttpGet("[action]")]
        public Dictionary<string?, int> FlightsToTopTenDestinations()
        {
            var context = new Nycflights13DBContext();

            return context.Flights.Select(f => f.Dest).ToList().GroupBy(d => d).ToDictionary(g => g.Key, g => g.Count())
                .OrderByDescending(val => val.Value).Take(10).ToDictionary(g => g.Key, g => g.Value);
        }

        // GET: api/Nycflights/FlightsToTopTenDestinationsFromJFK
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

        // GET: api/Nycflights/FlightsToTopTenDestinationsFromEWR
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

        // GET: api/Nycflights/FlightsToTopTenDestinationsFromLGA
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
    }
}