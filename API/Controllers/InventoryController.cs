using API.DTOs;
using API.Extensions;
using API.Persistence.Models.Domain;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using HidtaInventory.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;

namespace API.Controllers
{
    public class InventoryController : BaseApiController
    {
        private readonly IItemService _itemDataService;
        private readonly IDataService<Assignee> _assigneeDataService;
        private readonly IMapper _mapper;

        public InventoryController(IItemService itemDataService, IDataService<Assignee> assigneeDataService, IMapper mapper)
        {
            _itemDataService = itemDataService;
            _assigneeDataService = assigneeDataService;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var items = await _itemDataService.GetAll();

            var response = _mapper.Map<List<ItemDto>>(items);

            return Ok(response);
        }

        [HttpGet("items/{itemStatusId?}")]
        public async Task<IActionResult> Get([FromQuery] PaginationParams paginationParams, string? searchTerm = null, ItemStatus? itemStatusId = null)
        {
            IQueryable<Item> query = _itemDataService
                                        .GetAll(itemStatusId)
                                        .Search(searchTerm)
                                        .OrderBy(x => x.Id);

            var items =
                await PagedList<Item>.ToPagedList(query, paginationParams.PageNumber, paginationParams.PageSize);

            var response = _mapper.Map<List<ItemDto>>(items);

            Response.AddPaginationHeader(items.Metadata);

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

        [HttpPost("item/dispose/{id}")]
        public async Task<IActionResult> ToggleDisposal(int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Item? item = await _itemDataService.ToggleDisposal(id);

                    return item is not null ? Ok(item) : NotFound();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }

            return BadRequest(ModelState.SelectMany(x => x.Key));
        }

        [HttpPost("assignee/add")]
        public async Task<IActionResult> AddAssignee(AssigneeDto assigneeDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var assignee = _mapper.Map<Assignee>(assigneeDto);

                    var result = await _assigneeDataService.Create(assignee);

                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException?.Message);
                }
            }

            return BadRequest(ModelState.SelectMany(x => x.Key));
        }
    }
}
