using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Persistence.Models.Domain;

public enum ItemType
{
    Desktop = 1,
    Server,
    Switch,
    Monitor,
    Printer,
    MobilePhone,
    Misc
}

public class Item : BaseEntity
{
    [Required]
    public required string Description { get; set; }

    [Required]
    public required DateTime CreatedOn { get; set; }

    public string? HbcNumber { get; set; } = null;

    public string? ComputerName { get; set; } = null;

    public string? SerialNumber { get; set; } = null;

    [Column("ItemTypeId")]
    public required ItemType ItemType { get; set; }

    [ForeignKey("Initiative")]
    public int? InitiativeId { get; set; }

    public Initiative? Initiative { get; set; }


    public DateTime? DateAssigned { get; set; }

    [ForeignKey("AssignedTo")]
    public int? AssignedToId { get; set; }

    [JsonIgnore]
    public Person AssignedTo { get; set; } = null!;

    public string? Cubicle_Room { get; set; }

    // public AppUser CreatedBy { get; set; } = null!;

    // [Required]
    // public required int CreatedByUserId { get; set; }

}
