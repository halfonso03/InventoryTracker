using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Identity.Client;

namespace API.Persistence.Models.Domain;

public enum AssigneeType
{
    Person = 1,
    Location = 2
}

public class Assignee : BaseEntity
{
    public string? LocationName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Extension { get; set; }

    [Column("AssigneeTypeId")]
    public required AssigneeType AssigneeType { get; set; }
    public ICollection<Item> Items { get; set; } = [];
}
