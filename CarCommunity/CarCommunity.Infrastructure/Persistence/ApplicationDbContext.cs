using CarCommunity.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CarCommunity.Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Car> Cars { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Post> Posts { get; set; } = null!;
        public DbSet<Event> Events { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure entities here
            builder.Entity<Car>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId);

            builder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId);
        }
    }
}