import Head from 'next/head'
import styles from '../styles/Fixtures.module.css'

import Navbar from '../components/Navbar'

import teamArray from '../lib/teamArray'    

export default function Fixtures({data}) {

    let homeArray = []
    let awayArray = []
    let kickoffTimeArray = []
    for (let i = 0; i < data.length; i++) {
        teamArray.forEach(team => {
            if(team.id == data[i].team_h) {
                homeArray.push(team.name)
            }
            if(team.id == data[i].team_a) {
                awayArray.push(team.name)
            }
        })
        let dateUnit = data[i].kickoff_time.split("-")
        let standardDate = `${dateUnit[2].split('T')[0]}/${dateUnit[1]}/${dateUnit[0]}`
        let timeUnit = data[i].kickoff_time.split(":")
        let standardTime = `${timeUnit[0].split('T')[1]}:${timeUnit[1]}`
        let standardDateAndTime = `${standardDate} - ${standardTime}`
        kickoffTimeArray.push(standardDateAndTime)
      }

    return (
        <div className='container'>
        <Head>
          <title>Scout</title>
          <meta name="description" content="Fantasy Football League" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Navbar/>

        <h1 className={styles.title}>Fixtures</h1>

                <table style={{margin: "auto"}} className={styles.table}>
          <thead>
            <tr>
          <th style={{ padding: "30px", border: "1px solid #ddd", width: "250px" }}>Kickoff Time</th>
          <th style={{ padding: "30px", border: "1px solid #ddd", width: "500px" }}>Home</th>
          <th style={{ padding: "30px", border: "1px solid #ddd", width: "500px" }}>Away</th>
            </tr>
          </thead>
          <tbody>
            {kickoffTimeArray.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center", cursor: "pointer", padding: "20px", border: "1px solid #ddd", width: "250px", "transition-duration": "0.2s" }}>{item}</td>
                <td style={{ textAlign: "center", cursor: "pointer", padding: "20px", border: "1px solid #ddd", width: "500px", "transition-duration": "0.2s" }}>{homeArray[index]}</td>
                <td style={{ textAlign: "center", cursor: "pointer", padding: "20px", border: "1px solid #ddd", width: "500px", "transition-duration": "0.2s" }}>{awayArray[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    )
}

// Load props before displaying page
export async function getServerSideProps({ req, res }) {

    // Create a fetch request
    const response =  await fetch(`${process.env.BASE_URL}/api/fixtures/futureFixtures`, {
      method:'POST',
    })
    // convert response to readable JSON format
    const data = await response.json()
    return { props: { 
      data: data
    }
    }
  }

