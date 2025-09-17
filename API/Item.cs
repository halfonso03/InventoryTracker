using System;
using System.ComponentModel.DataAnnotations;
using API.Domain.Identity;

namespace API;

public class Item
{
    public int Id { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    public required DateTime CreatedOn { get; set; }

    public AppUser CreatedBy { get; set; } = null!;

    [Required]
    public int CreatedById { get; set; }
}
