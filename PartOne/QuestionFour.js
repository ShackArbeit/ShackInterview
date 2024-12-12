// PartOne  Interface 
    // An interface in TypeScript is a way to describe the shape and contract of an object 
    // Example One 
        //We can use interfaces to define custom types for objects, functions, and classes,for example 
        interface Person {
            name: string;
            age: number;
            greet(): void;
        } 
        // Now we use this interface to "type-check" and "enforce" the structure of person objects in our code.
        let alice: Person = {
            name: "Alice",
            age: 25,
            greet() {
            console.log("Hello, I'm " + this.name);
            },
        }; 
    // Example Two
        // We can also use interfaces to describe the shape of classes and their instances,for example 
        interface Car {
            model: string;
            year: number;
            start(): void;
            stop(): void;
        } 
        // We can then implement this interface in a class definition using the implements keyword:
        class Car implements Car {
            model: string;
            year: number;
            constructor(model: string, year: number) {
              this.model = model;
              this.year = year;
            }
            start() {
              console.log("The car is starting");
            }
            stop() {
              console.log("The car is stopping");
            }
          } 
    // Example Three 
          // build a basic example for how interface apply to build a API by ExpressJs
          interface Product{
             id:number;
             name:string;
             price:number;
          }
          interface CartItem extends Product {
            quantity: number;
          }
          class CartService {
            private cartItems: CartItem[] = [];      
            addToCart(product: Product): void {
              const existingItem = this.cartItems.find(item => item.id === product.id);
              if (existingItem) {
                existingItem.quantity++;
              } else {
                this.cartItems.push({ ...product, quantity: 1 });
              }
            }     
            getCartItems(): CartItem[] {
              return this.cartItems;
            }
          }
          const express = require('express');
          const app = express();
          const cartService = new CartService();
          app.get('/cart', (req, res) => {
            res.json(cartService.getCartItems());
           });
          app.post('/cart', (req, res) => {
                const product: Product = req.body;
                cartService.addToCart(product);
                res.sendStatus(200);
           });

// PartOne  Enum
       // An enum  is a way to define a set of named constants that can have either numeric or string values. 
       // Example One, use the enum keyword to define an enum, here is a numeric enmu
       enum Day {
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            Sunday,
        }
         // You can access the value of an enum member using the dot notation, or the index notation with brackets.
         console.log(Day.Monday); // 0
         console.log(Day["Monday"]); // 0
      // Example Two,use the enum keyword to define an enum, here is a string enum enmu
       enum Color {
            Red = "red",
            Orange = "orange",
            Yellow = "yellow",
            Green = "green",
            Blue = "blue",
            Indigo = "indigo",
            Violet = "violet",
     }
         // You can access the value of an enum member using the dot notation, or the index notation with brackets.
         console.log(Color.Red); // "red"
         console.log(Color["Red"]); // "red"
      // Example Three,build a basic example for how enum apply to build a API order list
      enum OrderStatus {
            Pending = "PENDING",
            Processing = "PROCESSING",
            Completed = "COMPLETED",
            Canceled = "CANCELED",
      }
      function handleOrder(status:OrderStatus){
         switch(status){
            case OrderStatus.Pending:
                console.log('Order is waiting to be processed...')
                break
            case OrderStatus.Processing:
                console.log('Order is being processed...')
                break
            case OrderStatus.Completed:
                console.log('Order completed!')
                break
            case OrderStatus.Canceled:
                console.log('Order canceled')
                break
            default:
                break
         }
      }

// PartThree, What is the difference between 'Interface' and 'Enum' ?
  // A. Purpose:
    //  (a) Enum defines a fixed set of values, suitable for constants
    //  (b) Interface defines object structures or type constraints
 // B. Value Types:
    //  (a) Enum contains concrete values, such as strings or numbers
    //  (b) Interface does not contain concrete values, only describes properties and methods
// C. Extensibility:
   //   (a) Enum is not easily extensible, limited to the predefined set of values
   //   (b) Interface supports extensibility (through inheritance or intersections)
