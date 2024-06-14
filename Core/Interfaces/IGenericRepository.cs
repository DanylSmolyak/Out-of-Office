using Core.Specifications;

namespace Core.Interfaces;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    
    Task<IReadOnlyList<T>> ListAllAsync();
    
    Task<T> GetEntityWithSpec(ISpecifications<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecifications<T> spec);

    Task<int> CountAsync(ISpecifications<T> spec);
    
    Task AddAsync(T entity);
    
    Task UpdateAsync(T entity);
    
    Task RemoveAsync(T entity);
    
    
    
}