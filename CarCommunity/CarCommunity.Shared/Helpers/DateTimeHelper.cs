using System;

namespace CarCommunity.Shared.Helpers
{
    public static class DateTimeHelper
    {
        public static DateTime GetCurrentUtcDateTime()
        {
            return DateTime.UtcNow;
        }

        public static string ToIso8601String(this DateTime dateTime)
        {
            return dateTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
        }

        public static bool IsValidDateRange(DateTime startDate, DateTime endDate)
        {
            return startDate < endDate;
        }

        public static int CalculateAge(DateTime birthDate)
        {
            var today = DateTime.Today;
            var age = today.Year - birthDate.Year;
            if (birthDate.Date > today.AddYears(-age)) age--;
            return age;
        }

        public static DateTime GetStartOfDay(DateTime dateTime)
        {
            return dateTime.Date;
        }

        public static DateTime GetEndOfDay(DateTime dateTime)
        {
            return dateTime.Date.AddDays(1).AddTicks(-1);
        }
    }
}