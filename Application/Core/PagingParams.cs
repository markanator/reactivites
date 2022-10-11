namespace Application.Core
{
    public class PagingParams
    {
        // the max number of items a user can request
        private const int MaxPageSize = 50;
        // initial page number
        public int PageNumber { get; set; } = 1;
        // default amount a user gets, before they set a preference
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            // if it goes over our max, return default, else its g2g
            set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

    }
}
