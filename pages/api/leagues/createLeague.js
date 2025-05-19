import connect from "../../../lib/mongodb";
import League from '../../schemas/leagueSchema'
// Ensure there is a MongoDB connection available
connect()
import cookie from 'cookie';

export default async function createLeague(req, res) {
const data = req.body

// Check database for a single row that matches the name provided
League.findOne({leagueName: data.name},(err, league) => {
    if(league) {

         // Redirects to home page containing a cookie displaying that there is already a league with that name
        res.setHeader('Set-Cookie', cookie.serialize('league_exists', league.leagueOwner, {
        maxAge: 10, // Cookie containing message will last 10 seconds
        path: '/' // Cookie will be available everywhere
        })
    )
        res.redirect('/leagues')
    } else {
      // Use the schema to create a new input into the database

      var ID = generateUUID();
      var CODE = generateCODE();
      var enterData = new League(
        {
          leagueID: ID,
          leagueName: data.name,
          leagueOwner: data.userID,
          invitationCode: CODE,
          players: [data.userID],
        })
       // Save new data to the database
        enterData.save()
         // Redirects to home page containing a cookie featuring the invitation code
         res.setHeader('Set-Cookie', cookie.serialize('league_created', CODE, {
            maxAge: 10, // Cookie containing message will last 10 seconds
            path: '/' // Cookie will be available everywhere
            })
        )
        res.redirect('/leagues')
    }
})

}

const generateUUID = () => {
    // Empty string that will hold the UUID
    var UUID = "";
    // For loop that repeats to create a 16 digit string
    for(let i = 0; i <= 15; i++) {
      // Random signle digit number is generated
      var char = Math.floor(Math.random() * 9) + 1
      // Character is concatenated to UUID string
      UUID = UUID += `${char}`
    }
    // UUID is returned
    return UUID;
  }

const generateCODE = () => {
    // Empty string that will hold the code
    var CODE = "";
    // For loop that repeats to create a 6 digit string
    for(let i = 0; i <= 5; i++) {
      // Random signle digit number is generated
      var char = Math.floor(Math.random() * 9) + 1
      // Character is concatenated to code string
      CODE = CODE += `${char}`
    }
    // CODE is returned
    return CODE;
  }