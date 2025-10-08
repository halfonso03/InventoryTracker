using System;
using System.Resources;
using API.DTOs;
using API.Persistence;
using API.Persistence.Models.Domain;
using AutoMapper;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public interface IItemService : IDataService<Item>
{
    Task<Person?> GetPersonItems(int id);
    IQueryable<Item> GetAll(ItemStatus? itemStatus);

    Task<Item?> ToggleDisposal(int id);
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
        if (entity.AssignedToId != null)
        {
            entity.DateAssigned = DateTime.Now;
            entity.ItemStatus = ItemStatus.Assigned;
        }
        else
        {
            entity.ItemStatus = ItemStatus.Unassigned;
        }

        entity.CreatedOn = DateTime.Now;

        context.Items.Add(entity);
        await context.SaveChangesAsync();
        return entity.Id;
    }




    public async Task<Item> Update(int id, Item entity)
    {
        Item? itemFromDb = await context.Items.FirstOrDefaultAsync(x => x.Id == id);

        if (itemFromDb is not null)
        {

            itemFromDb.HbcNumber = entity.HbcNumber;
            itemFromDb.ItemType = entity.ItemType;
            itemFromDb.Description = entity.Description;
            itemFromDb.SerialNumber = entity.SerialNumber;
            itemFromDb.IPAddress = entity.IPAddress;
            itemFromDb.ComputerName = entity.ComputerName;

            itemFromDb.InitiativeId = entity.InitiativeId;
            itemFromDb.Cubicle_Room = entity.Cubicle_Room;

            if (entity.AssignedToId == null && itemFromDb.AssignedToId != null)
            {
                itemFromDb.DateAssigned = null;
                itemFromDb.ItemStatus = ItemStatus.Unassigned;
            }

            if (entity.AssignedToId != null && itemFromDb.AssignedToId == null)
            {
                itemFromDb.DateAssigned = DateTime.Now;
                itemFromDb.ItemStatus = ItemStatus.Assigned;
            }

            itemFromDb.AssignedToId = entity.AssignedToId;

            await context.SaveChangesAsync();
        }

        return entity;
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

    public IQueryable<Item> GetAll(ItemStatus? itemStatus)
    {

        IQueryable<Item> items = itemStatus switch
        {
            ItemStatus.Assigned
                or ItemStatus.Unassigned
                or ItemStatus.TBD
                or ItemStatus.Disposed => context.Items.Where(x => x.ItemStatus == itemStatus),
            _ => context.Items.Where(x => x.ItemStatus != ItemStatus.Disposed)
        };

        return items.Include(x => x.AssignedTo)
                            .Include(x => x.Initiative)
                            .AsQueryable();

    }

    public async Task<Item?> ToggleDisposal(int id)
    {
        var item = await context.Items.FirstOrDefaultAsync(x => x.Id == id);

        if (item != null)
        {
            if (item.DisposalDate is not null)
            {
                item.ItemStatus = ItemStatus.Unassigned;
                item.DisposalDate = null;
            }
            else
            {
                item.AssignedToId = null;
                item.DateAssigned = null;
                item.ItemStatus = ItemStatus.Disposed;
                item.DisposalDate = DateTime.Now;
            }

            await context.SaveChangesAsync();

            return item;
        }

        return null;
    }
}
