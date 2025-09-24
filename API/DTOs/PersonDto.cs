using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class PersonDto
{
    public int Id { get; set; }

    [Required]
    public required string FirstName { get; set; }

    [Required]
    public required string LastName { get; set; }

    [Required]
    public required string Email { get; set; }

    public string? Extension { get; set; }

    public ICollection<ItemDto> Items { get; set; } = [];
}
