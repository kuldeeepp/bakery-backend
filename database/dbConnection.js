import mongoose from "mongoose";
 export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RESTURANT"
    }).then(()=>{
        console.log("Connected to database sucesfully");
    }).catch((err)=>{
        console.log(`Some error while connecting to database`);
    })
};
