using System;
using API.DTOs;
using API.Persistence.Models.Domain;
using AutoMapper;

namespace API.Infrastructure;


public class MappingProfiles : Profile
{

    public MappingProfiles()
    {

        CreateMap<ItemDto, Item>();
        CreateMap<CreateItemDto, Item>()
                .ForMember(dest => dest.ItemType, o => o.MapFrom(s => (ItemType)s.ItemTypeId));

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
        CreateMap<Person, PersonDto>();

        CreateMap<InitiativeDto, Initiative>();
        CreateMap<PersonDto, Person>();


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
