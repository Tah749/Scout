// Import libraries
import axios from "axios";
import https from 'https'

import connect from "../../../lib/mongodb";
import User from "../../schemas/userSchema";
connect()


export default async function handler(req, res) {
    try {
    // Create an axios instance
    const instance = axios.create({
        // Avoid getting blocked by chrome firewall 
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    const getNameInstance = axios.create({
        // Avoid getting blocked by chrome firewall 
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    // Attempt to create a request to the API
    const response = await instance.get(`https://fantasy.premierleague.com/api/event/${process.env.CURRENT_GAMEWEEK}/live/`)
    const nameResponse = await getNameInstance.get(`https://fantasy.premierleague.com/api/bootstrap-static/`)
    let username = req.body;
    // Fetch user from database
    User.findOne({username: username},(err, user) => {
        // If error, redirect user to homepage
        if(err) {
            res.redirect("/")
        }
        // Array that will hold each footballer ID
        let footballerArray = []
        footballerArray.push(user.team[0].keepers.keeper)
        // Looping through each branch of the teams array to collect all players
        for (const player in user.team[0].defenders) {
            footballerArray.push(user.team[0].defenders[player])
        }
        for (const player in user.team[0].midfielders) {
            footballerArray.push(user.team[0].midfielders[player])
        }
        for (const player in user.team[0].forwards) {
            footballerArray.push(user.team[0].forwards[player])
        }
        // Array holding all player points
        let points = {};
        footballerArray.forEach((id) => {
            let totalPoints = 0;
            let reasons = "";
            // Loop through array of all player stats
            response.data.elements.forEach(player => {
                // If player ID in array matches the ID we are looking for
                if(player.id == id) {
                    //console.log(player.explain[0].stats)
                    player.explain[0].stats.forEach(e => {
                        // Add up all points
                        totalPoints = totalPoints +  e.points
                        // Concatenate the reasons into 1 string that can be split with '//'
                        reasons += `${e.identifier}//`
                    })
                }
            });
            nameResponse.data.elements.find(o => {
                if(o.id == id) {
                    // Add values to array
                    points[id] = {name: o.web_name, points: totalPoints, reason: reasons}
                }
            })
        })
        res.send(points)
        res.end();
    })
} catch(e) {
    res.status(405).end()
    }
}
