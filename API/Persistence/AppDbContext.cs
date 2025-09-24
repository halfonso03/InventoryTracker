using System;
using API.Persistence.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class AppDbContext : DbContext
{
    public required DbSet<Initiative> Initiatives { get; set; }
    public required DbSet<Item> Items { get; set; }
    public required DbSet<Person> People { get; set; }


    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {


        base.OnModelCreating(builder);
    }


}
