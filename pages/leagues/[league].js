import Head from 'next/head'
import styles from '../../styles/Leagues.module.css'
// Import the navigation bar
import Navbar from "../../components/Navbar";

  function League({leagues, profiles, points}) {
  var userProfiles = JSON.parse(profiles)
  var userPoints = JSON.parse(points)
    console.log(points)
  // HTML
    return (
      <div>
      <Head>
        <title>Scout</title>
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/>

    <table style={{ width: "50%", margin: "0 auto", borderCollapse: "collapse", fontSize: "32px" }}>
      <thead>
        <tr>
          <th style={{ padding: "10px", border: "1px solid #ddd", width: "70%" }}>Member</th>
          <th style={{ padding: "10px", border: "1px solid #ddd", width: "30%" }}>Points</th>
        </tr>
      </thead>
      <tbody>
        {userProfiles.map((item) => (
          <tr key={item.username}>
            <td
            // Style
            style={{ textAlign: "center", cursor: "pointer", padding: "10px", border: "1px solid #ddd", width: "70%", "transition-duration": "0.2s" }}
            >{item.username}</td>
            <td
            // Style
            style={{ textAlign: "center", cursor: "pointer", padding: "10px", border: "1px solid #ddd", width: "70%", "transition-duration": "0.2s" }}
            >{userPoints[item.username]}</td>
          </tr>
        ))}
      </tbody>
    </table>


    </div>
    )
}

export default League;

import connect from "../../lib/mongodb";
// Import league schema
import leagueSchema from "../schemas/leagueSchema";
// Import user schema
import userSchema from "../schemas/userSchema";

// Load props before displaying page
  export async function getServerSideProps({ req, res }) {
    // Parse the URL to get only the ID
    const urlID = req.url.split('/')[2]
    // Connect to MongoDB
    await connect()
    // Create a variable that holds the leagues
    const leagues = await leagueSchema.find({leagueID: urlID})

    //  GET USERS
    var userArray = []
    await leagues[0].players.forEach(user => {
      userArray.push(user)
    })

    //  GET MEMBER PROFILES
    var userProfiles = []

    // Ensure all elements are ran before the promise is returned
    const profiles = await Promise.all(
      // Map through the userArray
      userArray.map(async user => {
        // Traverse database for a matching userID
        const profile = await userSchema.findOne({ userID: user });
        // Push data into a nmew array
        userProfiles.push(profile)
        // Return the promise
        return profile;
      })
    );

    let i = 0
    var totals = {}
     for(const user of userProfiles) {
      const pointsRequest =  await fetch(`${process.env.BASE_URL}/api/points/getUserPoints`, {
        method: "POST",
        body: user.username
      })
      const pointsData = await pointsRequest.json()
      let total = 0;
      for(let player in pointsData){
        total = total + pointsData[player].points
      }
      totals[user.username] = total
      userProfiles.points = total
      i++
    }
    //  PASSING PROPS
    
    // Convert objects to a JSON string
    const leaguesToJSON = JSON.stringify(leagues[0])
    // Convert objects to a JSON string
    const profilesToJSON = JSON.stringify(userProfiles)
    // Convert objects to a JSON string
    const pointsToJSON = JSON.stringify(totals)
    // Return as props
    return { props: { 
        leagues: leaguesToJSON,
        profiles: profilesToJSON,
        points: pointsToJSON,
        }
    }
  }