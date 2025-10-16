using System;
using API.Persistence.Models.Domain;

namespace API.Extensions;

public static class ProductSearchExtensions
{
    public static IQueryable<Item> Search(this IQueryable<Item> items, string? searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm)) return items;

        return items.Where(x => (!string.IsNullOrEmpty(x.ComputerName) && x.ComputerName.Contains(searchTerm))
            || (!string.IsNullOrEmpty(x.Description) && x.Description.Contains(searchTerm))
            || (!string.IsNullOrEmpty(x.HbcNumber) && x.HbcNumber.Contains(searchTerm))
            || (!string.IsNullOrEmpty(x.SerialNumber) && x.SerialNumber.Contains(searchTerm))
            || (!string.IsNullOrEmpty(x.IPAddress) && x.IPAddress.Contains(searchTerm))
            || (!string.IsNullOrEmpty(x.Cubicle_Room) && x.Cubicle_Room.Contains(searchTerm))
            || (x.ItemType.ToString().Contains(searchTerm))
            || (x.AssignedTo != null && x.AssignedTo.FirstName.Contains(searchTerm))
            || (x.AssignedTo != null && x.AssignedTo.LastName.Contains(searchTerm)));
    }
}
