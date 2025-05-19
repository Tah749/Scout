import Head from 'next/head'
import styles from '../../styles/Squad.module.css'
import Link from 'next/link';
import Image from 'next/image';
// Import the navigation bar
import Navbar from "../../components/Navbar";

 function squad({data}) {

    console.log(data[1].photo.replace('.jpg', ''))
    const playerNames = data.map((player) => (
    <div className={styles.player}>
        <Image className={styles.playerPicture} loader={() => `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo.replace('.jpg', '')}.png`} src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo.replace('.jpg', '')}.png`} width={100} height={120}/>
        <h1>{player.name}</h1>
        <h2>£{player.price}M</h2>
        <h2>{player.points} Points</h2>
    </div>
    ))
    // HTML
    return (
      <div className={styles.container}>
      <Head>
        <title>Scout</title>
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/>
    <div className={styles.players}>{playerNames}</div>

      <Link href='/'>
        <button className={styles.goBackBtn}>Go Back</button>
      </Link>

    </div>
    )
}

export default squad;

// Load props before displaying page
  export async function getServerSideProps({ req, res }) {
        // Create a fetch request
        const response =  await fetch(`${process.env.BASE_URL}/api/runScript`, {
            method:'POST',
        })
        // convert response to readable JSON format
        const data = await response.json()

        const playersResponse =  await fetch(`${process.env.BASE_URL}/api/requests/getAllPoints`, {
            method:'POST',
          })
          // convert response to readable JSON format
          const playersData = await playersResponse.json()

          let playerArray = []
          data.forEach(id => {
           playerArray.push(playersData[id]) 
          });

    return {props: {
        data: playerArray,
    }}
  }