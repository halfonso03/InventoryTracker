using System;
using API.DTOs;
using API.Persistence;
using API.Persistence.Models.Domain;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public interface IItemService : IDataService<Item>
{
    Task<Person?> GetPersonItems(int id);
}

public class ItemService(AppDbContext context) : IItemService
{
    public async Task<Item?> Get(int id)
    {
        var item = await context.Items
                    .Include(x => x.AssignedTo)
                    .Include(x => x.Initiative)
                    .FirstOrDefaultAsync(x => x.Id == id);

        return item;
    }

    public async Task<IEnumerable<Item>> GetAll()
    {
        var items = await context.Items
                    .Include(x => x.AssignedTo)
                    .Include(x => x.Initiative)
                    .ToListAsync();

        return items;
    }

    public async Task<int> Create(Item entity)
    {
        context.Items.Add(entity);
        await context.SaveChangesAsync();
        return entity.Id;
    }




    public async Task<Item> Update(int id, Item entity)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> Delete(int id)
    {
        return true;
    }

    public async Task<Person?> GetPersonItems(int id)
    {
        var person = await context.People
                    .Include(x => x.Items)
                    .ThenInclude(x => x.Initiative)
                    .FirstOrDefaultAsync(x => x.Id == id);

        return person;
    }
}
