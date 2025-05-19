import Head from 'next/head'
import styles from '../styles/Help.module.css'

import { useState } from 'react'
import Navbar from '../components/Navbar'


export default function Help({ username, error }) {

    const [usernameOption, setUsernameOption] = useState(false);
    const [passwordOption, setPasswordOption] = useState(false);

    return (
        <div>
        <Head>
          <title>Scout</title>
          <meta name="description" content="Fantasy Football League" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Navbar/>

        <h1 className={styles.title}>Help</h1>

        <div className={styles.container}>

            <div className={styles.howTo}>
                <h1 className={styles.subheading}>How To Play</h1>
                <ul>
                    <li>Once you have created your account, you will be prompted to create a squad of 15 players. You must select a goalkeepers, 4 defenders, 4 midfielders and 2 forwards.</li>
                    <li>You will have a budget of 100 million to spend on your players. Each player has a specific value, and you must stay within your budget when selecting your squad.</li>
                    <li>Once your squad is selected, you will be able to select your starting lineup for the next matchweek. You must select 1 goalkeeper, at least 3 defenders, at least 2 midfielders, and at least 1 forward</li>
                    <li>Points are awarded to your players based on their real-life performances in the Premier League. For example, a goal scored will earn a player a certain number of points, while a clean sheet will earn a defender or goalkeeper a certain number of points.</li>
                    <li>You can make changes to your squad and starting lineup before each matchweek deadline. You are allowed one free transfer per matchweek, but any additional transfers will cost you points.</li>
                    <li>You can also make use of chips to boost your points, you will have two wildcard chips which you can use to make unlimited transfers in a matchweek. Also, you can use bench boost chip to get points from your bench players and triple captain chip to get triple points from your captain.</li>
                    <li>Your team will be ranked against other teams in your league, which can be a private league created with friends or a public league with other players from around the world.</li>
                    <li>Be sure to keep an eye on injuries, suspensions, and other factors that can affect player performance and make adjustments to your squad and starting lineup accordingly.</li>
                </ul>
            </div>

            <div className={styles.rules}>
            <h1 className={styles.subheading}>Rules</h1>
            <ul>
                    <li>Once you have created your account, you will be prompted to create a squad of 15 players. You must select a goalkeepers, 4 defenders, 4 midfielders and 2 forwards.</li>
                    </ul>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>60 minutes gametime</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Playing over 60 minutes</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Goal scored by defender or goalkeeper</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>Goal scored by midfielder</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>Goal scored by forward</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Assist</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>Cleansheet by defender or goalkeeper</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Cleansheet by midfielder</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>3 Shots saved by goalkeeper</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Penalty save</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>Penalty miss</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>2 goals conceded by goalkeeper or defender</td>
                                <td>-1</td>
                            </tr>
                            <tr>
                                <td>Yellow card</td>
                                <td>-1</td>
                            </tr>
                            <tr>
                                <td>Red card</td>
                                <td>-3</td>
                            </tr>
                            <tr>
                                <td>Own goal</td>
                                <td>-2</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>You can also make use of chips to boost your points, you will have two wildcard chips which you can use to make unlimited transfers in a matchweek. Also, you can use bench boost chip to get points from your bench players and triple captain chip to get triple points from your captain.</p>
            </div>

        </div>

            <div className={styles.settings}>
            <h1 className={styles.subheading}>Settings</h1>

            <button 
            className={styles.changeBtn}
            onClick={() => usernameOption ? setUsernameOption(false) : setUsernameOption(true)}
            >Change Username</button>

            {/* Username Modal Box */}

            {usernameOption ? (
                <div className={styles.modalBox}>
                <div class={styles.editModalContent}>
            <span className="closeModal" onClick={() => setUsernameOption(false)}>&times;</span>
                <h1>Change Username</h1>

                {/* The form to change the username */}
        <form action="/api/logins/handleChange" method="POST"> 
            {/* Input box for current username */}
            <br/><br/><br/> 
            <input type='username' className="inputBox" name='username' placeholder='Current Username' /> 
            <br/><br/><br/> 
            {/* Input box for new username */}
            <input type='username' className="inputBox" name='newUsername' placeholder='New Username' /> 
            {/* Add Space between input boxes */}
            <br/><br/><br/> 
            {/* Input box for password (input is hidden) */}
            <input type='password' className="inputBox" name='password' placeholder='Password' /> 

            {/* Container to hold button */}
            <div className='buttonHolder'> 
                {/* Submit Button */}
                <input type="submit" className="submitBtn" value="Change Username"/> 
            </div>
        </form>
                
                
                </div>
            </div>
            ) : null}

            <h2 className={styles.error}>{ (error == "invalidPassword" ? "Invalid Password" : "") }</h2>
            <h2 className={styles.error}>{ (error == "invalidUsername" ? "Username not found" : "") }</h2>

            <button 
            className={styles.changeBtn}
            onClick={() => passwordOption ? setPasswordOption(false) : setPasswordOption(true)}
            >Change Password</button>

            {/* Password Modal Box */}

            {passwordOption ? (
                <div className={styles.modalBox}>
                <div class={styles.editModalContent}>
            <span className="closeModal" onClick={() => setPasswordOption(false)}>&times;</span>
                <h1>Change Password</h1>

                {/* The form to change the password */}
        <form action="/api/logins/handleChange" method="POST"> 
            {/* Input box for username */}
            <br/><br/><br/> 
            <input type='username' className="inputBox" name='username' placeholder='Username' /> 
            <br/><br/><br/> 
            {/* Input box for current password */}
            <input type='password' className="inputBox" name='password' placeholder='Current Password' /> 
            {/* Add Space between input boxes */}
            <br/><br/><br/> 
            {/* Input box for new password (input is hidden) */}
            <input type='newPassword' className="inputBox" name='newPassword' placeholder='New Password' /> 

            {/* Container to hold button */}
            <div className='buttonHolder'> 
                {/* Submit Button */}
                <input type="submit" className="submitBtn" value="Change Password"/> 
            </div>
        </form>
                
                
                </div>
            </div>
            ) : null}

            </div>

      </div>
    )
}



export function getServerSideProps({ req, res }) {
    return { 
      props: {
      username: (req.cookies.username ? req.cookies.username : ""),
      error: (req.cookies.error ? req.cookies.error : "") 
   }}
  }