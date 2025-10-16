using System;
using System.ComponentModel.DataAnnotations;
using API.Infrastructure;
using API.Persistence.Models.Domain;


namespace API.DTOs;

public class AssigneeDto
{
    [EitherOrRequired("FirstName")]
    [EnumValueRequirementValidator((int)AssigneeType.Location, nameof(AssigneeTypeId))]
    public string? LocationName { get; set; } = string.Empty;

    [EitherOrRequired("LocationName")]
    [EnumValueRequirementValidator((int)AssigneeType.Person, nameof(AssigneeTypeId))]
    public string? FirstName { get; set; } = string.Empty;

    [EitherOrRequired("LocationName")]
    [EnumValueRequirementValidator((int)AssigneeType.Person, nameof(AssigneeTypeId))]
    public string? LastName { get; set; } = string.Empty;

    [EitherOrRequired("LocationName")]
    public string? Email { get; set; } = string.Empty;

    public string? Extension { get; set; }

    [Required]
    [Range(1, 2, ErrorMessage = "Value must be 1 for Person or 2 for Location")]
    public int AssigneeTypeId { get; set; }
}
