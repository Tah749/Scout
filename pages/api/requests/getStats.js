// Import libraries
import axios from "axios";
import https from 'https'

export default async function handler(req, res) {

    // Create an axios instance
    const instance = axios.create({
        // Avoid getting blocked by chrome firewall 
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    // Find the id from the body of the request
    var id = JSON.parse(req.body).id
    // Attempt to create a request to the API
    const response = await instance.get('https://fantasy.premierleague.com/api/bootstrap-static/')
    // FOR Loop
    let i = 0;
    // Variable to be returned
    let returnVariable;
    await response.data.elements.forEach(player => {
        i++
        if(player.id == id) {
            console.log(player)
            returnVariable = player
        }
    });
    // Return the variable
    res.send(returnVariable)
    return returnVariable
  }
