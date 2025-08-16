const{MongoClient}=require('mongodb');
const dbconnectionurl='mongodb://127.0.0.1:27017';
const client=new MongoClient(dbconnectionurl);
let dbconnection=async()=>{
    await client.connect();
    let db=client.db("mymongoproject");
    return db;
}
module.exports={dbconnection};
//npm i mongodb  (this coomond  is used to install mongodb in your project)