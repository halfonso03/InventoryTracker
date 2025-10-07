using API.DTOs;
using API.Persistence.Models.Domain;
using API.Services;
using AutoMapper;
using HidtaInventory.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    public class InventoryController : BaseApiController
    {
        private readonly IItemService _itemDataService;
        private readonly IMapper _mapper;

        public InventoryController(IItemService itemDataService, IMapper mapper)
        {
            _itemDataService = itemDataService;
            _mapper = mapper;
        }

        [HttpGet("{itemStatusId?}")]
        public async Task<IActionResult> Get(ItemStatus? itemStatusId = null)
        {            
            var items = await _itemDataService.GetAll(itemStatusId);

            var response = _mapper.Map<List<ItemDto>>(items);

            return Ok(response);
        }

        [HttpGet("item/{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _itemDataService.Get(id);

            var response = _mapper.Map<ItemDto>(item);

            return Ok(response);
        }

        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] CreateItemDto dto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var item = _mapper.Map<Item>(dto);

                    int newId = await _itemDataService.Create(item);

                    dto.Id = newId;

                    return Ok(dto);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }

            return Ok(dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EditItemDto dto)
        {
            if (ModelState.IsValid)
            {

                try
                {
                    var item = _mapper.Map<Item>(dto);

                    await _itemDataService.Update(id, item);

                    return Ok(dto);
                }
                catch (System.Exception ex)
                {

                    return BadRequest(ex.Message);
                }

            }

            return Ok(dto);
        }


    }
}
