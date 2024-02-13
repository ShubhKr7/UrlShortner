const express=require('express');
const path=require('path');
const app=express();
const PORT= 4567;
const {connectToMongoDB}=require('./connection');

//Static Routes (All HTML frontend content of the website)
const staticRoutes=require("./routes/staticRouter");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
const urlRoute=require('./routes/url');

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));
app.use("/",staticRoutes);
app.use("/url",urlRoute);

//Connecting to mongoDB Server
connectToMongoDB('mongodb://localhost:27017/compacturl')
.then(()=>{console.log("Connected to Mongo DB!!!")})
.catch(()=>{console.log("Error Encountered while connecting to mongo DB ");});


//Listening to Port
app.listen(PORT,()=>{console.log(`Server running on port: ${PORT}`);});