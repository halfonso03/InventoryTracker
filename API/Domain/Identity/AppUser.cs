using System;

namespace API.Domain.Identity;


public class AppUser : BaseEntity
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}
