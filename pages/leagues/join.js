import Head from 'next/head'
import styles from '../../styles/Leagues.module.css'

import Navbar from '../../components/Navbar'
import Link from "next/link"

export default function Create({ user }) {
    var userData = JSON.parse(user)
    return (
        <div>
        <Head>
          <title>Scout</title>
          <meta name="description" content="Fantasy Football League" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Navbar/>

      {/* Form for the league system */}
      <form action="/api/leagues/joinLeague" method="POST"> 
        {/* Input box for name */}
        <input type='text' className={styles.createInput} name='code' placeholder='Enter Invitation Code' /> 
        {/* Hidden input box that will pass a userID parameter through */}
        <input type="hidden" id="userID" name="userID" value={userData.userID} />
        {/* Container to hold buttons */}
        <div className='buttonHolder'> 
            {/* Button to create league */}
            <input type="submit" className={styles.createBtn} name='join' value="Join League"/> 
        </div>
    </form>
      </div>
    )
}

import connect from "../../lib/mongodb";
import userSchema from "../schemas/userSchema";

export async function getServerSideProps({ req, res }) {
    // Connect to MongoDB
    connect()
    // Create a variable that holds the user that is retrieved
    const user = await userSchema.findOne({username: req.cookies.username ? req.cookies.username : ""})
    // Convert object to a JSON string
    const userToJSON = JSON.stringify(user)
    // Return as props
    console.log(req.cookies.username)
    return { props: { 
        user: userToJSON,
        }
    }
}