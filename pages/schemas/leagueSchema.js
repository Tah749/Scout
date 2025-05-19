import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({ // The columns of the data that will be inputted
    'leagueID': {type: String, unique: true}, // Unique ID of league
    'leagueName': String, // Name of league
    'leagueOwner': String, // userID of league owner
    'invitationCode': String, // Unique invitation code to join the league
    'players': Array, // Array of user IDs that are a part of the league
});

export default mongoose.models.Leagues || mongoose.model('Leagues', leagueSchema); // Create a new mongoDB model


