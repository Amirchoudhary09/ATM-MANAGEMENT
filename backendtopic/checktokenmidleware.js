require('dotenv').config();
let check= (req, res, next) => {
    if(req.query.token ===""|| req.query.token ===undefined){
        return res.send({
            message: "Token is required to access this API",
            status: false
        });
    }
    if(req.query.token != process.env.mytoken){
        return res.send({
            message: "Invalid token",
            status: false
        });
    }
         // console.log("Middleware is running");
    next(); // Call next() to pass control to the next middleware or route handler
};

let password=(req, res, next) => {
    if(req.query.pass==""||req.query.pass==undefined){
        res.send({
            message: "Password is required to access this API",
            status: false
        })
    }
    if(req.query.pass!=process.env.mypass){
        res.send({
            message: "Invalid password",
            status: false
        })
    }
    next();
};
 module.exports = { check, password };
