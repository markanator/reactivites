using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> Attendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // unique ID, made with userId + activityId
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.UserId, aa.ActivityId }));
            // one side of relationship
            builder.Entity<ActivityAttendee>()
                        .HasOne(u => u.User)
                        .WithMany(a => a.Activities)
                        .HasForeignKey(fk => fk.UserId);
            // both sides
            builder.Entity<ActivityAttendee>()
                        .HasOne(u => u.Activity)
                        .WithMany(a => a.Attendees)
                        .HasForeignKey(fk => fk.ActivityId);

            // deleting an activity will alse remove comments
            builder.Entity<Comment>()
                .HasOne(a => a.Activity)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
