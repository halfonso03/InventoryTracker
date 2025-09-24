using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class InitiativeDto
{
    public int Id { get; set; }

    [Required]
    public required string Name { get; set; }
}
