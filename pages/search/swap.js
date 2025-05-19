import Head from 'next/head'
import styles from '../../styles/Swap.module.css'
import Link from 'next/link';
// Import the navigation bar
import Navbar from "../../components/Navbar";
import { useState } from "react";

 function Swap({data, username, currentPlayer, error}) {
    // The useState functions
    const [results, setResults] = useState([]);
    // Convert data object to array
     data = Object.values(data)
     
function onChange(event) {
  // If the search bar is empty, set all states to empty and return function
  if(event.target.value == '') {setResults(''); return}
  // The array that will be hold the results from the user's search
  var returnArray = []
  // Search through the array
  var toCompare = data
  toCompare.forEach(element => {
    // Find any matching values
    if(element.name.toLowerCase().includes(event.target.value.toLowerCase())) {
          // Push the element into array
          if(returnArray.length > 10) {} else {
              returnArray.push(`//${element.id}//` + element.name + " - £" + element.price + "M")
          }
          // Set the results state to the array, which is joined into a string
          setResults(returnArray.join("$$"))
      }
  })
}

    // HTML
    return (
      <div>
      <Head>
        <title>Scout</title>
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/>

    <div className='searchFunction'>
    <input
      type='text'
      className={styles.searchBar}
      name='searchBar'
      placeholder='Search for player...'
      onChange={onChange}
      />

  {/* Unordered list */}
    <ul className={styles.resultsList}>
      {/* Map through the array */}
      {results.toString().split('$$').map(item => {

        console.log(item.replace(/- £[0-9]+M/, '')
        //.replace(/(\/\/[A-Za-zŽžÀ-ÿ- ]+)/, '')
        //.replace('//', '').replace(' ', '-')
        )
        {/* An if statement to check if the string is empty */}
        if (item !== '' && item !== null) {
          return (
            /* List through each player and display as a listed item */
            <Link href={`/api/changes/changePlayer?${username}@${encodeURIComponent(currentPlayer)}@${encodeURIComponent(
              item.replace(/- £[0-9]+M/, '').replace(/(\/\/[A-Za-zŽžÀ-ÿ- ]+)/, '')
              .replace('//', '').replace(' ', '-'))}`}>
              <li key={item} className={styles.singleResult}>
              {item.replace(/(\/\/[0-9]+\/\/)/, '')}
            </li></Link>
            )
          }
          return null
        })}
      
    </ul>
        </div>
        <h2 className={styles.error}>{ (error == "noTransfers" ? "You have no transfers left" : "") }</h2>
        <h2 className={styles.error}>{ (error == "noBudget" ? "This player is too expensive for your budget" : "") }</h2>
        <h2 className={styles.error}>{ (error == "inTeam" ? "This player is already in your squad" : "") }</h2>

      <Link href='/'>
        <button className={styles.goBackBtn}>Go Back</button>
      </Link>

    </div>
    )
}

export default Swap;

// Load props before displaying page
  export async function getServerSideProps({ req, res }) {
        // Create a fetch request
        const response =  await fetch(`${process.env.BASE_URL}/api/requests/getAllPoints`, {
            method:'POST',
          })
          // convert response to readable JSON format
          const data = await response.json()
    return {props: {
        data: data,
        username: req.url.split('?')[2],
        currentPlayer: req.url.split('?')[1],
        error: (req.cookies.error ? req.cookies.error : "")
    }}
  }