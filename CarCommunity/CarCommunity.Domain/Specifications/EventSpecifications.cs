using System;
using System.Linq.Expressions;
using CarCommunity.Domain.Entities;

namespace CarCommunity.Domain.Specifications
{
    public static class EventSpecifications
    {
        public static Expression<Func<Event, bool>> ByName(string name)
        {
            return evt => evt.Name.ToLower().Contains(name.ToLower());
        }

        public static Expression<Func<Event, bool>> ByLocation(string location)
        {
            return evt => evt.Location != null && evt.Location.ToLower().Contains(location.ToLower());
        }

        public static Expression<Func<Event, bool>> UpcomingEvents()
        {
            return evt => evt.EventDate > DateTime.UtcNow;
        }

        public static Expression<Func<Event, bool>> PastEvents()
        {
            return evt => evt.EventDate < DateTime.UtcNow;
        }

        public static Expression<Func<Event, bool>> EventsInDateRange(DateTime startDate, DateTime endDate)
        {
            return evt => evt.EventDate >= startDate && evt.EventDate <= endDate;
        }

        public static Expression<Func<Event, bool>> TodayEvents()
        {
            var today = DateTime.UtcNow.Date;
            var tomorrow = today.AddDays(1);
            return evt => evt.EventDate >= today && evt.EventDate < tomorrow;
        }

        public static Expression<Func<Event, bool>> ThisWeekEvents()
        {
            var today = DateTime.UtcNow.Date;
            var weekEnd = today.AddDays(7);
            return evt => evt.EventDate >= today && evt.EventDate <= weekEnd;
        }

        public static Expression<Func<Event, bool>> ThisMonthEvents()
        {
            var today = DateTime.UtcNow.Date;
            var monthEnd = today.AddMonths(1);
            return evt => evt.EventDate >= today && evt.EventDate <= monthEnd;
        }

        public static Expression<Func<Event, bool>> HasDescription()
        {
            return evt => !string.IsNullOrEmpty(evt.Description);
        }

        public static Expression<Func<Event, bool>> IsActive()
        {
            return evt => !evt.IsDeleted;
        }
    }
}