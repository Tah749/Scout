import connect from "../../../lib/mongodb";
import User from "../../schemas/userSchema";
import cookie from 'cookie';
// Ensure there is a MongoDB connection available
connect()

export default async function changePlayer(req, res) {
const data = req.body
const url = req.url

const parsedURL = url.split('?')[1].split('@');
console.log("URL: " + url)
const userID = parsedURL[0];
const currentPlayer = parsedURL[1];
const newPlayer = parsedURL[2];

// Create a fetch request
const response =  await fetch(`${process.env.BASE_URL}/api/requests/getAllPoints`, {
  method:'POST',
})
// convert response to readable JSON format
const playerInfo = await response.json()

console.log(newPlayer)

User.findOne({userID: userID}, (err, user) => {
    if(err) {res.sent('/')}
    if(user) {
      if(user.transfers > 0) {

        // Get budget
        let budget = user.budget;
        let beforeTransfer = budget + playerInfo[currentPlayer].price;
        let afterTransfer = beforeTransfer - playerInfo[newPlayer].price;
        // Check if the final budget after the transaction is too expensive
        if(afterTransfer > 0) {

        let team = user.team;
        // Get first key of object
        for (let positions in team) {
          // Get second key of object
          for (let id in team[positions]) {
            // Get value of key
            for (let value in team[positions][id]) {
              // Check if ID matches
              if (team[positions][id][value] == newPlayer) {
            // Redirects to home page containing an error message
            res.setHeader('Set-Cookie', cookie.serialize('error', 'inTeam', {
              maxAge: 10, // Cookie will last 10 seconds
              path: '/' // Cookie will be available everywhere
              }
            ))
            res.redirect(`/search/swap?${currentPlayer}?${userID}`)
              } else {
                if (team[positions][id][value] == currentPlayer) {
                  
                  // replace value with new ID
                  team[positions][id][value] = newPlayer;
                }
              }
            }
          }
        }
        var transfersLeft = (user.transfers - 1);
        // Set team as new update
        var update = {team: team, transfers: transfersLeft, budget: afterTransfer}
        // Update in database
        User.findOneAndUpdate({userID: userID}, update,(err, success) => {
          if(success) {
            res.redirect('/')
              }
            })
          } else {
            // Redirects to home page containing an error message
            res.setHeader('Set-Cookie', cookie.serialize('error', 'noBudget', {
              maxAge: 10, // Cookie will last 10 seconds
              path: '/' // Cookie will be available everywhere
              }
            ))
            res.redirect(`/search/swap?${currentPlayer}?${userID}`)
          }
          } else {
            // Redirects to home page containing an error message
            res.setHeader('Set-Cookie', cookie.serialize('error', 'noTransfers', {
              maxAge: 10, // Cookie will last 10 seconds
              path: '/' // Cookie will be available everywhere
              }
            ))
            res.redirect(`/search/swap?${currentPlayer}?${userID}`)
          }
        }
})
}