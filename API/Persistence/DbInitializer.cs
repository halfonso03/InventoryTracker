using System;

namespace API.Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        if (!context.Items.Any())
        {
            var item1 = new Item
            {
                Description = "Laptop 1",
                CreatedOn = DateTime.Now,
                CreatedById = 1
            };

            var item2 = new Item
            {
                Description = "Laptop 2",
                CreatedOn = DateTime.Now,
                CreatedById = 1
            };

            context.Items.AddRange([item1, item2]);
        }

        await context.SaveChangesAsync();
    }
}
