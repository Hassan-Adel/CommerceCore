using CommerceCore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommerceCore.DAL
{
    public class UserDBContext : IdentityDbContext<AppUser>
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options) { }
        //DB sets
        public DbSet<Customer> Customers { get; set; }
    }
}
