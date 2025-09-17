
using System.Data;
using System.Linq.Expressions;
using API.Domain;
using API.Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class DataService<T>(AppDbContext context) : IDataService<T> where T : BaseEntity
{


    public async Task<T?> Get(int id)
    {
        T? entity = await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        return entity ?? null;
    }

    public async Task<IEnumerable<T>> GetAll()
    {

        //Expression<Func<T, object>>? orderBy = null
        var result = await context.Set<T>().ToListAsync();
        return result;

        // if (orderBy is not null)
        // {
        //     if ()
        //     .OrderBy(orderBy).ToListAsync(); //.OrderBy(orderBy!).ToListAsync();
        //     return result;
        // }

    }

    public async Task<int> Create(T entity)
    {
        context.Set<T>().Add(entity);
        await context.SaveChangesAsync();

        return entity.Id;
    }

    public async Task<T> Update(int id, T entity)
    {
        entity.Id = id;
        context.Set<T>().Update(entity);
        await context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Delete(int id)
    {
        T? entity = await context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        if (entity is not null)
        {
            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
            return true;
        }
        return false;
    }

}
