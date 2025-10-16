using System;
using API.Persistence.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class AppDbContext : DbContext
{
    public required DbSet<Initiative> Initiatives { get; set; }
    public required DbSet<Item> Items { get; set; }
    public required DbSet<Assignee> People { get; set; }


    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    // public enum ItemStatus
    // {
    //     Unassigned = 1,
    //     Assigned = 2,
    //     TBD = 3,
    //     Disposed = 4
    // }

    protected override void OnModelCreating(ModelBuilder builder)
    {

        builder.Entity<Item>().ToTable(b =>
        {
            b.HasCheckConstraint("CK_Item_Disposal",
                "([itemStatusId] <> 4 AND [DisposalDate] IS NULL) OR ([itemStatusId] = 4 AND NOT [DisposalDate] IS NULL)");

        });

        base.OnModelCreating(builder);
    }


}
