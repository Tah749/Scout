// Import libraries
import axios from "axios";
import https from 'https'

export default async function handler(req, res) {

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
        
        // Array holding all player points
        let players = {};
        await nameResponse.data.elements.forEach(player => {
            // Loop through array of points
            var totalPoints = 0;
            response.data.elements.forEach(e => {
                // If the id matches
                if(e.id == player.id) {
                    // Parse through points array
                    e.explain[0].stats.forEach(e => {
                        // Add up all points
                        totalPoints = totalPoints +  e.points
                    })
                }
                });
                // Add values to array
                players[player.id] = {name: player.web_name, id: player.id, photo: player.photo, points: totalPoints, price: player.now_cost}
            })
        res.send(players)
        res.end();
    

}
