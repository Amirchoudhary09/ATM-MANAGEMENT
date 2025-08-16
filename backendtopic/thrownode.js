//**   how to create server in  the backend  ya api  by node.js  http ki hlep se ***/
const http = require('http');
let server = http.createServer((req, res) => {
  // multiple urls
  if (req.url === "/") {
    let obj={
      name: "amir choudhary",
      card: "1234-5678-9012-3456",
      data:[
            { id: 1,
               name: "Item 1",
                price: 100
               },

            {
               id: 2,
                name: "Item 2", 
                price: 200 

            },

            { id: 3,
               name: "Item 3",
              price: 300 
            }
         ]
    };
    res.end(JSON.stringify(obj));
    // res.end("Welcome to the Home Page!");
  } else if (req.url === "/about") {
    res.end("Welcome to the About Page!");
  } else if (req.url === "/contact") {
    res.end("Welcome to the Contact Page!");
  }else{
    res.end("Hello World from the server!"); 
  }
    // res.end("Hello World from the server!"); 
});

//server.listen("3000"); // http://localhost:3000
module.exports = server; // Export the server for use in index.js