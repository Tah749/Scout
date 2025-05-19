import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ // The columns of the data that will be inputted
    'userID': {type: String, unique: true}, // Unique ID of user
    'username': {type: String, unique: true}, // Unique ID of user
    'leagues': Array, // Array of league IDs that the player is in
    'captain': String, // Current captain
    'transfers': Number, // Amount of free transfers left
    'budget': Number, // Remaining budget
    'substitutions': Number, // Subsitutions remaining
    'boostsCaptain': Boolean, // Captain boost perk redeemed
    'boostsTranfers': Boolean, // Transfer boost perk redeemed
    'team': Array // Array containing a list of players on the team
});

export default mongoose.models.Users || mongoose.model('Users', userSchema); // Create a new mongoDB model


