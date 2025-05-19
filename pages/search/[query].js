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
    if(team.id == data.team) {
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
        <h1 className={styles.playerName}>{data.first_name} {data.web_name}</h1>
        {/* Image of footballer */}
        <Image className={styles.playerPicture} loader={() => `https://resources.premierleague.com/premierleague/photos/players/250x250/p${data.photo.replace('jpg', 'png')}`} src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${data.photo.replace('jpg', 'png')}`} width={100} height={120}/>
      </div>
      {/* Div holding all the containers */}
      <div className={styles.grid_container}>
      {/* First container displays general information on the footballer  */}
      <div className={styles.container} id={styles.containerOne}>
      <p className={styles.subheading}>General</p>

        <div className={styles.information}>
          {/* Team name */}
          <p className={styles.informationField}>Team</p>
          <p className={styles.dataField}>{teamName}</p>
          {/* Fantasy price */}
          <p className={styles.informationField}>Price</p>
          <p className={styles.dataField}>£{data.now_cost}M</p>
          {/* Minutes played */}
          <p className={styles.informationField}>Minutes</p>
          <p className={styles.dataField}>{data.minutes}</p>
          {/* Games started */}
          <p className={styles.informationField}>Starts</p>
          <p className={styles.dataField}>{data.starts}</p>

          </div>
      </div>
      {/* Second container displays attack information */}
      <div className={styles.container} id={styles.containerTwo}>
      <p className={styles.subheading}>Attack</p>

        <div className={styles.information}>
          {/* Goals */}
          <p className={styles.informationField}>Goals</p>
          <p className={styles.dataField}>{data.goals_scored}</p>
          {/* Assists */}
          <p className={styles.informationField}>Assists</p>
          <p className={styles.dataField}>{data.assists}</p>
          {/* Expected goals per match */}
          <p className={styles.informationField}>Expected goals per match</p>
          <p className={styles.dataField}>{data.expected_goals_conceded_per_90}</p>
          {/* Expected goal involvements per match */}
          <p className={styles.informationField}>Expected goal involvments per match</p>
          <p className={styles.dataField}>{data.expected_goal_involvements_per_90}</p>
          </div>
      </div>

      {/* Third container displays defence information */}
      <div className={styles.container} id={styles.containerThree}>
      <p className={styles.subheading}>Defence</p>
          {/* Saves */}
        <div className={styles.information}>
          <p className={styles.informationField}>Saves</p>
          <p className={styles.dataField}>{data.saves}</p>
          {/* Clean sheets */}
          <p className={styles.informationField}>Clean Sheets</p>
          <p className={styles.dataField}>{data.clean_sheets}</p>
          {/* Goals conceded */}
          <p className={styles.informationField}>Goals Conceded</p>
          <p className={styles.dataField}>{data.goals_conceded}</p>
          {/* Clean sheets per game */}
          <p className={styles.informationField}>Clean sheets per game</p>
          <p className={styles.dataField}>{data.clean_sheets_per_90}</p>

          </div>
        </div>

      {/* Fourth container displays discipline information */}
      <div className={styles.container} id={styles.containerFour}>
      <p className={styles.subheading}>Discipline</p>
          {/* Yellow cards */}
        <div className={styles.information}>
          <p className={styles.informationField}>Yellow cards</p>
          <p className={styles.dataField}>{data.yellow_cards}</p>
          {/* Red cards */}
          <p className={styles.informationField}>Red cards</p>
          <p className={styles.dataField}>{data.red_cards}</p>

          </div>
        </div>
      </div>

      <Link href='/stats'>
        <button className={styles.goBackBtn}>Go Back</button>
      </Link>

    </div>
    )
}

export default Query;

// Load props before displaying page
  export async function getServerSideProps({ req, res }) {
    // Body of request that is being sent to the getStats API page
    // Get id from url  
    const body = { id: req.url.split('/')[2] };

    // Create a fetch request
    const response =  await fetch(`${process.env.BASE_URL}/api/requests/getStats`, {
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
