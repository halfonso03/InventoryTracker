using API.Services;
using HidtaInventory.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InventoryController : BaseApiController
    {
        private readonly IItemService _itemService;
        public InventoryController(IItemService itemService)
        {
            _itemService = itemService;
        }

        public IActionResult Get()
        {
            return Ok();
        }

        public async Task<IActionResult> GetItems()
        {
            var items = await _itemService.GetItems();

            return Ok(items);
        }
    }
}
