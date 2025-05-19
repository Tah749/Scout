
import mongoose from "mongoose"; //Import the mongoose node package

//Creating the connection to the database
async function connect () {
    try {
        //Wait for the database to be connected to
        await mongoose.connect('mongodb+srv://admin:oeVAou0hS4MRXVSU@scout.0kmnumm.mongodb.net/?retryWrites=true&w=majority')
        console.log('Connection to database is successful')
    } catch(error) {
        console.log(`Error occured - ${error}`)
    }
}

export default connect