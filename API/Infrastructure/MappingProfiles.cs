using System;
using System.Reflection;
using API.DTOs;
using API.Persistence.Models.Domain;
using AutoMapper;

namespace API.Infrastructure;


public class MappingProfiles : Profile
{

    private string? NullIfPropertyDoesNotMatchEnumValue(AssigneeDto assigneeDto, string propertyName, int assigneeTypeId, AssigneeType assigneeType)
    {
        Type t = assigneeDto.GetType();
        PropertyInfo? p = t.GetProperty(propertyName);

        if (p is not null)
        {
            if (assigneeTypeId != (int)assigneeType)
            {
                return null;
            }

            return p.GetValue(assigneeDto, null) == null ? null : p.GetValue(assigneeDto, null)!.ToString();

        }

        return null;
    }

    public MappingProfiles()
    {

        CreateMap<ItemDto, Item>();
        CreateMap<CreateItemDto, Item>()
                .ForMember(dest => dest.ItemType, o => o.MapFrom(s => (ItemType)s.ItemTypeId));

        CreateMap<AssigneeDto, Assignee>()
                .ForMember(dest => dest.FirstName, o => o.MapFrom(s => NullIfPropertyDoesNotMatchEnumValue(s, nameof(s.FirstName), s.AssigneeTypeId, AssigneeType.Person)))
                .ForMember(dest => dest.LastName, o => o.MapFrom(s => NullIfPropertyDoesNotMatchEnumValue(s, nameof(s.LastName), s.AssigneeTypeId, AssigneeType.Person)))
                .ForMember(dest => dest.Email, o => o.MapFrom(s => NullIfPropertyDoesNotMatchEnumValue(s, nameof(s.Email), s.AssigneeTypeId, AssigneeType.Person)))
                .ForMember(dest => dest.Extension, o => o.MapFrom(s => NullIfPropertyDoesNotMatchEnumValue(s, nameof(s.Extension), s.AssigneeTypeId, AssigneeType.Person)))
                .ForMember(dest => dest.LocationName, o => o.MapFrom(s => NullIfPropertyDoesNotMatchEnumValue(s, nameof(s.LocationName), s.AssigneeTypeId, AssigneeType.Location)))
                .ForMember(dest => dest.AssigneeType, o => o.MapFrom(s => s.AssigneeTypeId));

        CreateMap<EditItemDto, Item>()
                .ForMember(dest => dest.ItemType, o => o.MapFrom(s => (ItemType)s.ItemTypeId));

        CreateMap<Item, ItemDto>()
            .ForMember(dest => dest.AssignedTo, o => o.MapFrom(s => s.AssignedTo.FirstName + " " + s.AssignedTo.LastName))
            .ForMember(dest => dest.AssignedToEmail, o => o.MapFrom(s => s.AssignedTo.Email))
            .ForMember(dest => dest.AssignedToExtension, o => o.MapFrom(s => s.AssignedTo.Extension))
            .ForMember(dest => dest.Initiative, o => o.MapFrom(s => s.Initiative != null ? s.Initiative.Name : ""))
            .ForMember(dest => dest.ItemTypeId, o => o.MapFrom(s => (int)s.ItemType))
            .ForMember(dest => dest.ItemStatusId, o => o.MapFrom(s => (int)s.ItemStatus));

        // from  -> to
        CreateMap<Initiative, InitiativeDto>();
        CreateMap<Assignee, PersonDto>();

        CreateMap<InitiativeDto, Initiative>();
        CreateMap<PersonDto, Assignee>();


        // CreateMap<CreateTripDto, Trip>()
        //     .ForMember(dest => dest.FromDate, o => o.MapFrom(s => DateTime.Parse(s.FromDate.ToShortDateString())))
        //     .ForMember(dest => dest.ToDate, o => o.MapFrom(s => DateTime.Parse(s.ToDate.ToShortDateString())));

        // CreateMap<EditTripDto, Trip>()
        //     .ForMember(dest => dest.Id, opt => opt.Ignore());


        // CreateMap<TravellerDto, Traveller>();
        // CreateMap<CreateTravellerDto, Traveller>();
        // CreateMap<EditTravellerDto, Traveller>();

        // CreateMap<Traveller, TravellerDto>();
        // CreateMap<Traveller, CreateTravellerDto>();
        // CreateMap<Traveller, EditTravellerDto>();
    }
}
