import axios from "axios";
import https from 'https'

export default async function getPicture(req, res) {
    // Create an axios instance
    const instance = axios.create({
        // Ensure instance does not get rejected
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    // Create an API request
    const response = await instance.get('https://fantasy.premierleague.com/api/bootstrap-static/')
    let photoArray = {}
    // Loop through the respose
    await response.data.elements.forEach(element => {
            // Push each photo code into array with corresponding ID
            photoArray[element.id] = element.photo.split('.')[0]
    });
    // Return the array of photos
    res.status(200).json(photoArray)
    return photoArray
  }
  