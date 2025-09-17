using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ItemDto
{
    public int Id { get; set; }
    [Required]
    public required string Description { get; set; }
    public required DateTime CreatedOn { get; set; }
    // public required int CreatedByUserId { get; set; }
    public required string CreatedByName { get; set; }
}
