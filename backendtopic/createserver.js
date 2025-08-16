 let express = require('express');
let app = express();
const { check, password } = require('./checktokenmidleware.js');
app.use(express.json()); // Middleware to parse JSON bodies
                                     //** whole aplication par insert karna **/
// app.use(check);
// app.use(password);
app.get('/', (req, res) => {
    res.send({
        name: "amir choudhary",
        card: "1234-5678-9012-3456",
        data: [
            {
                id: 1,
                name: "Item 1",
                price: 100
            },
            {
                id: 2,
                name: "Item 2",
                price: 200
            },
            {
                id: 3,
                name: "Item 3",
                price: 300
            }
        ]
    });
});

app.get('/about', /* only about par lage ga   middleware */ check&&password,(req, res) => {
    res.send("Welcome to the About Page!");
});
app.post('/contact', (req, res) => {
    console.log(req.body);
                                  /** resopse lene ka ek tarika */
    res.send({
      message: "Welcome to the Contact Page!",
       name: "amir choudhary",
      card: "1234-5678-9012-3456",
      query: req.query,
      body: req.body,
    });



                           //**second way of respnce */
//    res.status(200).json({
//     message: "Welcome to the Contact Page!",
//     name: "amir choudhary",
//     card: "1234-5678-9012-3456",
//     query: req.query,
//     body: req.body,
// });


});
app.get("/contact/:topic", (req, res) => {
    let topic = req.params.topic;
    res.send(`Welcome to the Contact Page! Topic: ${topic}`);
});

module.exports = app; // Export the app for use in createserver.js
