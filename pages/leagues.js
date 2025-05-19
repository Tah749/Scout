import Head from 'next/head'
import styles from '../styles/Leagues.module.css'

import Navbar from '../components/Navbar'
import Link from "next/link"
import Table from '../components/table'

export default function Leagues({user, leagues, league_created, league_exists, already_joined, player_joined, league_not_found}) {
    var userData = JSON.parse(user)
    var leaguesData = JSON.parse(leagues)

    const onRowClick = (league) => {
      window.location.href = `/leagues/${league}`;
    };
  
    // Array that will hold the user's leagues
    let userLeagues = [];
    // Loop through league data
    for (let i in leaguesData) {
      console.log(userData.userID)
      console.log(leaguesData[i].players.indexOf(userData.userID))
      // Check if userID is inside the players array
      if(leaguesData[i].players.indexOf(userData.userID) !== -1) {
        // Push league into array 
        userLeagues.push(leaguesData[i])
      }
    }
    // Arrays that will hold the data from the leagues
    var leagueNames = []
    var leagueCodes = []
    var leagueIDs = []
    // For loop
    userLeagues.forEach(league => {
      // Push name into array
      leagueNames.push(league.leagueName)
      leagueCodes.push(league.invitationCode)
      leagueIDs.push(league.leagueID)
    })

    return (
        <div>
        <Head>
          <title>Scout</title>
          <meta name="description" content="Fantasy Football League" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Navbar/>

      {/* Create and Join Buttons */}
        <div className={styles.btnContainer}>
        <Link href='/leagues/create'>
            <button className={styles.leagueBtn}>Create</button>
        </Link>
        <Link href='/leagues/join'>
            <button className={styles.leagueBtn}>Join</button>
        </Link>
        </div>

{/* Success/Error Messages */}
    <h2 className={styles.leagueErrorMsg}>{ (league_exists == "") ? "" : "Error: A league with this name already exists" }</h2>
    <h2 className={styles.leagueSuccessMsg}>{  (league_created == "") ? "" : "League created! Invite your friends with the code: " + `${league_created}`  }</h2>
    <h2 className={styles.leagueErrorMsg}>{  (league_not_found == "") ? "" : "There are no leagues with the following invite code: " + `${league_not_found}`  }</h2>
    <h2 className={styles.leagueErrorMsg}>{  (already_joined == "") ? "" : "You are already in the league: " + `${already_joined}`  }</h2>
    <h2 className={styles.leagueSuccessMsg}>{  (player_joined == "") ? "" : "Successfully joined " + `${player_joined}`  }</h2>

{/* Table of Leagues */}

      <Table league={leagueNames} codes={leagueCodes} ID={leagueIDs} onRowClick={onRowClick} />

      </div>
    )
}

import connect from "../lib/mongodb";
// Import user schema
import userSchema from "./schemas/userSchema";
// Import league schema
import leagueSchema from "./schemas/leagueSchema";

export async function getServerSideProps({ req, res }) {
    // Connect to MongoDB
    connect()
    // Create a variable that holds the user that is retrieved
    const user = await userSchema.findOne({username: req.cookies.username ? req.cookies.username : ""})
    // Create a variable that holds the leagues that the user is in
    let leagues;
    leagues = await leagueSchema.find({players: user.userID}).catch(error => {
      leagues = ""
    })
    // Convert objects to a JSON string
    const userToJSON = JSON.stringify(user)
    const leagueToJSON = JSON.stringify(leagues)
    // Return as props
    return { props: { 
        user: userToJSON,
        leagues: leagueToJSON,
        league_created: (req.cookies.league_created ? req.cookies.league_created : ""),
        league_exists: (req.cookies.league_exists ? req.cookies.league_exists : ""),
        already_joined: (req.cookies.already_joined ? req.cookies.already_joined : ""),
        player_joined: (req.cookies.player_joined ? req.cookies.player_joined : ""),
        league_not_found: (req.cookies.league_not_found ? req.cookies.league_not_found : ""),
        }
    }
}