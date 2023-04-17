namespace ContosoUniversity.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<Sale> ProductSold { get; set; }


    }
}
