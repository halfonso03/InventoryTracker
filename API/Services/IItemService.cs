using System;
using API.DTOs;

namespace API.Services;

public interface IItemService
{
    Task<List<ItemDto>> GetItems();
    Task<int> CreateItem(Item item);

}
