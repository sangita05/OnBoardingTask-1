using ContosoUniversity.Data;
using ContosoUniversity.Models;
using System.Diagnostics;

//Add whole page by itself
namespace ContosoUniversity.Data
{
    public class DbInitializer
    {
        public static void Initialize(ContosoUniversityContext context)
        {
            context.Database.EnsureCreated();

            //look for any customers.
            if (context.Customers.Any())
            {
                return;  // DB has been seeded
            }

            var customers = new Customer[]
            {
                new Customer{Name="Nikki",Address="Auckland"},
                new Customer{Name="Darshit",Address="USA"},
                new Customer{Name="Nidarsh",Address="Australia"},
                new Customer{Name="Alpa",Address="India"},
                new Customer{Name="Kinjal",Address="Canada"},
                new Customer{Name="Arya",Address="Auckland"},
                new Customer{Name="Mahima",Address="India"},
                new Customer{Name="Sanvi",Address="Germany"}
            };

            foreach (Customer c in customers)
            {
                context.Customers.Add(c);
            }
            context.SaveChanges();


            var products = new Product[]
            {
                new Product{Name="Coffee",Price=8.99M},
                new Product{Name="Tea",Price=12.99M},
                new Product{Name="Tomato",Price=7.99M},
                new Product{Name="Apple",Price=5.00M},
                new Product{Name="Machine",Price=998.79M},
                new Product{Name="Sugar",Price=5.99M},
                new Product{Name="Vaccume",Price=345.90M},
                new Product{Name="Chocolate",Price=8.99M}
            };
           // context.Products.AddRange(products);          instend of foreach loop we can write like this as well
           // context.SaveChanges();
            foreach (Product p in products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();


            var stores = new Store[]
            {
                new Store{Name="Noeleeming",Address="Auckland"},
                new Store{Name="DQ",Address="Canada"},
                new Store{Name="BQ",Address="Newzealand"},
                new Store{Name="Burger King",Address="Manurewa"},
                new Store{Name="Farmers",Address="Auckland"},
                new Store{Name="Smartfix",Address="howick"},
                new Store{Name="Paper plus",Address="Botany"},
                new Store{Name="Manukau supa center",Address="Manukau"},
                new Store{Name="Delhi heights",Address="Flatbush"},
                new Store{Name="Indian store",Address="Papatoetoe"},
                new Store{Name="Samiyana",Address="Botany Mall"},
                new Store{Name="Toys store",Address="Botany Mall"},
            };
            foreach(Store s in stores)
            {
                context.Stores.Add(s);
            }
            context.SaveChanges();

            var sales = new Sale[]
            {
                new Sale{
                    CustomerId = customers.Single(s=>s.Name =="Alpa").Id,
                    ProductId = products.Single(s=>s.Name =="Apple").Id,
                    StoreId = stores.Single(s=>s.Name =="Burger King").Id,
                    DateSold = DateTime.Parse("2023-03-02"),
                },
                new Sale{
                    CustomerId = customers.Single(s=>s.Name =="Darshit").Id,
                    ProductId = products.Single(s=>s.Name =="Machine").Id,
                    StoreId = stores.Single(s=>s.Name =="Delhi heights").Id,
                    DateSold = DateTime.Parse("2023-03-05"),
                },
            };
               // new Sales{ProductId=1,CustomerId=1001,StoreId=10001,DateSold=DateTime.Parse("2023-09-01")},
               // new Sales{ProductId=1,CustomerId=1001,StoreId=10002,DateSold=DateTime.Parse("2023-09-01")},
            foreach(Sale x in sales)
            {
                var saleNotSave = context.Sales.Where(
                    s => 
                        s.Customer.Id == x.CustomerId &&
                        s.Product.Id == x.ProductId &&
                        s.Store.Id == x.StoreId).SingleOrDefault();
/*                var saleInDataVase = context.Sales.Where(
                    s => 
                        s.Customer.Id == x.CustomerId && 
                        s.Product.Id == x.ProductId && 
                        s.Store.Id == x.StoreId).SingleOrDefault();*/

                if (saleNotSave == null) 
                {
                    context.Sales.Add(x);
                }
               
            }
            context.SaveChanges();
        }
    }
}