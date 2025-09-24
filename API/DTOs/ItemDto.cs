using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class ItemDto
{
    public int Id { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    public required DateTime CreatedOn { get; set; }

    public string? HbcNumber { get; set; } = null;

    public string? ComputerName { get; set; } = null;

    public string? SerialNumber { get; set; } = null;

    public required int ItemTypeId { get; set; }

    public required string ItemType { get; set; }



    public int InitiativeId { get; set; }

    public string? Initiative { get; set; }

    public DateTime? DateAssigned { get; set; }

    public int AssignedToId { get; set; }

    public string? AssignedTo { get; set; }
    public string? AssignedToEmail { get; set; }
    public string? AssignedToExtension { get; set; }

    public string? Cubicle_Room { get; set; }

}
