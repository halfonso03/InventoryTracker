using System;
using System.ComponentModel.DataAnnotations;
using API.Persistence.Models.Domain;

namespace API.DTOs;

public class ItemDto
{
    public int Id { get; set; }

    [Required]
    public required string Description { get; set; }
    public string? HbcNumber { get; set; } = null;
    public string? ComputerName { get; set; } = null;

    [Required]
    public string SerialNumber { get; set; } = null;

    [Required]
    public int ItemTypeId { get; set; }
    public string? ItemType { get; set; } = null;

    [Required]
    public int ItemStatusId { get; set; }
    public string? ItemStatus { get; set; } = null;
    public int InitiativeId { get; set; }
    public string? Initiative { get; set; }
    public DateTime? DateAssigned { get; set; }
    public DateTime? DisposalDate { get; set; }
    public int? AssignedToId { get; set; } = null;
    public string? AssignedTo { get; set; }
    public string? AssignedToEmail { get; set; }
    public string? AssignedToExtension { get; set; }
    public string? Cubicle_Room { get; set; }
    public string? IPAddress { get; set; }
    public DateTime CreatedOn { get; set; }

}
