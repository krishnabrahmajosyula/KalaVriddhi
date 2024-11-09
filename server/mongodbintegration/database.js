//this module is used for establishing the connection with mongoDB and make the connection available across various other modules

import {MongoClient} from "mongodb";

const uri="mongodb+srv://KalaVriddhi:kalavriddhi_ug6@kalavriddhi.fg8vb.mongodb.net/";
const client=new MongoClient(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let db;

async function establishDBConnect(){
    if(!db){
        await client.connect();
        db=client.db("Kalavriddhi");
        console.log("Connection with MongoDB is successfull");
    }
    return db;
}

module.exports={establishDBConnect};