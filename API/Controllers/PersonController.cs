using API.DTOs;
using API.Persistence.Models.Domain;
using API.Services;
using AutoMapper;
using HidtaInventory.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace API.Controllers
{
    public class PersonController : BaseApiController
    {
        private readonly IDataService<Person> _dataService;
        private readonly IMapper _mapper;

        private readonly IItemService _itemService;

        public PersonController(IDataService<Person> dataService, IMapper mapper, IItemService itemService)
        {
            _dataService = dataService;
            _mapper = mapper;
            _itemService = itemService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var people = await _dataService.GetAll();

            var response = _mapper.Map<List<Person>>(people);

            return Ok(response);
        }


        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] PersonDto personDto)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var person = _mapper.Map<Person>(personDto);

                    await _dataService.Create(person);

                    return Ok(person);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return BadRequest("Not created");
        }

        [HttpPut()]
        public async Task<IActionResult> Update([FromBody] PersonDto personDto)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var person = _mapper.Map<Person>(personDto);

                    await _dataService.Update(person.Id, person);

                    return Ok(person);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return NotFound();
        }


        [HttpGet("{id}/items")]
        public async Task<IActionResult> GetItems(int id)
        {
            var person = await _itemService.GetPersonItems(id);

            if (person == null) return NotFound();

            var response = _mapper.Map<PersonDto>(person);

            return Ok(response);
        }
    }
}
