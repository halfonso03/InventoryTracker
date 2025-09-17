using System;
using API.DTOs;

namespace API.Services;

public class ItemService(IDataService<Item> dataService) : IItemService
{

    public async Task<int> CreateItem(Item item)
    {
        var id = await dataService.Create(item);
        return id;
    }

    public async Task<List<ItemDto>> GetItems()
    {
        var items = await dataService.GetAll();
        var result = items.Select(i =>
        new ItemDto
        {
            Id = i.Id,
            Description = i.Description,
            CreatedOn = i.CreatedOn,
            CreatedByName = $"{i.CreatedBy.FirstName} {i.CreatedBy.LastName}"
        })
        .ToList();

        return result;
    }
}
