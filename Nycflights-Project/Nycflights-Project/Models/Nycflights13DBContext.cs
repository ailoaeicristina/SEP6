using Microsoft.EntityFrameworkCore;

namespace Nycflights_Project.Models
{
    public class Nycflights13DBContext : DbContext
    {
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Plane> Planes { get; set; }
        public DbSet<Weather> Weather { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseMySql("server=35.241.184.214;database=nycflights13;user=root;password=z3DqJIHAps8Cxz95");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Flight>()
                .HasKey(f => new { f.Origin, f.Dest, f.Tailnum });

            modelBuilder.Entity<Weather>()
                .HasKey(w => new { w.Origin, w.Time_hour });

            modelBuilder.Entity<Flight>()
                .Property(f => f.FlightNumber).HasColumnName("Flight");
        }
    }
}
