using System.ComponentModel.DataAnnotations;

public class EitherOrRequiredAttribute : ValidationAttribute
{
    private readonly string _otherProperty;

    public EitherOrRequiredAttribute(string otherProperty)
    {
        _otherProperty = otherProperty;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var otherPropertyInfo = validationContext.ObjectType.GetProperty(_otherProperty);

        if (otherPropertyInfo == null)
        {
            return new ValidationResult($"Unknown property: {_otherProperty}");
        }

        var otherValue = otherPropertyInfo.GetValue(validationContext.ObjectInstance);

        // If 'value' is provided, it's valid regardless of 'otherValue'
        if (value != null && !string.IsNullOrWhiteSpace(value.ToString()))
        {
            return ValidationResult.Success;
        }

        // If 'otherValue' is provided, it's valid regardless of 'value'
        if (otherValue != null && !string.IsNullOrWhiteSpace(otherValue.ToString()))
        {
            return ValidationResult.Success;
        }

        // If neither is provided, validation fails
        return new ValidationResult(ErrorMessage ?? $"Either '{validationContext.DisplayName}' or '{_otherProperty}' is required.");
    }
}