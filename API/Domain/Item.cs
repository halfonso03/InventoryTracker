using System;
using API.Domain.Identity;

namespace API.Domain;

public class Item : BaseEntity
{
    public required string Description { get; set; }

    public required DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public required AppUser CreatedBy { get; set; }
}
