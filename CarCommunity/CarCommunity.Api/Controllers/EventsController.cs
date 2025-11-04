using CarCommunity.Application.DTOs.Event;
using CarCommunity.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarCommunity.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IRepository<Domain.Entities.Event> _eventRepository;

        public EventsController(IRepository<Domain.Entities.Event> eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAll()
        {
            var events = await _eventRepository.GetAllAsync();
            var eventDtos = events.Select(e => new EventDto
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                EventDate = e.EventDate,
                Location = e.Location
            });
            return Ok(eventDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetById(Guid id)
        {
            var evt = await _eventRepository.GetByIdAsync(id);
            if (evt == null)
                return NotFound();

            var eventDto = new EventDto
            {
                Id = evt.Id,
                Name = evt.Name,
                Description = evt.Description,
                EventDate = evt.EventDate,
                Location = evt.Location
            };

            return Ok(eventDto);
        }

        [HttpPost]
        public async Task<ActionResult<EventDto>> Create(CreateEventDto dto)
        {
            var evt = new Domain.Entities.Event
            {
                Name = dto.Name,
                Description = dto.Description,
                EventDate = dto.EventDate,
                Location = dto.Location
            };

            await _eventRepository.AddAsync(evt);

            var eventDto = new EventDto
            {
                Id = evt.Id,
                Name = evt.Name,
                Description = evt.Description,
                EventDate = evt.EventDate,
                Location = evt.Location
            };

            return CreatedAtAction(nameof(GetById), new { id = evt.Id }, eventDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateEventDto dto)
        {
            var evt = await _eventRepository.GetByIdAsync(id);
            if (evt == null)
                return NotFound();

            evt.Name = dto.Name;
            evt.Description = dto.Description;
            evt.EventDate = dto.EventDate;
            evt.Location = dto.Location;
            evt.UpdatedAt = DateTime.UtcNow;

            await _eventRepository.UpdateAsync(evt);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var evt = await _eventRepository.GetByIdAsync(id);
            if (evt == null)
                return NotFound();

            await _eventRepository.DeleteAsync(evt);
            return NoContent();
        }
    }
}