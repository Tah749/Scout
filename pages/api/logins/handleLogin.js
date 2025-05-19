import connect from "../../../lib/mongodb";
connect()

import Login from '../../schemas/loginSchema'
import User from "../../schemas/userSchema";
import cookie from 'cookie';

var CryptoJS = require('crypto-js');

export default async function handler(req,res){

  // Turn the data into readable JSON arrays
  var data = JSON.parse(JSON.stringify(req.body))

  if(data.signIn) {
    // Signing in:
    // Check database for a single row that matches the username provided
    Login.findOne({username: data.username},(err, user) => {
      if(user) { // If account is found
        //Compare password to encrypted password from database
        var bytes = (CryptoJS.AES.decrypt(user.password, process.env.ENCRYPTION_KEY));
        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)
        if(decryptedPassword == data.password) {

        // Redirects to home page containing a query for the username and password
        res.setHeader('Set-Cookie', cookie.serialize('username', data.username, {
          maxAge: 60*60, // Cookie containing logins will last 1 hour
          path: '/' // Cookie will be available everywhere
        }
        ))
        res.redirect('/')
      } else { // If password does not match
        // Send a head containing a cookie that includes the error message
        res.setHeader('Set-Cookie', cookie.serialize('login_error', 'Incorrect username/password, please try again', {
          maxAge: 5, // Cookie message will last 5 seconds
          path: '/' // Cookie will be available everywhere
        }))
        // Redirect user to the login page
        res.redirect('/login')
      }
      } else { // If account is not found
        // Send a head containing a cookie that includes the error message
        res.setHeader('Set-Cookie', cookie.serialize('login_error', 'Incorrect username/password, please try again', {
          maxAge: 5, // Cookie message will last 5 seconds
          path: '/' // Cookie will be available everywhere
        }))
        // Redirect user to the login page
        res.redirect('/login')

      }
    })


  } else {
    // Signing up:

    // Check database for a single row that matches the username provided
    Login.findOne({username: data.username},(err, user) => {
      if(user) {

        res.setHeader('Set-Cookie', cookie.serialize('login_error', 'User already exists', {
          maxAge: 5, // Cookie message will last 5 seconds
          path: '/' // Cookie will be available everywhere
        }))
        // Redirect user to the login page
        res.redirect('/login')
      } else {

        // PASSWORD VALIDATION
        // variable that will be checked at the end to make sure the password follows all rules
        var passedValidation = true;
        // Length check
        let passwordCharArray = data.password.split('')
        // Check whether the password is atleast 5 characters
        if(passwordCharArray.length < 5) {
          passedValidation = false
          res.setHeader('Set-Cookie', cookie.serialize('login_error',
          'Password must be atleast 5 characters long, contain a mixture of letters and numbers, and have atleast 1 capital letter',
           {
            maxAge: 5, // Cookie message will last 5 seconds
            path: '/' // Cookie will be available everywhere
          }))
          // Redirect user to the login page
          res.redirect('/login')
        }

        // Capital letter check
        var capitalExists = false;
        // Loop through the passwordCharArray
        passwordCharArray.forEach(char => {
          // Get ascii value of character
          var asciiValue = char.charCodeAt(0)
          // If ascii value is that of a capital letter
          if(asciiValue >= 65 && asciiValue <= 90) {
            // Set variable to true
            capitalExists = true;
          }
        })
        // If the variable is still false, then there is no capital letter
        if(capitalExists == false) {
          passedValidation = false
          res.setHeader('Set-Cookie', cookie.serialize('login_error',
          'Password must be atleast 5 characters long, contain a mixture of letters and numbers, and have atleast 1 capital letter',
          {
            maxAge: 5, // Cookie message will last 5 seconds
            path: '/' // Cookie will be available everywhere
          }))
          // Redirect user to the login page
          res.redirect('/login')
        }

        // Mixed characters check
        // Find any numbers in string
        let checkForNumbers = data.password.match(/[0-9]/)
        // Find any letters in string
        let checkForLetters = data.password.match(/[a-zA-Z]/)
        // If there are no numbers or letters present, return error
        if(!checkForNumbers || !checkForLetters) {
          passedValidation = false
          res.setHeader('Set-Cookie', cookie.serialize('login_error',
          'Password must be atleast 5 characters long, contain a mixture of letters and numbers, and have atleast 1 capital letter',
          {
            maxAge: 5, // Cookie message will last 5 seconds
            path: '/' // Cookie will be available everywhere
          }))
          // Redirect user to the login page
          res.redirect('/login')
        }

        // Check if variable is still set to true
        if(passedValidation == true) {
        // Use the schema to create a new input into the database

        var ID = generateUUID();
        // Encrypt the user's password to 'Advanced Encryption Standard'
        var encryptedPassword = CryptoJS.AES.encrypt(data.password, process.env.ENCRYPTION_KEY).toString()
        var enterData = new Login(
          {
            userID: ID,
            username: data.username,
            password: encryptedPassword
          })
         // Save new data to the database
          enterData.save().then(() => {

            var createUser = new User(
              {
                userID: ID,
                username: data.username,
                leagues: [],
                captain: "null",
                transfers: 5,
                budget: 550,
                boostsCaptain: true,
                boostsTransfers: true,
                team: {
                  "keepers": {
                    "keeper": "327"
                    },
                
                    "defenders": {
                    "defenderA": "342",
                    "defenderB": "329",
                    "defenderC": "533",
                    "defenderD": "332"
                    },
                
                    "midfielders": {
                    "midfielderA": "609",
                    "midfielderB": "333",
                    "midfielderC": "331",
                    "midfielderD": "340"
                    },
                
                    "forwards": {
                    "forwardA": "701",
                    "forwardB": "335"
                    }
                }
              })

              createUser.save().then(() => {
                res.setHeader('Set-Cookie', cookie.serialize('username', data.username, {
                  maxAge: 60*60, // Cookie containing logins will last 1 hour
                  path: '/' // Cookie will be available everywhere
                }))
                // Redirects to home page containing a cookie featuring the userID
                res.setHeader('Set-Cookie', cookie.serialize('userID', ID, {
                maxAge: 60*60, // Cookie containing logins will last 1 hour
                path: '/' // Cookie will be available everywhere
              }
            ))
              res.redirect('/')
            })
          })
        }
      }
    })
  }
}

// Function to generate unique user ID
const generateUUID = () => {
  // Empty string that will hold the UUID
  var UUID = "";
  // For loop that repeats to create a 16 digit string
  for(let i = 0; i <= 16; i++) {
    // Random signle digit number is generated
    var char = Math.floor(Math.random() * 9) + 1
    // Character is concatenated to UUID string
    UUID = UUID += `${char}`
  }
  // UUID is returned
  return UUID;
}