import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({ //The columns of the data that will be inputted
    userID: String,
    username: String,
    password: String,
});

export default mongoose.models.Logins || mongoose.model('Logins', loginSchema);; // Create a new mongoDB model