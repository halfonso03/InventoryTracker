using System;
using System.Security.Cryptography;
using API.Persistence.Models;
using API.Persistence.Models.Domain;

namespace API.Persistence;

public class DbInitializer
{
    public static async Task SeedData(AppDbContext context)
    {
        var person1 = new Person { FirstName = "Bob", LastName = "Ferry", Email = "b@test.com" };
        var person2 = new Person { FirstName = "Rick", LastName = "Sanchez", Email = "r@test.com" };
        var person3 = new Person { FirstName = "Mary", LastName = "Kay", Email = "m@test.com" };

        if (!context.People.Any())
        {
            context.People.AddRange([person1, person2, person3]);
        }

        var initiative1 = new Initiative { Name = "DEA" };
        var initiative2 = new Initiative { Name = "ICE" };

        if (!context.Initiatives.Any())
        {
            context.Initiatives.AddRange([initiative1, initiative2]);
        }

        await context.SaveChangesAsync();


        if (!context.Items.Any())
        {
            var item1 = new Item
            {
                Description = "Laptop 1",
                CreatedOn = DateTime.Now.AddDays(-1),
                ItemType = ItemType.Desktop,
                Initiative = context.Initiatives.First(),
                AssignedTo = context.People.First(),
                DateAssigned = DateTime.Now,
                Cubicle_Room = "123"
            };

            var item2 = new Item
            {
                Description = "Laptop 2",
                CreatedOn = DateTime.Now.AddDays(-1),
                ItemType = ItemType.Desktop,
                Initiative = context.Initiatives.First(),
                AssignedTo = context.People.First(),
                DateAssigned = DateTime.Now,
                Cubicle_Room = "456"
            };

            var item3 = new Item
            {
                Description = "Monitor 1",
                CreatedOn = DateTime.Now.AddDays(-1),
                ItemType = ItemType.Monitor,
                Initiative = context.Initiatives.OrderBy(x => x.Id).Last(),
                AssignedTo = context.People.OrderBy(x => x.Id).Last(),
                DateAssigned = DateTime.Now,
                Cubicle_Room = "789"
            };

            var item4 = new Item
            {
                Description = "Monitor 2",
                CreatedOn = DateTime.Now.AddDays(-1),
                ItemType = ItemType.Monitor,
                Cubicle_Room = "789"
            };

            context.Items.AddRange([item1, item2, item3, item4]);
        }

        await context.SaveChangesAsync();


    }
}
