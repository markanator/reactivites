namespace Domain
{
    // MANUAL JOIN TABLE
    public class ActivityAttendee
    {
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        // custom code not made automatically be EF
        public bool IsHost { get; set; }
    }
}
