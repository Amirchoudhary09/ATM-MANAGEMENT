// // main.js (where you're importing)
// const { addtocart, removefromcart,name, card ,value} = require('./Cartmodule.js');
//  require('dotenv').config();
// console.log("End of script");
 //value();
// addtocart();
// removefromcart();
// console.log(addtocart());
// console.log(removefromcart());
// console.log(name);
// console.log(card);


//*** throw node***/
// const server = require('./thrownode.js');
// const PORT = 3000;
// server.listen(PORT);



/** server create by express  **/
// const createserver = require('./createserver.js');

// createserver.listen(process.evn.PORT|| 5000);
  const connect=require('./conectexpreswithmongo.js');
  connect.listen("8000");