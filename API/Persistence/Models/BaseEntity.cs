using System;
using System.ComponentModel.DataAnnotations;

namespace API.Persistence.Models;

public class BaseEntity
{
    [Key]
    public int Id { get; set; }
}
