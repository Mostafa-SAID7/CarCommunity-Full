using Microsoft.AspNetCore.Identity;

namespace CarCommunity.Models.Entity
{
    public class ApplicationUser : IdentityUser
    {
        // يمكنك إضافة خصائص إضافية للمستخدم هنا
        public string FullName { get; set; } = string.Empty;
    }
}
