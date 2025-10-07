using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Persistence.Models.Domain;

public enum ItemType
{
    Desktop = 1,
    Server = 2,
    Switch = 3,
    Monitor = 4,
    Printer = 5,
    MobilePhone = 6,
    Misc = 7
}

public enum ItemStatus
{
    Unassigned = 1,
    Assigned = 2,
    TBD = 3,
    Disposed = 4
}

public class Item : BaseEntity
{
    public required string Description { get; set; }

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

    public string? IPAddress { get; set; }

    [Column("ItemStatusId")]
    public ItemStatus ItemStatus { get; set; }


    public DateTime? DisposalDate { get; set; }
    // public AppUser CreatedBy { get; set; } = null!;

    // [Required]
    // public required int CreatedByUserId { get; set; }

}
