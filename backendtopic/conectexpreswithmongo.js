let express = require('express');
const { dbconnection } = require('./dbconnection.js');
const { ObjectId } = require('mongodb');
let app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/studentdata_read", async(req, res) => {
   let db = await dbconnection();
   let studentCollection = db.collection("studentdata");
    let data= await studentCollection.find().toArray();

    res.send({
        status: true,
        message: "Student data retrieved successfully!",
        data: data
       
    });  
});
app.post("/studentdata_insert", async (req, res) => {
     let db = await dbconnection();
    let studentCollection = db.collection("studentdata");
    //   let obj={
    //     sname:req.body.sname;
    //     age:req.body.age,
    //     email:req.body.email,
    //   }
          /// Extracting data from the request body
       let{ sname, age, email } = req.body;
        //  let obj = { sname,age,email};
       let check=await studentCollection.findOne({ email });
        if(check){
          return res.send({
              status:false,
              msg:"Email already exists!"
          });
        }
           
      let insertres=await studentCollection.insertOne( { sname, age, email }/* obj */ );
      let resobj={
        status:true,
        msg:"Student data inserted successfully!",
        data:insertres

      }
    res.send(resobj);
  

});
app.delete("/studentdata_delete/:id", async (req, res) => {
    let db = await dbconnection();
    let studentCollection = db.collection("studentdata");
    let id = req.params.id;
    let deleteitem = await studentCollection.deleteMany({ "sname":"amir choudhary" });
     let resobj={
        status:true,
        msg:"Student data inserted successfully!",
        data: deleteitem

      }
    res.send(resobj);
});
app.put("/studentdata_update/:id", async (req, res) => {
    let db = await dbconnection();
    let studentCollection = db.collection("studentdata");
    let id = req.params.id;
    let { sname, age, email } = req.body;
    // let obj = { sname, age, email };
      let obj={}
    if( sname!== undefined && sname!=="" && sname!==null){
        obj.sname=sname;
        //obj["sname"]=sname; 
    }
    if( age!== undefined && age!=="" && age!==null){
        obj.age=age;
        //obj["age"]=age; 
    }
    if( email!== undefined && email!=="" && email!==null){
        obj.email=email;
        //obj["email"]=email; 
    }
   
    let updateitem = await studentCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set:  {sname,age,email} /* obj */   }
    );
    let resobj={
        status:true,
        msg:"Student data updated successfully!",
        data: updateitem

      }
    res.send(resobj);
});
module.exports = app; // Export the app for use in index.js