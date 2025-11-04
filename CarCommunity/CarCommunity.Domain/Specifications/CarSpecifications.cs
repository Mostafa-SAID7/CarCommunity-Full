using System;
using System.Linq.Expressions;
using CarCommunity.Domain.Entities;

namespace CarCommunity.Domain.Specifications
{
    public static class CarSpecifications
    {
        public static Expression<Func<Car, bool>> ByMake(string make)
        {
            return car => car.Make.ToLower().Contains(make.ToLower());
        }

        public static Expression<Func<Car, bool>> ByModel(string model)
        {
            return car => car.Model.ToLower().Contains(model.ToLower());
        }

        public static Expression<Func<Car, bool>> ByYear(int year)
        {
            return car => car.Year == year;
        }

        public static Expression<Func<Car, bool>> ByYearRange(int minYear, int maxYear)
        {
            return car => car.Year >= minYear && car.Year <= maxYear;
        }

        public static Expression<Func<Car, bool>> ByUserId(string userId)
        {
            return car => car.UserId == userId;
        }

        public static Expression<Func<Car, bool>> IsActive()
        {
            return car => !car.IsDeleted;
        }

        public static Expression<Func<Car, bool>> CreatedWithinDays(int days)
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-days);
            return car => car.CreatedAt >= cutoffDate;
        }

        public static Expression<Func<Car, bool>> UpdatedRecently()
        {
            var recentDate = DateTime.UtcNow.AddDays(-7);
            return car => car.UpdatedAt >= recentDate;
        }
    }
}