using System;
using System.ComponentModel.DataAnnotations;

namespace API.Persistence.Models.Domain;

public class Initiative : BaseEntity
{
    [Required]
    public required string Name { get; set; }
}
