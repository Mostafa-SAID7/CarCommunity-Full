using System;
using System.Text.RegularExpressions;

namespace CarCommunity.Shared.Extensions
{
    public static class StringExtensions
    {
        public static bool IsNullOrEmpty(this string? value)
        {
            return string.IsNullOrEmpty(value);
        }

        public static bool IsNullOrWhiteSpace(this string? value)
        {
            return string.IsNullOrWhiteSpace(value);
        }

        public static string ToCamelCase(this string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return char.ToLowerInvariant(value[0]) + value.Substring(1);
        }

        public static string ToPascalCase(this string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return char.ToUpperInvariant(value[0]) + value.Substring(1);
        }

        public static string Truncate(this string value, int maxLength)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return value.Length <= maxLength ? value : value.Substring(0, maxLength);
        }

        public static string RemoveSpecialCharacters(this string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            return Regex.Replace(value, @"[^a-zA-Z0-9\s]", "");
        }

        public static bool IsValidEmail(this string email)
        {
            if (string.IsNullOrEmpty(email)) return false;
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static string GenerateSlug(this string value)
        {
            if (string.IsNullOrEmpty(value)) return value;

            // Remove special characters and replace spaces with hyphens
            var slug = Regex.Replace(value, @"[^a-zA-Z0-9\s-]", "");
            slug = Regex.Replace(slug, @"\s+", "-").ToLowerInvariant();

            return slug;
        }
    }
}