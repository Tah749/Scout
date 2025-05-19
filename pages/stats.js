import Head from 'next/head'
import styles from '../styles/Stats.module.css'

import Navbar from '../components/Navbar'
import { useState } from "react";

import Link from 'next/link';
import playerArray from '../lib/playerArray';
import teamArray from '../lib/teamArray';


export default function Stats({data}) {
  // useState functions
  const [results, setResults] = useState([]);
  const [clubResults, setClubResults] = useState([]);

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
                returnArray.push(`//${element.id}//` + element.name)
            }
            // Set the results state to the array, which is joined into a string
            setResults(returnArray.join("$$"))
        }
    })
}
  function onClubChange(event) {
    // If the search bar is empty, set all states to empty and return function
    if(event.target.value == '') {setClubResults(''); return}
    // The array that will be hold the results from the user's search
    var returnArray = []
    // Search through the array
    var toCompare = teamArray
    toCompare.forEach(element => {
      // Find any matching values
      if(element.name.toLowerCase().includes(event.target.value.toLowerCase())) {
        // Push the element into array
        if(returnArray.length > 10) {} else {
          returnArray.push(`//${element.id}//` + element.name)

            }
            // Set the results state to the array, which is joined into a string
            setClubResults(returnArray.join("$$"))
        }
    })
}

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
        {/* An if statement to check if the string is empty */}
        if (item !== '' && item !== null) {
          return (
            /* List through each player and display as a listed item */
            <Link href={`/search/${encodeURIComponent(item.replace(/(\/\/[A-Za-zŽžÀ-ÿ- ]+)/, '').replace('//', '').replace(' ', '-'))}`}>
              <li key={item} className={styles.singleResult}>{item.replace(/(\/\/[0-9]+\/\/)/, '')}
            </li></Link>
            )
          }
          return null
        })}
      
    </ul>
        </div>
        <br/>
        <br/>
        <br/>
    {/* Club Search */}
    <div className='searchFunction'>
    <input
      type='text'
      className={styles.searchBar}
      name='searchBar'
      placeholder='Search for club...'
      onChange={onClubChange}
      />

  {/* Unordered list */}
    <ul className={styles.resultsList}>
      {/* Map through the array */}
      {clubResults.toString().split('$$').map(item => {
        {/* An if statement to check if the string is empty */}
        if (item !== '' && item !== null) {
          return (
            /* List through each player and display as a listed item */
            <Link href={`/clubs/${encodeURIComponent(item.replace(/(\/\/[A-z-]+)/, '').replace('//', ''))}`}>
              <li key={item} className={styles.singleResult}>{item.replace(/(\/\/[0-9]+\/\/)/, '')}
            </li></Link>
            )
          }
          return null
        })}
      
    </ul>
        </div>
    </div>
  )
}



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
}}
}