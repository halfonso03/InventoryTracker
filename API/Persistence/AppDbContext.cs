using System;
using Microsoft.EntityFrameworkCore;

namespace API.Persistence;

public class AppDbContext : DbContext
{
    public required DbSet<Item> Items { get; set; }

    public AppDbContext(DbContextOptions options) : base(options)
    {

    }
}
