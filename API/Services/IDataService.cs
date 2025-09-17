using System;
using System.Linq.Expressions;

namespace API.Services;

public interface IDataService<T>
{
    Task<IEnumerable<T>> GetAll();
    Task<T?> Get(int id);
    Task<int> Create(T entity);
    Task<T> Update(int id, T entity);
    Task<bool> Delete(int id);
}