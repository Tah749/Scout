import Head from 'next/head'
import styles from '../styles/Login.module.css'

import { NextResponse } from 'next/server'

import Navbar from '../components/Navbar'

import Cookies from 'js-cookie'

import Link from 'next/link'

export default function Login({ login_error, username, password }) {

    if (username == "") {return (
    <div>
      <Head>
        <title>Scout | Login </title> {/* Title of tab is changed to showcase the webpage */}
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/> {/* Apply the navigation bar component */}

    <form action="/api/logins/handleLogin" method="POST"> {/* The form for the login system */}
        <input type='username' className={styles.loginInput} name='username' placeholder='Username' /> {/* Input box for username */}
        <br/><br/><br/> {/* Add Space between input boxes */}
        <input type='password' className={styles.loginInput} name='password' placeholder='Password' /> {/* Input box for password (input is hidden) */}

        <div className='buttonHolder'> {/* Container to hold buttons */}
            <input type="submit" className={styles.loginBtns} name='signIn' value="Sign In"/> {/* Button to log in */}
            <input type="submit" className={styles.loginBtns} name='signUp' value="Sign Up"/> {/* Button to sign up */}
        </div>
    <h2 className="loginError">{ login_error }</h2>
    </form>
    </div>
  )} else {
    return (
      <div>
      <Head>
        <title>Scout | Login </title> {/* Title of tab is changed to showcase the webpage */}
        <meta name="description" content="Fantasy Football League" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Navbar/> {/* Apply the navigation bar component */}

    <Link href='/'> {/* Redirect user to the home screen after logging out */}
      <button className={styles.loginBtns} onClick={logoutUser}>Log Out</button>
    </Link>
    </div>
    )
  }
}


export function getServerSideProps({ req, res }) {
  return { 
    props: { login_error: (req.cookies.login_error ? req.cookies.login_error : ""),
    username: (req.cookies.username ? req.cookies.username : ""),
    password: (req.cookies.password ? req.cookies.password : "") 
 }}
}

function logoutUser() {
  Cookies.remove("username")
  Cookies.remove("password")
}