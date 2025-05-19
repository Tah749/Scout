import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Navbar from '../components/Navbar'
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer';
import EditTeam from '../components/EditTeam';
import Captain from '../components/Captain';

import Link from "next/link"

import connect from '../lib/mongodb';
import User from './schemas/userSchema';

export default function Home({ user, photo, points }) {
  user = JSON.parse(user)

  // Home page when user is not logged in
  if (user == null || user.username == '' || !user) {
  return (
    <div>
      <Head>
        <title>Scout</title>
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/>
    
    <div className={styles.field}>
      <div className='forwards'>
        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>
      </div>

      <div className='midfields'>
        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        </div>



        <div className='defenders'>
        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>

        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
        </div>
        
        </div>

        <div className='keeper'>
        <div className={styles.playerName}>
          <img className={styles.players} src='/images/football-top.png'/>
          <h2>Player</h2>
          </div>
        </div>

    </div>

    </div>
  )
  } else {
    // Home page whe user is logged in
    return (
      <div>
        <Head>
          <title>Scout</title>
          <meta name="description" content="Fantasy Football League" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Navbar/>
      
      <div className={styles.field}>
        <div className='forwards'>
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].forwards.forwardA].name}</h2>
            <h2>{points[user.team[0].forwards.forwardA].points} Points</h2>
           
          </div>

          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].forwards.forwardB].name}</h2>
            <h2>{points[user.team[0].forwards.forwardB].points} Points</h2>
          </div>
        </div>
  
        <div className='midfields'>
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].midfielders.midfielderA].name}</h2>
            <h2>{points[user.team[0].midfielders.midfielderA].points} Points</h2>
          </div>
  
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].midfielders.midfielderB].name}</h2>
            <h2>{points[user.team[0].midfielders.midfielderB].points} Points</h2>
          </div>
  
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].midfielders.midfielderC].name}</h2>
            <h2>{points[user.team[0].midfielders.midfielderC].points} Points</h2>
          </div>
  
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].midfielders.midfielderD].name}</h2>
            <h2>{points[user.team[0].midfielders.midfielderD].points} Points</h2>
          </div>
  
          </div>
  
  
  
          <div className='defenders'>
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].defenders.defenderA].name}</h2>
            <h2>{points[user.team[0].defenders.defenderA].points} Points</h2>
          </div>
  
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].defenders.defenderB].name}</h2>
            <h2>{points[user.team[0].defenders.defenderB].points} Points</h2>
          </div>
  
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].defenders.defenderC].name}</h2>
            <h2>{points[user.team[0].defenders.defenderC].points} Points</h2>
          </div>
  
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].defenders.defenderD].name}</h2>
            <h2>{points[user.team[0].defenders.defenderD].points} Points</h2>
          </div>
          
          </div>
  
          <div className='keeper'>
          <div className={styles.playerName}>
            <img className={styles.players} src='/images/football-top.png'/>
            <h2>{points[user.team[0].keepers.keeper].name}</h2>
            <h2>{points[user.team[0].keepers.keeper].points} Points</h2>
            </div>
          </div>
      </div>

      <Captain team={user.team} photo={photo} points={points} userID={user.userID} captain={user.captain}/>
      <EditTeam team={user.team} photo={photo} points={points} userID={user.userID}/>
      <Link href='/ai/squad'>
        <button className={styles.leagueBtn}>AI Squad</button>
      </Link>
      <Link href='/leagues'>
        <button className={styles.leagueBtn}>Leagues</button>
      </Link>
      <Scoreboard user={user} points={points}/>
      <Footer/>
      </div>
    )
  }
}


export async function getServerSideProps({ req, res }) {
  await connect();
  // Create a request to get the picture code for every player
  const response =  await fetch(`${process.env.BASE_URL}/api/requests/getPicture`)
  const data = await response.json()
  // Create a request to get player points
  var pointsData = "";
  if(req.cookies.username) {
    const pointsRequest =  await fetch(`${process.env.BASE_URL}/api/points/getUserPoints`, {
      method: "POST",
      body: req.cookies.username ? req.cookies.username : ""
    })
    pointsData = await pointsRequest.json()
    // Get user details by username
  }
  const user = await User.findOne({username: req.cookies.username ? req.cookies.username : ""})
  const userToJSON = JSON.stringify(user)
  //console.log(data)
  // Return cookies and photo data
  return { props: { 
    user: userToJSON,
    photo: data,
    points: pointsData
    }

  }
}
