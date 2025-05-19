// Import libraries
import axios from "axios";
import https from 'https'

export default async function handler(req, res) {

    // Create an axios instance
    const instance = axios.create({
        // Avoid getting blocked by chrome firewall 
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    // Attempt to create a request to the API
    const response = await instance.get('https://fantasy.premierleague.com/api/fixtures/?future=1')
    // FOR Loop
    // Variable to be returned
    let returnVariable = [];
    let fixtures = response.data
    // Get first 10 upcoming fixtures
    for (let i = 0; i <= 10; i++) {
        returnVariable.push(fixtures[i])
      }
    // Return the variable
    res.send(returnVariable)
    return returnVariable
}