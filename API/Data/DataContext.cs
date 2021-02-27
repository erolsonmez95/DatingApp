using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
      
        public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        //in this case users is our table name..
        // also it generated by Migrations
        // it means we're writing our code by code first not db first!
    
        public DbSet<UserLike> Likes{ get; set; }

        protected override void OnModelCreating(ModelBuilder builder){

            base.OnModelCreating(builder);
            builder.Entity<UserLike>()
            .HasKey(k => new {k.SourceUserId, k.LikedUserId});

            builder.Entity<UserLike>()
            .HasOne(s=>s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s=> s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
            .HasOne(s=>s.LikedUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s=> s.LikedUserId)
            .OnDelete(DeleteBehavior.Cascade);

        }
    }
}