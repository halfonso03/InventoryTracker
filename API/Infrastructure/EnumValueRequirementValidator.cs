using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using API.DTOs;
using API.Persistence.Models.Domain;

namespace API.Infrastructure;


[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class EnumValueRequirementValidator : ValidationAttribute
{
    private readonly int _enumValueAsInt;
    private readonly string _compareToPropertyName;

    public EnumValueRequirementValidator(int enumValueAsInt, string compareToPropertyName)
    {
        _compareToPropertyName = compareToPropertyName;
        _enumValueAsInt = enumValueAsInt;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // value = 
        PropertyInfo? compareToPropertyInfo = validationContext.ObjectType.GetRuntimeProperty(_compareToPropertyName);


        if (compareToPropertyInfo == null)
        {
            return new ValidationResult("Property does not exist");
        }

        if (compareToPropertyInfo.GetIndexParameters().Length > 0)
        {
            throw new ArgumentException();
        }

        var compareToPropertyValue = compareToPropertyInfo.GetValue(validationContext.ObjectInstance, null);

        if (compareToPropertyValue is not null && _enumValueAsInt == (int)compareToPropertyValue)
        {
            if (value is string valueAsString)
            {
                if (string.IsNullOrEmpty(valueAsString))
                {
                    string[]? memberNames = validationContext.MemberName != null
                         ? new[] { validationContext.MemberName }
                         : null;
                    return new ValidationResult(FormatErrorMessage(validationContext.DisplayName), memberNames);
                }
            }
        }

        return null;
    }

}