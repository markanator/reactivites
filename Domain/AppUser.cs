using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        // a collection of authored activities
        public ICollection<ActivityAttendee> Activities { get; set; }
        // a collection of photos
        public ICollection<Photo> Photos { get; set; }
        // random poeple that following this user
        public ICollection<UserFollowing> Followers { get; set; }
        // people this use chooses to follow
        public ICollection<UserFollowing> Followings { get; set; }


    }

}
