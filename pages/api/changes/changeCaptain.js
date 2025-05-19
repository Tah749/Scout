import connect from "../../../lib/mongodb";
import User from "../../schemas/userSchema";
// Ensure there is a MongoDB connection available
connect()

export default async function changeCaptain(req, res) {
const data = req.body
const url = req.url

const parsedURL = url.split('?')
const newCaptain = parsedURL[1];
const userID = parsedURL[2];

User.findOne({userID: userID}, (err, user) => {
    if(err) {res.sent('/')}
    if(user) {

        let captain = user.captain;

        // Set team as new update
        var update = {captain: newCaptain}
        // Update in database
        User.findOneAndUpdate({userID: userID}, update,(err, success) => {
          if(success) {
            res.redirect('/')
              }
            })
        }
})
}