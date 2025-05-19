import mongoose from "mongoose";

const connection={};

async function connect(){
  if(connection.isConnected){
    return;
  }
  const db = await mongoose.connect("mongodb+srv://admin:oeVAou0hS4MRXVSU@scout.0kmnumm.mongodb.net/?retryWrites=true&w=majority")

  connection.isConnected= db.connections[0].readyState;

  console.log("connection successful")
}

export default connect;