using API.DTOs;
using API.Persistence.Models.Domain;
using API.Services;
using AutoMapper;
using HidtaInventory.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InitiativeController : BaseApiController
    {
        private readonly IDataService<Initiative> _dataService;
        private readonly IMapper _mapper;

        public InitiativeController(IDataService<Initiative> dataService, IMapper mapper)
        {
            _dataService = dataService;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var initiatives = await _dataService.GetAll();

            var response = _mapper.Map<List<Initiative>>(initiatives);

            return Ok(response);
        }


        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] InitiativeDto initiativeDto)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var initiative = _mapper.Map<Initiative>(initiativeDto);

                    await _dataService.Create(initiative);

                    return Ok(initiative);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return BadRequest("Not created");
        }

        [HttpPut()]
        public async Task<IActionResult> Update([FromBody] InitiativeDto initiativeDto)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var initiative = _mapper.Map<Initiative>(initiativeDto);

                    await _dataService.Update(initiative.Id, initiative);

                    return Ok(initiative);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return NotFound();
        }
    }
}
