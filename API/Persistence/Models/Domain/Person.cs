using System;
using System.ComponentModel.DataAnnotations;

namespace API.Persistence.Models.Domain;

public class Person : BaseEntity
{
    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    public required string Email { get; set; }

    public string? Extension { get; set; }

    public ICollection<Item> Items { get; set; } = [];

}
