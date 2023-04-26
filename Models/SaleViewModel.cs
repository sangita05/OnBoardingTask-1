namespace ContosoUniversity.Models
{
    public class SaleViewModel
    {
        public int SaleId { get; set; } // add this if it's not already in the model
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public string StoreAddress { get; set; }
        public DateTime DateSold { get; set; }
       
    }
}
