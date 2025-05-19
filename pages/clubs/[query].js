import Head from 'next/head'
import Image from "next/image";
import styles from '../../styles/Query.module.css'
import Link from 'next/link';
// Import the navigation bar
import Navbar from "../../components/Navbar";
import teamArray from '../../lib/teamArray';

function Query({data}) {
// Function to retrieve the team that the footballer plays for
let teamName;
teamArray.forEach(team => {
  if(team.id == data.id) {
    teamName = team.name;
  };
})

    // HTML
    return (
      <div>
      <Head>
        <title>Scout</title>
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/>

      {/* Container holding the title name and picture of footballer */}
      <div className={styles.container} id={styles.containerZero}>
        <h1 className={styles.playerName}>{teamName}</h1>
        {/* Image of footballer */}
        <Image className={styles.playerPicture} loader={() => `https://resources.premierleague.com/premierleague/badges/t${data.code}.svg`} src={`https://resources.premierleague.com/premierleague/badges/t${data.code}.svg`} width={100} height={120}/>
      </div>
      {/* Div holding all the containers */}
      <div className={styles.grid_container}>
      {/* First container displays general information on the footballer  */}
      <div className={styles.container} id={styles.containerOne}>
      <p className={styles.subheading}>Current Gameweek Stats</p>

        <div className={styles.information}>
          <p className={styles.informationField}>Points</p>
          <p className={styles.dataField}>{data.points}</p>

          <p className={styles.informationField}>Wins</p>
          <p className={styles.dataField}>{data.win}</p>

          <p className={styles.informationField}>Draws</p>
          <p className={styles.dataField}>{data.draw}</p>

          <p className={styles.informationField}>Losses</p>
          <p className={styles.dataField}>{data.loss}</p>

          </div>
      </div>
      {/* Second container displays attack information */}
      <div className={styles.container} id={styles.containerTwo}>
      <p className={styles.subheading}>Information</p>

        <div className={styles.information}>
          <p className={styles.informationField}>Home Strength</p>
          <p className={styles.dataField}>{data.strength_overall_home}</p>

          <p className={styles.informationField}>Away Strength</p>
          <p className={styles.dataField}>{data.strength_overall_away}</p>
          </div>
      </div>

      <Link href='/stats'>
        <button className={styles.goBackBtn}>Go Back</button>
      </Link>

      </div>
    </div>
    )
}

export default Query;

// Load props before displaying page
  export async function getServerSideProps({ req, res }) {
    // Get id from url  
    const body = { id: req.url.split('/')[2] };

    // Create a fetch request
    const response =  await fetch(`${process.env.BASE_URL}/api/requests/getClubStats`, {
      method:'POST',
      body: JSON.stringify(body)
    })
    // convert response to readable JSON format
    const data = await response.json()
    return { props: { 
      data: data
    }
    }
  }
